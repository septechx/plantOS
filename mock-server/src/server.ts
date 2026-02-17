import crypto from "crypto";
import { WebSocketServer, WebSocket } from "ws";
import {
  getMessageTypeName,
  v1,
  parseEncryptedMessage,
  parseUnencryptedMessage,
  decryptMessage,
} from "@plantos/admin-proto";
import { HandlerRegistry } from "./handlers/registry";
import { SessionManager } from "./session";
import { InMemoryDataStore } from "./store";
import { BroadcastManager } from "./broadcast";
import {
  Session,
  MockServerConfig,
  ZoneDefinition,
  ModuleDefinition,
} from "./types";
import { registerHandshakeHandlers } from "./handlers/handshake";
import { registerZoneHandlers } from "./handlers/zones";
import { registerModuleHandlers } from "./handlers/modules";
import { registerStatisticsHandlers } from "./handlers/statistics";
import { registerSettingsHandlers } from "./handlers/settings";
import { broadcastStatisticsUpdate } from "./handlers/statistics";

const { Status } = v1;

export class PlantOSMockServer {
  private wss: WebSocketServer | null = null;
  private config: MockServerConfig;
  private sessionManager: SessionManager;
  private store: InMemoryDataStore;
  private registry: HandlerRegistry;
  private broadcastManager: BroadcastManager;
  private broadcastInterval: NodeJS.Timeout | null = null;

  constructor(config: Partial<MockServerConfig> = {}) {
    // Default configuration
    this.config = {
      port: config.port ?? 8080,
      encryptionKey: config.encryptionKey ?? this.generateEncryptionKey(),
      hubId: config.hubId ?? "mock-hub-001",
      hubVersion: config.hubVersion ?? "1.0.0-mock",
      broadcastIntervalMs: config.broadcastIntervalMs ?? 5000,
      enableEncryption: config.enableEncryption ?? true,
    };

    this.sessionManager = new SessionManager(this.config.encryptionKey);
    this.store = new InMemoryDataStore();
    this.registry = new HandlerRegistry();
    this.broadcastManager = new BroadcastManager(this.sessionManager);

    // Register all handlers
    this.registerHandlers();
  }

  /**
   * Define mock zones.
   */
  defineZones(definitions: ZoneDefinition[]): void {
    this.store.defineZones(definitions);
  }

  /**
   * Define mock modules.
   */
  defineModules(definitions: ModuleDefinition[]): void {
    this.store.defineModules(definitions);
  }

  /**
   * Start the mock server.
   */
  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.wss = new WebSocketServer({
        port: this.config.port,
      });

      this.wss.on("error", (err) => {
        reject(err);
      });

      this.wss.on("listening", () => {
        console.log(`🌱 PlantOS Mock Server`);
        console.log(`Listening on ws://localhost:${this.config.port}/v1/admin`);
        console.log(`Hub ID: ${this.config.hubId}`);
        console.log(`Hub Version: ${this.config.hubVersion}`);
        console.log(
          `Encryption: ${this.config.enableEncryption ? "enabled" : "disabled"}`,
        );
        console.log(`Broadcast interval: ${this.config.broadcastIntervalMs}ms`);
        console.log("");
        this.startBroadcasts();
        resolve();
      });

      this.wss.on("connection", (ws: WebSocket) => {
        this.handleConnection(ws);
      });

