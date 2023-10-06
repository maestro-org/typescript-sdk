import { AxiosRequestConfig } from "axios";
import { BaseAPI } from "../../base";
import { AccountsApiFp } from "./helpers";

/**
 * AccountsApi - object-oriented interface
 * @export
 * @class AccountsApi
 * @extends {BaseAPI}
 */
export class AccountsApi extends BaseAPI {
  /**
   * Returns a list of addresses seen on-chain which use the specified stake key
   * @summary Stake account addresses
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountAddresses(
    stakeAddr: string,
    count?: number | null,
    cursor?: string | null,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .accountAddresses(stakeAddr, count, cursor, options)
      .then((request) => request(this.axios));
  }

  /**
   * Returns a list of native assets which are owned by addresses with the specified stake key
   * @summary Stake account assets
   * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
   * @param {string | null} [policy] Filter results to only show assets of the specified policy
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountAssets(
    stakeAddr: string,
    policy?: string | null,
    count?: number | null,
    cursor?: string | null,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .accountAssets(stakeAddr, policy, count, cursor, options)
      .then((request) => request(this.axios));
  }

  /**
   * Returns per-epoch history for the specified stake key
   * @summary Stake account history
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [epochNo] Fetch result for only a specific epoch
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountHistory(
    stakeAddr: string,
    epochNo?: number | null,
    count?: number | null,
    cursor?: string | null,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .accountHistory(stakeAddr, epochNo, count, cursor, options)
      .then((request) => request(this.axios));
  }

  /**
   * Returns various information regarding a stake account
   * @summary Stake account information
   * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountInfo(stakeAddr: string, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration)
      .accountInfo(stakeAddr, options)
      .then((request) => request(this.axios));
  }

  /**
   * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
   * @summary Stake account rewards
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountRewards(
    stakeAddr: string,
    count?: number | null,
    cursor?: string | null,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .accountRewards(stakeAddr, count, cursor, options)
      .then((request) => request(this.axios));
  }

  /**
   * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
   * @summary Stake account updates
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountUpdates(
    stakeAddr: string,
    count?: number | null,
    cursor?: string | null,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .accountUpdates(stakeAddr, count, cursor, options)
      .then((request) => request(this.axios));
  }
}
