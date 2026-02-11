import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { TestClient } from "./test-utils";
import { MessageType, v1 } from "@plantos/admin-proto";

const {
  ListZonesRequest,
  ListZonesResponse,
  GetZoneRequest,
  GetZoneResponse,
  ListModulesRequest,
  ListModulesResponse,
  GetModuleRequest,
  GetModuleResponse,
  GetStatisticsRequest,
  GetStatisticsResponse,
  GetZoneSettingsRequest,
  GetZoneSettingsResponse,
  UpdateZoneSettingsRequest,
  UpdateZoneSettingsResponse,
  ErrorResponse,
  StatisticsUpdate,
} = v1;

async function getFirstZoneId(client: TestClient): Promise<number> {
  client.send(
    MessageType.MSG_LIST_ZONES_REQUEST,
    ListZonesRequest.create({}),
    ListZonesRequest,
  );

  const payload = await client.waitForMessage(
    MessageType.MSG_LIST_ZONES_RESPONSE,
  );
  const response = ListZonesResponse.decode(payload);

  expect(response.zones.length).toBeGreaterThan(0);
  return response.zones[0].id as number;
}

describe("PlantOS Admin Protocol", () => {
  let client: TestClient;
  let welcome: v1.Welcome;

  beforeAll(async () => {
    client = new TestClient();
    await client.connect();
    welcome = await client.handshake();
  });

  afterAll(() => {
    client.close();
  });

  it("should complete handshake", async () => {
    expect(welcome.hubId).toBeDefined();
    expect(welcome.hubVersion).toBeDefined();
  });

  it("should list zones", async () => {
    client.send(
      MessageType.MSG_LIST_ZONES_REQUEST,
      ListZonesRequest.create({}),
      ListZonesRequest,
    );

    const payload = await client.waitForMessage(
      MessageType.MSG_LIST_ZONES_RESPONSE,
    );
    const response = ListZonesResponse.decode(payload);

    expect(response.zones).toBeInstanceOf(Array);
    expect(response.zones.length).toBeGreaterThan(0);
  });

  it("should list modules", async () => {
    client.send(
      MessageType.MSG_LIST_MODULES_REQUEST,
      ListModulesRequest.create({}),
      ListModulesRequest,
    );

    const payload = await client.waitForMessage(
      MessageType.MSG_LIST_MODULES_RESPONSE,
    );
    const response = ListModulesResponse.decode(payload);

    expect(response.modules).toBeInstanceOf(Array);
    expect(response.modules.length).toBeGreaterThan(0);
  });

  it("should get specific zone details", async () => {
    const zoneId = await getFirstZoneId(client);

    client.send(
      MessageType.MSG_GET_ZONE_REQUEST,
      GetZoneRequest.create({ zoneId }),
      GetZoneRequest,
    );
    const getPayload = await client.waitForMessage(
      MessageType.MSG_GET_ZONE_RESPONSE,
    );
    const getResponse = GetZoneResponse.decode(getPayload);

    expect(getResponse.zone).toBeDefined();
    expect(getResponse.zone?.id).toBe(zoneId);
  });

  it("should get specific module details", async () => {
    client.send(
      MessageType.MSG_LIST_MODULES_REQUEST,
      ListModulesRequest.create({}),
      ListModulesRequest,
    );
    const listPayload = await client.waitForMessage(
      MessageType.MSG_LIST_MODULES_RESPONSE,
    );
    const listResponse = ListModulesResponse.decode(listPayload);
    expect(listResponse.modules.length).toBeGreaterThan(0);
    const moduleId = listResponse.modules[0].id;

    client.send(
      MessageType.MSG_GET_MODULE_REQUEST,
      GetModuleRequest.create({ moduleId }),
      GetModuleRequest,
    );
    const getPayload = await client.waitForMessage(
      MessageType.MSG_GET_MODULE_RESPONSE,
    );
    const getResponse = GetModuleResponse.decode(getPayload);

    expect(getResponse.module).toBeDefined();
    expect(getResponse.module?.id).toBe(moduleId);
  });

  it("should get statistics", async () => {
    const zoneId = await getFirstZoneId(client);

    const now = Math.floor(Date.now() / 1000);
    client.send(
      MessageType.MSG_GET_STATISTICS_REQUEST,
      GetStatisticsRequest.create({
        zoneId,
        from: { seconds: now - 3600 },
        to: { seconds: now },
      }),
      GetStatisticsRequest,
    );

    const payload = await client.waitForMessage(
      MessageType.MSG_GET_STATISTICS_RESPONSE,
    );
    const response = GetStatisticsResponse.decode(payload);
    expect(response.zoneId).toBe(zoneId);
    expect(response.statistics).toBeDefined();
  });

  it("should get and update zone settings", async () => {
    const zoneId = await getFirstZoneId(client);

    client.send(
      MessageType.MSG_GET_ZONE_SETTINGS_REQUEST,
      GetZoneSettingsRequest.create({ zoneId }),
      GetZoneSettingsRequest,
    );
    const getPayload = await client.waitForMessage(
      MessageType.MSG_GET_ZONE_SETTINGS_RESPONSE,
    );
    const getResponse = GetZoneSettingsResponse.decode(getPayload);
    expect(getResponse.settings).toBeDefined();

    const newSettings = {
      ...getResponse.settings!,
      notifyOnError: !getResponse.settings!.notifyOnError,
    };

    client.send(
      MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST,
      UpdateZoneSettingsRequest.create({ settings: newSettings }),
      UpdateZoneSettingsRequest,
    );
    const updatePayload = await client.waitForMessage(
      MessageType.MSG_UPDATE_ZONE_SETTINGS_RESPONSE,
    );
    const updateResponse = UpdateZoneSettingsResponse.decode(updatePayload);
    expect(updateResponse.success).toBe(true);
    expect(updateResponse.updatedSettings?.notifyOnError).toBe(
      newSettings.notifyOnError,
    );
  });

  it("should handle non-existent zone", async () => {
    client.send(
      MessageType.MSG_GET_ZONE_REQUEST,
      GetZoneRequest.create({ zoneId: 9999 }),
      GetZoneRequest,
    );
    const payload = await client.waitForMessage(MessageType.MSG_ERROR_RESPONSE);
    const response = ErrorResponse.decode(payload);
    expect(response.code).toBe(v1.ErrorCode.ERROR_CODE_ZONE_NOT_FOUND);
  });

  it("should receive broadcast updates", async () => {
    const payload = await client.waitForMessage(
      MessageType.MSG_STATISTICS_UPDATE,
      10000,
    );
    const update = StatisticsUpdate.decode(payload);
    expect(update.zoneId).toBeDefined();
    expect(update.updatedStatistics).toBeDefined();
  });
});
