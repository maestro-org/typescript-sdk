import globalAxios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    assertParamExists,
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    serializeDataIfNeeded,
    createRequestFunction,
} from '../../common';
import { Configuration } from '../../configuration';
import {
    TimestampedAddress,
    TimestampedTxCbor,
    TimestampedTransactionInfo,
    TimestampedUtxo,
    PaginatedUtxoWithBytes,
} from '../type';

/**
 * TransactionsApi - axios parameter creator
 * @export
 */
export const TransactionsApiAxiosParamCreator = function (configuration: Configuration) {
    return {
        /**
         * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
         * @summary Address by transaction output reference
         * @param {string} txHash Transaction Hash
         * @param {number} index Output Index
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addressByTxo: async (txHash: string, index: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'txHash' is not null or undefined
            assertParamExists('addressByTxo', 'txHash', txHash);
            // verify required parameter 'index' is not null or undefined
            assertParamExists('addressByTxo', 'index', index);
            const localVarPath = `/transactions/{tx_hash}/outputs/{index}/address`
                .replace(`{${'tx_hash'}}`, encodeURIComponent(String(txHash)))
                .replace(`{${'index'}}`, encodeURIComponent(String(index)));
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
         * Returns hex-encoded CBOR bytes of a transaction
         * @summary CBOR bytes of a transaction
         * @param {string} txHash Transaction Hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txCborByTxHash: async (txHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'txHash' is not null or undefined
            assertParamExists('txCborByTxHash', 'txHash', txHash);
            const localVarPath = `/transactions/{tx_hash}/cbor`.replace(
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
         * Returns detailed information about a transaction
         * @summary Transaction details
         * @param {string} txHash Transaction hash in hex
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txInfo: async (txHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'txHash' is not null or undefined
            assertParamExists('txInfo', 'txHash', txHash);
            const localVarPath = `/transactions/{tx_hash}`.replace(
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
         * Returns the specified transaction output.
         * @summary Transaction output by output reference
         * @param {string} txHash Transaction Hash
         * @param {number} index Output Index
         * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txoByTxoRef: async (
            txHash: string,
            index: number,
            withCbor?: boolean | null,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'txHash' is not null or undefined
            assertParamExists('txoByTxoRef', 'txHash', txHash);
            // verify required parameter 'index' is not null or undefined
            assertParamExists('txoByTxoRef', 'index', index);
            const localVarPath = `/transactions/{tx_hash}/outputs/{index}/txo`
                .replace(`{${'tx_hash'}}`, encodeURIComponent(String(txHash)))
                .replace(`{${'index'}}`, encodeURIComponent(String(index)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            const { baseOptions } = configuration;

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            if (withCbor !== undefined) {
                localVarQueryParameter.with_cbor = withCbor;
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
         * Returns the specified transaction outputs
         * @summary Transaction outputs by output references
         * @param {Array<string>} requestBody
         * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
         * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txosByTxoRefs: async (
            requestBody: Array<string>,
            resolveDatums?: boolean | null,
            withCbor?: boolean | null,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'requestBody' is not null or undefined
            assertParamExists('txosByTxoRefs', 'requestBody', requestBody);
            const localVarPath = `/transactions/outputs`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            const { baseOptions } = configuration;

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            if (resolveDatums !== undefined) {
                localVarQueryParameter.resolve_datums = resolveDatums;
            }

            if (withCbor !== undefined) {
                localVarQueryParameter.with_cbor = withCbor;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
            };
            localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration);

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};

/**
 * TransactionsApi - functional programming interface
 * @export
 */
export const TransactionsApiFp = function (configuration: Configuration) {
    const localVarAxiosParamCreator = TransactionsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
         * @summary Address by transaction output reference
         * @param {string} txHash Transaction Hash
         * @param {number} index Output Index
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addressByTxo(
            txHash: string,
            index: number,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAddress>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addressByTxo(txHash, index, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns hex-encoded CBOR bytes of a transaction
         * @summary CBOR bytes of a transaction
         * @param {string} txHash Transaction Hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txCborByTxHash(
            txHash: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedTxCbor>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txCborByTxHash(txHash, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns detailed information about a transaction
         * @summary Transaction details
         * @param {string} txHash Transaction hash in hex
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txInfo(
            txHash: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedTransactionInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txInfo(txHash, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns the specified transaction output.
         * @summary Transaction output by output reference
         * @param {string} txHash Transaction Hash
         * @param {number} index Output Index
         * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txoByTxoRef(
            txHash: string,
            index: number,
            withCbor?: boolean | null,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedUtxo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txoByTxoRef(txHash, index, withCbor, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
        /**
         * Returns the specified transaction outputs
         * @summary Transaction outputs by output references
         * @param {Array<string>} requestBody
         * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
         * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txosByTxoRefs(
            requestBody: Array<string>,
            resolveDatums?: boolean | null,
            withCbor?: boolean | null,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithBytes>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txosByTxoRefs(
                requestBody,
                resolveDatums,
                withCbor,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
    };
};

/**
 * TransactionsApi - factory interface
 * @export
 */
export const TransactionsApiFactory = function (
    configuration: Configuration,
    basePath?: string,
    axios?: AxiosInstance,
) {
    const localVarFp = TransactionsApiFp(configuration);
    return {
        /**
         * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
         * @summary Address by transaction output reference
         * @param {string} txHash Transaction Hash
         * @param {number} index Output Index
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addressByTxo(txHash: string, index: number, options?: any): AxiosPromise<TimestampedAddress> {
            return localVarFp.addressByTxo(txHash, index, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns hex-encoded CBOR bytes of a transaction
         * @summary CBOR bytes of a transaction
         * @param {string} txHash Transaction Hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txCborByTxHash(txHash: string, options?: any): AxiosPromise<TimestampedTxCbor> {
            return localVarFp.txCborByTxHash(txHash, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns detailed information about a transaction
         * @summary Transaction details
         * @param {string} txHash Transaction hash in hex
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txInfo(txHash: string, options?: any): AxiosPromise<TimestampedTransactionInfo> {
            return localVarFp.txInfo(txHash, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns the specified transaction output.
         * @summary Transaction output by output reference
         * @param {string} txHash Transaction Hash
         * @param {number} index Output Index
         * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txoByTxoRef(
            txHash: string,
            index: number,
            withCbor?: boolean | null,
            options?: any,
        ): AxiosPromise<TimestampedUtxo> {
            return localVarFp.txoByTxoRef(txHash, index, withCbor, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns the specified transaction outputs
         * @summary Transaction outputs by output references
         * @param {Array<string>} requestBody
         * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
         * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txosByTxoRefs(
            requestBody: Array<string>,
            resolveDatums?: boolean | null,
            withCbor?: boolean | null,
            options?: any,
        ): AxiosPromise<PaginatedUtxoWithBytes> {
            return localVarFp
                .txosByTxoRefs(requestBody, resolveDatums, withCbor, options)
                .then((request) => request(axios, basePath));
        },
    };
};
