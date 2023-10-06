import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from "axios";
import globalAxios from "axios";
import { RequestArgs } from "../../base";
import {
  assertParamExists,
  DUMMY_BASE_URL,
  setApiKeyToObject,
  setSearchParams,
  toPathString,
  createRequestFunction,
} from "../../common";
import { Configuration } from "../../configuration";
import {
  PaginatedAssetHolderAccount,
  PaginatedAssetHolder,
  TimestampedAssetInfo,
  PaginatedAssetTx,
  PaginatedMintingTx,
  PaginatedAssetUtxo,
  PaginatedPolicyHolderAccount,
  PaginatedPolicyHolder,
  PaginatedAssetInfo,
  PaginatedPolicyUtxo,
} from "../type";
import {
  AssetTxsOrderEnum,
  AssetUpdatesOrderEnum,
  AssetUtxosOrderEnum,
  PolicyTxsOrderEnum,
  PolicyUtxosOrderEnum,
} from "./type";

/**
 * AssetsApi - axios parameter creator
 * @export
 */
export const AssetsApiAxiosParamCreator = function (configuration: Configuration) {
  return {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAccounts: async (
      asset: string,
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists("assetAccounts", "asset", asset);
      const localVarPath = `/assets/{asset}/accounts`.replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
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
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAddresses: async (
      asset: string,
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists("assetAddresses", "asset", asset);
      const localVarPath = `/assets/{asset}/addresses`.replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
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
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetInfo: async (asset: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists("assetInfo", "asset", asset);
      const localVarPath = `/assets/{asset}`.replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
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
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetTxs: async (
      asset: string,
      fromHeight?: number | null,
      count?: number | null,
      order?: AssetTxsOrderEnum,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists("assetTxs", "asset", asset);
      const localVarPath = `/assets/{asset}/txs`.replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (fromHeight !== undefined) {
        localVarQueryParameter["from_height"] = fromHeight;
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
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUpdates: async (
      asset: string,
      count?: number | null,
      order?: AssetUpdatesOrderEnum,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists("assetUpdates", "asset", asset);
      const localVarPath = `/assets/{asset}/updates`.replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
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
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUtxos: async (
      asset: string,
      address?: string | null,
      count?: number | null,
      order?: AssetUtxosOrderEnum,
      from?: number | null,
      to?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists("assetUtxos", "asset", asset);
      const localVarPath = `/assets/{asset}/utxos`.replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (address !== undefined) {
        localVarQueryParameter["address"] = address;
      }

      if (count !== undefined) {
        localVarQueryParameter["count"] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter["order"] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter["from"] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter["to"] = to;
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
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAccounts: async (
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists("policyAccounts", "policy", policy);
      const localVarPath = `/assets/policy/{policy}/accounts`.replace(
        `{${"policy"}}`,
        encodeURIComponent(String(policy))
      );
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
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAddresses: async (
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists("policyAddresses", "policy", policy);
      const localVarPath = `/assets/policy/{policy}/addresses`.replace(
        `{${"policy"}}`,
        encodeURIComponent(String(policy))
      );
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
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyInfo: async (
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists("policyInfo", "policy", policy);
      const localVarPath = `/assets/policy/{policy}`.replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
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
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyTxs: async (
      policy: string,
      fromHeight?: number | null,
      count?: number | null,
      order?: PolicyTxsOrderEnum,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists("policyTxs", "policy", policy);
      const localVarPath = `/assets/policy/{policy}/txs`.replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      if (fromHeight !== undefined) {
        localVarQueryParameter["from_height"] = fromHeight;
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
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyUtxos: async (
      policy: string,
      count?: number | null,
      order?: PolicyUtxosOrderEnum,
      from?: number | null,
      to?: number | null,
      cursor?: string | null,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists("policyUtxos", "policy", policy);
      const localVarPath = `/assets/policy/{policy}/utxos`.replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
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

      if (order !== undefined) {
        localVarQueryParameter["order"] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter["from"] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter["to"] = to;
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
  };
};

/**
 * AssetsApi - functional programming interface
 * @export
 */
export const AssetsApiFp = function (configuration: Configuration) {
  const localVarAxiosParamCreator = AssetsApiAxiosParamCreator(configuration);
  return {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetAccounts(
      asset: string,
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetHolderAccount>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetAccounts(asset, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetAddresses(
      asset: string,
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetHolder>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetAddresses(asset, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetInfo(
      asset: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAssetInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetInfo(asset, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetTxs(
      asset: string,
      fromHeight?: number | null,
      count?: number | null,
      order?: AssetTxsOrderEnum,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetTx>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetTxs(
        asset,
        fromHeight,
        count,
        order,
        cursor,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetUpdates(
      asset: string,
      count?: number | null,
      order?: AssetUpdatesOrderEnum,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedMintingTx>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetUpdates(asset, count, order, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetUtxos(
      asset: string,
      address?: string | null,
      count?: number | null,
      order?: AssetUtxosOrderEnum,
      from?: number | null,
      to?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetUtxo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetUtxos(
        asset,
        address,
        count,
        order,
        from,
        to,
        cursor,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyAccounts(
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPolicyHolderAccount>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyAccounts(policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyAddresses(
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPolicyHolder>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyAddresses(policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyInfo(
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyInfo(policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyTxs(
      policy: string,
      fromHeight?: number | null,
      count?: number | null,
      order?: PolicyTxsOrderEnum,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetTx>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyTxs(
        policy,
        fromHeight,
        count,
        order,
        cursor,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyUtxos(
      policy: string,
      count?: number | null,
      order?: PolicyUtxosOrderEnum,
      from?: number | null,
      to?: number | null,
      cursor?: string | null,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPolicyUtxo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyUtxos(
        policy,
        count,
        order,
        from,
        to,
        cursor,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  };
};

/**
 * AssetsApi - factory interface
 * @export
 */
export const AssetsApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = AssetsApiFp(configuration);
  return {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAccounts(
      asset: string,
      count?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedAssetHolderAccount> {
      return localVarFp.assetAccounts(asset, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAddresses(
      asset: string,
      count?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedAssetHolder> {
      return localVarFp.assetAddresses(asset, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetInfo(asset: string, options?: any): AxiosPromise<TimestampedAssetInfo> {
      return localVarFp.assetInfo(asset, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetTxs(
      asset: string,
      fromHeight?: number | null,
      count?: number | null,
      order?: AssetTxsOrderEnum,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedAssetTx> {
      return localVarFp
        .assetTxs(asset, fromHeight, count, order, cursor, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUpdates(
      asset: string,
      count?: number | null,
      order?: AssetUpdatesOrderEnum,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedMintingTx> {
      return localVarFp.assetUpdates(asset, count, order, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUtxos(
      asset: string,
      address?: string | null,
      count?: number | null,
      order?: AssetUtxosOrderEnum,
      from?: number | null,
      to?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedAssetUtxo> {
      return localVarFp
        .assetUtxos(asset, address, count, order, from, to, cursor, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAccounts(
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedPolicyHolderAccount> {
      return localVarFp.policyAccounts(policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAddresses(
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedPolicyHolder> {
      return localVarFp.policyAddresses(policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyInfo(
      policy: string,
      count?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedAssetInfo> {
      return localVarFp.policyInfo(policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyTxs(
      policy: string,
      fromHeight?: number | null,
      count?: number | null,
      order?: PolicyTxsOrderEnum,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedAssetTx> {
      return localVarFp
        .policyTxs(policy, fromHeight, count, order, cursor, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyUtxos(
      policy: string,
      count?: number | null,
      order?: PolicyUtxosOrderEnum,
      from?: number | null,
      to?: number | null,
      cursor?: string | null,
      options?: any
    ): AxiosPromise<PaginatedPolicyUtxo> {
      return localVarFp
        .policyUtxos(policy, count, order, from, to, cursor, options)
        .then((request) => request(axios, basePath));
    },
  };
};
