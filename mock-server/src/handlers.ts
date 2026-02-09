import { plantos, google } from "./proto-generated/admin";
import {
  getZones,
  getZoneById,
  getZoneStatistics,
  getModules,
  getModuleById,
  getCurrentStatistics,
  updateStatistics,
} from "./mockData";

const v1 = plantos.admin.v1;

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

export const ErrorCode = {
  ERROR_CODE_UNSPECIFIED: 0,
  ERROR_CODE_INVALID_REQUEST: 1,
  ERROR_CODE_ZONE_NOT_FOUND: 2,
  ERROR_CODE_MODULE_NOT_FOUND: 3,
  ERROR_CODE_ZONE_BUSY: 4,
  ERROR_CODE_MODULE_OFFLINE: 5,
  ERROR_CODE_INTERNAL_ERROR: 6,
  ERROR_CODE_INVALID_TIME_RANGE: 7,
  ERROR_CODE_VERSION_MISMATCH: 8,
} as const;

const {
  Hello,
  Welcome,
  ListZonesRequest,
  ListZonesResponse,
  GetZoneRequest,
  GetZoneResponse,
  ListModulesResponse,
  GetModuleRequest,
  GetModuleResponse,
  GetStatisticsRequest,
  GetStatisticsResponse,
  ErrorResponse,
  StatisticsUpdate,
} = v1;

const Timestamp = google.protobuf.Timestamp;

export type MessageHandler = (data: Uint8Array) => Uint8Array | null;

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

function handleHello(data: Uint8Array): Uint8Array {
  const hello = Hello.decode(data);
  console.log(
    `Client connected: protocol=${hello.protocolVersion}, client=${hello.clientVersion}`,
  );

  const welcome = new Welcome();
  welcome.hubId = "mock-hub-001";
  welcome.hubVersion = "1.0.0-mock";
  welcome.serverTimestamp = Math.floor(Date.now() / 1000);

  return encodeMessage(
    MessageType.MSG_WELCOME,
    Welcome.encode(welcome).finish(),
  );
}

function handleListZonesRequest(data: Uint8Array): Uint8Array {
  const request = ListZonesRequest.decode(data);
  const moduleId = request.moduleId !== undefined ? request.moduleId : null;

  console.log(`ListZonesRequest: moduleId=${moduleId ?? "all"}`);

  const response = new ListZonesResponse();
  const zones = getZones();

  if (moduleId !== null) {
    response.zones = zones.filter((z) => z.moduleId === moduleId);
  } else {
    response.zones = zones;
  }

  return encodeMessage(
    MessageType.MSG_LIST_ZONES_RESPONSE,
    ListZonesResponse.encode(response).finish(),
  );
}

function handleGetZoneRequest(data: Uint8Array): Uint8Array {
  const request = GetZoneRequest.decode(data);
  const zoneId = request.zoneId;

  console.log(`GetZoneRequest: zoneId=${zoneId}`);

  const zone = getZoneById(zoneId);
  if (!zone) {
    const error = new ErrorResponse();
    error.code = ErrorCode.ERROR_CODE_ZONE_NOT_FOUND;
    error.message = `Zone with ID ${zoneId} not found`;
    error.requestType = "GetZoneRequest";
    return encodeMessage(
      MessageType.MSG_ERROR_RESPONSE,
      ErrorResponse.encode(error).finish(),
    );
  }

  const response = new GetZoneResponse();
  response.zone = zone;

  return encodeMessage(
    MessageType.MSG_GET_ZONE_RESPONSE,
    GetZoneResponse.encode(response).finish(),
  );
}

function handleGetStatisticsRequest(data: Uint8Array): Uint8Array {
  const request = GetStatisticsRequest.decode(data);
  const zoneId = request.zoneId;
  const from = request.from;
  const to = request.to;
  const types = request.types || [];
  const aggregation = request.aggregation;

  console.log(
    `GetStatisticsRequest: zoneId=${zoneId}, types=[${types.join(", ")}], aggregation=${aggregation}`,
  );

  const zone = getZoneById(zoneId);
  if (!zone) {
    const error = new ErrorResponse();
    error.code = ErrorCode.ERROR_CODE_ZONE_NOT_FOUND;
    error.message = `Zone with ID ${zoneId} not found`;
    error.requestType = "GetStatisticsRequest";
    return encodeMessage(
      MessageType.MSG_ERROR_RESPONSE,
      ErrorResponse.encode(error).finish(),
    );
  }

  if (from && to) {
    const fromTime = (from.seconds || 0) * 1000 + (from.nanos || 0) / 1_000_000;
    const toTime = (to.seconds || 0) * 1000 + (to.nanos || 0) / 1_000_000;
    if (fromTime > toTime) {
      const error = new ErrorResponse();
      error.code = ErrorCode.ERROR_CODE_INVALID_TIME_RANGE;
      error.message = "Invalid time range: from is after to";
      error.requestType = "GetStatisticsRequest";
      return encodeMessage(
        MessageType.MSG_ERROR_RESPONSE,
        ErrorResponse.encode(error).finish(),
      );
    }
  }

  const response = new GetStatisticsResponse();
  response.zoneId = zoneId;

  let statistics = getZoneStatistics(zoneId);

  if (types.length > 0) {
    statistics = statistics.filter((s) => types.includes(s.type));
  }

  response.statistics = statistics;

  return encodeMessage(
    MessageType.MSG_GET_STATISTICS_RESPONSE,
    GetStatisticsResponse.encode(response).finish(),
  );
}

