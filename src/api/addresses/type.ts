/**
 * @export
 */
export const TxsByAddressOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type TxsByAddressOrderEnum = (typeof TxsByAddressOrderEnum)[keyof typeof TxsByAddressOrderEnum];
/**
 * @export
 */
export const TxsByPaymentCredOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type TxsByPaymentCredOrderEnum = (typeof TxsByPaymentCredOrderEnum)[keyof typeof TxsByPaymentCredOrderEnum];
/**
 * @export
 */
export const UtxoRefsAtAddressOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type UtxoRefsAtAddressOrderEnum = (typeof UtxoRefsAtAddressOrderEnum)[keyof typeof UtxoRefsAtAddressOrderEnum];
/**
 * @export
 */
export const UtxosByAddressOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type UtxosByAddressOrderEnum = (typeof UtxosByAddressOrderEnum)[keyof typeof UtxosByAddressOrderEnum];
/**
 * @export
 */
export const UtxosByPaymentCredOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type UtxosByPaymentCredOrderEnum =
    (typeof UtxosByPaymentCredOrderEnum)[keyof typeof UtxosByPaymentCredOrderEnum];

/**
 * Query parameters for fetching transactions by address.
 * @export
 * @interface TxsByAddressQueryParams
 *
 */
export interface TxsByAddressQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof TxsByAddressQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted, by transaction age
     * @type {TxsByAddressOrderEnum}
     * @memberof TxsByAddressQueryParams
     */
    order?: TxsByAddressOrderEnum;
    /**
     * Return only transactions minted on or after a specific slot
     * @type {number | null}
     * @memberof TxsByAddressQueryParams
     */
    from?: number | null;
    /**
     * Return only transactions minted on or before a specific slot
     * @type {number | null}
     * @memberof TxsByAddressQueryParams
     */
    to?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof TxsByAddressQueryParams
     */
    cursor?: string | null;
}
