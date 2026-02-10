import { WebSocketServer, WebSocket } from "ws";
import { parseMessage, getMessageTypeName } from "@plantos/admin-proto";
import { routeMessage, createStatisticsUpdate } from "./handlers";
import { getZones } from "./mockData";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const BROADCAST_INTERVAL = 5000; // 5 seconds

const clients: Set<WebSocket> = new Set();

function broadcast(data: Uint8Array): void {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function startBroadcasts(): NodeJS.Timeout {
  return setInterval(() => {
    if (clients.size === 0) return;

    const zones = getZones();
    zones.forEach((zone) => {
      const update = createStatisticsUpdate(zone.id);
      broadcast(update);
    });

    console.log(`Broadcasted statistics updates to ${clients.size} client(s)`);
  }, BROADCAST_INTERVAL);
}

function startServer(): void {
  const wss = new WebSocketServer({
    port: PORT,
    path: "/v1/admin",
    handleProtocols: (protocols) => {
      if (protocols.has("plantos-protobuf")) return "plantos-protobuf";
      return false;
    },
  });

  console.log(`🌱 PlantOS Mock Server`);
  console.log(`Listening on ws://localhost:${PORT}/v1/admin`);
  console.log(`Broadcast interval: ${BROADCAST_INTERVAL}ms`);
  console.log("");

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");
    clients.add(ws);

    ws.on("message", (data: Buffer) => {
      try {
        const parsed = parseMessage(data);
        if (!parsed) {
          console.error("Failed to parse message");
          return;
        }

        const { messageType, payload } = parsed;
        const messageName = getMessageTypeName(messageType);
        console.log(`Received: ${messageName} (type=${messageType})`);

        const response = routeMessage(messageType, payload);
        if (response) {
          ws.send(response);
        }
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.delete(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clients.delete(ws);
    });
  });

  const broadcastInterval = startBroadcasts();

  process.on("SIGINT", () => {
    console.log("\nShutting down server...");
    clearInterval(broadcastInterval);
    wss.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    console.log("\nShutting down server...");
    clearInterval(broadcastInterval);
    wss.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
}

startServer();
