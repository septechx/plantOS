import WebSocket from "ws";
import { plantos } from "../src/proto-generated/admin";
import { MessageType, encodeMessage } from "../src/handlers";

const PORT = 8080;
const URL = `ws://localhost:${PORT}/v1/admin`;
const NUM_CLIENTS = 50;
const TEST_DURATION_MS = 10000;

const v1 = plantos.admin.v1;
const Hello = v1.Hello;
const ListZonesRequest = v1.ListZonesRequest;

class LoadClient {
  private ws: WebSocket;
  private id: number;
  private interval: NodeJS.Timeout | null = null;

  constructor(id: number) {
    this.id = id;
    this.ws = new WebSocket(URL);

    this.ws.on("open", () => {
      this.sendHello();
    });

    this.ws.on("message", (_data: Buffer) => { });

    this.ws.on("error", (err) => {
      console.error(`Client ${this.id} error:`, err.message);
    });

    this.ws.on("close", () => {
      if (this.interval) clearInterval(this.interval);
    });
  }

  private sendHello() {
    const hello = Hello.create({
      protocolVersion: "1.0",
      clientVersion: `load-test-${this.id}`,
    });
    this.send(MessageType.MSG_HELLO, Hello.encode(hello).finish());

    this.interval = setInterval(
      () => {
        this.sendListZones();
      },
      2000 + Math.random() * 1000,
    );
  }

  private sendListZones() {
    const req = ListZonesRequest.create({});
    this.send(
      MessageType.MSG_LIST_ZONES_REQUEST,
      ListZonesRequest.encode(req).finish(),
    );
  }

  private send(type: number, payload: Uint8Array) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(encodeMessage(type, payload));
    }
  }

  public close() {
    this.ws.close();
  }
}

async function runLoadTest() {
  console.log(
    `Starting load test with ${NUM_CLIENTS} clients for ${TEST_DURATION_MS}ms...`,
  );

  const clients: LoadClient[] = [];

  for (let i = 0; i < NUM_CLIENTS; i++) {
    clients.push(new LoadClient(i));
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  console.log("All clients connected. Running...");

  await new Promise((resolve) => setTimeout(resolve, TEST_DURATION_MS));

  console.log("Stopping load test...");
  clients.forEach((c) => c.close());
  console.log("Load test finished.");
}

runLoadTest();
