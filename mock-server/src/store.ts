import { v1, common, StatisticType } from "@plantos/admin-proto";
import {
  DataStore,
  ZoneDefinition,
  ModuleDefinition,
  StatisticDefinition,
  ZoneType,
  ModuleType,
  StatisticTypeObj,
} from "./types";

const Timestamp = common.protobuf.Timestamp;

// Default statistic ranges
const DEFAULT_STATISTICS: Record<string, StatisticDefinition> = {
  temperature: { min: 18, max: 28, current: 22, variance: 0.5 },
  humidity: { min: 20, max: 85, current: 50, variance: 3 },
  light: { min: 200, max: 2500, current: 1000, variance: 100 },
  soilMoisture: { min: 10, max: 90, current: 60, variance: 5 },
};

// In-memory storage
interface Storage {
  zones: Map<number, ZoneDefinition>;
  modules: Map<number, ModuleDefinition>;
  zoneSettings: Map<number, ReturnType<typeof v1.ZoneSettings.create>>;
  currentStatistics: Map<
    number,
    {
      temperature: number;
      humidity: number;
      light: number;
      soilMoisture: number;
    }
  >;
}

export class InMemoryDataStore implements DataStore {
  private storage: Storage = {
    zones: new Map(),
    modules: new Map(),
    zoneSettings: new Map(),
    currentStatistics: new Map(),
  };

  // Zone methods

  defineZones(definitions: ZoneDefinition[]): void {
    for (const def of definitions) {
      this.storage.zones.set(def.id, def);

      // Initialize statistics for this zone
      this.storage.currentStatistics.set(def.id, {
        temperature:
          def.statistics.temperature?.current ??
          DEFAULT_STATISTICS.temperature.current,
        humidity:
          def.statistics.humidity?.current ??
          DEFAULT_STATISTICS.humidity.current,
        light:
          def.statistics.light?.current ?? DEFAULT_STATISTICS.light.current,
        soilMoisture:
          def.statistics.soilMoisture?.current ??
          DEFAULT_STATISTICS.soilMoisture.current,
      });
    }
  }

  getZones(): ZoneType[] {
    return Array.from(this.storage.zones.values()).map((def) =>
      this.buildZoneFromDefinition(def),
    );
  }

  getZoneById(id: number): ZoneType | undefined {
    const def = this.storage.zones.get(id);
    if (!def) return undefined;
    return this.buildZoneFromDefinition(def);
  }

  updateZone(zone: Partial<ZoneType> & { id: number }): boolean {
    const existing = this.storage.zones.get(zone.id);
    if (!existing) return false;

    // Update definition fields
    if (zone.name !== undefined) existing.name = zone.name;
    if (zone.icon !== undefined) existing.icon = zone.icon;
    if (zone.status !== undefined) existing.status = zone.status;
    if (zone.moduleId !== undefined) existing.moduleId = zone.moduleId;
    if (zone.lastWatered !== undefined) {
      const ts = zone.lastWatered;
      if (ts && ts.seconds !== undefined && ts.seconds !== null) {
        existing.lastWatered = Math.floor(
          Number(ts.seconds) * 1000 + (ts.nanos || 0) / 1_000_000,
        );
      }
    }

    return true;
  }

  // Module methods

  defineModules(definitions: ModuleDefinition[]): void {
    for (const def of definitions) {
      this.storage.modules.set(def.id, def);
    }
  }

  getModules(): ModuleType[] {
    return Array.from(this.storage.modules.values()).map((def) =>
      this.buildModuleFromDefinition(def),
    );
  }

  getModuleById(id: number): ModuleType | undefined {
    const def = this.storage.modules.get(id);
    if (!def) return undefined;
    return this.buildModuleFromDefinition(def);
  }

  updateModule(module: Partial<ModuleType> & { id: number }): boolean {
    const existing = this.storage.modules.get(module.id);
    if (!existing) return false;

    // Update definition fields
    if (module.name !== undefined) existing.name = module.name;
    if (module.status !== undefined) existing.status = module.status;
    if (module.batteryLevel !== undefined)
      existing.batteryLevel = module.batteryLevel;
    if (module.zoneIds !== undefined)
      existing.zoneIds = Array.from(module.zoneIds);

    return true;
  }

  // Statistics methods

  getZoneStatistics(zoneId: number): StatisticTypeObj[] {
    const def = this.storage.zones.get(zoneId);
    if (!def) return [];

    const statistics: StatisticTypeObj[] = [];
    const Statistic = v1.Statistic;
    const StatisticDataPoint = v1.StatisticDataPoint;

    // Generate 24 hours of history for each statistic type
    const now = new Date();
    const statDefs = def.statistics;

    const statTypes: Array<[string, number]> = [
      ["temperature", StatisticType.STATISTIC_TYPE_TEMPERATURE],
      ["humidity", StatisticType.STATISTIC_TYPE_HUMIDITY],
      ["light", StatisticType.STATISTIC_TYPE_LIGHT],
      ["soilMoisture", StatisticType.STATISTIC_TYPE_SOIL_MOISTURE],
    ];

    for (const [key, type] of statTypes) {
      const statDef = statDefs[key as keyof typeof statDefs];
      if (!statDef) continue;

      const stat = new Statistic();
      stat.type = type;

      const history: ReturnType<typeof StatisticDataPoint.create>[] = [];
      const baseValue = statDef.current;

      // Generate 24 data points over the last 24 hours
      for (let i = 0; i < 24; i++) {
        const hoursAgo = 24 - i;
        const pointTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

        // Add some variance to create history
        const variance = (Math.random() - 0.5) * statDef.variance * 2;
        const value = this.clamp(
          baseValue + variance,
          statDef.min,
          statDef.max,
        );

        const dp = new StatisticDataPoint();
        dp.timestamp = Timestamp.fromObject({
          seconds: Math.floor(pointTime.getTime() / 1000),
          nanos: (pointTime.getTime() % 1000) * 1_000_000,
        });
        dp.value = value;
        history.push(dp);
      }

      stat.history = history;
      statistics.push(stat);
    }

    return statistics;
  }

