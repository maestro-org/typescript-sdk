import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    assertParamExists,
    createRequestFunction,
} from '../../common';
import { Configuration } from '../../configuration';
import { TxManagerState } from '../type';
import { TxManagerHistoryQueryParams } from './type';

/**
 * TransactionManagerApi - axios parameter creator
 * @export
 */
export const TransactionManagerApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns the history of submitted transactions
     * @summary Transactions history
     * @param {TxManagerHistoryQueryParams} [localVarQueryParameter] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txManagerHistory: async (
        localVarQueryParameter: TxManagerHistoryQueryParams = {},
        options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
        const localVarPath = `/txmanager/history`;
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
     * Returns the most recent state of a transaction
     * @summary Transaction state
     * @param {string} txHash Hex encoded transaction hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txManagerState: async (txHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'txHash' is not null or undefined
        assertParamExists('txManagerState', 'txHash', txHash);
        const localVarPath = `/txmanager/{tx_hash}/state`.replace(`{${'tx_hash'}}`, encodeURIComponent(String(txHash)));
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
     * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [monitored by Maestro](../Dapp%20Platform/Transaction%20Manager).
     * @summary Submit transaction
     * @param {string | Uint8Array} body CBOR encoded transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txManagerSubmit: async (body: string | Uint8Array, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        assertParamExists('txManagerSubmit', 'body', body);
        const localVarPath = `/txmanager`;
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;
        const localVarQueryParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        localVarHeaderParameter['Content-Type'] = 'application/cbor';

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };
        localVarRequestOptions.data = typeof body === 'string' ? Buffer.from(body, 'hex') : Buffer.from(body);
        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
    /**
     * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [Turbo Submitted and Monitored by Maestro](../Dapp%20Platform/Turbo%20Transaction).
     * @summary Turbo submit transaction
     * @param {string | Uint8Array} body CBOR encoded transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txManagerTurboSubmit: async (body: string | Uint8Array, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'body' is not null or undefined
        assertParamExists('txManagerTurboSubmit', 'body', body);
        const localVarPath = `/txmanager/turbosubmit`;
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;
        const localVarQueryParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

        localVarHeaderParameter['Content-Type'] = 'application/cbor';

        setSearchParams(localVarUrlObj, localVarQueryParameter);
        const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
        localVarRequestOptions.headers = {
            ...localVarHeaderParameter,
            ...headersFromBaseOptions,
            ...options.headers,
        };
        localVarRequestOptions.data = typeof body === 'string' ? Buffer.from(body, 'hex') : Buffer.from(body);
        return {
            url: toPathString(localVarUrlObj),
            options: localVarRequestOptions,
        };
    },
});

/**
 * TransactionManagerApi - functional programming interface
 * @export
 */
export const TransactionManagerApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = TransactionManagerApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the history of submitted transactions
         * @summary Transactions history
         * @param {TxManagerHistoryQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txManagerHistory(
            queryParams?: TxManagerHistoryQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TxManagerState>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txManagerHistory(queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the most recent state of a transaction
         * @summary Transaction state
         * @param {string} txHash Hex encoded transaction hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txManagerState(
            txHash: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TxManagerState>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txManagerState(txHash, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [monitored by Maestro](../Dapp%20Platform/Transaction%20Manager).
         * @summary Submit transaction
         * @param {string | Uint8Array} body CBOR encoded transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txManagerSubmit(
            body: string | Uint8Array,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txManagerSubmit(body, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [Turbo Submitted and Monitored by Maestro](../Dapp%20Platform/Turbo%20Transaction).
         * @summary Turbo submit transaction
         * @param {string | Uint8Array} body CBOR encoded transaction
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txManagerTurboSubmit(
            body: string | Uint8Array,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txManagerTurboSubmit(body, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
