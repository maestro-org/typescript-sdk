import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
import { RequestArgs } from '../../base';
import {
    assertParamExists,
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    createRequestFunction,
    serializeDataIfNeeded,
} from '../../common';
import { Configuration } from '../../configuration';
import { TimestampedDatum, TimestampedDatums } from '../type';

/**
 * DatumApi - axios parameter creator
 * @export
 */
export const DatumApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
     * @summary Datum by datum hash
     * @param {string} datumHash Hex encoded datum hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    lookupDatum: async (datumHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'datumHash' is not null or undefined
        assertParamExists('lookupDatum', 'datumHash', datumHash);
        const localVarPath = `/datums/{datum_hash}`.replace(`{${'datum_hash'}}`, encodeURIComponent(String(datumHash)));
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
     * Returns the datums corresponding to the specified datum hashes, for the datums which have been seen on-chain
     * @summary Datums by datum hashes
     * @param {Array<string>} requestBody Array of hex encoded datum hashes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    lookupDatums: async (requestBody: Array<string>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'requestBody' is not null or undefined
        assertParamExists('lookupDatums', 'requestBody', requestBody);
        const localVarPath = `/datums`;
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
        const localVarHeaderParameter = {} as Record<string, string>;
        const localVarQueryParameter = {} as Record<string, string>;

        // authentication api-key required
        setApiKeyToObject(localVarHeaderParameter, 'api-key', configuration);

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
});

/**
 * DatumApi - functional programming interface
 * @export
 */
export const DatumApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = DatumApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
         * @summary Datum by datum hash
         * @param {string} datumHash Hex encoded datum hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async lookupDatum(
            datumHash: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedDatum>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.lookupDatum(datumHash, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns the datums corresponding to the specified datum hashes, for the datums which have been seen on-chain
         * @summary Datums by datum hashes
         * @param {Array<string>} requestBody Array of hex encoded datum hashes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async lookupDatums(
            requestBody: Array<string>,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedDatums>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.lookupDatums(requestBody, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
