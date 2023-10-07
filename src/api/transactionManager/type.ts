/**
 * Query parameters for txManagerHistory.
 * @export
 * @interface TxManagerHistoryQueryParams
 *
 */
export interface TxManagerHistoryQueryParams {
    // * @param {number} [count]
    // * @param {number} [page]
    /**
     * The max number of results per pagination page
     * @type {number | null}
     * @memberof TxManagerHistoryQueryParams
     */
    count?: number | null;
    /**
     * Pagination page number to show results for
     * @type {string | null}
     * @memberof TxManagerHistoryQueryParams
     */
    page?: string | null;
}
