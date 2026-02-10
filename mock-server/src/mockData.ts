import { v1, common, Status, StatisticType } from "@plantos/admin-proto";

const Zone = v1.Zone;
const Module = v1.Module;
const Statistic = v1.Statistic;
const StatisticDataPoint = v1.StatisticDataPoint;
const Timestamp = common.protobuf.Timestamp;

export type ZoneType = v1.Zone;
export type ModuleType = v1.Module;
export type StatisticTypeObj = v1.Statistic;

const ZONE_DEFINITIONS = [
  {
    id: 0,
    name: "Monstera Deliciosa",
    icon: "🌿",
    status: Status.STATUS_IDLE,
  },
  {
    id: 1,
    name: "Fiddle Leaf Fig",
    icon: "🌿",
    status: Status.STATUS_WORKING,
  },
  { id: 2, name: "Snake Plant", icon: "🌿", status: Status.STATUS_IDLE },
  { id: 3, name: "Peace Lily", icon: "🌿", status: Status.STATUS_PAUSED },
  { id: 4, name: "Aloe Vera", icon: "🌿", status: Status.STATUS_IDLE },
];

const BASE_STATISTICS = [
  {
    temperature: [21, 22, 22.5, 23, 22.5, 22, 21.5],
    humidity: [40, 42, 45, 48, 50, 45, 43],
    light: [800, 1000, 1200, 1400, 1300, 1200, 900],
  },
  {
    temperature: [22, 23, 24, 24.5, 24, 23.5, 23],
    humidity: [55, 58, 60, 62, 65, 60, 58],
    light: [600, 700, 800, 900, 850, 800, 700],
  },
  {
    temperature: [20, 20.5, 21, 21.5, 21, 20.5, 20],
    humidity: [25, 28, 30, 32, 35, 30, 28],
    light: [300, 350, 400, 450, 500, 400, 350],
  },
  {
    temperature: [22, 22.5, 23, 24, 23.5, 23, 22.5],
    humidity: [70, 72, 75, 78, 80, 75, 73],
    light: [400, 500, 600, 700, 650, 600, 550],
  },
  {
    temperature: [23, 24, 25, 26, 25, 24.5, 24],
    humidity: [30, 32, 35, 38, 40, 35, 33],
    light: [1500, 1800, 2000, 2200, 2100, 2000, 1700],
  },
];

const VALID_RANGES = {
  temperature: { min: 18, max: 28 },
  humidity: { min: 20, max: 85 },
  light: { min: 200, max: 2500 },
};

let currentStatistics: {
  [zoneId: number]: { temperature: number; humidity: number; light: number };
} = {};

export function initializeMockData(): void {
  ZONE_DEFINITIONS.forEach((zone, index) => {
    const base = BASE_STATISTICS[index];
    currentStatistics[zone.id] = {
      temperature: base.temperature[base.temperature.length - 1],
      humidity: base.humidity[base.humidity.length - 1],
      light: base.light[base.light.length - 1],
    };
  });
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function varyValue(
  value: number,
  variation: number,
  min: number,
  max: number,
): number {
  const change = (Math.random() - 0.5) * 2 * variation;
  return clamp(value + change, min, max);
}

export function updateStatistics(): void {
  Object.keys(currentStatistics).forEach((zoneIdStr) => {
    const zoneId = parseInt(zoneIdStr, 10);
    const current = currentStatistics[zoneId];

    current.temperature = varyValue(
      current.temperature,
      0.5,
      VALID_RANGES.temperature.min,
      VALID_RANGES.temperature.max,
    );
    current.humidity = varyValue(
      current.humidity,
      3,
      VALID_RANGES.humidity.min,
      VALID_RANGES.humidity.max,
    );
    current.light = varyValue(
      current.light,
      100,
      VALID_RANGES.light.min,
      VALID_RANGES.light.max,
    );
  });
}

function createTimestampFromDaysAgo(days: number): common.protobuf.Timestamp {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return Timestamp.fromObject({
    seconds: Math.floor(date.getTime() / 1000),
    nanos: (date.getTime() % 1000) * 1_000_000,
  });
}

function createStatistic(
  type: number,
  values: number[],
  hoursBack: number = 24,
): v1.Statistic {
  const stat = new Statistic();
  stat.type = type;

  const now = new Date();
  const history: v1.StatisticDataPoint[] = [];

  values.forEach((value, index) => {
    const dataPoint = new StatisticDataPoint();

    const hoursAgo = hoursBack - index * (hoursBack / values.length);
    const pointTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);

    dataPoint.timestamp = Timestamp.fromObject({
      seconds: Math.floor(pointTime.getTime() / 1000),
      nanos: (pointTime.getTime() % 1000) * 1_000_000,
    });
    dataPoint.value = value;
    history.push(dataPoint);
  });

  stat.history = history;
  return stat;
}

