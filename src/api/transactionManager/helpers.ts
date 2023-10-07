import globalAxios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    assertParamExists,
    serializeDataIfNeeded,
    createRequestFunction,
} from '../../common';
import { Configuration } from '../../configuration';
import { TxManagerState } from '../type';
import { TxManagerHistoryQueryParams } from './type';

/**
 * TransactionManagerApi - axios parameter creator
 * @export
 */
export const TransactionManagerApiAxiosParamCreator = function (configuration: Configuration) {
    return {
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
         * Returns the most recent state of a transaction
         * @summary Transaction state
         * @param {string} txHash Hex encoded transaction hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txManagerState: async (txHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'txHash' is not null or undefined
            assertParamExists('txManagerState', 'txHash', txHash);
            const localVarPath = `/txmanager/{tx_hash}/state`.replace(
                `{${'tx_hash'}}`,
                encodeURIComponent(String(txHash)),
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
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
        txManagerTurboSubmit: async (
            body: string | Uint8Array,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('txManagerTurboSubmit', 'body', body);
            const localVarPath = `/txmanager/turbosubmit`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            const { baseOptions } = configuration;

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

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
    };
};

/**
 * TransactionManagerApi - functional programming interface
 * @export
 */
export const TransactionManagerApiFp = function (configuration: Configuration) {
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
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
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
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
    };
};

// /**
//  * TransactionManagerApi - factory interface
//  * @export
//  */
// export const TransactionManagerApiFactory = function (
//     configuration: Configuration,
//     basePath?: string,
//     axios?: AxiosInstance,
// ) {
//     const localVarFp = TransactionManagerApiFp(configuration);
//     return {
//         /**
//          * Returns the history of submitted transactions
//          * @summary Transactions history
//          * @param {number} [count] The max number of results per pagination page
//          * @param {number} [page] Pagination page number to show results for
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txManagerHistory(count?: number, page?: number, options?: any): AxiosPromise<Array<TxManagerState>> {
//             return localVarFp.txManagerHistory(count, page, options).then((request) => request(axios, basePath));
//         },
//         /**
//          * Returns the most recent state of a transaction
//          * @summary Transaction state
//          * @param {string} txHash Hex encoded transaction hash
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txManagerState(txHash: string, options?: any): AxiosPromise<TxManagerState> {
//             return localVarFp.txManagerState(txHash, options).then((request) => request(axios, basePath));
//         },
//         /**
//          * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [monitored by Maestro](../Dapp%20Platform/Transaction%20Manager).
//          * @summary Submit transaction
//          * @param {string} body CBOR encoded transaction
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txManagerSubmit(body: string, options?: any): AxiosPromise<string> {
//             return localVarFp.txManagerSubmit(body, options).then((request) => request(axios, basePath));
//         },
//         /**
//          * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [Turbo Submitted and Monitored by Maestro](../Dapp%20Platform/Turbo%20Transaction).
//          * @summary Turbo submit transaction
//          * @param {string} body CBOR encoded transaction
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txManagerTurboSubmit(body: string, options?: any): AxiosPromise<string> {
//             return localVarFp.txManagerTurboSubmit(body, options).then((request) => request(axios, basePath));
//         },
//     };
// };
