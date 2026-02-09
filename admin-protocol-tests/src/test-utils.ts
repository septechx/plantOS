import WebSocket from "ws";
import {
  MessageType,
  encodeMessage,
  parseMessage,
  getMessageTypeName,
  v1,
} from "./handlers";

const { Hello, Welcome } = v1;

const PORT = 8080;
const URL = `ws://localhost:${PORT}/v1/admin`;

export class TestClient {
  ws: WebSocket;
  messageQueue: { type: number; payload: Uint8Array }[] = [];
  messageWaiters: { type: number; resolve: (payload: Uint8Array) => void }[] =
    [];
  isConnected: boolean = false;

  constructor() {
    this.ws = new WebSocket(URL);
    this.ws.on("open", () => {
      this.isConnected = true;
    });
    this.ws.on("message", (data: Buffer) => this.handleMessage(data));
    this.ws.on("error", (err) => console.error("WS Error:", err));
  }

  async connect(): Promise<void> {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Connection timeout")),
        5000,
      );
      this.ws.once("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.ws.once("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }

  close() {
    this.ws.close();
  }

  send(type: number, message: any, encoder: any) {
    const payload = encoder.encode(message).finish();
    this.ws.send(encodeMessage(type, payload));
  }

  handleMessage(data: Buffer) {
    const parsed = parseMessage(data);
    if (!parsed) return;

    // Check if anyone is waiting for this message type
    const waiterIndex = this.messageWaiters.findIndex(
      (w) => w.type === parsed.messageType,
    );
    if (waiterIndex !== -1) {
      const waiter = this.messageWaiters[waiterIndex];
      this.messageWaiters.splice(waiterIndex, 1);
      waiter.resolve(parsed.payload);
    } else {
      this.messageQueue.push({
        type: parsed.messageType,
        payload: parsed.payload,
      });
    }
  }

  async waitForMessage(
    expectedType: number,
    timeoutMs: number = 5000,
  ): Promise<Uint8Array> {
    // Check queue first
    const queuedIndex = this.messageQueue.findIndex(
      (m) => m.type === expectedType,
    );
    if (queuedIndex !== -1) {
      const msg = this.messageQueue[queuedIndex];
      this.messageQueue.splice(queuedIndex, 1);
      return msg.payload;
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        // Remove waiter on timeout
        const index = this.messageWaiters.findIndex(
          (w) => w.type === expectedType,
        );
        if (index !== -1) {
          this.messageWaiters.splice(index, 1);
        }
        reject(
          new Error(
            `Timeout waiting for message type ${getMessageTypeName(expectedType)}`,
          ),
        );
      }, timeoutMs);

      this.messageWaiters.push({
        type: expectedType,
        resolve: (payload) => {
          clearTimeout(timeout);
          resolve(payload);
        },
      });
    });
  }

  async handshake() {
    const hello = Hello.create({
      protocolVersion: "1.0",
      clientVersion: "test-client-1.0",
    });
    this.send(MessageType.MSG_HELLO, hello, Hello);

    const payload = await this.waitForMessage(MessageType.MSG_WELCOME);
    return Welcome.decode(payload);
  }
}
