import crypto from "crypto";

const HKDF_INFO = "plantos-v1-message-key";
const AES_KEY_SIZE = 32;
const NONCE_SIZE = 12;
const TAG_SIZE = 16;

export interface EncryptedMessage {
  nonce: Buffer;
  ciphertext: Buffer;
  tag: Buffer;
}

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

export function generateSessionId(): Buffer {
  return crypto.randomBytes(16);
}

export function generateNonce(): Buffer {
  return crypto.randomBytes(NONCE_SIZE);
}

export function encryptMessage(
  key: Buffer,
  plaintext: Buffer,
): EncryptedMessage {
  const nonce = generateNonce();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);

  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return { nonce, ciphertext, tag };
}

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

export function encodeEncryptedMessage(
  messageType: number,
  encrypted: EncryptedMessage,
): Uint8Array {
  const totalLength =
    4 +
    encrypted.nonce.length +
    encrypted.ciphertext.length +
    encrypted.tag.length;

  const result = new Uint8Array(totalLength);
  const view = new DataView(result.buffer);

  view.setUint32(0, messageType, true);

  let offset = 4;
  result.set(new Uint8Array(encrypted.nonce), offset);
  offset += encrypted.nonce.length;
  result.set(new Uint8Array(encrypted.ciphertext), offset);
  offset += encrypted.ciphertext.length;
  result.set(new Uint8Array(encrypted.tag), offset);

  return result;
}

export function parseEncryptedMessage(
  data: Buffer | Uint8Array,
): { messageType: number; encrypted: EncryptedMessage } | null {
  const minLength = 4 + NONCE_SIZE + TAG_SIZE;
  if (data.length < minLength) {
    return null;
  }

  const buffer = data instanceof Buffer ? data : Buffer.from(data);

  const messageType = buffer.readUInt32LE(0);

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
    encrypted: { nonce, ciphertext, tag },
  };
}

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
