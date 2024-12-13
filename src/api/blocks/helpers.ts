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
import { TimestampedBlockInfo } from '../type';

/**
 * BlocksApi - axios parameter creator
 * @export
 */
export const BlocksApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns information about the specified block including more advanced technical properties
     * @summary Block information
     * @param {string} hashOrHeight Block height or hex encoded block hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blockInfo: (hashOrHeight: string, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'hashOrHeight' is not null or undefined
        assertParamExists('blockInfo', 'hashOrHeight', hashOrHeight);
        const localVarPath = `/blocks/{hash_or_height}`.replace(
            `{${'hash_or_height'}}`,
            encodeURIComponent(String(hashOrHeight)),
        );
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
     * Returns information about the latest block
     * @summary Latest block
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blockLatest: (options: AxiosRequestConfig = {}): RequestArgs => {
        const localVarPath = `/blocks/latest`;
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
 * BlocksApi - functional programming interface
 * @export
 */
export const BlocksApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = BlocksApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns information about the specified block including more advanced technical properties
         * @summary Block information
         * @param {string} hashOrHeight Block height or hex encoded block hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        blockInfo(hashOrHeight: string, options?: AxiosRequestConfig): () => Promise<TimestampedBlockInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.blockInfo(hashOrHeight, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Returns information about the latest block
         * @summary Latest block
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        blockLatest(options?: AxiosRequestConfig): () => Promise<TimestampedBlockInfo> {
            const localVarAxiosArgs = localVarAxiosParamCreator.blockLatest(options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
