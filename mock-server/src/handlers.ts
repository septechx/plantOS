import {
  v1,
  common,
  MessageType,
  ErrorCode,
  encodeMessage,
} from "@plantos/admin-proto";
import {
  getZones,
  getZoneById,
  getZoneStatistics,
  getModules,
  getModuleById,
  getCurrentStatistics,
  updateStatistics,
} from "./mockData";

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

const Timestamp = common.protobuf.Timestamp;

export type MessageHandler = (data: Uint8Array) => Uint8Array | null;

function handleHello(data: Uint8Array): Uint8Array {
  const hello = Hello.decode(data);
  console.log(
    `Client connected: protocol=${hello.protocolVersion}, client=${hello.clientVersion}`,
  );

  const welcome = new Welcome();
  welcome.hubId = "mock-hub-001";
  welcome.hubVersion = "1.0.0-mock";
  const now = new Date();
  welcome.serverTimestamp = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

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
    error.requestType = MessageType.MSG_GET_ZONE_REQUEST;
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
    error.requestType = MessageType.MSG_GET_STATISTICS_REQUEST;
    return encodeMessage(
      MessageType.MSG_ERROR_RESPONSE,
      ErrorResponse.encode(error).finish(),
    );
  }

  if (from && to) {
    const fromTime =
      (Number(from.seconds) || 0) * 1000 + (from.nanos || 0) / 1_000_000;
    const toTime =
      (Number(to.seconds) || 0) * 1000 + (to.nanos || 0) / 1_000_000;
    if (fromTime > toTime) {
      const error = new ErrorResponse();
      error.code = ErrorCode.ERROR_CODE_INVALID_TIME_RANGE;
      error.message = "Invalid time range: from is after to";
      error.requestType = MessageType.MSG_GET_STATISTICS_REQUEST;
      return encodeMessage(
        MessageType.MSG_ERROR_RESPONSE,
        ErrorResponse.encode(error).finish(),
      );
    }
  }

  const response = new GetStatisticsResponse();
  response.zoneId = zoneId;

  let statistics = getZoneStatistics(zoneId);

  if (from && to) {
    const fromTime =
      (Number(from.seconds) || 0) * 1000 + (from.nanos || 0) / 1_000_000;
    const toTime =
      (Number(to.seconds) || 0) * 1000 + (to.nanos || 0) / 1_000_000;

    statistics = statistics.filter((s) => {
      if (!s.time) return false;
      const statTime =
        (Number(s.time.seconds) || 0) * 1000 + (s.time.nanos || 0) / 1_000_000;
      return statTime >= fromTime && statTime <= toTime;
    });
  }

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
    error.requestType = MessageType.MSG_GET_MODULE_REQUEST;
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
