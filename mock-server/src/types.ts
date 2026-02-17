import { google, v1 } from "@plantos/admin-proto";

export {
  MessageType,
  getMessageTypeName,
  EncryptedMessage,
} from "@plantos/admin-proto";

export const {
  Hello,
  Welcome,
  ListZonesRequest,
  ListZonesResponse,
  GetZoneRequest,
  GetZoneResponse,
  ListModulesRequest,
  ListModulesResponse,
  GetModuleRequest,
  GetModuleResponse,
  GetStatisticsRequest,
  GetStatisticsResponse,
  GetZoneSettingsRequest,
  GetZoneSettingsResponse,
  UpdateZoneSettingsRequest,
  UpdateZoneSettingsResponse,
  ZoneUpdate,
  ModuleUpdate,
  StatisticsUpdate,
  ErrorResponse,
  Zone,
  Module,
  Statistic,
  StatisticDataPoint,
  ZoneSettings,
} = v1;

export const Timestamp = google.protobuf.Timestamp;

export type ZoneType = ReturnType<typeof Zone.create>;
export type ModuleType = ReturnType<typeof Module.create>;
export type StatisticTypeObj = ReturnType<typeof Statistic.create>;
export type ZoneSettingsType = ReturnType<typeof ZoneSettings.create>;

// Session types
export interface Session {
  id: Buffer;
  derivedKey: Buffer;
  messageCount: number;
  connectedAt: Date;
  lastActivity: Date;
  isEncrypted: boolean;
  clientVersion?: string;
}

// Handler context passed to all handlers
export interface HandlerContext {
  session: Session;
  store: DataStore;
  broadcast: BroadcastFunction;
}

// Broadcast context for server-initiated broadcasts (no session required)
export interface BroadcastContext {
  store: DataStore;
  broadcast: BroadcastFunction;
}

export type BroadcastFunction = (
  messageType: number,
  payload: Uint8Array,
  excludeSession?: Session,
) => void;

// Handler function type
export type MessageHandler<TRequest = unknown, TResponse = unknown> = (
  request: TRequest,
  context: HandlerContext,
) => HandlerResult<TResponse> | Promise<HandlerResult<TResponse>>;

// Mock data definitions
export interface StatisticDefinition {
  min: number;
  max: number;
  current: number;
  variance: number;
}

export interface ZoneDefinition {
  id: number;
  name: string;
  icon: string;
  moduleId: number;
  status: number; // Status enum value
  statistics: {
    temperature?: StatisticDefinition;
    humidity?: StatisticDefinition;
    light?: StatisticDefinition;
    soilMoisture?: StatisticDefinition;
  };
  lastWatered?: number; // timestamp
}

export interface ModuleDefinition {
  id: number;
  name: string;
  status: number; // Status enum value
  batteryLevel: number;
  zoneIds: number[];
}

// Data store interface
export interface DataStore {
  // Zones
  getZones(): ZoneType[];
  getZoneById(id: number): ZoneType | undefined;
  updateZone(zone: Partial<ZoneType> & { id: number }): boolean;

  // Modules
  getModules(): ModuleType[];
  getModuleById(id: number): ModuleType | undefined;
  updateModule(module: Partial<ModuleType> & { id: number }): boolean;

  // Statistics
  getZoneStatistics(zoneId: number): StatisticTypeObj[];
  getCurrentStatistics(zoneId: number): StatisticTypeObj[];
  updateStatistics(): void;

  // Zone settings
  getZoneSettings(zoneId: number): ZoneSettingsType | undefined;
  updateZoneSettings(settings: ZoneSettingsType): boolean;
}

// Mock server configuration
export interface MockServerConfig {
  port: number;
  encryptionKey: Buffer; // 32 bytes
  hubId: string;
  hubVersion: string;
  broadcastIntervalMs: number;
  enableEncryption: boolean;
}

// Error response helper
export interface ErrorResult {
  code: number; // ErrorCode enum value
  message: string;
  requestType?: number;
}

export function createErrorResult(
  code: number,
  message: string,
  requestType?: number,
): ErrorResult {
  return { code, message, requestType };
}

// Handler result type
export type HandlerResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: ErrorResult };

export function success<T>(value: T): HandlerResult<T> {
  return { ok: true, value };
}

export function failure(error: ErrorResult): HandlerResult<never> {
  return { ok: false, error };
}
