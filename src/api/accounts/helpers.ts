import globalAxios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    assertParamExists,
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    createRequestFunction,
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
import { AccountAddressesQueryParams } from './type';

/**
 * AccountsApi - axios parameter creator
 * @export
 */
export const AccountsApiAxiosParamCreator = function (configuration: Configuration) {
    return {
        /**
         * Returns a list of addresses seen on-chain which use the specified stake key
         * @summary Stake account addresses
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {AccountAddressesQueryParams | null} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountAddresses: async (
            stakeAddr: string,
            localVarQueryParameter: AccountAddressesQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
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
            const localVarHeaderParameter = {} as any;

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
         * @param {string | null} [policy] Filter results to only show assets of the specified policy
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountAssets: async (
            stakeAddr: string,
            policy?: string | null,
            count?: number | null,
            cursor?: string | null,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
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
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            if (policy !== undefined) {
                localVarQueryParameter.policy = policy;
            }

            if (count !== undefined) {
                localVarQueryParameter.count = count;
            }

            if (cursor !== undefined) {
                localVarQueryParameter.cursor = cursor;
            }

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
         * Returns per-epoch history for the specified stake key
         * @summary Stake account history
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [epochNo] Fetch result for only a specific epoch
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountHistory: async (
            stakeAddr: string,
            epochNo?: number | null,
            count?: number | null,
            cursor?: string | null,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
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
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            if (epochNo !== undefined) {
                localVarQueryParameter.epoch_no = epochNo;
            }

            if (count !== undefined) {
                localVarQueryParameter.count = count;
            }

            if (cursor !== undefined) {
                localVarQueryParameter.cursor = cursor;
            }

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
        accountInfo: async (stakeAddr: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountRewards: async (
            stakeAddr: string,
            count?: number | null,
            cursor?: string | null,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
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
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            if (count !== undefined) {
                localVarQueryParameter.count = count;
            }

            if (cursor !== undefined) {
                localVarQueryParameter.cursor = cursor;
            }

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
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountUpdates: async (
            stakeAddr: string,
            count?: number | null,
            cursor?: string | null,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
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
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            if (count !== undefined) {
                localVarQueryParameter.count = count;
            }

            if (cursor !== undefined) {
                localVarQueryParameter.cursor = cursor;
            }

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
    };
};

/**
 * AccountsApi - factory interface
 * @export
 */
export const AccountsApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AccountsApiFp(configuration);
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
            queryParams: AccountAddressesQueryParams,
            options?: any,
        ): AxiosPromise<PaginatedAddress> {
            return localVarFp
                .accountAddresses(stakeAddr, queryParams, options)
                .then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of native assets which are owned by addresses with the specified stake key
         * @summary Stake account assets
         * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
         * @param {string | null} [policy] Filter results to only show assets of the specified policy
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountAssets(
            stakeAddr: string,
            policy?: string | null,
            count?: number | null,
            cursor?: string | null,
            options?: any,
        ): AxiosPromise<PaginatedAsset> {
            return localVarFp
                .accountAssets(stakeAddr, policy, count, cursor, options)
                .then((request) => request(axios, basePath));
        },
        /**
         * Returns per-epoch history for the specified stake key
         * @summary Stake account history
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [epochNo] Fetch result for only a specific epoch
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountHistory(
            stakeAddr: string,
            epochNo?: number | null,
            count?: number | null,
            cursor?: string | null,
            options?: any,
        ): AxiosPromise<PaginatedAccountHistory> {
            return localVarFp
                .accountHistory(stakeAddr, epochNo, count, cursor, options)
                .then((request) => request(axios, basePath));
        },
        /**
         * Returns various information regarding a stake account
         * @summary Stake account information
         * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountInfo(stakeAddr: string, options?: any): AxiosPromise<TimestampedAccountInfo> {
            return localVarFp.accountInfo(stakeAddr, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
         * @summary Stake account rewards
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountRewards(
            stakeAddr: string,
            count?: number | null,
            cursor?: string | null,
            options?: any,
        ): AxiosPromise<PaginatedAccountReward> {
            return localVarFp
                .accountRewards(stakeAddr, count, cursor, options)
                .then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
         * @summary Stake account updates
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        accountUpdates(
            stakeAddr: string,
            count?: number | null,
            cursor?: string | null,
            options?: any,
        ): AxiosPromise<PaginatedAccountUpdate> {
            return localVarFp
                .accountUpdates(stakeAddr, count, cursor, options)
                .then((request) => request(axios, basePath));
        },
    };
};

/**
 * AccountsApi - functional programming interface
 * @export
 */
export const AccountsApiFp = function (configuration: Configuration) {
    const localVarAxiosParamCreator = AccountsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns a list of addresses seen on-chain which use the specified stake key
         * @summary Stake account addresses
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {AccountAddressesQueryParams | null} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async accountAddresses(
            stakeAddr: string,
            queryParams?: AccountAddressesQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAddress>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.accountAddresses(stakeAddr, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns a list of native assets which are owned by addresses with the specified stake key
         * @summary Stake account assets
         * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
         * @param {string | null} [policy] Filter results to only show assets of the specified policy
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async accountAssets(
            stakeAddr: string,
            policy?: string | null,
            count?: number | null,
            cursor?: string | null,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAsset>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.accountAssets(
                stakeAddr,
                policy,
                count,
                cursor,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns per-epoch history for the specified stake key
         * @summary Stake account history
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [epochNo] Fetch result for only a specific epoch
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async accountHistory(
            stakeAddr: string,
            epochNo?: number | null,
            count?: number | null,
            cursor?: string | null,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAccountHistory>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.accountHistory(
                stakeAddr,
                epochNo,
                count,
                cursor,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns various information regarding a stake account
         * @summary Stake account information
         * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async accountInfo(
            stakeAddr: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAccountInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.accountInfo(stakeAddr, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
         * @summary Stake account rewards
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async accountRewards(
            stakeAddr: string,
            count?: number | null,
            cursor?: string | null,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAccountReward>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.accountRewards(stakeAddr, count, cursor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
         * @summary Stake account updates
         * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
         * @param {number | null} [count] The max number of results per page
         * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async accountUpdates(
            stakeAddr: string,
            count?: number | null,
            cursor?: string | null,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAccountUpdate>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.accountUpdates(stakeAddr, count, cursor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
    };
};
