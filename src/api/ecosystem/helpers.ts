import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';
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
import { TimestampedAddress } from '../type';

/**
 * EcosystemApi - axios parameter creator
 * @export
 */
export const EcosystemApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns the Cardano address corresponding to an ADA Handle
     * @summary Resolve ADA Handle
     * @param {string} handle Ada Handle to resolve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    adahandleResolve: async (handle: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
        // verify required parameter 'handle' is not null or undefined
        assertParamExists('adahandleResolve', 'handle', handle);
        const localVarPath = `/ecosystem/adahandle/{handle}`.replace(
            `{${'handle'}}`,
            encodeURIComponent(String(handle)),
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
});

/**
 * EcosystemApi - functional programming interface
 * @export
 */
export const EcosystemApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = EcosystemApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the Cardano address corresponding to an ADA Handle
         * @summary Resolve ADA Handle
         * @param {string} handle Ada Handle to resolve
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async adahandleResolve(
            handle: string,
            options?: AxiosRequestConfig,
        ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAddress>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.adahandleResolve(handle, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
