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

/**
 * Query parameters for poolBlocks.
 * @export
 * @interface PoolBlocksQueryParams
 *
 */
export interface PoolBlocksQueryParams {
    /**
     * Epoch number to fetch results for
     * @type {number | null}
     * @memberof PoolBlocksQueryParams
     */
    epochNo?: number | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof PoolBlocksQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted (by block absolute slot)
     * @type {PoolBlocksOrderEnum}
     * @memberof PoolBlocksQueryParams
     */
    order?: PoolBlocksOrderEnum;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof PoolBlocksQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for poolDelegators.
 * @export
 * @interface PoolDelegatorsQueryParams
 *
 */
export interface PoolDelegatorsQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof PoolDelegatorsQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof PoolDelegatorsQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for poolHistory.
 * @export
 * @interface PoolHistoryQueryParams
 *
 */
export interface PoolHistoryQueryParams {
    /**
     * Epoch number to fetch results for
     * @type {number | null}
     * @memberof PoolHistoryQueryParams
     */
    epochNo?: number | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof PoolHistoryQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted (by block absolute slot)
     * @type {PoolHistoryOrderEnum}
     * @memberof PoolHistoryQueryParams
     */
    order?: PoolHistoryOrderEnum;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof PoolHistoryQueryParams
     */
    cursor?: string | null;
}
