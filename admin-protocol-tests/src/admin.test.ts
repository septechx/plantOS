import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import crypto from "crypto";
import WebSocket from "ws";
import { TestClient } from "./test-utils";
import { MessageType, v1 } from "@plantos/admin-proto";
import {
  deriveSessionKey,
  encryptMessage,
  decryptMessage,
  encodeEncryptedMessage,
  parseEncryptedMessage,
  encodeUnencryptedMessage,
  parseUnencryptedMessage,
  generateNonce,
} from "@plantos/admin-proto";
import {
  PlantOSMockServer,
  createDefaultMockServer,
} from "@plantos/mock-server";

const {
  Hello,
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
  ZoneSettings,
  ErrorCode,
  StatisticType,
} = v1;

const TEST_PORT = 18080;
const EXTERNAL_SERVER_URL = process.env.PLANTOS_SERVER_URL;
const EXTERNAL_SERVER_KEY = process.env.PLANTOS_ENCRYPTION_KEY
  ? Buffer.from(process.env.PLANTOS_ENCRYPTION_KEY, "hex")
  : null;
const USE_EXTERNAL_SERVER = !!EXTERNAL_SERVER_URL && !!EXTERNAL_SERVER_KEY;

function arraysEqual(a: Uint8Array | Buffer, b: Uint8Array | Buffer): boolean {
  return Buffer.from(a).equals(Buffer.from(b));
}

