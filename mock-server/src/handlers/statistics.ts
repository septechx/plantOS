import { MessageType, v1 } from "@plantos/admin-proto";
import {
  GetStatisticsRequest,
  GetStatisticsResponse,
  StatisticsUpdate,
  Timestamp,
  Statistic,
  StatisticTypeObj,
  createErrorResult,
  BroadcastContext,
  success,
  failure,
} from "../types";
import { timestampToMs } from "../utils";
import { HandlerRegistry } from "./registry";
import { HandlerContext } from "../types";

const { ErrorCode } = v1;

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
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_ZONE_NOT_FOUND,
            `Zone with ID ${zoneId} not found`,
          ),
        );
      }

      // Validate time range
      if (Boolean(from) !== Boolean(to)) {
        return failure(
          createErrorResult(
            ErrorCode.ERROR_CODE_INVALID_TIME_RANGE,
            "Invalid time range: both from and to are required",
          ),
        );
      }

      if (from && to) {
        const fromTime = timestampToMs(from);
        const toTime = timestampToMs(to);

        if (fromTime > toTime) {
          return failure(
            createErrorResult(
              ErrorCode.ERROR_CODE_INVALID_TIME_RANGE,
              "Invalid time range: from is after to",
            ),
          );
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
        const fromTime = timestampToMs(from);
        const toTime = timestampToMs(to);

        // Create new statistics with filtered history
        statistics = statistics.map((stat: StatisticTypeObj) => {
          const newStat = new Statistic();
          Object.assign(newStat, stat);
          newStat.history = stat.history.filter((dp) => {
            if (!dp.timestamp) return false;
            const dpTime = timestampToMs(dp.timestamp);
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
      return success(response);
    },
    { responseType: MessageType.MSG_GET_STATISTICS_RESPONSE },
  );
}

// Helper function to broadcast statistics updates
export function broadcastStatisticsUpdate(
  zoneId: number,
  statistics: StatisticTypeObj[],
  context: BroadcastContext,
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
  // AGGREGATION_HOURLY = 1, AGGREGATION_DAILY = 2, AGGREGATION_WEEKLY = 3
  // TODO: Implement actual aggregation logic
  console.warn(
    `Aggregation level ${aggregation} requested (not fully implemented)`,
  );
  return statistics;
}
