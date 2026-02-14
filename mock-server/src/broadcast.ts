import { Session } from "./types";
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

  /**
   * Register a new client connection.
   */
  addClient(session: Session, send: ClientSendFunction): void {
    const sessionKey = session.id.toString("hex");
    this.clients.set(sessionKey, { session, send });
  }

  /**
   * Remove a client connection.
   */
  removeClient(session: Session): void {
    const sessionKey = session.id.toString("hex");
    this.clients.delete(sessionKey);
  }

  /**
   * Broadcast a message to all connected clients.
   * Optionally exclude a specific session.
   */
  broadcast(
    messageType: number,
    payload: Uint8Array,
    excludeSession?: Session,
  ): void {
    const excludeKey = excludeSession?.id.toString("hex");

    for (const [key, client] of this.clients) {
      if (key === excludeKey) continue;

      // Only send to clients that have completed handshake
      if (!client.session.isEncrypted) continue;

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

  /**
   * Send a message to a specific client.
   */
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

  /**
   * Get the number of connected clients.
   */
  getClientCount(): number {
    return this.clients.size;
  }

  /**
   * Get all connected sessions.
   */
  getAllSessions(): Session[] {
    return Array.from(this.clients.values()).map((c) => c.session);
  }
}
