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
    withCbor?: boolean | null;
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
    resolveDatums?: boolean | null;
    /**
     * Include the CBOR encoding of the transaction output in the response
     * @type {boolean | null}
     * @memberof TxosByTxoRefsQueryParams
     */
    withCbor?: boolean | null;
}
