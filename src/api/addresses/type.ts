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
 * Query parameters for txsByAddress.
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

/**
 * Query parameters for txsByPaymentCred.
 * @export
 * @interface TxsByPaymentCredQueryParams
 *
 */
export interface TxsByPaymentCredQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof TxsByPaymentCredQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted, by transaction age
     * @type {TxsByPaymentCredOrderEnum}
     * @memberof TxsByPaymentCredQueryParams
     */
    order?: TxsByPaymentCredOrderEnum;
    /**
     * Return only transactions minted on or after a specific slot
     * @type {number | null}
     * @memberof TxsByPaymentCredQueryParams
     */
    from?: number | null;
    /**
     * Return only transactions minted on or before a specific slot
     * @type {number | null}
     * @memberof TxsByPaymentCredQueryParams
     */
    to?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof TxsByPaymentCredQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for txsByPaymentCreds.
 * @export
 * @interface TxsByPaymentCredsQueryParams
 *
 */
export interface TxsByPaymentCredsQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof TxsByPaymentCredsQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted, by transaction age
     * @type {TxsByPaymentCredOrderEnum}
     * @memberof TxsByPaymentCredsQueryParams
     */
    order?: TxsByPaymentCredOrderEnum;
    /**
     * Return only transactions minted on or after a specific slot
     * @type {number | null}
     * @memberof TxsByPaymentCredsQueryParams
     */
    from?: number | null;
    /**
     * Return only transactions minted on or before a specific slot
     * @type {number | null}
     * @memberof TxsByPaymentCredsQueryParams
     */
    to?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof TxsByPaymentCredsQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for utxoRefsAtAddress.
 * @export
 * @interface UtxoRefsAtAddressQueryParams
 *
 */
export interface UtxoRefsAtAddressQueryParams {
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof UtxoRefsAtAddressQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted (by slot at which UTxO was produced)
     * @type {UtxoRefsAtAddressOrderEnum}
     * @memberof UtxoRefsAtAddressQueryParams
     */
    order?: UtxoRefsAtAddressOrderEnum;
    /**
     * Return only UTxOs created on or after a specific slot
     * @type {number | null}
     * @memberof UtxoRefsAtAddressQueryParams
     */
    from?: number | null;
    /**
     * Return only UTxOs created before a specific slot
     * @type {number | null}
     * @memberof UtxoRefsAtAddressQueryParams
     */
    to?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof UtxoRefsAtAddressQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for utxosByAddress.
 * @export
 * @interface UtxosByAddressQueryParams
 *
 */
export interface UtxosByAddressQueryParams {
    /**
     * Return only UTxOs which contain some of a specific asset (asset formatted as concatenation of hex encoded policy and asset name)
     * @type {string | null}
     * @memberof UtxosByAddressQueryParams
     */
    asset?: string | null;
    /**
     * Try find and include the corresponding datums for datum hashes
     * @type {boolean | null}
     * @memberof UtxosByAddressQueryParams
     */
    resolve_datums?: boolean | null;
    /**
     * Include the CBOR encodings of the transaction outputs in the response
     * @type {boolean | null}
     * @memberof UtxosByAddressQueryParams
     */
    with_cbor?: boolean | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof UtxosByAddressQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted (by slot at which UTxO was produced)
     * @type {UtxosByAddressOrderEnum}
     * @memberof UtxosByAddressQueryParams
     */
    order?: UtxosByAddressOrderEnum;
    /**
     * Return only UTxOs created on or after a specific slot
     * @type {number | null}
     * @memberof UtxosByAddressQueryParams
     */
    from?: number | null;
    /**
     * Return only UTxOs created before a specific slot
     * @type {number | null}
     * @memberof UtxosByAddressQueryParams
     */
    to?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof UtxosByAddressQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for utxosByAddresses.
 * @export
 * @interface UtxosByAddressesQueryParams
 *
 */
export interface UtxosByAddressesQueryParams {
    /**
     * Try find and include the corresponding datums for datum hashes
     * @type {boolean | null}
     * @memberof UtxosByAddressesQueryParams
     */
    resolve_datums?: boolean | null;
    /**
     * Include the CBOR encodings of the transaction outputs in the response
     * @type {boolean | null}
     * @memberof UtxosByAddressesQueryParams
     */
    with_cbor?: boolean | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof UtxosByAddressesQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof UtxosByAddressesQueryParams
     */
    cursor?: string | null;
}

/**
 * Query parameters for utxosByPaymentCred.
 * @export
 * @interface UtxosByPaymentCredQueryParams
 *
 */
export interface UtxosByPaymentCredQueryParams {
    /**
     * Return only UTxOs which contain some of a specific asset (asset formatted as concatenation of hex encoded policy and asset name)
     * @type {string | null}
     * @memberof UtxosByAddressQueryParams
     */
    asset?: string | null;
    /**
     * Try find and include the corresponding datums for datum hashes
     * @type {boolean | null}
     * @memberof UtxosByPaymentCredQueryParams
     */
    resolve_datums?: boolean | null;
    /**
     * Include the CBOR encodings of the transaction outputs in the response
     * @type {boolean | null}
     * @memberof UtxosByPaymentCredQueryParams
     */
    with_cbor?: boolean | null;
    /**
     * The max number of results per page.
     * @type {number | null}
     * @memberof UtxosByPaymentCredQueryParams
     */
    count?: number | null;
    /**
     * The order in which the results are sorted (by slot at which UTxO was produced)
     * @type {UtxosByPaymentCredOrderEnum}
     * @memberof UtxosByPaymentCredQueryParams
     */
    order?: UtxosByPaymentCredOrderEnum;
    /**
     * Return only UTxOs created on or after a specific slot
     * @type {number | null}
     * @memberof UtxosByPaymentCredQueryParams
     */
    from?: number | null;
    /**
     * Return only UTxOs created on or before a specific slot
     * @type {number | null}
     * @memberof UtxosByPaymentCredQueryParams
     */
    to?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page.
     * @type {string | null}
     * @memberof UtxosByPaymentCredQueryParams
     */
    cursor?: string | null;
}
