import WebSocket from "ws";
import { MessageType, getMessageTypeName, v1 } from "@plantos/admin-proto";
import {
  deriveSessionKey,
  encryptMessage,
  decryptMessage,
  encodeEncryptedMessage,
  parseEncryptedMessage,
  encodeUnencryptedMessage,
  parseUnencryptedMessage,
} from "@plantos/admin-proto";

const MESSAGE_LIMIT = 0x100000000;

export interface TestClientConfig {
  encryptionKey: Buffer;
  url?: string;
  port?: number;
}

export class TestClient {
  ws: WebSocket | undefined;
  messageQueue: { type: number; payload: Uint8Array }[] = [];
  messageWaiters: { type: number; resolve: (payload: Uint8Array) => void }[] =
    [];

  private encryptionKey: Buffer;
  private url: string;
  private derivedKey: Buffer | null = null;
  private isEncrypted: boolean = false;
  private sendMessageCount: number = 0;
  private recvMessageCount: number = 0;

  constructor(config: TestClientConfig) {
    if (config.encryptionKey.length !== 32) {
      throw new Error("Encryption key must be 32 bytes");
    }
    this.encryptionKey = config.encryptionKey;
    if (config.url) {
      this.url = config.url;
    } else if (config.port) {
      this.url = `ws://localhost:${config.port}`;
    } else {
      this.url = "ws://localhost:8080";
    }
  }

  async connect(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    if (
      this.ws &&
      this.ws.readyState !== WebSocket.CLOSED &&
      this.ws.readyState !== WebSocket.CLOSING
    ) {
      if (this.ws.readyState === WebSocket.CONNECTING) {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(
            () => reject(new Error("Connection timeout")),
            5000,
          );
          this.ws!.once("open", () => {
            clearTimeout(timeout);
            resolve();
          });
          this.ws!.once("error", (err) => {
            clearTimeout(timeout);
            reject(err);
          });
        });
      }
    }

    if (this.ws) {
      this.ws.removeAllListeners();
    }

    this.ws = new WebSocket(this.url);
    this.ws.on("message", (data: Buffer) => this.handleMessage(data));
    this.ws.on("error", (err) => console.error("WS Error:", err));
    this.ws.on("close", () => this.handleClose());

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Connection timeout")),
        5000,
      );
      this.ws!.once("open", () => {
        clearTimeout(timeout);
        resolve();
      });
      this.ws!.once("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
  }

  // Looks like duplicated code, but it's intentional
  close() {
    this.ws?.close();
    this.messageQueue = [];
    this.messageWaiters = [];
    this.derivedKey = null;
    this.isEncrypted = false;
    this.sendMessageCount = 0;
    this.recvMessageCount = 0;
  }

  private handleClose() {
    this.messageQueue = [];
    this.messageWaiters = [];
    this.derivedKey = null;
    this.isEncrypted = false;
    this.sendMessageCount = 0;
    this.recvMessageCount = 0;
  }

  send<T>(
    type: number,
    message: T,
    encoder: { encode(msg: T): { finish(): Uint8Array } },
  ): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket not connected or not open");
    }

    if (this.isEncrypted) {
      if (this.sendMessageCount >= MESSAGE_LIMIT) {
        throw new Error("Session message limit exceeded (2^32 messages)");
      }

      const payload = encoder.encode(message).finish();
      const encrypted = encryptMessage(this.derivedKey!, Buffer.from(payload));
      const encoded = encodeEncryptedMessage(type, encrypted);

      this.ws.send(encoded);
      this.sendMessageCount++;
    } else {
      const payload = encoder.encode(message).finish();
      const encoded = encodeUnencryptedMessage(type, payload);
      this.ws.send(encoded);
    }
  }

  private handleMessage(data: Buffer) {
    let messageType: number;
    let payload: Uint8Array;

    if (this.isEncrypted) {
      if (this.recvMessageCount >= MESSAGE_LIMIT) {
        console.error("Session message limit exceeded");
        this.close();
        return;
      }

      const parsed = parseEncryptedMessage(data);
      if (!parsed) {
        console.error("Failed to parse encrypted message");
        return;
      }

      try {
        payload = decryptMessage(this.derivedKey!, parsed.encrypted);
        messageType = parsed.messageType;
      } catch (error) {
        console.error("Failed to decrypt message:", error);
        return;
      }

      this.recvMessageCount++;
    } else {
      const parsed = parseUnencryptedMessage(data);
      if (!parsed) {
        console.error("Failed to parse unencrypted message");
        return;
      }

      messageType = parsed.messageType;
      payload = parsed.payload;
    }

    const waiterIndex = this.messageWaiters.findIndex(
      (w) => w.type === messageType,
    );
    if (waiterIndex !== -1) {
      const waiter = this.messageWaiters[waiterIndex];
      this.messageWaiters.splice(waiterIndex, 1);
      waiter.resolve(payload);
    } else {
      this.messageQueue.push({
        type: messageType,
        payload,
      });
    }
  }

  async waitForMessage(
    expectedType: number,
    timeoutMs: number = 5000,
  ): Promise<Uint8Array> {
    const queuedIndex = this.messageQueue.findIndex(
      (m) => m.type === expectedType,
    );
    if (queuedIndex !== -1) {
      const msg = this.messageQueue[queuedIndex];
      this.messageQueue.splice(queuedIndex, 1);
      return msg.payload;
    }

    return new Promise((resolve, reject) => {
      const waiter = {
        type: expectedType,
        resolve: (payload: Uint8Array) => {
          clearTimeout(timeout);
          resolve(payload);
        },
      };

      const timeout = setTimeout(() => {
        const index = this.messageWaiters.findIndex((w) => w === waiter);
        if (index !== -1) {
          this.messageWaiters.splice(index, 1);
        }
        reject(
          new Error(
            `Timeout waiting for message type ${getMessageTypeName(expectedType)}`,
          ),
        );
      }, timeoutMs);

      this.messageWaiters.push(waiter);
    });
  }

  async handshake(): Promise<v1.Welcome> {
    const hello = v1.Hello.create({
      protocolVersion: "1.0",
      clientVersion: "test-client-1.0",
    });

    this.send(MessageType.MSG_HELLO, hello, v1.Hello);

    const payload = await this.waitForMessage(MessageType.MSG_WELCOME);
    const welcome = v1.Welcome.decode(payload);

    if (!welcome.sessionId || welcome.sessionId.length !== 16) {
      throw new Error("Invalid session ID received from server");
    }

    this.derivedKey = deriveSessionKey(
      this.encryptionKey,
      Buffer.from(welcome.sessionId),
    );
    this.isEncrypted = true;
    this.sendMessageCount = 0;
    this.recvMessageCount = 0;

    return welcome;
  }

  getSessionInfo(): {
    isEncrypted: boolean;
    sendMessageCount: number;
    recvMessageCount: number;
    hasDerivedKey: boolean;
    derivedKeyHash: string | null;
  } {
    return {
      isEncrypted: this.isEncrypted,
      sendMessageCount: this.sendMessageCount,
      recvMessageCount: this.recvMessageCount,
      hasDerivedKey: this.derivedKey !== null,
      derivedKeyHash:
        this.derivedKey !== null
          ? this.derivedKey.subarray(0, 8).toString("hex")
          : null,
    };
  }
}
