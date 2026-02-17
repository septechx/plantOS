import { MessageType, v1 } from "@plantos/admin-proto";
import {
  GetZoneSettingsRequest,
  GetZoneSettingsResponse,
  UpdateZoneSettingsRequest,
  UpdateZoneSettingsResponse,
  ZoneSettings,
  ZoneSettingsType,
  ZoneUpdate,
  createErrorResult,
  success,
  failure,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext } from "../types";
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
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
            `Zone with ID ${zoneId} not found`,
          ),
        );
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
      return success(response);
    },
    { responseType: MessageType.MSG_GET_ZONE_SETTINGS_RESPONSE },
  );

  // UpdateZoneSettings handler
  registry.register(
    MessageType.MSG_UPDATE_ZONE_SETTINGS_REQUEST,
    UpdateZoneSettingsRequest,
    UpdateZoneSettingsResponse,
    (request: { settings?: ZoneSettingsType }, context: HandlerContext) => {
      const { store } = context;

      if (!request.settings) {
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_INVALID_REQUEST,
            "Settings are required",
          ),
        );
      }

      const zoneId = request.settings.zoneId;
      console.log(`UpdateZoneSettingsRequest: zoneId=${zoneId}`);

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
            `Zone with ID ${zoneId} not found`,
          ),
        );
      }

      // Update settings
      const existingSettings = store.getZoneSettings(zoneId);
      const updatedSettings = mergeSettings(
        existingSettings || createDefaultSettings(zoneId),
        request.settings,
      );

      // Validate merged thresholds (check after merge to catch inversions)
      const mergedThresholds = updatedSettings.thresholds;
      if (mergedThresholds) {
        const minTemp = mergedThresholds.minTemperature;
        const maxTemp = mergedThresholds.maxTemperature;
        if (
          minTemp !== null &&
          minTemp !== undefined &&
          maxTemp !== null &&
          maxTemp !== undefined &&
          minTemp > maxTemp
        ) {
          return failure(
            createErrorResult(
              ErrorCode.ERROR_CODE_INVALID_REQUEST,
              "min_temperature cannot be greater than max_temperature",
            ),
          );
        }

        const minMoisture = mergedThresholds.minSoilMoisture;
        const maxMoisture = mergedThresholds.maxSoilMoisture;
        if (
          minMoisture !== null &&
          minMoisture !== undefined &&
          maxMoisture !== null &&
          maxMoisture !== undefined &&
          minMoisture > maxMoisture
        ) {
          return failure(
            createErrorResult(
              ErrorCode.ERROR_CODE_INVALID_REQUEST,
              "min_soil_moisture cannot be greater than max_soil_moisture",
            ),
          );
        }
      }

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
      return success(response);
    },
    { responseType: MessageType.MSG_UPDATE_ZONE_SETTINGS_RESPONSE },
  );
}

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
  updates: Partial<ZoneSettingsType>,
): ZoneSettingsType {
  const merged = new ZoneSettings();
  Object.assign(merged, existing);

  if ("thresholds" in updates) {
    const up = updates.thresholds!;
    const ex = existing.thresholds ?? {};
    const defaults: Record<(typeof keys)[number], number> = {
      minTemperature: 18,
      maxTemperature: 28,
      minSoilMoisture: 20,
      maxSoilMoisture: 80,
    } as const;
    const keys = [
      "minTemperature",
      "maxTemperature",
      "minSoilMoisture",
      "maxSoilMoisture",
    ] as const;

    const thresholds = new ZoneSettings.Thresholds();
    for (const k of keys) {
      thresholds[k] = up?.[k] ?? ex[k] ?? defaults[k];
    }

    merged.thresholds = thresholds;
  }

  if ("notifyOnError" in updates) {
    merged.notifyOnError = updates.notifyOnError!;
  }
  if ("notifyOnLowBattery" in updates) {
    merged.notifyOnLowBattery = updates.notifyOnLowBattery!;
  }

  return merged;
}
