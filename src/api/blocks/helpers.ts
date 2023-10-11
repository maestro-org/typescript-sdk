import globalAxios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
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
export const BlocksApiAxiosParamCreator = function (configuration: Configuration) {
    return {
        /**
         * Returns information about the specified block including more advanced technical properties
         * @summary Block information
         * @param {string} hashOrHeight Block height or hex encoded block hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        blockInfo: async (hashOrHeight: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
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
    };
};

/**
 * BlocksApi - functional programming interface
 * @export
 */
export const BlocksApiFp = function (configuration: Configuration) {
    const localVarAxiosParamCreator = BlocksApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns information about the specified block including more advanced technical properties
         * @summary Block information
         * @param {string} hashOrHeight Block height or hex encoded block hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async blockInfo(
            hashOrHeight: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedBlockInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.blockInfo(hashOrHeight, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
    };
};

// /**
//  * BlocksApi - factory interface
//  * @export
//  */
// export const BlocksApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
//     const localVarFp = BlocksApiFp(configuration);
//     return {
//         /**
//          * Returns information about the specified block including more advanced technical properties
//          * @summary Block information
//          * @param {string} hashOrHeight Block height or hex encoded block hash
//          * @param {*} [options] Override http request option.
//          * @throws {RequiredError}
//          */
//         blockInfo(hashOrHeight: string, options?: any): AxiosPromise<TimestampedBlockInfo> {
//             return localVarFp.blockInfo(hashOrHeight, options).then((request) => request(axios, basePath));
//         },
//     };
// };
