/**
 * Query parameters for fetching account addresses.
 * @param {number | null} [count] - The max number of results per page.
 * @param {string | null} [cursor] - Pagination cursor string.
 *    Use the cursor included in a page of results to fetch the next page.
 */
export interface AccountAddressesQueryParams {
    count?: number | null;
    cursor?: string | null;
}
