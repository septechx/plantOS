import { MessageType, v1 } from "@plantos/admin-proto";
import {
  ListZonesRequest,
  ListZonesResponse,
  GetZoneRequest,
  GetZoneResponse,
  ZoneUpdate,
  Timestamp,
  ZoneType,
  createErrorResult,
  success,
  failure,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext } from "../types";

const { ErrorCode } = v1;

export function registerZoneHandlers(registry: HandlerRegistry): void {
  // ListZones handler
  registry.register(
    MessageType.MSG_LIST_ZONES_REQUEST,
    ListZonesRequest,
    ListZonesResponse,
    (request: { moduleId?: number | null }, context: HandlerContext) => {
      const { store } = context;
      // Explicit presence check: treat 0 as a valid filter value, only null/undefined means "all"
      const moduleId =
        request.moduleId !== undefined && request.moduleId !== null
          ? request.moduleId
          : null;

      console.log(`ListZonesRequest: moduleId=${moduleId ?? "all"}`);

      const response = new ListZonesResponse();
      let zones = store.getZones();

      if (moduleId !== null) {
        zones = zones.filter((z: ZoneType) => z.moduleId === moduleId);
      }

      response.zones = zones;
      return success(response);
    },
    { responseType: MessageType.MSG_LIST_ZONES_RESPONSE },
  );

  // GetZone handler
  registry.register(
    MessageType.MSG_GET_ZONE_REQUEST,
    GetZoneRequest,
    GetZoneResponse,
    (request: { zoneId: number }, context: HandlerContext) => {
      const { store } = context;
      const zoneId = request.zoneId;

      console.log(`GetZoneRequest: zoneId=${zoneId}`);

      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
            `Zone with ID ${zoneId} not found`,
          ),
        );
      }

      const response = new GetZoneResponse();
      response.zone = zone;
      return success(response);
    },
    { responseType: MessageType.MSG_GET_ZONE_RESPONSE },
  );
}

// Helper function to broadcast zone updates
export function broadcastZoneUpdate(
  zoneId: number,
  zone: ZoneType,
  changeType: number, // ZoneUpdateChangeType enum value
  context: HandlerContext,
): void {
  const { broadcast } = context;

  const update = new ZoneUpdate();
  update.zoneId = zoneId;
  update.zone = zone;
  update.changeType = changeType;

  const now = new Date();
  update.timestamp = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

  const payload = ZoneUpdate.encode(update).finish();
  broadcast(MessageType.MSG_ZONE_UPDATE, payload);
}
