import { Session } from "./types";
import { SessionManager } from "./session";
import {
  encodeEncryptedMessage,
  encryptMessage,
  encodeUnencryptedMessage,
} from "@plantos/admin-proto";

export type ClientSendFunction = (data: Uint8Array) => void;

interface Client {
  session: Session;
  send: ClientSendFunction;
}

export class BroadcastManager {
  private clients: Map<string, Client> = new Map();
  private sessionManager: SessionManager;

  constructor(sessionManager: SessionManager) {
    this.sessionManager = sessionManager;
  }

  addClient(session: Session, send: ClientSendFunction): void {
    const sessionKey = session.id.toString("hex");
    this.clients.set(sessionKey, { session, send });
  }

  removeClient(session: Session): void {
    const sessionKey = session.id.toString("hex");
    this.clients.delete(sessionKey);
  }

  broadcast(
    messageType: number,
    payload: Uint8Array,
    excludeSession?: Session,
  ): void {
    const excludeKey = excludeSession?.id.toString("hex");

    for (const [key, client] of this.clients) {
      if (key === excludeKey) continue;

      if (!client.session.isEncrypted) continue;

      if (!this.sessionManager.incrementMessageCount(client.session)) {
        console.error(
          `Session ${key} message limit exceeded, skipping broadcast`,
        );
        continue;
      }

      try {
        const encrypted = encryptMessage(
          client.session.derivedKey,
          Buffer.from(payload),
        );
        const message = encodeEncryptedMessage(messageType, encrypted);
        client.send(message);
      } catch (error) {
        console.error(`Failed to send broadcast to client ${key}:`, error);
      }
    }
  }

  sendTo(session: Session, messageType: number, payload: Uint8Array): void {
    const sessionKey = session.id.toString("hex");
    const client = this.clients.get(sessionKey);

    if (!client) {
      console.warn(`Client ${sessionKey} not found`);
      return;
    }

    try {
      let message: Uint8Array;

      if (session.isEncrypted) {
        if (!this.sessionManager.incrementMessageCount(session)) {
          console.error(`Session ${sessionKey} message limit exceeded`);
          return;
        }

        const encrypted = encryptMessage(
          session.derivedKey,
          Buffer.from(payload),
        );
        message = encodeEncryptedMessage(messageType, encrypted);
      } else {
        message = encodeUnencryptedMessage(messageType, payload);
      }

      client.send(message);
    } catch (error) {
      console.error(`Failed to send message to client ${sessionKey}:`, error);
    }
  }

  getClientCount(): number {
    return this.clients.size;
  }

  getAllSessions(): Session[] {
    return Array.from(this.clients.values()).map((c) => c.session);
  }
}
