import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    assertParamExists,
    createRequestFunction,
    HEADER_AMOUNTS_AS_STRING,
} from '../../common';
import { Configuration } from '../../configuration';
import {
    PaginatedPoolListInfo,
    PaginatedPoolBlock,
    PaginatedDelegatorInfo,
    PaginatedPoolHistory,
    TimestampedPoolInfo,
    TimestampedPoolMetadata,
    TimestampedPoolRelays,
    TimestampedPoolUpdates,
} from '../type';
import { ListPoolsQueryParams, PoolBlocksQueryParams, PoolDelegatorsQueryParams, PoolHistoryQueryParams } from './type';

/**
 * PoolsApi - axios parameter creator
 * @export
 */
export const PoolsApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {ListPoolsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPools: async (
        localVarQueryParameter?: ListPoolsQueryParams,
        options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
        const localVarPath = `/pools`;
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
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {PoolBlocksQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolBlocks: async (
        poolId: string,
        localVarQueryParameter: PoolBlocksQueryParams = {},
        options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolBlocks', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/blocks`.replace(`{${'pool_id'}}`, encodeURIComponent(String(poolId)));
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
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {PoolDelegatorsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolDelegators: async (
        poolId: string,
        localVarQueryParameter: PoolDelegatorsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolDelegators', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/delegators`.replace(
            `{${'pool_id'}}`,
            encodeURIComponent(String(poolId)),
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
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {PoolHistoryQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolHistory: async (
        poolId: string,
        localVarQueryParameter: PoolHistoryQueryParams = {},
        options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolHistory', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/history`.replace(`{${'pool_id'}}`, encodeURIComponent(String(poolId)));
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
     * Returns current information about the specified pool
     * @summary Stake pool information
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolInfo: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolInfo', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/info`.replace(`{${'pool_id'}}`, encodeURIComponent(String(poolId)));
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
            ...HEADER_AMOUNTS_AS_STRING,
        };

        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Returns the metadata declared on-chain by the specified stake pool
     * @summary Stake pool metadata
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolMetadata: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolMetadata', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/metadata`.replace(`{${'pool_id'}}`, encodeURIComponent(String(poolId)));
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
     * Returns a list of relays declared on-chain by the specified stake pool
     * @summary Stake pool relays
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolRelays: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolRelays', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/relays`.replace(`{${'pool_id'}}`, encodeURIComponent(String(poolId)));
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
     * Returns a list of updates relating to the specified pool
     * @summary Stake pool updates
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolUpdates: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'poolId' is not null or undefined
        assertParamExists('poolUpdates', 'poolId', poolId);
        const localVarPath = `/pools/{pool_id}/updates`.replace(`{${'pool_id'}}`, encodeURIComponent(String(poolId)));
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
});

/**
 * PoolsApi - functional programming interface
 * @export
 */
export const PoolsApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = PoolsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns a list of currently registered stake pools
         * @summary List registered stake pools
         * @param {ListPoolsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listPools(
            queryParams?: ListPoolsQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolListInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listPools(queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
         * @summary Stake pool blocks
         * @param {string} poolId Pool ID in bech32 format
         * @param {PoolBlocksQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolBlocks(
            poolId: string,
            queryParams?: PoolBlocksQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolBlock>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolBlocks(poolId, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of delegators of the specified pool
         * @summary Stake pool delegators
         * @param {string} poolId Pool ID in bech32 format
         * @param {PoolDelegatorsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolDelegators(
            poolId: string,
            queryParams?: PoolDelegatorsQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedDelegatorInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolDelegators(poolId, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
         * @summary Stake pool history
         * @param {string} poolId Pool ID in bech32 format
         * @param  {PoolHistoryQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolHistory(
            poolId: string,
            queryParams?: PoolHistoryQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolHistory>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolHistory(poolId, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns current information about the specified pool
         * @summary Stake pool information
         * @param {string} poolId Pool ID in bech32 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolInfo(
            poolId: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolInfo(poolId, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the metadata declared on-chain by the specified stake pool
         * @summary Stake pool metadata
         * @param {string} poolId Pool ID in bech32 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolMetadata(
            poolId: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolMetadata>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolMetadata(poolId, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of relays declared on-chain by the specified stake pool
         * @summary Stake pool relays
         * @param {string} poolId Pool ID in bech32 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolRelays(
            poolId: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolRelays>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolRelays(poolId, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of updates relating to the specified pool
         * @summary Stake pool updates
         * @param {string} poolId Pool ID in bech32 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async poolUpdates(
            poolId: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolUpdates>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.poolUpdates(poolId, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
