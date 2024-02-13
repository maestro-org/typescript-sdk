import { AxiosRequestConfig } from 'axios';
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
import { TimestampedCurrentEpochInfo, TimestampedEpochInfo } from '../type';

/**
 * EpochsApi - axios parameter creator
 * @export
 */
export const EpochsApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentEpoch: (options: AxiosRequestConfig = {}): RequestArgs => {
        const localVarPath = `/epochs/current`;
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
     * Returns a summary of information about a specific epoch
     * @summary Specific epoch details
     * @param {number} epochNo Epoch number to return information about
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    epochInfo: (epochNo: number, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'epochNo' is not null or undefined
        assertParamExists('epochInfo', 'epochNo', epochNo);
        const localVarPath = `/epochs/{epoch_no}`.replace(`{${'epoch_no'}}`, encodeURIComponent(String(epochNo)));
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
 * EpochsApi - functional programming interface
 * @export
 */
export const EpochsApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = EpochsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns a summary of information about the current epoch
         * @summary Current epoch details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        currentEpoch(options?: AxiosRequestConfig): () => Promise<TimestampedCurrentEpochInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.currentEpoch(options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns a summary of information about a specific epoch
         * @summary Specific epoch details
         * @param {number} epochNo Epoch number to return information about
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        epochInfo(epochNo: number, options?: AxiosRequestConfig): () => Promise<TimestampedEpochInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.epochInfo(epochNo, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
