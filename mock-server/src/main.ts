import { createDefaultMockServer } from "./server";

const port = parseInt(process.env.PORT || "8080", 10);
if (Number.isNaN(port) || port < 0 || port > 65535) {
  console.error(`Invalid PORT: ${process.env.PORT}`);
  process.exit(1);
}

const server = createDefaultMockServer({ port });

server.start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
