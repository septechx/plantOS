import { Session } from "./types";
import { deriveSessionKey, generateSessionId } from "./encryption";

export class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private encryptionKey: Buffer;

  constructor(encryptionKey: Buffer) {
    if (encryptionKey.length !== 32) {
      throw new Error("Encryption key must be 32 bytes");
    }
    this.encryptionKey = encryptionKey;
  }

  /**
   * Create a new session for a client.
   */
  createSession(): Session {
    const sessionId = generateSessionId();
    const derivedKey = deriveSessionKey(this.encryptionKey, sessionId);

    const session: Session = {
      id: sessionId,
      derivedKey,
      messageCount: 0,
      connectedAt: new Date(),
      lastActivity: new Date(),
      isEncrypted: false, // Starts unencrypted, becomes encrypted after Welcome
    };

    const sessionKey = sessionId.toString("hex");
    this.sessions.set(sessionKey, session);

    return session;
  }

  /**
   * Get a session by its ID.
   */
  getSession(sessionId: Buffer): Session | undefined {
    const sessionKey = sessionId.toString("hex");
    return this.sessions.get(sessionKey);
  }

  /**
   * Mark a session as encrypted (after Welcome is sent).
   */
  enableEncryption(session: Session): void {
    session.isEncrypted = true;
    session.lastActivity = new Date();
  }

  /**
   * Increment message count for a session.
   * Returns false if session has reached max messages (2^32).
   */
  incrementMessageCount(session: Session): boolean {
    if (session.messageCount >= 0xffffffff) {
      return false;
    }
    session.messageCount++;
    session.lastActivity = new Date();
    return true;
  }

  /**
   * Remove a session.
   */
  removeSession(session: Session): void {
    const sessionKey = session.id.toString("hex");
    this.sessions.delete(sessionKey);
  }

  /**
   * Get all active sessions.
   */
  getAllSessions(): Session[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Get the count of active sessions.
   */
  getSessionCount(): number {
    return this.sessions.size;
  }

  /**
   * Clean up expired sessions (optional housekeeping).
   */
  cleanupExpiredSessions(maxAgeMs: number): number {
    const now = Date.now();
    let removed = 0;

    for (const [key, session] of this.sessions) {
      const age = now - session.lastActivity.getTime();
      if (age > maxAgeMs) {
        this.sessions.delete(key);
        removed++;
      }
    }

    return removed;
  }
}
