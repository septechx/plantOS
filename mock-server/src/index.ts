import { createDefaultMockServer } from "./server";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const server = createDefaultMockServer({
  port: PORT,
  hubId: process.env.HUB_ID || "mock-hub-001",
  hubVersion: process.env.HUB_VERSION || "1.0.0-mock",
  broadcastIntervalMs: process.env.BROADCAST_INTERVAL
    ? parseInt(process.env.BROADCAST_INTERVAL)
    : 5000,
});

server.start();

export { PlantOSMockServer, createDefaultMockServer } from "./server";
export * from "./types";
export * from "./encryption";