function handleListModulesRequest(_data: Uint8Array): Uint8Array {
  console.log("ListModulesRequest");

  const response = new ListModulesResponse();
  response.modules = getModules();

  return encodeMessage(
    MessageType.MSG_LIST_MODULES_RESPONSE,
    ListModulesResponse.encode(response).finish(),
  );
}

function handleGetModuleRequest(data: Uint8Array): Uint8Array {
  const request = GetModuleRequest.decode(data);
  const moduleId = request.moduleId;

  console.log(`GetModuleRequest: moduleId=${moduleId}`);

  const module = getModuleById(moduleId);
  if (!module) {
    const error = new ErrorResponse();
    error.code = ErrorCode.ERROR_CODE_MODULE_NOT_FOUND;
    error.message = `Module with ID ${moduleId} not found`;
    error.requestType = "GetModuleRequest";
    return encodeMessage(
      MessageType.MSG_ERROR_RESPONSE,
      ErrorResponse.encode(error).finish(),
    );
  }

  const response = new GetModuleResponse();
  response.module = module;

  return encodeMessage(
    MessageType.MSG_GET_MODULE_RESPONSE,
    GetModuleResponse.encode(response).finish(),
  );
}

export function createStatisticsUpdate(zoneId: number): Uint8Array {
  updateStatistics();

  const update = new StatisticsUpdate();
  update.zoneId = zoneId;
  update.updatedStatistics = getCurrentStatistics(zoneId);

  const now = new Date();
  update.timestamp = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

  return encodeMessage(
    MessageType.MSG_STATISTICS_UPDATE,
    StatisticsUpdate.encode(update).finish(),
  );
}

const handlers: Map<number, MessageHandler> = new Map([
  [MessageType.MSG_HELLO, handleHello],
  [MessageType.MSG_LIST_ZONES_REQUEST, handleListZonesRequest],
  [MessageType.MSG_GET_ZONE_REQUEST, handleGetZoneRequest],
  [MessageType.MSG_GET_STATISTICS_REQUEST, handleGetStatisticsRequest],
  [MessageType.MSG_LIST_MODULES_REQUEST, handleListModulesRequest],
  [MessageType.MSG_GET_MODULE_REQUEST, handleGetModuleRequest],
]);

export function routeMessage(
  messageType: number,
  data: Uint8Array,
): Uint8Array | null {
  const handler = handlers.get(messageType);
  if (handler) {
    return handler(data);
  }

  console.warn(`Unknown message type: ${messageType}`);
  const error = new ErrorResponse();
  error.code = ErrorCode.ERROR_CODE_INVALID_REQUEST;
  error.message = `Unknown message type: ${messageType}`;
  return encodeMessage(
    MessageType.MSG_ERROR_RESPONSE,
    ErrorResponse.encode(error).finish(),
  );
}

export function getMessageTypeName(messageType: number): string {
  const names: { [key: number]: string } = {
    [MessageType.MSG_HELLO]: "Hello",
    [MessageType.MSG_LIST_ZONES_REQUEST]: "ListZonesRequest",
    [MessageType.MSG_GET_ZONE_REQUEST]: "GetZoneRequest",
    [MessageType.MSG_GET_STATISTICS_REQUEST]: "GetStatisticsRequest",
    [MessageType.MSG_LIST_MODULES_REQUEST]: "ListModulesRequest",
    [MessageType.MSG_GET_MODULE_REQUEST]: "GetModuleRequest",
    [MessageType.MSG_WATER_ZONE_REQUEST]: "WaterZoneRequest",
    [MessageType.MSG_PAUSE_ZONE_REQUEST]: "PauseZoneRequest",
    [MessageType.MSG_RESUME_ZONE_REQUEST]: "ResumeZoneRequest",
    [MessageType.MSG_GET_ZONE_SETTINGS_REQUEST]: "GetZoneSettingsRequest",
    [MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST]: "UpdateZoneSettingsRequest",
  };
  return names[messageType] || `Unknown(${messageType})`;
}
