import { AxiosRequestConfig } from 'axios';
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
} from '../type';
import {
    AssetAccountsQueryParams,
    AssetAddressesQueryParams,
    AssetTxsQueryParams,
    AssetUpdatesQueryParams,
    AssetUtxosQueryParams,
    PolicyAccountsQueryParams,
    PolicyAddressesQueryParams,
    PolicyInfoQueryParams,
    PolicyTxsQueryParams,
    PolicyUtxosQueryParams,
} from './type';

/**
 * AssetsApi - axios parameter creator
 * @export
 */
export const AssetsApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetAccountsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAccounts: (
        asset: string,
        localVarQueryParameter: AssetAccountsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'asset' is not null or undefined
        assertParamExists('assetAccounts', 'asset', asset);
        const localVarPath = `/assets/{asset}/accounts`.replace(`{${'asset'}}`, encodeURIComponent(String(asset)));
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
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetAddressesQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAddresses: (
        asset: string,
        localVarQueryParameter: AssetAddressesQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'asset' is not null or undefined
        assertParamExists('assetAddresses', 'asset', asset);
        const localVarPath = `/assets/{asset}/addresses`.replace(`{${'asset'}}`, encodeURIComponent(String(asset)));
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
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetInfo: (asset: string, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'asset' is not null or undefined
        assertParamExists('assetInfo', 'asset', asset);
        const localVarPath = `/assets/{asset}`.replace(`{${'asset'}}`, encodeURIComponent(String(asset)));
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
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetTxsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetTxs: (
        asset: string,
        localVarQueryParameter: AssetTxsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'asset' is not null or undefined
        assertParamExists('assetTxs', 'asset', asset);
        const localVarPath = `/assets/{asset}/transactions`.replace(`{${'asset'}}`, encodeURIComponent(String(asset)));
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
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetUpdatesQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUpdates: (
        asset: string,
        localVarQueryParameter: AssetUpdatesQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'asset' is not null or undefined
        assertParamExists('assetUpdates', 'asset', asset);
        const localVarPath = `/assets/{asset}/updates`.replace(`{${'asset'}}`, encodeURIComponent(String(asset)));
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
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetUpdatesQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUtxos: (
        asset: string,
        localVarQueryParameter: AssetUpdatesQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'asset' is not null or undefined
        assertParamExists('assetUtxos', 'asset', asset);
        const localVarPath = `/assets/{asset}/utxos`.replace(`{${'asset'}}`, encodeURIComponent(String(asset)));
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
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {PolicyAccountsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAccounts: (
        policy: string,
        localVarQueryParameter: PolicyAccountsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'policy' is not null or undefined
        assertParamExists('policyAccounts', 'policy', policy);
        const localVarPath = `/assets/policy/{policy}/accounts`.replace(
            `{${'policy'}}`,
            encodeURIComponent(String(policy)),
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
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {PolicyAddressesQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAddresses: (
        policy: string,
        localVarQueryParameter: PolicyAddressesQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'policy' is not null or undefined
        assertParamExists('policyAddresses', 'policy', policy);
        const localVarPath = `/assets/policy/{policy}/addresses`.replace(
            `{${'policy'}}`,
            encodeURIComponent(String(policy)),
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
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {PolicyInfoQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyInfo: (
        policy: string,
        localVarQueryParameter: PolicyInfoQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'policy' is not null or undefined
        assertParamExists('policyInfo', 'policy', policy);
        const localVarPath = `/policy/{policy}/assets`.replace(`{${'policy'}}`, encodeURIComponent(String(policy)));
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
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {PolicyTxsQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyTxs: (
        policy: string,
        localVarQueryParameter: PolicyTxsQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'policy' is not null or undefined
        assertParamExists('policyTxs', 'policy', policy);
        const localVarPath = `/policy/{policy}/txs`.replace(`{${'policy'}}`, encodeURIComponent(String(policy)));
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
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {PolicyUtxosQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyUtxos: (
        policy: string,
        localVarQueryParameter: PolicyUtxosQueryParams = {},
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'policy' is not null or undefined
        assertParamExists('policyUtxos', 'policy', policy);
        const localVarPath = `/policy/{policy}/utxos`.replace(`{${'policy'}}`, encodeURIComponent(String(policy)));
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
 * AssetsApi - functional programming interface
 * @export
 */
export const AssetsApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = AssetsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
         * @summary Accounts of addresses holding specific asset
         * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
         * @param {AssetAccountsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetAccounts(
            asset: string,
            queryParams?: AssetAccountsQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAssetHolderAccount> {
            const localVarAxiosArgs = localVarAxiosParamCreator.assetAccounts(asset, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of addresses which control some amount of the specified asset
         * @summary Native asset addresses
         * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
         * @param {AssetAddressesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetAddresses(
            asset: string,
            queryParams?: AssetAddressesQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAssetHolder> {
            const localVarAxiosArgs = localVarAxiosParamCreator.assetAddresses(asset, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Return a summary of information about an asset
         * @summary Native asset information
         * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetInfo(asset: string, options?: AxiosRequestConfig): () => Promise<TimestampedAssetInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.assetInfo(asset, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of transactions in which a transaction input or output contains some of the specified asset
         * @summary Native asset transactions
         * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
         * @param {AssetTxsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetTxs(
            asset: string,
            queryParams?: AssetTxsQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAssetTx> {
            const localVarAxiosArgs = localVarAxiosParamCreator.assetTxs(asset, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of transactions in which some of the specified asset was minted or burned
         * @summary Native asset updates
         * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
         * @param {AssetUpdatesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetUpdates(
            asset: string,
            queryParams?: AssetUpdatesQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedMintingTx> {
            const localVarAxiosArgs = localVarAxiosParamCreator.assetUpdates(asset, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
         * @summary Native asset UTxOs
         * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
         * @param {AssetUpdatesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assetUtxos(
            asset: string,
            queryParams?: AssetUtxosQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAssetUtxo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.assetUtxos(asset, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
         * @summary Accounts of addresses holding assets of specific policy
         * @param {string} policy Hex encoded Policy ID
         * @param {PolicyAccountsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        policyAccounts(
            policy: string,
            queryParams?: PolicyAccountsQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedPolicyHolderAccount> {
            const localVarAxiosArgs = localVarAxiosParamCreator.policyAccounts(policy, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of addresses which hold some of an asset of the specified policy ID
         * @summary Addresses holding assets of specific policy
         * @param {string} policy Hex encoded Policy ID
         * @param {PolicyAddressesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        policyAddresses(
            policy: string,
            queryParams?: PolicyAddressesQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedPolicyHolder> {
            const localVarAxiosArgs = localVarAxiosParamCreator.policyAddresses(policy, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns information about assets of the specified minting policy ID
         * @summary Information on assets of specific policy
         * @param {string} policy Hex encoded policy ID
         * @param {PolicyInfoQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        policyInfo(
            policy: string,
            queryParams?: PolicyInfoQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAssetInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.policyInfo(policy, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
         * @summary Transactions moving assets of specific policy
         * @param {string} policy Hex encoded policy ID
         * @param {PolicyTxsQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        policyTxs(
            policy: string,
            queryParams?: PolicyTxsQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedAssetTx> {
            const localVarAxiosArgs = localVarAxiosParamCreator.policyTxs(policy, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
         * @summary UTxOs containing assets of specific policy
         * @param {string} policy Hex encoded policy ID
         * @param {PolicyUtxosQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        policyUtxos(
            policy: string,
            queryParams?: PolicyUtxosQueryParams,
            options?: AxiosRequestConfig,
        ): () => Promise<PaginatedPolicyUtxo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.policyUtxos(policy, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
