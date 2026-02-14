import { MessageType, v1 } from "@plantos/admin-proto";
import {
  GetZoneSettingsRequest,
  GetZoneSettingsResponse,
  UpdateZoneSettingsRequest,
  UpdateZoneSettingsResponse,
  ZoneSettings,
  ZoneSettingsType,
  ZoneUpdate,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext, ErrorResult } from "../types";
import { broadcastZoneUpdate } from "./zones";

const { ErrorCode } = v1;

export function registerSettingsHandlers(registry: HandlerRegistry): void {
  // GetZoneSettings handler
  registry.register(
    MessageType.MSG_GET_ZONE_SETTINGS_REQUEST,
    GetZoneSettingsRequest,
    GetZoneSettingsResponse,
    (request: { zoneId: number }, context: HandlerContext) => {
      const { store } = context;
      const zoneId = request.zoneId;

      console.log(`GetZoneSettingsRequest: zoneId=${zoneId}`);

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
          message: `Zone with ID ${zoneId} not found`,
        } as ErrorResult;
      }

      // Get or create settings for this zone
      let settings = store.getZoneSettings(zoneId);

      if (!settings) {
        // Create default settings
        settings = createDefaultSettings(zoneId);
        store.updateZoneSettings(settings);
      }

      const response = new GetZoneSettingsResponse();
      response.settings = settings;
      return response;
    },
  );

  // UpdateZoneSettings handler
  registry.register(
    MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST,
    UpdateZoneSettingsRequest,
    UpdateZoneSettingsResponse,
    (request: { settings?: ZoneSettingsType }, context: HandlerContext) => {
      const { store } = context;

      if (!request.settings) {
        return {
          code: ErrorCode.ERROR_CODE_INVALID_REQUEST,
          message: "Settings are required",
        } as ErrorResult;
      }

      const zoneId = request.settings.zoneId;
      console.log(`UpdateZoneSettingsRequest: zoneId=${zoneId}`);

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
          message: `Zone with ID ${zoneId} not found`,
        } as ErrorResult;
      }

      // Validate thresholds
      const thresholds = request.settings.thresholds;
      if (thresholds) {
        const minTemp = thresholds.minTemperature;
        const maxTemp = thresholds.maxTemperature;
        if (
          minTemp !== null &&
          minTemp !== undefined &&
          maxTemp !== null &&
          maxTemp !== undefined &&
          minTemp > maxTemp
        ) {
          return {
            code: ErrorCode.ERROR_CODE_INVALID_REQUEST,
            message: "min_temperature cannot be greater than max_temperature",
          } as ErrorResult;
        }

        const minMoisture = thresholds.minSoilMoisture;
        const maxMoisture = thresholds.maxSoilMoisture;
        if (
          minMoisture !== null &&
          minMoisture !== undefined &&
          maxMoisture !== null &&
          maxMoisture !== undefined &&
          minMoisture > maxMoisture
        ) {
          return {
            code: ErrorCode.ERROR_CODE_INVALID_REQUEST,
            message:
              "min_soil_moisture cannot be greater than max_soil_moisture",
          } as ErrorResult;
        }
      }

      // Update settings
      const existingSettings = store.getZoneSettings(zoneId);
      const updatedSettings = mergeSettings(
        existingSettings || createDefaultSettings(zoneId),
        request.settings,
      );

      store.updateZoneSettings(updatedSettings);

      // Broadcast zone update
      broadcastZoneUpdate(
        zoneId,
        zone,
        ZoneUpdate.ChangeType.CHANGE_TYPE_SETTINGS,
        context,
      );

      // Build response
      const response = new UpdateZoneSettingsResponse();
      response.success = true;
      response.updatedSettings = updatedSettings;

      console.log(`Updated settings for zone ${zoneId}`);
      return response;
    },
  );
}

// Helper functions

function createDefaultSettings(zoneId: number): ZoneSettingsType {
  const settings = new ZoneSettings();
  settings.zoneId = zoneId;

  // Default thresholds
  const thresholds = new ZoneSettings.Thresholds();
  thresholds.minTemperature = 18;
  thresholds.maxTemperature = 28;
  thresholds.minSoilMoisture = 20;
  thresholds.maxSoilMoisture = 80;
  settings.thresholds = thresholds;

  // Default notifications
  settings.notifyOnError = true;
  settings.notifyOnLowBattery = true;

  return settings;
}

function mergeSettings(
  existing: ZoneSettingsType,
  updates: ZoneSettingsType,
): ZoneSettingsType {
  const merged = new ZoneSettings();
  merged.zoneId = existing.zoneId;

  // Merge thresholds
  if (updates.thresholds) {
    const thresholds = new ZoneSettings.Thresholds();
    thresholds.minTemperature =
      updates.thresholds.minTemperature ??
      existing.thresholds?.minTemperature ??
      18;
    thresholds.maxTemperature =
      updates.thresholds.maxTemperature ??
      existing.thresholds?.maxTemperature ??
      28;
    thresholds.minSoilMoisture =
      updates.thresholds.minSoilMoisture ??
      existing.thresholds?.minSoilMoisture ??
      20;
    thresholds.maxSoilMoisture =
      updates.thresholds.maxSoilMoisture ??
      existing.thresholds?.maxSoilMoisture ??
      80;
    merged.thresholds = thresholds;
  } else {
    merged.thresholds = existing.thresholds;
  }

  // Merge notification settings
  merged.notifyOnError =
    updates.notifyOnError ?? existing.notifyOnError ?? true;
  merged.notifyOnLowBattery =
    updates.notifyOnLowBattery ?? existing.notifyOnLowBattery ?? true;

  return merged;
}
