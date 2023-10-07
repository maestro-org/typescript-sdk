/**
 * Query parameters for fetching account addresses.
 * @export
 * @interface AccountHistory
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