describe("Encryption Utilities", () => {
  describe("HKDF-SHA256 Key Derivation", () => {
    it("should derive a 32-byte key from encryption key and session ID", () => {
      const encryptionKey = crypto.randomBytes(32);
      const sessionId = crypto.randomBytes(16);

      const derivedKey = deriveSessionKey(encryptionKey, sessionId);

      expect(derivedKey.length).toBe(32);
    });

    it("should produce different keys for different session IDs", () => {
      const encryptionKey = crypto.randomBytes(32);
      const sessionId1 = crypto.randomBytes(16);
      const sessionId2 = crypto.randomBytes(16);

      const derivedKey1 = deriveSessionKey(encryptionKey, sessionId1);
      const derivedKey2 = deriveSessionKey(encryptionKey, sessionId2);

      expect(derivedKey1).not.toEqual(derivedKey2);
    });

    it("should produce different keys for different encryption keys", () => {
      const encryptionKey1 = crypto.randomBytes(32);
      const encryptionKey2 = crypto.randomBytes(32);
      const sessionId = crypto.randomBytes(16);

      const derivedKey1 = deriveSessionKey(encryptionKey1, sessionId);
      const derivedKey2 = deriveSessionKey(encryptionKey2, sessionId);

      expect(derivedKey1).not.toEqual(derivedKey2);
    });

    it("should produce the same key for same inputs", () => {
      const encryptionKey = Buffer.alloc(32, 0x42);
      const sessionId = Buffer.alloc(16, 0x17);

      const derivedKey1 = deriveSessionKey(encryptionKey, sessionId);
      const derivedKey2 = deriveSessionKey(encryptionKey, sessionId);

      expect(derivedKey1).toEqual(derivedKey2);
    });
  });

  describe("Nonce Generation", () => {
    it("should generate a 12-byte nonce", () => {
      const nonce = generateNonce();
      expect(nonce.length).toBe(12);
    });

    it("should generate unique nonces", () => {
      const nonces = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const nonce = generateNonce();
        nonces.add(nonce.toString("hex"));
      }
      expect(nonces.size).toBe(100);
    });
  });

  describe("AES-256-GCM Encryption/Decryption", () => {
    it("should encrypt and decrypt a message successfully", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.from("Hello, PlantOS!");

      const encrypted = encryptMessage(key, plaintext);
      const decrypted = decryptMessage(key, encrypted);

      expect(decrypted).toEqual(plaintext);
    });

    it("should produce different ciphertexts for same plaintext (random nonce)", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.from("Same message");

      const encrypted1 = encryptMessage(key, plaintext);
      const encrypted2 = encryptMessage(key, plaintext);

      expect(encrypted1.nonce).not.toEqual(encrypted2.nonce);
      expect(encrypted1.ciphertext).not.toEqual(encrypted2.ciphertext);
    });

    it("should produce 16-byte authentication tag", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.from("Test message");

      const encrypted = encryptMessage(key, plaintext);

      expect(encrypted.tag.length).toBe(16);
    });

    it("should fail decryption with wrong key", () => {
      const correctKey = crypto.randomBytes(32);
      const wrongKey = crypto.randomBytes(32);
      const plaintext = Buffer.from("Secret message");

      const encrypted = encryptMessage(correctKey, plaintext);

      expect(() => decryptMessage(wrongKey, encrypted)).toThrow();
    });

    it("should fail decryption with corrupted ciphertext", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.from("Original message");

      const encrypted = encryptMessage(key, plaintext);
      encrypted.ciphertext[0] ^= 0xff;

      expect(() => decryptMessage(key, encrypted)).toThrow();
    });

    it("should fail decryption with corrupted tag", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.from("Original message");

      const encrypted = encryptMessage(key, plaintext);
      encrypted.tag[0] ^= 0xff;

      expect(() => decryptMessage(key, encrypted)).toThrow();
    });

    it("should fail decryption with corrupted nonce", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.from("Original message");

      const encrypted = encryptMessage(key, plaintext);
      encrypted.nonce[0] ^= 0xff;

      expect(() => decryptMessage(key, encrypted)).toThrow();
    });

    it("should handle empty plaintext", () => {
      const key = crypto.randomBytes(32);
      const plaintext = Buffer.alloc(0);

      const encrypted = encryptMessage(key, plaintext);
      const decrypted = decryptMessage(key, encrypted);

      expect(decrypted.length).toBe(0);
    });

    it("should handle large plaintext", () => {
      const key = crypto.randomBytes(32);
      const plaintext = crypto.randomBytes(65536);

      const encrypted = encryptMessage(key, plaintext);
      const decrypted = decryptMessage(key, encrypted);

      expect(decrypted).toEqual(plaintext);
    });
  });

  describe("Message Encoding", () => {
    it("should encode encrypted message correctly", () => {
      const messageType = MessageType.MSG_LIST_ZONES_REQUEST;
      const encrypted = {
        nonce: Buffer.alloc(12, 0x01),
        ciphertext: Buffer.from("ciphertext"),
        tag: Buffer.alloc(16, 0x02),
      };

      const encoded = encodeEncryptedMessage(messageType, encrypted);

      expect(encoded.length).toBe(4 + 12 + encrypted.ciphertext.length + 16);

      const view = new DataView(encoded.buffer);
      expect(view.getUint32(0, true)).toBe(messageType);
    });

    it("should parse encrypted message correctly", () => {
      const messageType = MessageType.MSG_ZONE_UPDATE;
      const encrypted = {
        nonce: crypto.randomBytes(12),
        ciphertext: crypto.randomBytes(100),
        tag: crypto.randomBytes(16),
      };

      const encoded = encodeEncryptedMessage(messageType, encrypted);
      const parsed = parseEncryptedMessage(encoded);

      expect(parsed).not.toBeNull();
      expect(parsed!.messageType).toBe(messageType);
      expect(arraysEqual(parsed!.encrypted.nonce, encrypted.nonce)).toBe(true);
      expect(
        arraysEqual(parsed!.encrypted.ciphertext, encrypted.ciphertext),
      ).toBe(true);
      expect(arraysEqual(parsed!.encrypted.tag, encrypted.tag)).toBe(true);
    });

    it("should return null for too short data", () => {
      const shortData = Buffer.alloc(10);
      expect(parseEncryptedMessage(shortData)).toBeNull();
    });

    it("should encode unencrypted message correctly", () => {
      const messageType = MessageType.MSG_HELLO;
      const payload = Buffer.from("protobuf-data");

      const encoded = encodeUnencryptedMessage(messageType, payload);

      expect(encoded.length).toBe(4 + payload.length);

      const view = new DataView(encoded.buffer);
      expect(view.getUint32(0, true)).toBe(messageType);
      expect(arraysEqual(encoded.slice(4), payload)).toBe(true);
    });

    it("should parse unencrypted message correctly", () => {
      const messageType = MessageType.MSG_WELCOME;
      const payload = Buffer.from("protobuf-welcome-data");

      const encoded = encodeUnencryptedMessage(messageType, payload);
      const parsed = parseUnencryptedMessage(encoded);

      expect(parsed).not.toBeNull();
      expect(parsed!.messageType).toBe(messageType);
      expect(arraysEqual(parsed!.payload, payload)).toBe(true);
    });

    it("should return null for too short unencrypted data", () => {
      const shortData = Buffer.alloc(2);
      expect(parseUnencryptedMessage(shortData)).toBeNull();
    });
  });
});

