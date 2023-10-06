/**
 * @export
 */
export const PoolBlocksOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type PoolBlocksOrderEnum = (typeof PoolBlocksOrderEnum)[keyof typeof PoolBlocksOrderEnum];
/**
 * @export
 */
export const PoolHistoryOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type PoolHistoryOrderEnum = (typeof PoolHistoryOrderEnum)[keyof typeof PoolHistoryOrderEnum];
