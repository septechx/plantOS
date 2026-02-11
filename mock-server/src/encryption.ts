import crypto from "crypto";
import { EncryptedMessage } from "./types";

const HKDF_INFO = "plantos-v1-message-key";
const AES_KEY_SIZE = 32; // 256 bits
const NONCE_SIZE = 12; // 96 bits for GCM
const TAG_SIZE = 16; // 128 bits

/**
 * Derive a session key using HKDF-SHA256 as per protocol spec.
 *
 * derived_key = HKDF-SHA256(
 *     ikm: encryption_key,
 *     salt: session_id,
 *     info: "plantos-v1-message-key",
 *     length: 32
 * )
 */
export function deriveSessionKey(
  encryptionKey: Buffer,
  sessionId: Buffer,
): Buffer {
  const result = crypto.hkdfSync(
    "sha256",
    encryptionKey,
    sessionId,
    HKDF_INFO,
    AES_KEY_SIZE,
  );
  return Buffer.from(result);
}

/**
 * Generate a random session ID (16 bytes = 128 bits).
 */
export function generateSessionId(): Buffer {
  return crypto.randomBytes(16);
}

/**
 * Generate a random nonce (12 bytes = 96 bits).
 */
export function generateNonce(): Buffer {
  return crypto.randomBytes(NONCE_SIZE);
}

/**
 * Encrypt a message using AES-256-GCM.
 *
 * Format:
 * - 12 bytes: Nonce
 * - N bytes: Ciphertext
 * - 16 bytes: GCM authentication tag
 */
export function encryptMessage(
  key: Buffer,
  plaintext: Buffer,
): EncryptedMessage {
  const nonce = generateNonce();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);

  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

  const tag = cipher.getAuthTag();

  return {
    nonce,
    ciphertext,
    tag,
  };
}

/**
 * Decrypt a message using AES-256-GCM.
 *
 * Throws if authentication fails.
 */
export function decryptMessage(
  key: Buffer,
  encrypted: EncryptedMessage,
): Buffer {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, encrypted.nonce);

  decipher.setAuthTag(encrypted.tag);

  const plaintext = Buffer.concat([
    decipher.update(encrypted.ciphertext),
    decipher.final(),
  ]);

  return plaintext;
}

/**
 * Encode an encrypted message into wire format:
 * - 4 bytes: Message type (uint32, little-endian)
 * - 12 bytes: Nonce
 * - N bytes: Ciphertext
 * - 16 bytes: GCM tag
 */
export function encodeEncryptedMessage(
  messageType: number,
  encrypted: EncryptedMessage,
): Uint8Array {
  const totalLength =
    4 + // message type
    encrypted.nonce.length +
    encrypted.ciphertext.length +
    encrypted.tag.length;

  const result = new Uint8Array(totalLength);
  const view = new DataView(result.buffer);

  // Write message type (little-endian)
  view.setUint32(0, messageType, true);

  // Write nonce, ciphertext, tag
  let offset = 4;
  result.set(new Uint8Array(encrypted.nonce), offset);
  offset += encrypted.nonce.length;
  result.set(new Uint8Array(encrypted.ciphertext), offset);
  offset += encrypted.ciphertext.length;
  result.set(new Uint8Array(encrypted.tag), offset);

  return result;
}

/**
 * Parse an encrypted message from wire format.
 *
 * Format:
 * - 4 bytes: Message type (uint32, little-endian)
 * - 12 bytes: Nonce
 * - N bytes: Ciphertext
 * - 16 bytes: GCM tag
 */
export function parseEncryptedMessage(
  data: Buffer | Uint8Array,
): { messageType: number; encrypted: EncryptedMessage } | null {
  const minLength = 4 + NONCE_SIZE + 1 + TAG_SIZE;
  if (data.length < minLength) {
    return null;
  }

  const buffer = data instanceof Buffer ? data : Buffer.from(data);

  // Read message type (little-endian)
  const messageType = buffer.readUInt32LE(0);

  // Extract nonce, ciphertext, tag
  let offset = 4;
  const nonce = buffer.subarray(offset, offset + NONCE_SIZE);
  offset += NONCE_SIZE;

  const ciphertextLength = buffer.length - offset - TAG_SIZE;
  if (ciphertextLength < 0) {
    return null;
  }

  const ciphertext = buffer.subarray(offset, offset + ciphertextLength);
  offset += ciphertextLength;

  const tag = buffer.subarray(offset, offset + TAG_SIZE);

  return {
    messageType,
    encrypted: {
      nonce,
      ciphertext,
      tag,
    },
  };
}

/**
 * Encode an unencrypted message (for handshake phase).
 * Format:
 * - 4 bytes: Message type (uint32, little-endian)
 * - N bytes: Protobuf payload
 */
export function encodeUnencryptedMessage(
  messageType: number,
  payload: Uint8Array,
): Uint8Array {
  const result = new Uint8Array(4 + payload.length);
  const view = new DataView(result.buffer);

  view.setUint32(0, messageType, true);
  result.set(payload, 4);

  return result;
}

/**
 * Parse an unencrypted message (for handshake phase).
 */
export function parseUnencryptedMessage(
  data: Buffer | Uint8Array,
): { messageType: number; payload: Uint8Array } | null {
  if (data.length < 4) {
    return null;
  }

  const buffer = data instanceof Buffer ? data : Buffer.from(data);
  const messageType = buffer.readUInt32LE(0);
  const payload = new Uint8Array(buffer.subarray(4));

  return { messageType, payload };
}
