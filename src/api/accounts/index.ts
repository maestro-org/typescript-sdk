import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { AccountsApiFp } from './helpers';
import {
    AccountAddressesQueryParams,
    AccountAssetsQueryParams,
    AccountHistoryQueryParams,
    AccountRewardsQueryParams,
    AccountUpdatesQueryParams,
} from './type';

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
     * @param {AccountAddressesQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountsApi
     */
    public accountAddresses(
        stakeAddr: string,
        queryParams?: AccountAddressesQueryParams,
        options?: AxiosRequestConfig,
    ) {
        return AccountsApiFp(this.configuration).accountAddresses(stakeAddr, queryParams, options)();
    }

    /**
     * Returns a list of native assets which are owned by addresses with the specified stake key
     * @summary Stake account assets
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {AccountAssetsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountsApi
     */
    public accountAssets(stakeAddr: string, queryParams?: AccountAssetsQueryParams, options?: AxiosRequestConfig) {
        return AccountsApiFp(this.configuration).accountAssets(stakeAddr, queryParams, options)();
    }

    /**
     * Returns per-epoch history for the specified stake key
     * @summary Stake account history
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountHistoryQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountsApi
     */
    public accountHistory(stakeAddr: string, queryParams?: AccountHistoryQueryParams, options?: AxiosRequestConfig) {
        return AccountsApiFp(this.configuration).accountHistory(stakeAddr, queryParams, options)();
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
        return AccountsApiFp(this.configuration).accountInfo(stakeAddr, options)();
    }

    /**
     * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
     * @summary Stake account rewards
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountRewardsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountsApi
     */
    public accountRewards(stakeAddr: string, queryParams?: AccountRewardsQueryParams, options?: AxiosRequestConfig) {
        return AccountsApiFp(this.configuration).accountRewards(stakeAddr, queryParams, options)();
    }

    /**
     * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
     * @summary Stake account updates
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountUpdatesQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccountsApi
     */
    public accountUpdates(stakeAddr: string, queryParams?: AccountUpdatesQueryParams, options?: AxiosRequestConfig) {
        return AccountsApiFp(this.configuration).accountUpdates(stakeAddr, queryParams, options)();
    }
}

export * from './type';
