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
import { TimestampedDatum } from '../type';

/**
 * DatumApi - axios parameter creator
 * @export
 */
export const DatumApiAxiosParamCreator = function (configuration: Configuration) {
    return {
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
            const localVarPath = `/datums/{datum_hash}`.replace(
                `{${'datum_hash'}}`,
                encodeURIComponent(String(datumHash)),
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
 * DatumApi - functional programming interface
 * @export
 */
export const DatumApiFp = function (configuration: Configuration) {
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
            return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
        },
    };
};

/**
 * DatumApi - factory interface
 * @export
 */
export const DatumApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DatumApiFp(configuration);
    return {
        /**
         * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
         * @summary Datum by datum hash
         * @param {string} datumHash Hex encoded datum hash
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lookupDatum(datumHash: string, options?: any): AxiosPromise<TimestampedDatum> {
            return localVarFp.lookupDatum(datumHash, options).then((request) => request(axios, basePath));
        },
    };
};
