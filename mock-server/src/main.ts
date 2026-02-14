import { createDefaultMockServer } from "./server";

const server = createDefaultMockServer({
  port: parseInt(process.env.PORT || "8080", 10),
});

server.start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