  getCurrentStatistics(zoneId: number): StatisticTypeObj[] {
    const current = this.storage.currentStatistics.get(zoneId);
    if (!current) return [];

    const now = new Date();
    const nowTimestamp = Timestamp.fromObject({
      seconds: Math.floor(now.getTime() / 1000),
      nanos: (now.getTime() % 1000) * 1_000_000,
    });

    return [
      this.createStatistic(
        StatisticType.STATISTIC_TYPE_TEMPERATURE,
        current.temperature,
        nowTimestamp,
      ),
      this.createStatistic(
        StatisticType.STATISTIC_TYPE_HUMIDITY,
        current.humidity,
        nowTimestamp,
      ),
      this.createStatistic(
        StatisticType.STATISTIC_TYPE_LIGHT,
        current.light,
        nowTimestamp,
      ),
      this.createStatistic(
        StatisticType.STATISTIC_TYPE_SOIL_MOISTURE,
        current.soilMoisture,
        nowTimestamp,
      ),
    ];
  }

  updateStatistics(): void {
    for (const [zoneId, stats] of this.storage.currentStatistics) {
      const zoneDef = this.storage.zones.get(zoneId);
      if (!zoneDef) continue;

      const zoneStats = zoneDef.statistics;

      if (zoneStats.temperature) {
        stats.temperature = this.varyValue(
          stats.temperature,
          zoneStats.temperature.variance,
          zoneStats.temperature.min,
          zoneStats.temperature.max,
        );
      }

      if (zoneStats.humidity) {
        stats.humidity = this.varyValue(
          stats.humidity,
          zoneStats.humidity.variance,
          zoneStats.humidity.min,
          zoneStats.humidity.max,
        );
      }

      if (zoneStats.light) {
        stats.light = this.varyValue(
          stats.light,
          zoneStats.light.variance,
          zoneStats.light.min,
          zoneStats.light.max,
        );
      }

      if (zoneStats.soilMoisture) {
        stats.soilMoisture = this.varyValue(
          stats.soilMoisture,
          zoneStats.soilMoisture.variance,
          zoneStats.soilMoisture.min,
          zoneStats.soilMoisture.max,
        );
      }
    }
  }

  // Zone settings methods

  getZoneSettings(
    zoneId: number,
  ): ReturnType<typeof v1.ZoneSettings.create> | undefined {
    return this.storage.zoneSettings.get(zoneId);
  }

  updateZoneSettings(
    settings: ReturnType<typeof v1.ZoneSettings.create>,
  ): boolean {
    this.storage.zoneSettings.set(settings.zoneId, settings);
    return true;
  }

  // Helper methods

  private buildZoneFromDefinition(def: ZoneDefinition): ZoneType {
    const Zone = v1.Zone;
    const zone = new Zone();

    zone.id = def.id;
    zone.moduleId = def.moduleId;
    zone.name = def.name;
    zone.icon = def.icon;
    zone.status = def.status;

    if (def.lastWatered) {
      zone.lastWatered = Timestamp.fromObject({
        seconds: Math.floor(def.lastWatered / 1000),
        nanos: (def.lastWatered % 1000) * 1_000_000,
      });
    }

    // Add current statistics
    zone.currentStatistics = this.getCurrentStatistics(def.id);

    return zone;
  }

  private buildModuleFromDefinition(def: ModuleDefinition): ModuleType {
    const Module = v1.Module;
    const module = new Module();

    module.id = def.id;
    module.name = def.name;
    module.status = def.status;
    module.batteryLevel = def.batteryLevel;
    module.zoneIds = def.zoneIds;
    module.lastSeen = Timestamp.fromObject({
      seconds: Math.floor(Date.now() / 1000),
      nanos: 0,
    });

    return module;
  }

  private createStatistic(
    type: number,
    value: number,
    timestamp: ReturnType<typeof Timestamp.fromObject>,
  ): StatisticTypeObj {
    const Statistic = v1.Statistic;
    const StatisticDataPoint = v1.StatisticDataPoint;

    const stat = new Statistic();
    stat.type = type;

    const dp = new StatisticDataPoint();
    dp.timestamp = timestamp;
    dp.value = value;
    stat.history = [dp];

    return stat;
  }

  private varyValue(
    value: number,
    variance: number,
    min: number,
    max: number,
  ): number {
    const change = (Math.random() - 0.5) * 2 * variance;
    return this.clamp(value + change, min, max);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
