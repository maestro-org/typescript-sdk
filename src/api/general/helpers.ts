import { AxiosRequestConfig } from 'axios';
import { RequestArgs } from '../../base';
import { DUMMY_BASE_URL, setApiKeyToObject, setSearchParams, toPathString, createRequestFunction } from '../../common';
import { Configuration } from '../../configuration';
import {
    TimestampedChainTip,
    TimestampedEraSummaries,
    TimestampedProtocolParameters,
    TimestampedSystemStart,
} from '../type';

/**
 * GeneralApi - axios parameter creator
 * @export
 */
export const GeneralApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns the identifier of the most recently processed block on the network
     * @summary Chain tip
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    chainTip: (options: AxiosRequestConfig = {}): RequestArgs => {
        const localVarPath = `/chain-tip`;
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
     * Returns the blockchain era history
     * @summary Era history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    eraHistory: (options: AxiosRequestConfig = {}): RequestArgs => {
        const localVarPath = `/era-history`;
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
     * Returns the current blockchain protocol parameters
     * @summary Protocol parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    protocolParameters: (options: AxiosRequestConfig = {}): RequestArgs => {
        const localVarPath = `/protocol-parameters`;
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
     * Returns the blockchain system start time
     * @summary Blockchain system start
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    systemStart: (options: AxiosRequestConfig = {}): RequestArgs => {
        const localVarPath = `/system-start`;
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
 * GeneralApi - functional programming interface
 * @export
 */
export const GeneralApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = GeneralApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the identifier of the most recently processed block on the network
         * @summary Chain tip
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chainTip(options?: AxiosRequestConfig): () => Promise<TimestampedChainTip> {
            const localVarAxiosArgs = localVarAxiosParamCreator.chainTip(options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the blockchain era history
         * @summary Era history
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eraHistory(options?: AxiosRequestConfig): () => Promise<TimestampedEraSummaries> {
            const localVarAxiosArgs = localVarAxiosParamCreator.eraHistory(options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the current blockchain protocol parameters
         * @summary Protocol parameters
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        protocolParameters(options?: AxiosRequestConfig): () => Promise<TimestampedProtocolParameters> {
            const localVarAxiosArgs = localVarAxiosParamCreator.protocolParameters(options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the blockchain system start time
         * @summary Blockchain system start
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        systemStart(options?: AxiosRequestConfig): () => Promise<TimestampedSystemStart> {
            const localVarAxiosArgs = localVarAxiosParamCreator.systemStart(options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
