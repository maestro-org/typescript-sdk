/**
 * Query parameters for txoByTxoRef.
 * @export
 * @interface TxoByTxoRefQueryParams
 *
 */
export interface TxoByTxoRefQueryParams {
    /**
     * Include the CBOR encoding of the transaction output in the response
     * @type {boolean | null}
     * @memberof TxoByTxoRefQueryParams
     */
    with_cbor?: boolean | null;
}

/**
 * Query parameters for txosByTxoRefs.
 * @export
 * @interface TxosByTxoRefsQueryParams
 *
 */
export interface TxosByTxoRefsQueryParams {
    /**
     * Try find and include the corresponding datums for datum hashes
     * @type {boolean | null}
     * @memberof TxosByTxoRefsQueryParams
     */
    resolve_datums?: boolean | null;
    /**
     * Include the CBOR encoding of the transaction output in the response
     * @type {boolean | null}
     * @memberof TxosByTxoRefsQueryParams
     */
    with_cbor?: boolean | null;
    /**
     * Do not return 404 if any transactions are not found (404 will still be returned if you specify an index higher than the number of outputs in a transaction)
     * @type {boolean | null}
     * @memberof TxosByTxoRefsQueryParams
     */
    allow_missing?: boolean | null;
    /**
     * The max number of results per page
     * @type {number | null}
     * @memberof TxosByTxoRefsQueryParams
     */
    count?: number | null;
    /**
     * Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @type {string | null}
     * @memberof TxosByTxoRefsQueryParams
     */
    cursor?: string | null;
}
