/**
 * Query parameters for fetching account addresses.
 * @export
 * @interface AccountAddressesQueryParams
 *
 */
export interface AccountAddressesQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof AccountAddressesQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof AccountAddressesQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for fetching account assets.
 * @export
 * @interface AccountAssetsQueryParams
 *
 */
export interface AccountAssetsQueryParams {
    /**
     * Filter results to only show assets of the specified policy
     * @type {string | null}
     * @memberof AccountAssetsQueryParams
     */
    policy?: string | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof AccountAssetsQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof AccountAssetsQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for fetching account history.
 * @export
 * @interface AccountHistoryQueryParams
 *
 */
export interface AccountHistoryQueryParams {
    /**
     * Fetch result for only a specific epoch
     * @type {string | null}
     * @memberof AccountHistoryQueryParams
     */
    epochNo?: number | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof AccountHistoryQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof AccountHistoryQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for fetching account rewards.
 * @export
 * @interface AccountRewardsQueryParams
 *
 */
export interface AccountRewardsQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof AccountRewardsQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof AccountRewardsQueryParams
     */
    cursor?: string | null;
}
