import { AxiosRequestConfig } from 'axios';
import { RequestArgs } from '../../base';
import {
    assertParamExists,
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    createRequestFunction,
    HEADER_AMOUNTS_AS_STRING,
} from '../../common';
import { Configuration } from '../../configuration';
import {
    PaginatedAddress,
    PaginatedAsset,
    PaginatedAccountHistory,
    TimestampedAccountInfo,
    PaginatedAccountReward,
    PaginatedAccountUpdate,
} from '../type';
import {
    AccountAddressesQueryParams,
    AccountAssetsQueryParams,
    AccountHistoryQueryParams,
    AccountRewardsQueryParams,
    AccountUpdatesQueryParams,
} from './type';

/**
 * AccountsApi - axios parameter creator
 * @export
 */
export const AccountsApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns a list of addresses seen on-chain which use the specified stake key
     * @summary Stake account addresses
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountAddressesQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountAddresses: (
        stakeAddr: string,
        localVarQueryParameter: AccountAddressesQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'stakeAddr' is not null or undefined
        assertParamExists('accountAddresses', 'stakeAddr', stakeAddr);
        const localVarPath = `/accounts/{stake_addr}/addresses`.replace(
            `{${'stake_addr'}}`,
            encodeURIComponent(String(stakeAddr)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Returns a list of native assets which are owned by addresses with the specified stake key
     * @summary Stake account assets
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {AccountAssetsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountAssets: (
        stakeAddr: string,
        localVarQueryParameter: AccountAssetsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'stakeAddr' is not null or undefined
        assertParamExists('accountAssets', 'stakeAddr', stakeAddr);
        const localVarPath = `/accounts/{stake_addr}/assets`.replace(
            `{${'stake_addr'}}`,
            encodeURIComponent(String(stakeAddr)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
            ...HEADER_AMOUNTS_AS_STRING,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Returns per-epoch history for the specified stake key
     * @summary Stake account history
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountHistoryQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountHistory: (
        stakeAddr: string,
        localVarQueryParameter: AccountHistoryQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'stakeAddr' is not null or undefined
        assertParamExists('accountHistory', 'stakeAddr', stakeAddr);
        const localVarPath = `/accounts/{stake_addr}/history`.replace(
            `{${'stake_addr'}}`,
            encodeURIComponent(String(stakeAddr)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Returns various information regarding a stake account
     * @summary Stake account information
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountInfo: (stakeAddr: string, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'stakeAddr' is not null or undefined
        assertParamExists('accountInfo', 'stakeAddr', stakeAddr);
        const localVarPath = `/accounts/{stake_addr}`.replace(
            `{${'stake_addr'}}`,
            encodeURIComponent(String(stakeAddr)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;
        const localVarQueryParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
     * @summary Stake account rewards
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountRewardsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountRewards: (
        stakeAddr: string,
        localVarQueryParameter: AccountRewardsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'stakeAddr' is not null or undefined
        assertParamExists('accountRewards', 'stakeAddr', stakeAddr);
        const localVarPath = `/accounts/{stake_addr}/rewards`.replace(
            `{${'stake_addr'}}`,
            encodeURIComponent(String(stakeAddr)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
     * @summary Stake account updates
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {AccountUpdatesQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountUpdates: (
        stakeAddr: string,
        localVarQueryParameter: AccountUpdatesQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'stakeAddr' is not null or undefined
        assertParamExists('accountUpdates', 'stakeAddr', stakeAddr);
        const localVarPath = `/accounts/{stake_addr}/updates`.replace(
            `{${'stake_addr'}}`,
            encodeURIComponent(String(stakeAddr)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
});

/**
 * AccountsApi - functional programming interface
 * @export
 */
export const AccountsApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = AccountsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns a list of addresses seen on-chain which use the specified stake key
         * @summary Stake account addresses
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {AccountAddressesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountAddresses(
            stakeAddr: string,
            queryParams?: AccountAddressesQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAddress> {
            const localVarAxiosArgs = localVarAxiosParamCreator.accountAddresses(stakeAddr, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of native assets which are owned by addresses with the specified stake key
         * @summary Stake account assets
         * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
         * @param {AccountAssetsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountAssets(
            stakeAddr: string,
            queryParams?: AccountAssetsQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAsset> {
            const localVarAxiosArgs = localVarAxiosParamCreator.accountAssets(stakeAddr, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns per-epoch history for the specified stake key
         * @summary Stake account history
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {AccountHistoryQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountHistory(
            stakeAddr: string,
            queryParams?: AccountHistoryQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAccountHistory> {
            const localVarAxiosArgs = localVarAxiosParamCreator.accountHistory(stakeAddr, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns various information regarding a stake account
         * @summary Stake account information
         * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountInfo(stakeAddr: string, options?: AxiosRequestConfig): () => Promise<TimestampedAccountInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.accountInfo(stakeAddr, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
         * @summary Stake account rewards
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {AccountRewardsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountRewards(
            stakeAddr: string,
            queryParams?: AccountRewardsQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAccountReward> {
            const localVarAxiosArgs = localVarAxiosParamCreator.accountRewards(stakeAddr, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
         * @summary Stake account updates
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {AccountUpdatesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountUpdates(
            stakeAddr: string,
            queryParams?: AccountUpdatesQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAccountUpdate> {
            const localVarAxiosArgs = localVarAxiosParamCreator.accountUpdates(stakeAddr, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
