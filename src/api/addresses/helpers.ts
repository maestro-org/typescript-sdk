import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    assertParamExists,
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    serializeDataIfNeeded,
    createRequestFunction,
    HEADER_AMOUNTS_AS_STRING,
} from '../../common';
import { Configuration } from '../../configuration';
import {
    AddressInfo,
    TimestampedTxCount,
    PaginatedAddressTransaction,
    PaginatedPaymentCredentialTransaction,
    PaginatedUtxoRef,
    PaginatedUtxoWithSlot,
} from '../type';
import {
    TxsByAddressQueryParams,
    TxsByPaymentCredQueryParams,
    UtxoRefsAtAddressQueryParams,
    UtxosByAddressQueryParams,
    UtxosByAddressesQueryParams,
    UtxosByPaymentCredQueryParams,
} from './type';

/**
 * AddressesApi - axios parameter creator
 * @export
 */
export const AddressesApiAxiosParamCreator = function (configuration: Configuration) {
    return {
        /**
         * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
         * @summary Decode address
         * @param {string} address Address in bech32/hex/base58 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        decodeAddress: async (address: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'address' is not null or undefined
            assertParamExists('decodeAddress', 'address', address);
            const localVarPath = `/addresses/{address}/decode`.replace(
                `{${'address'}}`,
                encodeURIComponent(String(address)),
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
         * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
         * @summary Address transaction count
         * @param {string} address Address in bech32 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txCountByAddress: async (address: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'address' is not null or undefined
            assertParamExists('txCountByAddress', 'address', address);
            const localVarPath = `/addresses/{address}/transactions/count`.replace(
                `{${'address'}}`,
                encodeURIComponent(String(address)),
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
         * Returns transactions in which the specified address spent or received funds.  Specifically, the transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
         * @summary Address transactions
         * @param {string} address Address in bech32 format
         * @param {TxsByAddressQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txsByAddress: async (
            address: string,
            localVarQueryParameter?: TxsByAddressQueryParams,
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'address' is not null or undefined
            assertParamExists('txsByAddress', 'address', address);
            const localVarPath = `/addresses/{address}/transactions`.replace(
                `{${'address'}}`,
                encodeURIComponent(String(address)),
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
         * Returns transactions in which the specified payment credential spent or received funds.  Specifically, the transactions where: the payment credential was used in an address which controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
         * @summary Payment credential transactions
         * @param {string} credential Payment credential in bech32 format
         * @param {TxsByPaymentCredQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        txsByPaymentCred: async (
            credential: string,
            localVarQueryParameter: TxsByPaymentCredQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'credential' is not null or undefined
            assertParamExists('txsByPaymentCred', 'credential', credential);
            const localVarPath = `/addresses/cred/{credential}/transactions`.replace(
                `{${'credential'}}`,
                encodeURIComponent(String(credential)),
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
         * Returns references (pair of transaction hash and output index in transaction) for UTxOs controlled by the specified address
         * @summary UTxO references at an address
         * @param {string} address Address in bech32 format
         * @param {UtxoRefsAtAddressQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        utxoRefsAtAddress: async (
            address: string,
            localVarQueryParameter: UtxoRefsAtAddressQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'address' is not null or undefined
            assertParamExists('utxoRefsAtAddress', 'address', address);
            const localVarPath = `/addresses/{address}/utxo_refs`.replace(
                `{${'address'}}`,
                encodeURIComponent(String(address)),
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
         * Return detailed information on UTxOs controlled by an address
         * @summary UTxOs at an address
         * @param {string} address Address in bech32 format
         * @param {UtxosByAddressQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        utxosByAddress: async (
            address: string,
            localVarQueryParameter: UtxosByAddressQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'address' is not null or undefined
            assertParamExists('utxosByAddress', 'address', address);
            const localVarPath = `/addresses/{address}/utxos`.replace(
                `{${'address'}}`,
                encodeURIComponent(String(address)),
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
                ...HEADER_AMOUNTS_AS_STRING,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Return detailed information on UTxOs which are controlled by some address in the specified list of addresses
         * @summary UTxOs at multiple addresses
         * @param {Array<string>} requestBody
         * @param {UtxosByAddressesQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        utxosByAddresses: async (
            requestBody: Array<string>,
            localVarQueryParameter: UtxosByAddressesQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'requestBody' is not null or undefined
            assertParamExists('utxosByAddresses', 'requestBody', requestBody);
            const localVarPath = `/addresses/utxos`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            const { baseOptions } = configuration;

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
                ...HEADER_AMOUNTS_AS_STRING,
            };
            localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration);

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Return detailed information on UTxOs controlled by addresses which use the specified payment credential
         * @summary UTxOs by payment credential
         * @param {string} credential Payment credential in bech32 format
         * @param {UtxosByPaymentCredQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        utxosByPaymentCred: async (
            credential: string,
            localVarQueryParameter: UtxosByPaymentCredQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'credential' is not null or undefined
            assertParamExists('utxosByPaymentCred', 'credential', credential);
            const localVarPath = `/addresses/cred/{credential}/utxos`.replace(
                `{${'credential'}}`,
                encodeURIComponent(String(credential)),
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
                ...HEADER_AMOUNTS_AS_STRING,
            };

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Return detailed information on UTxOs which are controlled by some payment credentials in the specified list of payment credentials
         * @summary UTxOs at multiple payment credentials
         * @param {Array<string>} requestBody
         * @param {UtxosByAddressesQueryParams} [localVarQueryParameter] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        utxosByPaymentCreds: async (
            requestBody: Array<string>,
            localVarQueryParameter: UtxosByAddressesQueryParams = {},
            options: AxiosRequestConfig = {},
        ): Promise<RequestArgs> => {
            // verify required parameter 'requestBody' is not null or undefined
            assertParamExists('utxosByPaymentCreds', 'requestBody', requestBody);
            const localVarPath = `/addresses/cred/utxos`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            const { baseOptions } = configuration;

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {} as any;

            // authentication api-key required
            setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            const headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {
                ...localVarHeaderParameter,
                ...headersFromBaseOptions,
                ...options.headers,
                ...HEADER_AMOUNTS_AS_STRING,
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
 * AddressesApi - functional programming interface
 * @export
 */
export const AddressesApiFp = function (configuration: Configuration) {
    const localVarAxiosParamCreator = AddressesApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
         * @summary Decode address
         * @param {string} address Address in bech32/hex/base58 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async decodeAddress(
            address: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AddressInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.decodeAddress(address, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
         * @summary Address transaction count
         * @param {string} address Address in bech32 format
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txCountByAddress(
            address: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedTxCount>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txCountByAddress(address, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns transactions in which the specified address spent or received funds.  Specifically, the transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
         * @summary Address transactions
         * @param {string} address Address in bech32 format
         * @param {TxsByAddressQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txsByAddress(
            address: string,
            queryParams?: TxsByAddressQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAddressTransaction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txsByAddress(address, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns transactions in which the specified payment credential spent or received funds.  Specifically, the transactions where: the payment credential was used in an address which controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
         * @summary Payment credential transactions
         * @param {string} credential Payment credential in bech32 format
         * @param {TxsByPaymentCredQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async txsByPaymentCred(
            credential: string,
            queryParams?: TxsByPaymentCredQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPaymentCredentialTransaction>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.txsByPaymentCred(
                credential,
                queryParams,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns references (pair of transaction hash and output index in transaction) for UTxOs controlled by the specified address
         * @summary UTxO references at an address
         * @param {string} address Address in bech32 format
         * @param {UtxoRefsAtAddressQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async utxoRefsAtAddress(
            address: string,
            queryParams?: UtxoRefsAtAddressQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoRef>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.utxoRefsAtAddress(address, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Return detailed information on UTxOs controlled by an address
         * @summary UTxOs at an address
         * @param {string} address Address in bech32 format
         * @param {UtxosByAddressQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async utxosByAddress(
            address: string,
            queryParams?: UtxosByAddressQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByAddress(address, queryParams, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Return detailed information on UTxOs which are controlled by some address in the specified list of addresses
         * @summary UTxOs at multiple addresses
         * @param {Array<string>} requestBody
         * @param {UtxosByAddressesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async utxosByAddresses(
            requestBody: Array<string>,
            queryParams?: UtxosByAddressesQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByAddresses(
                requestBody,
                queryParams,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Return detailed information on UTxOs controlled by addresses which use the specified payment credential
         * @summary UTxOs by payment credential
         * @param {string} credential Payment credential in bech32 format
         * @param {UtxosByPaymentCredQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async utxosByPaymentCred(
            credential: string,
            queryParams?: UtxosByPaymentCredQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByPaymentCred(
                credential,
                queryParams,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Return detailed information on UTxOs which are controlled by some payment credentials in the specified list of payment credentials
         * @summary UTxOs at multiple payment credentials
         * @param {Array<string>} requestBody
         * @param {UtxosByAddressesQueryParams} [queryParams] Query parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async utxosByPaymentCreds(
            requestBody: Array<string>,
            queryParams?: UtxosByAddressesQueryParams,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByPaymentCreds(
                requestBody,
                queryParams,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};

// /**
//  * AddressesApi - factory interface
//  * @export
//  */
// export const AddressesApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
//     const localVarFp = AddressesApiFp(configuration);
//     return {
//         /**
//          * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
//          * @summary Decode address
//          * @param {string} address Address in bech32/hex/base58 format
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         decodeAddress(address: string, options?: any): AxiosPromise<AddressInfo> {
//             return localVarFp.decodeAddress(address, options).then((request) => request(axios, basePath));
//         },
//         /**
//          * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
//          * @summary Address transaction count
//          * @param {string} address Address in bech32 format
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txCountByAddress(address: string, options?: any): AxiosPromise<TimestampedTxCount> {
//             return localVarFp.txCountByAddress(address, options).then((request) => request(axios, basePath));
//         },
//         /**
//          * Returns transactions in which the specified address spent or received funds.  Specifically, the transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
//          * @summary Address transactions
//          * @param {string} address Address in bech32 format
//          * @param {number | null} [count] The max number of results per page
//          * @param {TxsByAddressOrderEnum} [order] The order in which the results are sorted, by transaction age)
//          * @param {number | null} [from] Return only transactions minted on or after a specific slot
//          * @param {number | null} [to] Return only transactions minted on or before a specific slot
//          * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txsByAddress(
//             address: string,
//             count?: number | null,
//             order?: TxsByAddressOrderEnum,
//             from?: number | null,
//             to?: number | null,
//             cursor?: string | null,
//             options?: any,
//         ): AxiosPromise<PaginatedAddressTransaction> {
//             return localVarFp
//                 .txsByAddress(address, count, order, from, to, cursor, options)
//                 .then((request) => request(axios, basePath));
//         },
//         /**
//          * Returns transactions in which the specified payment credential spent or received funds.  Specifically, the transactions where: the payment credential was used in an address which controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
//          * @summary Payment credential transactions
//          * @param {string} credential Payment credential in bech32 format
//          * @param {number | null} [count] The max number of results per page
//          * @param {TxsByPaymentCredOrderEnum} [order] The order in which the results are sorted, by transaction age)
//          * @param {number | null} [from] Return only transactions minted on or after a specific slot
//          * @param {number | null} [to] Return only transactions minted on or before a specific slot
//          * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         txsByPaymentCred(
//             credential: string,
//             count?: number | null,
//             order?: TxsByPaymentCredOrderEnum,
//             from?: number | null,
//             to?: number | null,
//             cursor?: string | null,
//             options?: any,
//         ): AxiosPromise<PaginatedPaymentCredentialTransaction> {
//             return localVarFp
//                 .txsByPaymentCred(credential, count, order, from, to, cursor, options)
//                 .then((request) => request(axios, basePath));
//         },
//         /**
//          * Returns references (pair of transaction hash and output index in transaction) for UTxOs controlled by the specified address
//          * @summary UTxO references at an address
//          * @param {string} address Address in bech32 format
//          * @param {number | null} [count] The max number of results per page
//          * @param {UtxoRefsAtAddressOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
//          * @param {number | null} [from] Return only UTxOs created on or after a specific slot
//          * @param {number | null} [to] Return only UTxOs created before a specific slot
//          * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         utxoRefsAtAddress(
//             address: string,
//             count?: number | null,
//             order?: UtxoRefsAtAddressOrderEnum,
//             from?: number | null,
//             to?: number | null,
//             cursor?: string | null,
//             options?: any,
//         ): AxiosPromise<PaginatedUtxoRef> {
//             return localVarFp
//                 .utxoRefsAtAddress(address, count, order, from, to, cursor, options)
//                 .then((request) => request(axios, basePath));
//         },
//         /**
//          * Return detailed information on UTxOs controlled by an address
//          * @summary UTxOs at an address
//          * @param {string} address Address in bech32 format
//          * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
//          * @param {boolean | null} [withCbor] Include the CBOR encodings of the transaction outputs in the response
//          * @param {number | null} [count] The max number of results per page
//          * @param {UtxosByAddressOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
//          * @param {number | null} [from] Return only UTxOs created on or after a specific slot
//          * @param {number | null} [to] Return only UTxOs created before a specific slot
//          * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         utxosByAddress(
//             address: string,
//             resolveDatums?: boolean | null,
//             withCbor?: boolean | null,
//             count?: number | null,
//             order?: UtxosByAddressOrderEnum,
//             from?: number | null,
//             to?: number | null,
//             cursor?: string | null,
//             options?: any,
//         ): AxiosPromise<PaginatedUtxoWithSlot> {
//             return localVarFp
//                 .utxosByAddress(address, resolveDatums, withCbor, count, order, from, to, cursor, options)
//                 .then((request) => request(axios, basePath));
//         },
//         /**
//          * Return detailed information on UTxOs which are controlled by some address in the specified list of addresses
//          * @summary UTxOs at multiple addresses
//          * @param {Array<string>} requestBody
//          * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
//          * @param {boolean | null} [withCbor] Include the CBOR encodings of the transaction outputs in the response
//          * @param {number | null} [count] The max number of results per page
//          * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         utxosByAddresses(
//             requestBody: Array<string>,
//             resolveDatums?: boolean | null,
//             withCbor?: boolean | null,
//             count?: number | null,
//             cursor?: string | null,
//             options?: any,
//         ): AxiosPromise<PaginatedUtxoWithSlot> {
//             return localVarFp
//                 .utxosByAddresses(requestBody, resolveDatums, withCbor, count, cursor, options)
//                 .then((request) => request(axios, basePath));
//         },
//         /**
//          * Return detailed information on UTxOs controlled by addresses which use the specified payment credential
//          * @summary UTxOs by payment credential
//          * @param {string} credential Payment credential in bech32 format
//          * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
//          * @param {boolean | null} [withCbor] Include the CBOR encodings of the transaction outputs in the response
//          * @param {number | null} [count] The max number of results per page
//          * @param {UtxosByPaymentCredOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
//          * @param {number | null} [from] Return only UTxOs created on or after a specific slot
//          * @param {number | null} [to] Return only UTxOs created on or before a specific slot
//          * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         utxosByPaymentCred(
//             credential: string,
//             resolveDatums?: boolean | null,
//             withCbor?: boolean | null,
//             count?: number | null,
//             order?: UtxosByPaymentCredOrderEnum,
//             from?: number | null,
//             to?: number | null,
//             cursor?: string | null,
//             options?: any,
//         ): AxiosPromise<PaginatedUtxoWithSlot> {
//             return localVarFp
//                 .utxosByPaymentCred(credential, resolveDatums, withCbor, count, order, from, to, cursor, options)
//                 .then((request) => request(axios, basePath));
//         },
//     };
// };
