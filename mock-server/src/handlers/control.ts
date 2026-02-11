import { MessageType, ErrorCode, Status } from "@plantos/admin-proto";
import {
  WaterZoneRequest,
  WaterZoneResponse,
  PauseZoneRequest,
  PauseZoneResponse,
  ResumeZoneRequest,
  ResumeZoneResponse,
  Timestamp,
  ZoneUpdateChangeType,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext, ErrorResult } from "../types";
import { broadcastZoneUpdate } from "./zones";

// Default watering duration: 5 minutes
const DEFAULT_WATERING_DURATION_MS = 5 * 60 * 1000;

// Track zones that are currently being watered or are paused
interface ZoneState {
  isWatering: boolean;
  isPaused: boolean;
  wateringTimeout?: NodeJS.Timeout;
}

const zoneStates: Map<number, ZoneState> = new Map();

export function registerControlHandlers(registry: HandlerRegistry): void {
  // WaterZone handler
  registry.register(
    MessageType.MSG_WATER_ZONE_REQUEST,
    WaterZoneRequest,
    WaterZoneResponse,
    (
      request: {
        zoneId: number;
        duration?: { seconds?: number | bigint; nanos?: number } | null;
      },
      context: HandlerContext,
    ) => {
      const { store } = context;
      const zoneId = request.zoneId;

      console.log(`WaterZoneRequest: zoneId=${zoneId}`);

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
          message: `Zone with ID ${zoneId} not found`,
        } as ErrorResult;
      }

      // Check zone state
      const state = getZoneState(zoneId);
      if (state.isWatering) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_BUSY,
          message: `Zone ${zoneId} is already being watered`,
        } as ErrorResult;
      }

      if (state.isPaused) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_BUSY,
          message: `Zone ${zoneId} is paused. Resume before watering.`,
        } as ErrorResult;
      }

      // Check if module is online
      const module = store.getModuleById(zone.moduleId);
      if (!module || module.status === Status.STATUS_OFFLINE) {
        return {
          code: ErrorCode.ERROR_CODE_MODULE_OFFLINE,
          message: `Module controlling zone ${zoneId} is offline`,
        } as ErrorResult;
      }

      // Determine watering duration
      let durationMs = DEFAULT_WATERING_DURATION_MS;
      if (request.duration) {
        const seconds = Number(request.duration.seconds) || 0;
        const nanos = request.duration.nanos || 0;
        durationMs = seconds * 1000 + nanos / 1_000_000;
      }

      // Start watering
      state.isWatering = true;
      zone.status = Status.STATUS_WORKING;
      store.updateZone(zone);

      // Set up automatic completion
      state.wateringTimeout = setTimeout(() => {
        completeWatering(zoneId, context);
      }, durationMs);

      // Broadcast zone update
      broadcastZoneUpdate(
        zoneId,
        zone,
        ZoneUpdateChangeType.CHANGE_TYPE_STATUS,
        context,
      );

      // Build response
      const response = new WaterZoneResponse();
      response.success = true;

      const now = new Date();
      response.startedAt = Timestamp.fromObject({
        seconds: Math.floor(now.getTime() / 1000),
        nanos: (now.getTime() % 1000) * 1_000_000,
      });

      response.duration = {
        seconds: Math.floor(durationMs / 1000),
        nanos: (durationMs % 1000) * 1_000_000,
      };

      console.log(`Started watering zone ${zoneId} for ${durationMs}ms`);
      return response;
    },
  );

  // PauseZone handler
  registry.register(
    MessageType.MSG_PAUSE_ZONE_REQUEST,
    PauseZoneRequest,
    PauseZoneResponse,
    (request: { zoneId: number }, context: HandlerContext) => {
      const { store } = context;
      const zoneId = request.zoneId;

      console.log(`PauseZoneRequest: zoneId=${zoneId}`);

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
          message: `Zone with ID ${zoneId} not found`,
        } as ErrorResult;
      }

      // Check if already paused
      const state = getZoneState(zoneId);
      if (state.isPaused) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_BUSY,
          message: `Zone ${zoneId} is already paused`,
        } as ErrorResult;
      }

      // If currently watering, cancel it
      if (state.isWatering && state.wateringTimeout) {
        clearTimeout(state.wateringTimeout);
        state.isWatering = false;
      }

      // Pause the zone
      const previousStatus = zone.status;
      state.isPaused = true;
      zone.status = Status.STATUS_PAUSED;
      store.updateZone(zone);

      // Broadcast zone update
      broadcastZoneUpdate(
        zoneId,
        zone,
        ZoneUpdateChangeType.CHANGE_TYPE_STATUS,
        context,
      );

      // Build response
      const response = new PauseZoneResponse();
      response.success = true;
      response.previousStatus = previousStatus;

      console.log(`Paused zone ${zoneId}`);
      return response;
    },
  );

  // ResumeZone handler
  registry.register(
    MessageType.MSG_RESUME_ZONE_REQUEST,
    ResumeZoneRequest,
    ResumeZoneResponse,
    (request: { zoneId: number }, context: HandlerContext) => {
      const { store } = context;
      const zoneId = request.zoneId;

      console.log(`ResumeZoneRequest: zoneId=${zoneId}`);

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
          message: `Zone with ID ${zoneId} not found`,
        } as ErrorResult;
      }

      // Check if paused
      const state = getZoneState(zoneId);
      if (!state.isPaused) {
        return {
          code: ErrorCode.ERROR_CODE_INVALID_REQUEST,
          message: `Zone ${zoneId} is not paused`,
        } as ErrorResult;
      }

      // Resume the zone
      state.isPaused = false;
      zone.status = Status.STATUS_IDLE;
      store.updateZone(zone);

      // Broadcast zone update
      broadcastZoneUpdate(
        zoneId,
        zone,
        ZoneUpdateChangeType.CHANGE_TYPE_STATUS,
        context,
      );

      // Build response
      const response = new ResumeZoneResponse();
      response.success = true;

      console.log(`Resumed zone ${zoneId}`);
      return response;
    },
  );
}

// Helper functions

function getZoneState(zoneId: number): ZoneState {
  if (!zoneStates.has(zoneId)) {
    zoneStates.set(zoneId, { isWatering: false, isPaused: false });
  }
  return zoneStates.get(zoneId)!;
}

function completeWatering(zoneId: number, context: HandlerContext): void {
  const { store } = context;
  const state = zoneStates.get(zoneId);

  if (!state || !state.isWatering) return;

  const zone = store.getZoneById(zoneId);
  if (!zone) return;

  // Complete watering
  state.isWatering = false;
  zone.status = Status.STATUS_IDLE;

  // Update last watered time
  const now = new Date();
  zone.lastWatered = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

  store.updateZone(zone);

  // Broadcast zone update
  broadcastZoneUpdate(
    zoneId,
    zone,
    ZoneUpdateChangeType.CHANGE_TYPE_WATERED,
    context,
  );

  console.log(`Completed watering zone ${zoneId}`);
}