function buildStatisticsFromCurrent(
  current: { temperature: number; humidity: number; light: number },
  nowTimestamp: ReturnType<typeof Timestamp.fromObject>
): v1.Statistic[] {
  // Temperature
  const tempStat = new Statistic();
  tempStat.type = StatisticType.STATISTIC_TYPE_TEMPERATURE;
  const tempPoint = new StatisticDataPoint();
  tempPoint.timestamp = nowTimestamp;
  tempPoint.value = current.temperature;
  tempStat.history = [tempPoint];

  // Humidity
  const humidStat = new Statistic();
  humidStat.type = StatisticType.STATISTIC_TYPE_HUMIDITY;
  const humidPoint = new StatisticDataPoint();
  humidPoint.timestamp = nowTimestamp;
  humidPoint.value = current.humidity;
  humidStat.history = [humidPoint];

  // Light
  const lightStat = new Statistic();
  lightStat.type = StatisticType.STATISTIC_TYPE_LIGHT;
  const lightPoint = new StatisticDataPoint();
  lightPoint.timestamp = nowTimestamp;
  lightPoint.value = current.light;
  lightStat.history = [lightPoint];

  return [tempStat, humidStat, lightStat];
}

export function getZones(): v1.Zone[] {
  return ZONE_DEFINITIONS.map((def, index) => {
    const zone = new Zone();
    zone.id = def.id;
    zone.moduleId = 1;
    zone.name = def.name;
    zone.icon = def.icon;
    zone.status = def.status;

    const daysAgo = [2, 0, 7, 1, 5][index];
    zone.lastWatered = createTimestampFromDaysAgo(daysAgo);

    const current = currentStatistics[def.id];
    if (current) {
      const now = new Date();
      const nowTimestamp = Timestamp.fromObject({
        seconds: Math.floor(now.getTime() / 1000),
        nanos: (now.getTime() % 1000) * 1_000_000,
      });

      zone.currentStatistics = buildStatisticsFromCurrent(current, nowTimestamp);
    }

    return zone;
  });
}

export function getZoneById(zoneId: number): v1.Zone | undefined {
  return getZones().find((z) => z.id === zoneId);
}

export function getZoneStatistics(zoneId: number): v1.Statistic[] {
  const zoneIndex = ZONE_DEFINITIONS.findIndex((z) => z.id === zoneId);
  if (zoneIndex === -1) return [];

  const base = BASE_STATISTICS[zoneIndex];
  return [
    createStatistic(StatisticType.STATISTIC_TYPE_TEMPERATURE, base.temperature),
    createStatistic(StatisticType.STATISTIC_TYPE_HUMIDITY, base.humidity),
    createStatistic(StatisticType.STATISTIC_TYPE_LIGHT, base.light),
  ];
}

export function getCurrentStatistics(zoneId: number): v1.Statistic[] {
  const current = currentStatistics[zoneId];
  if (!current) return [];

  const now = new Date();
  const nowTimestamp = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

  return buildStatisticsFromCurrent(current, nowTimestamp);
}

export function getModules(): v1.Module[] {
  const module = new Module();
  module.id = 1;
  module.name = "Main Module";
  module.status = Status.STATUS_IDLE;
  module.batteryLevel = 85;
  module.zoneIds = [0, 1, 2, 3, 4];
  module.lastSeen = Timestamp.fromObject({
    seconds: Math.floor(Date.now() / 1000),
    nanos: 0,
  });

  return [module];
}

export function getModuleById(moduleId: number): v1.Module | undefined {
  return getModules().find((m) => m.id === moduleId);
}

initializeMockData();
