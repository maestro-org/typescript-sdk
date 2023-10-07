/**
 * @export
 */
export const PoolBlocksOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type PoolBlocksOrderEnum = (typeof PoolBlocksOrderEnum)[keyof typeof PoolBlocksOrderEnum];
/**
 * @export
 */
export const PoolHistoryOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type PoolHistoryOrderEnum = (typeof PoolHistoryOrderEnum)[keyof typeof PoolHistoryOrderEnum];

/**
 * Query parameters for listPools.
 * @export
 * @interface ListPoolsQueryParams
 *
 */
export interface ListPoolsQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof ListPoolsQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof ListPoolsQueryParams
     */
    cursor?: string | null;
}
