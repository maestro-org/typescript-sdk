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
import { TimestampedScript } from '../type';

/**
 * ScriptsApi - axios parameter creator
 * @export
 */
export const ScriptsApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Returns the script corresponding to the specified script hash, if the script has been seen on-chain
     * @summary Script by script hash
     * @param {string} scriptHash Hex encoded script hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    scriptByHash: (scriptHash: string, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'scriptHash' is not null or undefined
        assertParamExists('scriptByHash', 'scriptHash', scriptHash);
        const localVarPath = `/scripts/{script_hash}`.replace(
            `{${'script_hash'}}`,
            encodeURIComponent(String(scriptHash)),
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
 * ScriptsApi - functional programming interface
 * @export
 */
export const ScriptsApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = ScriptsApiAxiosParamCreator(configuration);
    return {
        /**
         * Returns the script corresponding to the specified script hash, if the script has been seen on-chain
         * @summary Script by script hash
         * @param {string} scriptHash Hex encoded script hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        scriptByHash(scriptHash: string, options?: AxiosRequestConfig): () => Promise<TimestampedScript> {
            const localVarAxiosArgs = localVarAxiosParamCreator.scriptByHash(scriptHash, options);
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
