import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from "axios";
import globalAxios from "axios";
import { RequestArgs } from "../../base";
import {
  DUMMY_BASE_URL,
  setApiKeyToObject,
  setSearchParams,
  toPathString,
  assertParamExists,
  createRequestFunction,
} from "../../common";
import { Configuration } from "../../configuration";
import { TimestampedCurrentEpochInfo, TimestampedEpochInfo } from "../type";

/**
 * EpochsApi - axios parameter creator
 * @export
 */
export const EpochsApiAxiosParamCreator = function (configuration: Configuration) {
  return {
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentEpoch: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/epochs/current`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

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
    epochInfo: async (epochNo: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'epochNo' is not null or undefined
      assertParamExists("epochInfo", "epochNo", epochNo);
      const localVarPath = `/epochs/{epoch_no}/info`.replace(`{${"epoch_no"}}`, encodeURIComponent(String(epochNo)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * EpochsApi - functional programming interface
 * @export
 */
export const EpochsApiFp = function (configuration: Configuration) {
  const localVarAxiosParamCreator = EpochsApiAxiosParamCreator(configuration);
  return {
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async currentEpoch(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedCurrentEpochInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.currentEpoch(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a summary of information about a specific epoch
     * @summary Specific epoch details
     * @param {number} epochNo Epoch number to return information about
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async epochInfo(
      epochNo: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedEpochInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.epochInfo(epochNo, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  };
};

/**
 * EpochsApi - factory interface
 * @export
 */
export const EpochsApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = EpochsApiFp(configuration);
  return {
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentEpoch(options?: any): AxiosPromise<TimestampedCurrentEpochInfo> {
      return localVarFp.currentEpoch(options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a summary of information about a specific epoch
     * @summary Specific epoch details
     * @param {number} epochNo Epoch number to return information about
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    epochInfo(epochNo: number, options?: any): AxiosPromise<TimestampedEpochInfo> {
      return localVarFp.epochInfo(epochNo, options).then((request) => request(axios, basePath));
    },
  };
};
