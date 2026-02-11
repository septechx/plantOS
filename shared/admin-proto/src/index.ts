import { plantos, google } from "./proto-generated/admin";

export { plantos, google } from "./proto-generated/admin";

export import v1 = plantos.admin.v1;
export import common = google;

export const MessageType = {
  MSG_HELLO: 1,
  MSG_LIST_MODULES_REQUEST: 2,
  MSG_GET_MODULE_REQUEST: 3,
  MSG_LIST_ZONES_REQUEST: 4,
  MSG_GET_ZONE_REQUEST: 5,
  MSG_GET_STATISTICS_REQUEST: 6,
  MSG_WATER_ZONE_REQUEST: 7,
  MSG_PAUSE_ZONE_REQUEST: 8,
  MSG_RESUME_ZONE_REQUEST: 9,
  MSG_GET_ZONE_SETTINGS_REQUEST: 10,
  MSG_UPDATE_ZONE_SETTINGS_REQUEST: 11,
  MSG_WELCOME: 1001,
  MSG_LIST_MODULES_RESPONSE: 1002,
  MSG_GET_MODULE_RESPONSE: 1003,
  MSG_LIST_ZONES_RESPONSE: 1004,
  MSG_GET_ZONE_RESPONSE: 1005,
  MSG_GET_STATISTICS_RESPONSE: 1006,
  MSG_WATER_ZONE_RESPONSE: 1007,
  MSG_PAUSE_ZONE_RESPONSE: 1008,
  MSG_RESUME_ZONE_RESPONSE: 1009,
  MSG_GET_ZONE_SETTINGS_RESPONSE: 1010,
  MSG_UPDATE_ZONE_SETTINGS_RESPONSE: 1011,
  MSG_ZONE_UPDATE: 2001,
  MSG_MODULE_UPDATE: 2002,
  MSG_STATISTICS_UPDATE: 2003,
  MSG_ERROR_RESPONSE: 3001,
} as const;

export type MessageTypeValue = (typeof MessageType)[keyof typeof MessageType];

const MESSAGE_TYPE_NAMES: { [key: number]: string } = {
  [MessageType.MSG_HELLO]: "Hello",
  [MessageType.MSG_LIST_MODULES_REQUEST]: "ListModulesRequest",
  [MessageType.MSG_GET_MODULE_REQUEST]: "GetModuleRequest",
  [MessageType.MSG_LIST_ZONES_REQUEST]: "ListZonesRequest",
  [MessageType.MSG_GET_ZONE_REQUEST]: "GetZoneRequest",
  [MessageType.MSG_GET_STATISTICS_REQUEST]: "GetStatisticsRequest",
  [MessageType.MSG_WATER_ZONE_REQUEST]: "WaterZoneRequest",
  [MessageType.MSG_PAUSE_ZONE_REQUEST]: "PauseZoneRequest",
  [MessageType.MSG_RESUME_ZONE_REQUEST]: "ResumeZoneRequest",
  [MessageType.MSG_GET_ZONE_SETTINGS_REQUEST]: "GetZoneSettingsRequest",
  [MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST]: "UpdateZoneSettingsRequest",
  [MessageType.MSG_WELCOME]: "Welcome",
  [MessageType.MSG_LIST_MODULES_RESPONSE]: "ListModulesResponse",
  [MessageType.MSG_GET_MODULE_RESPONSE]: "GetModuleResponse",
  [MessageType.MSG_LIST_ZONES_RESPONSE]: "ListZonesResponse",
  [MessageType.MSG_GET_ZONE_RESPONSE]: "GetZoneResponse",
  [MessageType.MSG_GET_STATISTICS_RESPONSE]: "GetStatisticsResponse",
  [MessageType.MSG_WATER_ZONE_RESPONSE]: "WaterZoneResponse",
  [MessageType.MSG_PAUSE_ZONE_RESPONSE]: "PauseZoneResponse",
  [MessageType.MSG_RESUME_ZONE_RESPONSE]: "ResumeZoneResponse",
  [MessageType.MSG_GET_ZONE_SETTINGS_RESPONSE]: "GetZoneSettingsResponse",
  [MessageType.MSG_UPDATE_ZONE_SETTINGS_RESPONSE]: "UpdateZoneSettingsResponse",
  [MessageType.MSG_ZONE_UPDATE]: "ZoneUpdate",
  [MessageType.MSG_MODULE_UPDATE]: "ModuleUpdate",
  [MessageType.MSG_STATISTICS_UPDATE]: "StatisticsUpdate",
  [MessageType.MSG_ERROR_RESPONSE]: "ErrorResponse",
};

export function createMessagePrefix(messageType: number): Uint8Array {
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, messageType, true);
  return new Uint8Array(buffer);
}

export function encodeMessage(
  messageType: number,
  payload: Uint8Array,
): Uint8Array {
  const prefix = createMessagePrefix(messageType);
  const combined = new Uint8Array(prefix.length + payload.length);
  combined.set(prefix, 0);
  combined.set(payload, prefix.length);
  return combined;
}

export function parseMessage(
  data: Buffer | Uint8Array,
): { messageType: number; payload: Uint8Array } | null {
  if (data.length < 4) {
    return null;
  }

  let messageType: number;
  if (data instanceof Buffer) {
    messageType = data.readUInt32LE(0);
  } else {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    messageType = view.getUint32(0, true);
  }

  const payload = new Uint8Array(data.slice(4));

  return { messageType, payload };
}

export function getMessageTypeName(messageType: number): string {
  return MESSAGE_TYPE_NAMES[messageType] || `Unknown(${messageType})`;
}

// Re-export enums for easier access
export const Status = v1.Status;
export const StatisticType = v1.StatisticType;
export const ErrorCode = v1.ErrorCode;
