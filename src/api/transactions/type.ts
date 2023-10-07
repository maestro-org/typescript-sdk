/**
 * Query parameters for txoByTxoRef.
 * @export
 * @interface TxoByTxoRefQueryParams
 *
 */
export interface TxoByTxoRefQueryParams {
    // * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
    /**
     * Include the CBOR encoding of the transaction output in the response
     * @type {boolean | null}
     * @memberof TxoByTxoRefQueryParams
     */
    withCbor?: boolean | null;
}
