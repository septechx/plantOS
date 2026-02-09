import {
  v1,
  MessageType,
  encodeMessage,
  parseMessage,
  getMessageTypeName,
} from "@plantos/admin-proto";

export { v1, MessageType, encodeMessage, parseMessage, getMessageTypeName };

export function createMessagePrefix(messageType: number): Uint8Array {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, messageType, true);
  return new Uint8Array(buffer);
}