      process.on("SIGINT", () => this.shutdown());
      process.on("SIGTERM", () => this.shutdown());
    });
  }

  /**
   * Stop the mock server.
   */
  stop(): Promise<void> {
    return this.shutdown();
  }

  private shutdown(): Promise<void> {
    return new Promise((resolve) => {
      console.log("\nShutting down server...");

      if (this.broadcastInterval) {
        clearInterval(this.broadcastInterval);
        this.broadcastInterval = null;
      }

      if (this.wss) {
        this.wss.close(() => {
          console.log("Server closed");
          this.wss = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  getEncryptionKey(): Buffer {
    return this.config.encryptionKey;
  }

  getHubId(): string {
    return this.config.hubId;
  }

  private handleConnection(ws: WebSocket): void {
    // Create a new session for this connection
    const session = this.sessionManager.createSession();
    this.broadcastManager.addClient(session, (data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });

    console.log(
      `Client connected (session: ${session.id.toString("hex").slice(0, 8)}...)`,
    );

    ws.on("message", async (data: Buffer) => {
      try {
        await this.handleMessage(data, session, ws);
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    ws.on("close", () => {
      console.log(
        `Client disconnected (session: ${session.id.toString("hex").slice(0, 8)}...)`,
      );
      this.sessionManager.removeSession(session);
      this.broadcastManager.removeClient(session);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }

  private async handleMessage(
    data: Buffer,
    session: Session,
    ws: WebSocket,
  ): Promise<void> {
    let messageType: number;
    let payload: Uint8Array;

    if (session.isEncrypted) {
      const parsed = parseEncryptedMessage(data);
      if (!parsed) {
        console.error("Failed to parse encrypted message");
        return;
      }

      try {
        const decrypted = decryptMessage(session.derivedKey, parsed.encrypted);
        messageType = parsed.messageType;
        payload = decrypted;
      } catch (error) {
        console.error("Failed to decrypt message:", error);
        return;
      }

      if (!this.sessionManager.incrementMessageCount(session)) {
        console.error("Session message limit exceeded, closing connection");
        ws.close();
        return;
      }
    } else {
      const parsed = parseUnencryptedMessage(data);
      if (!parsed) {
        console.error("Failed to parse unencrypted message");
        return;
      }

      messageType = parsed.messageType;
      payload = parsed.payload;
    }

    const messageName = getMessageTypeName(messageType);
    console.log(`Received: ${messageName} (type=${messageType})`);

    // Route to handler
    const context = {
      session,
      store: this.store,
      broadcast: (
        msgType: number,
        pl: Uint8Array,
        excludeSession?: Session,
      ) => {
        this.broadcastManager.broadcast(msgType, pl, excludeSession);
      },
    };

    const response = await this.registry.routeMessage(
      messageType,
      payload,
      session,
      context,
    );

    if (response) {
      ws.send(response);
    }
  }

  private registerHandlers(): void {
    registerHandshakeHandlers(
      this.registry,
      this.config.hubId,
      this.config.hubVersion,
    );
    registerZoneHandlers(this.registry);
    registerModuleHandlers(this.registry);
    registerStatisticsHandlers(this.registry);
    registerSettingsHandlers(this.registry);
  }

  private startBroadcasts(): void {
    this.broadcastInterval = setInterval(() => {
      if (this.broadcastManager.getClientCount() === 0) return;

      this.store.updateStatistics();

      // Broadcast statistics updates for all zones
      const zones = this.store.getZones();
      for (const zone of zones) {
        const statistics = this.store.getCurrentStatistics(zone.id);
        broadcastStatisticsUpdate(zone.id, statistics, {
          store: this.store,
          broadcast: (
            msgType: number,
            pl: Uint8Array,
            excludeSession?: Session,
          ) => {
            this.broadcastManager.broadcast(msgType, pl, excludeSession);
          },
        });
      }

      console.log(
        `Broadcasted statistics updates to ${this.broadcastManager.getClientCount()} client(s)`,
      );
    }, this.config.broadcastIntervalMs);
  }

  private generateEncryptionKey(): Buffer {
    return crypto.randomBytes(32);
  }
}

// Factory function for creating a pre-configured server with default data
export function createDefaultMockServer(
  config: Partial<MockServerConfig> = {},
): PlantOSMockServer {
  const server = new PlantOSMockServer(config);

  // Define default zones
  server.defineZones([
    {
      id: 1,
      name: "Monstera Deliciosa",
      icon: "🌿",
      moduleId: 1,
      status: Status.STATUS_IDLE,
      statistics: {
        temperature: { min: 18, max: 28, current: 22, variance: 0.5 },
        humidity: { min: 20, max: 85, current: 45, variance: 3 },
        light: { min: 200, max: 2500, current: 1200, variance: 100 },
        soilMoisture: { min: 10, max: 90, current: 60, variance: 5 },
      },
      lastWatered: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    },
    {
      id: 2,
      name: "Fiddle Leaf Fig",
      icon: "🌿",
      moduleId: 1,
      status: Status.STATUS_WORKING,
      statistics: {
        temperature: { min: 18, max: 28, current: 23, variance: 0.5 },
        humidity: { min: 20, max: 85, current: 55, variance: 3 },
        light: { min: 200, max: 2500, current: 800, variance: 100 },
        soilMoisture: { min: 10, max: 90, current: 70, variance: 5 },
      },
      lastWatered: Date.now(), // Just watered
    },
    {
      id: 3,
      name: "Snake Plant",
      icon: "🌿",
      moduleId: 2,
      status: Status.STATUS_IDLE,
      statistics: {
        temperature: { min: 18, max: 28, current: 20, variance: 0.5 },
        humidity: { min: 20, max: 85, current: 25, variance: 3 },
        light: { min: 200, max: 2500, current: 400, variance: 100 },
        soilMoisture: { min: 10, max: 90, current: 30, variance: 5 },
      },
      lastWatered: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    },
    {
      id: 4,
      name: "Peace Lily",
      icon: "🌿",
      moduleId: 2,
      status: Status.STATUS_PAUSED,
      statistics: {
        temperature: { min: 18, max: 28, current: 22, variance: 0.5 },
        humidity: { min: 20, max: 85, current: 70, variance: 3 },
        light: { min: 200, max: 2500, current: 500, variance: 100 },
        soilMoisture: { min: 10, max: 90, current: 80, variance: 5 },
      },
      lastWatered: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
    },
    {
      id: 5,
      name: "Aloe Vera",
      icon: "🌿",
      moduleId: 3,
      status: Status.STATUS_IDLE,
      statistics: {
        temperature: { min: 18, max: 28, current: 24, variance: 0.5 },
        humidity: { min: 20, max: 85, current: 30, variance: 3 },
        light: { min: 200, max: 2500, current: 2000, variance: 100 },
        soilMoisture: { min: 10, max: 90, current: 20, variance: 5 },
      },
      lastWatered: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    },
  ]);

  // Define default modules
  server.defineModules([
    {
      id: 1,
      name: "Main Module",
      status: Status.STATUS_IDLE,
      batteryLevel: 85,
      zoneIds: [1, 2],
    },
    {
      id: 2,
      name: "Secondary Module",
      status: Status.STATUS_IDLE,
      batteryLevel: 72,
      zoneIds: [3, 4],
    },
    {
      id: 3,
      name: "Expansion Module",
      status: Status.STATUS_IDLE,
      batteryLevel: 95,
      zoneIds: [5],
    },
  ]);

  return server;
}
