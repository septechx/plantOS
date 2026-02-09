import WebSocket from "ws";
import { plantos, google } from "../src/proto-generated/admin";
import {
  MessageType,
  encodeMessage,
  getMessageTypeName,
} from "../src/handlers";

const PORT = 8080;
const URL = `ws://localhost:${PORT}/v1/admin`;

const v1 = plantos.admin.v1;
const Hello = v1.Hello;
const Welcome = v1.Welcome;
const ListZonesRequest = v1.ListZonesRequest;
const ListZonesResponse = v1.ListZonesResponse;
const GetZoneRequest = v1.GetZoneRequest;
const GetZoneResponse = v1.GetZoneResponse;
const GetStatisticsRequest = v1.GetStatisticsRequest;
const GetStatisticsResponse = v1.GetStatisticsResponse;
const Timestamp = google.protobuf.Timestamp;

function parseMessage(
  data: Buffer,
): { messageType: number; payload: Uint8Array } | null {
  if (data.length < 4) {
    console.error("Message too short");
    return null;
  }

  const messageType = data.readUInt32LE(0);
  const payload = new Uint8Array(data.subarray(4));

  return { messageType, payload };
}

async function runTest() {
  console.log(`Connecting to ${URL}...`);
  const ws = new WebSocket(URL);

  const waitForMessage = (expectedType: number): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(
          new Error(
            `Timeout waiting for message type ${getMessageTypeName(expectedType)}`,
          ),
        );
      }, 5000);

      const handleMessage = (data: Buffer) => {
        const parsed = parseMessage(data);
        if (!parsed) return;

        if (parsed.messageType === expectedType) {
          clearTimeout(timeout);
          ws.off("message", handleMessage);
          resolve(parsed.payload);
        } else if (parsed.messageType === MessageType.MSG_ERROR_RESPONSE) {
          const error = v1.ErrorResponse.decode(parsed.payload);
          console.error("Received ErrorResponse:", error);
        }
      };

      ws.on("message", handleMessage);
    });
  };

  try {
    await new Promise<void>((resolve, reject) => {
      ws.on("open", resolve);
      ws.on("error", reject);
    });
    console.log("Connected!");

    // 1. Send Hello
    console.log("Sending Hello...");
    const hello = Hello.create({
      protocolVersion: "1.0",
      clientVersion: "test-client-1.0",
    });
    ws.send(encodeMessage(MessageType.MSG_HELLO, Hello.encode(hello).finish()));

    // 2. Wait for Welcome
    console.log("Waiting for Welcome...");
    const welcomePayload = await waitForMessage(MessageType.MSG_WELCOME);
    const welcome = Welcome.decode(welcomePayload);
    console.log("Received Welcome:", welcome);

    // 3. List Zones
    console.log("Sending ListZonesRequest...");
    const listZones = ListZonesRequest.create({});
    ws.send(
      encodeMessage(
        MessageType.MSG_LIST_ZONES_REQUEST,
        ListZonesRequest.encode(listZones).finish(),
      ),
    );

    console.log("Waiting for ListZonesResponse...");
    const listZonesPayload = await waitForMessage(
      MessageType.MSG_LIST_ZONES_RESPONSE,
    );
    const listZonesResponse = ListZonesResponse.decode(listZonesPayload);
    console.log(`Received ${listZonesResponse.zones.length} zones`);

    if (listZonesResponse.zones.length === 0) {
      console.warn("No zones found, skipping GetZone test");
    } else {
      const zoneId = listZonesResponse.zones[0].id;

      // 4. Get Zone Details
      console.log(`Sending GetZoneRequest for zone ${zoneId}...`);
      const getZone = GetZoneRequest.create({ zoneId });
      ws.send(
        encodeMessage(
          MessageType.MSG_GET_ZONE_REQUEST,
          GetZoneRequest.encode(getZone).finish(),
        ),
      );

      console.log("Waiting for GetZoneResponse...");
      const getZonePayload = await waitForMessage(
        MessageType.MSG_GET_ZONE_RESPONSE,
      );
      const getZoneResponse = GetZoneResponse.decode(getZonePayload);
      console.log("Received Zone:", getZoneResponse.zone?.name);

      // 5. Get Statistics
      console.log(`Sending GetStatisticsRequest for zone ${zoneId}...`);
      const now = Date.now();
      const from = Timestamp.create({
        seconds: Math.floor((now - 3600000) / 1000),
      });
      const to = Timestamp.create({ seconds: Math.floor(now / 1000) });

      const getStats = GetStatisticsRequest.create({
        zoneId,
        from,
        to,
        types: [v1.StatisticType.STATISTIC_TYPE_TEMPERATURE],
        aggregation: v1.GetStatisticsRequest.Aggregation.AGGREGATION_HOURLY,
      });
      ws.send(
        encodeMessage(
          MessageType.MSG_GET_STATISTICS_REQUEST,
          GetStatisticsRequest.encode(getStats).finish(),
        ),
      );

      console.log("Waiting for GetStatisticsResponse...");
      const getStatsPayload = await waitForMessage(
        MessageType.MSG_GET_STATISTICS_RESPONSE,
      );
      const getStatsResponse = GetStatisticsResponse.decode(getStatsPayload);
      console.log(
        `Received ${getStatsResponse.statistics.length} statistics series`,
      );
    }

    console.log("Test passed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  } finally {
    ws.close();
  }
}

runTest();
