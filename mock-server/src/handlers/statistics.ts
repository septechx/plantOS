import { MessageType, ErrorCode } from "@plantos/admin-proto";
import {
  GetStatisticsRequest,
  GetStatisticsResponse,
  StatisticsUpdate,
  Timestamp,
  Statistic,
  StatisticTypeObj,
} from "../types";
import { HandlerRegistry } from "./registry";
import { HandlerContext, ErrorResult } from "../types";

export function registerStatisticsHandlers(registry: HandlerRegistry): void {
  // GetStatistics handler
  registry.register(
    MessageType.MSG_GET_STATISTICS_REQUEST,
    GetStatisticsRequest,
    GetStatisticsResponse,
    (
      request: {
        zoneId: number;
        from?: { seconds?: number | bigint; nanos?: number } | null;
        to?: { seconds?: number | bigint; nanos?: number } | null;
        types?: number[];
        aggregation?: number;
      },
      context: HandlerContext,
    ) => {
      const { store } = context;
      const zoneId = request.zoneId;
      const from = request.from;
      const to = request.to;
      const types = request.types || [];
      const aggregation = request.aggregation ?? 0;

      console.log(
        `GetStatisticsRequest: zoneId=${zoneId}, types=[${types.join(", ")}], aggregation=${aggregation}`,
      );

      // Check if zone exists
      const zone = store.getZoneById(zoneId);
      if (!zone) {
        return {
          code: ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
          message: `Zone with ID ${zoneId} not found`,
        } as ErrorResult;
      }

      // Validate time range
      if (Boolean(from) !== Boolean(to)) {
        return {
          code: ErrorCode.ERROR_CODE_INVALID_TIME_RANGE,
          message: "Invalid time range: both from and to are required",
        } as ErrorResult;
      }

      if (from && to) {
        const fromTime =
          (Number(from.seconds) || 0) * 1000 + (from.nanos ?? 0) / 1_000_000;
        const toTime =
          (Number(to.seconds) || 0) * 1000 + (to.nanos ?? 0) / 1_000_000;

        if (fromTime > toTime) {
          return {
            code: ErrorCode.ERROR_CODE_INVALID_TIME_RANGE,
            message: "Invalid time range: from is after to",
          } as ErrorResult;
        }
      }

      // Get statistics
      const response = new GetStatisticsResponse();
      response.zoneId = zoneId;

      let statistics = store.getZoneStatistics(zoneId);

      // Filter by types if specified
      if (types.length > 0) {
        statistics = statistics.filter((s: StatisticTypeObj) =>
          types.includes(s.type),
        );
      }

      // Filter by time range if specified
      if (from && to) {
        const fromTime =
          (Number(from.seconds) || 0) * 1000 + (from.nanos ?? 0) / 1_000_000;
        const toTime =
          (Number(to.seconds) || 0) * 1000 + (to.nanos ?? 0) / 1_000_000;

        // Create new statistics with filtered history
        statistics = statistics.map((stat: StatisticTypeObj) => {
          const newStat = new Statistic();
          newStat.type = stat.type;
          newStat.history = stat.history.filter((dp) => {
            if (!dp.timestamp) return false;
            const dpTime =
              (Number(dp.timestamp.seconds) || 0) * 1000 +
              (dp.timestamp.nanos ?? 0) / 1_000_000;
            return dpTime >= fromTime && dpTime <= toTime;
          });
          return newStat;
        });
      }

      // Apply aggregation if requested
      if (aggregation !== 0) {
        statistics = applyAggregation(statistics, aggregation);
      }

      response.statistics = statistics;
      return response;
    },
  );
}

// Helper function to broadcast statistics updates
export function broadcastStatisticsUpdate(
  zoneId: number,
  statistics: StatisticTypeObj[],
  context: HandlerContext,
): void {
  const { broadcast } = context;

  const update = new StatisticsUpdate();
  update.zoneId = zoneId;
  update.updatedStatistics = statistics;

  const now = new Date();
  update.timestamp = Timestamp.fromObject({
    seconds: Math.floor(now.getTime() / 1000),
    nanos: (now.getTime() % 1000) * 1_000_000,
  });

  const payload = StatisticsUpdate.encode(update).finish();
  broadcast(MessageType.MSG_STATISTICS_UPDATE, payload);
}

// Apply aggregation to statistics
function applyAggregation(
  statistics: StatisticTypeObj[],
  aggregation: number,
): StatisticTypeObj[] {
  // For now, just return the original statistics
  // Full aggregation implementation would group data points by hour/day/week
  // and calculate averages

  // AGGREGATION_NONE = 0
  // AGGREGATION_HOURLY = 1
  // AGGREGATION_DAILY = 2
  // AGGREGATION_WEEKLY = 3

  if (aggregation === 0) {
    return statistics;
  }

  // TODO: Implement actual aggregation logic
  console.log(
    `Aggregation level ${aggregation} requested (not fully implemented)`,
  );
  return statistics;
}
