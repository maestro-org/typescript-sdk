import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from "axios";
import globalAxios from "axios";
import { RequestArgs } from "../../base";
import {
  DUMMY_BASE_URL,
  setApiKeyToObject,
  setSearchParams,
  toPathString,
  assertParamExists,
  createRequestFunction,
} from "../../common";
import { Configuration } from "../../configuration";
import {
  PaginatedPoolListInfo,
  PaginatedPoolBlock,
  PaginatedDelegatorInfo,
  PaginatedPoolHistory,
  TimestampedPoolInfo,
  TimestampedPoolMetadata,
  TimestampedPoolRelays,
  TimestampedPoolUpdates,
} from "../type";
import { PoolBlocksOrderEnum, PoolHistoryOrderEnum } from "./type";

/**
 * PoolsApi - axios parameter creator
 * @export
 */
export const PoolsApiAxiosParamCreator = function (configuration: Configuration) {
  return {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPools: async (
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/pools`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (count !== undefined) {
        localVarQueryParameter["count"] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter["cursor"] = cursor;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolBlocks: async (
      poolId: string,
      epochNo?: number | null,
      count?: number | null,
      order?: PoolBlocksOrderEnum,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists("poolBlocks", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/blocks`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (epochNo !== undefined) {
        localVarQueryParameter["epoch_no"] = epochNo;
      }

      if (count !== undefined) {
        localVarQueryParameter["count"] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter["order"] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter["cursor"] = cursor;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolDelegators: async (
      poolId: string,
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists("poolDelegators", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/delegators`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (count !== undefined) {
        localVarQueryParameter["count"] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter["cursor"] = cursor;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolHistory: async (
      poolId: string,
      epochNo?: number | null,
      count?: number | null,
      order?: PoolHistoryOrderEnum,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists("poolHistory", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/history`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (epochNo !== undefined) {
        localVarQueryParameter["epoch_no"] = epochNo;
      }

      if (count !== undefined) {
        localVarQueryParameter["count"] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter["order"] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter["cursor"] = cursor;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

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
      assertParamExists("poolInfo", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/info`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

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
      assertParamExists("poolMetadata", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/metadata`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

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
      assertParamExists("poolRelays", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/relays`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

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
      assertParamExists("poolUpdates", "poolId", poolId);
      const localVarPath = `/pools/{pool_id}/updates`.replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * PoolsApi - functional programming interface
 * @export
 */
export const PoolsApiFp = function (configuration: Configuration) {
  const localVarAxiosParamCreator = PoolsApiAxiosParamCreator(configuration);
  return {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listPools(
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolListInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listPools(count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolBlocks(
      poolId: string,
      epochNo?: number | null,
      count?: number | null,
      order?: PoolBlocksOrderEnum,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolBlock>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolBlocks(
        poolId,
        epochNo,
        count,
        order,
        cursor,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolDelegators(
      poolId: string,
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedDelegatorInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolDelegators(poolId, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolHistory(
      poolId: string,
      epochNo?: number | null,
      count?: number | null,
      order?: PoolHistoryOrderEnum,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolHistory>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolHistory(
        poolId,
        epochNo,
        count,
        order,
        cursor,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolInfo(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolMetadata>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolMetadata(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolRelays>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolRelays(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolUpdates>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolUpdates(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  };
};

/**
 * PoolsApi - factory interface
 * @export
 */
export const PoolsApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = PoolsApiFp(configuration);
  return {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPools(count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedPoolListInfo> {
      return localVarFp.listPools(count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolBlocks(
      poolId: string,
      epochNo?: number | null,
      count?: number | null,
      order?: PoolBlocksOrderEnum,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedPoolBlock> {
      return localVarFp
        .poolBlocks(poolId, epochNo, count, order, cursor, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolDelegators(
      poolId: string,
      count?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedDelegatorInfo> {
      return localVarFp.poolDelegators(poolId, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolHistory(
      poolId: string,
      epochNo?: number | null,
      count?: number | null,
      order?: PoolHistoryOrderEnum,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedPoolHistory> {
      return localVarFp
        .poolHistory(poolId, epochNo, count, order, cursor, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns current information about the specified pool
     * @summary Stake pool information
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolInfo(poolId: string, options?: any): AxiosPromise<TimestampedPoolInfo> {
      return localVarFp.poolInfo(poolId, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the metadata declared on-chain by the specified stake pool
     * @summary Stake pool metadata
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolMetadata(poolId: string, options?: any): AxiosPromise<TimestampedPoolMetadata> {
      return localVarFp.poolMetadata(poolId, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of relays declared on-chain by the specified stake pool
     * @summary Stake pool relays
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolRelays(poolId: string, options?: any): AxiosPromise<TimestampedPoolRelays> {
      return localVarFp.poolRelays(poolId, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of updates relating to the specified pool
     * @summary Stake pool updates
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolUpdates(poolId: string, options?: any): AxiosPromise<TimestampedPoolUpdates> {
      return localVarFp.poolUpdates(poolId, options).then((request) => request(axios, basePath));
    },
  };
};
