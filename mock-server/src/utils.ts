export function timestampToMs(
  ts:
    | { seconds?: number | bigint | null; nanos?: number | null }
    | null
    | undefined,
): number {
  if (!ts) return 0;
  return (Number(ts.seconds) || 0) * 1000 + (ts.nanos ?? 0) / 1_000_000;
}