describe("Encrypted Protocol Integration", () => {
  let server: PlantOSMockServer | null = null;
  let client: TestClient;
  let encryptionKey: Buffer;
  let testUrl: string | undefined;

  beforeAll(async () => {
    if (USE_EXTERNAL_SERVER) {
      encryptionKey = EXTERNAL_SERVER_KEY!;
      testUrl = EXTERNAL_SERVER_URL;
    } else {
      encryptionKey = crypto.randomBytes(32);
      server = createDefaultMockServer({
        port: TEST_PORT,
        encryptionKey,
        hubId: "test-hub-001",
        hubVersion: "1.0.0-test",
        broadcastIntervalMs: 60000,
      });
      await server.start();
    }
  });

  afterAll(async () => {
    if (server) {
      await server.stop();
    }
  });

  describe("Protocol Handshake", () => {
    beforeEach(() => {
      client = new TestClient({ encryptionKey, port: TEST_PORT, url: testUrl });
    });

    afterEach(() => {
      client.close();
    });

    it("should complete unencrypted Hello/Welcome handshake", async () => {
      await client.connect();

      const sessionInfo = client.getSessionInfo();
      expect(sessionInfo.isEncrypted).toBe(false);
      expect(sessionInfo.hasDerivedKey).toBe(false);

      const welcome = await client.handshake();

      expect(welcome.sessionId).toBeDefined();
      expect(welcome.sessionId.length).toBe(16);
      if (!USE_EXTERNAL_SERVER) {
        expect(welcome.hubId).toBe("test-hub-001");
        expect(welcome.hubVersion).toBe("1.0.0-test");
      }
    });

    it("should derive session key after handshake", async () => {
      await client.connect();
      await client.handshake();

      const sessionInfo = client.getSessionInfo();
      expect(sessionInfo.isEncrypted).toBe(true);
      expect(sessionInfo.hasDerivedKey).toBe(true);
    });

    it("should include server timestamp in Welcome", async () => {
      await client.connect();
      const welcome = await client.handshake();

      expect(welcome.serverTimestamp).toBeDefined();
      const now = Math.floor(Date.now() / 1000);
      const serverTime = welcome.serverTimestamp!.seconds.toNumber();
      expect(Math.abs(now - serverTime)).toBeLessThan(5);
    });

    it("should reject invalid protocol version", async () => {
      await client.connect();

      const hello = Hello.create({
        protocolVersion: "2.0",
        clientVersion: "test-1.0",
      });
      client.send(MessageType.MSG_HELLO, hello, Hello);

      const payload = await client.waitForMessage(
        MessageType.MSG_ERROR_RESPONSE,
      );
      const error = ErrorResponse.decode(payload);

      expect(error.code).toBe(ErrorCode.ERROR_CODE_VERSION_MISMATCH);
    });
  });

  describe("Zone Operations", () => {
    beforeEach(async () => {
      client = new TestClient({ encryptionKey, port: TEST_PORT, url: testUrl });
      await client.connect();
      await client.handshake();
    });

    afterEach(() => {
      client.close();
    });

    it("should list zones with encryption", async () => {
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

    it("should get specific zone with encryption", async () => {
      client.send(
        MessageType.MSG_LIST_ZONES_REQUEST,
        ListZonesRequest.create({}),
        ListZonesRequest,
      );
      const listPayload = await client.waitForMessage(
        MessageType.MSG_LIST_ZONES_RESPONSE,
      );
      const listResponse = ListZonesResponse.decode(listPayload);
      const zoneId = listResponse.zones[0].id;

      client.send(
        MessageType.MSG_GET_ZONE_REQUEST,
        GetZoneRequest.create({ zoneId }),
        GetZoneRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_GET_ZONE_RESPONSE,
      );
      const response = GetZoneResponse.decode(payload);

      expect(response.zone).toBeDefined();
      expect(response.zone?.id).toBe(zoneId);
    });

    it("should return error for non-existent zone", async () => {
      client.send(
        MessageType.MSG_GET_ZONE_REQUEST,
        GetZoneRequest.create({ zoneId: 9999 }),
        GetZoneRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_ERROR_RESPONSE,
      );
      const error = ErrorResponse.decode(payload);

      expect(error.code).toBe(ErrorCode.ERROR_CODE_ZONE_NOT_FOUND);
    });

    it("should filter zones by module ID", async () => {
      client.send(
        MessageType.MSG_LIST_ZONES_REQUEST,
        ListZonesRequest.create({ moduleId: 1 }),
        ListZonesRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_LIST_ZONES_RESPONSE,
      );
      const response = ListZonesResponse.decode(payload);

      for (const zone of response.zones) {
        expect(zone.moduleId).toBe(1);
      }
    });
  });

  describe("Module Operations", () => {
    beforeEach(async () => {
      client = new TestClient({ encryptionKey, port: TEST_PORT, url: testUrl });
      await client.connect();
      await client.handshake();
    });

    afterEach(() => {
      client.close();
    });

    it("should list modules with encryption", async () => {
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

    it("should get specific module with encryption", async () => {
      client.send(
        MessageType.MSG_LIST_MODULES_REQUEST,
        ListModulesRequest.create({}),
        ListModulesRequest,
      );
      const listPayload = await client.waitForMessage(
        MessageType.MSG_LIST_MODULES_RESPONSE,
      );
      const listResponse = ListModulesResponse.decode(listPayload);
      const moduleId = listResponse.modules[0].id;

      client.send(
        MessageType.MSG_GET_MODULE_REQUEST,
        GetModuleRequest.create({ moduleId }),
        GetModuleRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_GET_MODULE_RESPONSE,
      );
      const response = GetModuleResponse.decode(payload);

      expect(response.module).toBeDefined();
      expect(response.module?.id).toBe(moduleId);
    });

    it("should return error for non-existent module", async () => {
      client.send(
        MessageType.MSG_GET_MODULE_REQUEST,
        GetModuleRequest.create({ moduleId: 9999 }),
        GetModuleRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_ERROR_RESPONSE,
      );
      const error = ErrorResponse.decode(payload);

      expect(error.code).toBe(ErrorCode.ERROR_CODE_MODULE_NOT_FOUND);
    });
  });

  describe("Statistics Operations", () => {
    beforeEach(async () => {
      client = new TestClient({ encryptionKey, port: TEST_PORT, url: testUrl });
      await client.connect();
      await client.handshake();
    });

    afterEach(() => {
      client.close();
    });

    it("should get statistics for a zone", async () => {
      client.send(
        MessageType.MSG_LIST_ZONES_REQUEST,
        ListZonesRequest.create({}),
        ListZonesRequest,
      );
      const listPayload = await client.waitForMessage(
        MessageType.MSG_LIST_ZONES_RESPONSE,
      );
      const listResponse = ListZonesResponse.decode(listPayload);
      const zoneId = listResponse.zones[0].id;

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

    it("should filter statistics by type", async () => {
      client.send(
        MessageType.MSG_LIST_ZONES_REQUEST,
        ListZonesRequest.create({}),
        ListZonesRequest,
      );
      const listPayload = await client.waitForMessage(
        MessageType.MSG_LIST_ZONES_RESPONSE,
      );
      const listResponse = ListZonesResponse.decode(listPayload);
      const zoneId = listResponse.zones[0].id;

      const now = Math.floor(Date.now() / 1000);
      client.send(
        MessageType.MSG_GET_STATISTICS_REQUEST,
        GetStatisticsRequest.create({
          zoneId,
          from: { seconds: now - 3600 },
          to: { seconds: now },
          types: [StatisticType.STATISTIC_TYPE_TEMPERATURE],
        }),
        GetStatisticsRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_GET_STATISTICS_RESPONSE,
      );
      const response = GetStatisticsResponse.decode(payload);

      expect(response.statistics.length).toBe(1);
      expect(response.statistics[0].type).toBe(
        StatisticType.STATISTIC_TYPE_TEMPERATURE,
      );
    });

    it("should return error for invalid time range", async () => {
      const now = Math.floor(Date.now() / 1000);
      client.send(
        MessageType.MSG_GET_STATISTICS_REQUEST,
        GetStatisticsRequest.create({
          zoneId: 1,
          from: { seconds: now },
          to: { seconds: now - 3600 },
        }),
        GetStatisticsRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_ERROR_RESPONSE,
      );
      const error = ErrorResponse.decode(payload);

      expect(error.code).toBe(ErrorCode.ERROR_CODE_INVALID_TIME_RANGE);
    });
  });

  describe("Settings Operations", () => {
    beforeEach(async () => {
      client = new TestClient({ encryptionKey, port: TEST_PORT, url: testUrl });
      await client.connect();
      await client.handshake();
    });

    afterEach(() => {
      client.close();
    });

    it("should get zone settings", async () => {
      client.send(
        MessageType.MSG_GET_ZONE_SETTINGS_REQUEST,
        GetZoneSettingsRequest.create({ zoneId: 1 }),
        GetZoneSettingsRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_GET_ZONE_SETTINGS_RESPONSE,
      );
      const response = GetZoneSettingsResponse.decode(payload);

      expect(response.settings).toBeDefined();
      expect(response.settings?.thresholds).toBeDefined();
    });

    it("should update zone settings", async () => {
      client.send(
        MessageType.MSG_GET_ZONE_SETTINGS_REQUEST,
        GetZoneSettingsRequest.create({ zoneId: 1 }),
        GetZoneSettingsRequest,
      );
      const getPayload = await client.waitForMessage(
        MessageType.MSG_GET_ZONE_SETTINGS_RESPONSE,
      );
      const getResponse = GetZoneSettingsResponse.decode(getPayload);

      const newSettings = ZoneSettings.create({
        zoneId: 1,
        thresholds: {
          minTemperature: 15,
          maxTemperature: 30,
          minSoilMoisture: 20,
          maxSoilMoisture: 80,
        },
        notifyOnError: !getResponse.settings!.notifyOnError,
        notifyOnLowBattery: getResponse.settings!.notifyOnLowBattery,
      });

      client.send(
        MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST,
        UpdateZoneSettingsRequest.create({ settings: newSettings }),
        UpdateZoneSettingsRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_UPDATE_ZONE_SETTINGS_RESPONSE,
      );
      const response = UpdateZoneSettingsResponse.decode(payload);

      expect(response.success).toBe(true);
      expect(response.updatedSettings?.notifyOnError).toBe(
        newSettings.notifyOnError,
      );
    });
  });

  describe("Error Handling", () => {
    beforeEach(async () => {
      client = new TestClient({ encryptionKey, port: TEST_PORT, url: testUrl });
      await client.connect();
      await client.handshake();
    });

    afterEach(() => {
      client.close();
    });

    it("should return error for unknown message type", async () => {
      const unknownType = 99999;
      client.send(unknownType, Buffer.from("test"), {
        encode: () => ({ finish: () => Buffer.from("") }),
      });

      const payload = await client.waitForMessage(
        MessageType.MSG_ERROR_RESPONSE,
      );
      const error = ErrorResponse.decode(payload);

      expect(error.code).toBe(ErrorCode.ERROR_CODE_INVALID_REQUEST);
    });

    it("should return error for zone ID 0 (reserved)", async () => {
      client.send(
        MessageType.MSG_GET_ZONE_REQUEST,
        GetZoneRequest.create({ zoneId: 0 }),
        GetZoneRequest,
      );

      const payload = await client.waitForMessage(
        MessageType.MSG_ERROR_RESPONSE,
      );
      const error = ErrorResponse.decode(payload);

      expect(error.code).toBe(ErrorCode.ERROR_CODE_ZONE_NOT_FOUND);
    });
  });

  describe("Session Management", () => {
    it("should track message count", async () => {
      const testClient = new TestClient({
        encryptionKey,
        port: TEST_PORT,
        url: testUrl,
      });
      try {
        await testClient.connect();
        await testClient.handshake();

        const initialCount = testClient.getSessionInfo().sendMessageCount;

        testClient.send(
          MessageType.MSG_LIST_ZONES_REQUEST,
          ListZonesRequest.create({}),
          ListZonesRequest,
        );
        await testClient.waitForMessage(MessageType.MSG_LIST_ZONES_RESPONSE);

        const afterCount = testClient.getSessionInfo().sendMessageCount;
        expect(afterCount).toBeGreaterThan(initialCount);
      } finally {
        testClient.close();
      }
    });

    it("should generate unique session IDs for different connections", async () => {
      const client1 = new TestClient({
        encryptionKey,
        port: TEST_PORT,
        url: testUrl,
      });
      const client2 = new TestClient({
        encryptionKey,
        port: TEST_PORT,
        url: testUrl,
      });
      try {
        await client1.connect();
        await client2.connect();

        const welcome1 = await client1.handshake();
        const welcome2 = await client2.handshake();

        expect(welcome1.sessionId).not.toEqual(welcome2.sessionId);
      } finally {
        client1.close();
        client2.close();
      }
    });

    it("should use different derived keys for different sessions", async () => {
      const client1 = new TestClient({
        encryptionKey,
        port: TEST_PORT,
        url: testUrl,
      });
      const client2 = new TestClient({
        encryptionKey,
        port: TEST_PORT,
        url: testUrl,
      });
      try {
        await client1.connect();
        await client2.connect();

        await client1.handshake();
        await client2.handshake();

        expect(client1.getSessionInfo().hasDerivedKey).toBe(true);
        expect(client2.getSessionInfo().hasDerivedKey).toBe(true);
        expect(client1.getSessionInfo().derivedKeyHash).not.toEqual(
          client2.getSessionInfo().derivedKeyHash,
        );
      } finally {
        client1.close();
        client2.close();
      }
    });
  });
});

describe("Message Counter Limits", () => {
  it("should throw when message count exceeds 2^32", () => {
    const key = crypto.randomBytes(32);
    const client = new TestClient({
      encryptionKey: key,
      port: TEST_PORT + 100,
    });

    (client as any).sendMessageCount = 0x100000000;
    (client as any).isEncrypted = true;
    (client as any).derivedKey = key;
    // Intentionally omits ws.send: TestClient.send checks sendMessageCount overflow BEFORE calling ws.send,
    // so the test verifies the early-exit path without needing a real or stubbed send implementation.
    (client as any).ws = { readyState: WebSocket.OPEN };

    expect(() => {
      client.send(
        MessageType.MSG_LIST_ZONES_REQUEST,
        ListZonesRequest.create({}),
        ListZonesRequest,
      );
    }).toThrow("Session message limit exceeded");
  });
});
