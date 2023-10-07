/**
 * @export
 */
export const AssetTxsOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type AssetTxsOrderEnum = (typeof AssetTxsOrderEnum)[keyof typeof AssetTxsOrderEnum];
/**
 * @export
 */
export const AssetUpdatesOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type AssetUpdatesOrderEnum = (typeof AssetUpdatesOrderEnum)[keyof typeof AssetUpdatesOrderEnum];
/**
 * @export
 */
export const AssetUtxosOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type AssetUtxosOrderEnum = (typeof AssetUtxosOrderEnum)[keyof typeof AssetUtxosOrderEnum];
/**
 * @export
 */
export const PolicyTxsOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type PolicyTxsOrderEnum = (typeof PolicyTxsOrderEnum)[keyof typeof PolicyTxsOrderEnum];
/**
 * @export
 */
export const PolicyUtxosOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type PolicyUtxosOrderEnum = (typeof PolicyUtxosOrderEnum)[keyof typeof PolicyUtxosOrderEnum];

/**
 * Query parameters for assetAccounts.
 * @export
 * @interface AssetAccountsQueryParams
 *
 */
export interface AssetAccountsQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof AssetAccountsQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof AssetAccountsQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for assetAddresses.
 * @export
 * @interface AssetAddressesQueryParams
 *
 */
export interface AssetAddressesQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof AssetAddressesQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof AssetAddressesQueryParams
     */
    cursor?: string | null;
}
