import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from "axios";
import globalAxios from "axios";
import { RequestArgs } from "../../base";
import {
  assertParamExists,
  DUMMY_BASE_URL,
  setApiKeyToObject,
  setSearchParams,
  toPathString,
  serializeDataIfNeeded,
  createRequestFunction,
} from "../../common";
import { Configuration } from "../../configuration";
import { ContractsVestingLockPostRequest, ContractsVestingLockPost200Response, VestingState } from "../type";

/**
 * VestingApi - axios parameter creator
 * @export
 */
export const VestingApiAxiosParamCreator = function (configuration: Configuration) {
  return {
    /**
     * Collect assets from the vesting contract
     * @summary Collect assets
     * @param {string} beneficiary Beneficiary\&#39;s bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingCollectBeneficiaryPost: async (
      beneficiary: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'beneficiary' is not null or undefined
      assertParamExists("contractsVestingCollectBeneficiaryPost", "beneficiary", beneficiary);
      const localVarPath = `/contracts/vesting/collect/{beneficiary}`.replace(
        `{${"beneficiary"}}`,
        encodeURIComponent(String(beneficiary))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
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
     * Lock assets into the vesting contract
     * @summary Lock assets
     * @param {ContractsVestingLockPostRequest} contractsVestingLockPostRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingLockPost: async (
      contractsVestingLockPostRequest: ContractsVestingLockPostRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'contractsVestingLockPostRequest' is not null or undefined
      assertParamExists("contractsVestingLockPost", "contractsVestingLockPostRequest", contractsVestingLockPostRequest);
      const localVarPath = `/contracts/vesting/lock`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(
        contractsVestingLockPostRequest,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Detailed list of vesting assets at a beneficiary address
     * @summary State of vesting assets
     * @param {string} beneficiary Beneficiary bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingStateBeneficiaryGet: async (
      beneficiary: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'beneficiary' is not null or undefined
      assertParamExists("contractsVestingStateBeneficiaryGet", "beneficiary", beneficiary);
      const localVarPath = `/contracts/vesting/state/{beneficiary}`.replace(
        `{${"beneficiary"}}`,
        encodeURIComponent(String(beneficiary))
      );
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
 * VestingApi - functional programming interface
 * @export
 */
export const VestingApiFp = function (configuration: Configuration) {
  const localVarAxiosParamCreator = VestingApiAxiosParamCreator(configuration);
  return {
    /**
     * Collect assets from the vesting contract
     * @summary Collect assets
     * @param {string} beneficiary Beneficiary\&#39;s bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async contractsVestingCollectBeneficiaryPost(
      beneficiary: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContractsVestingLockPost200Response>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.contractsVestingCollectBeneficiaryPost(
        beneficiary,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Lock assets into the vesting contract
     * @summary Lock assets
     * @param {ContractsVestingLockPostRequest} contractsVestingLockPostRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async contractsVestingLockPost(
      contractsVestingLockPostRequest: ContractsVestingLockPostRequest,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContractsVestingLockPost200Response>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.contractsVestingLockPost(
        contractsVestingLockPostRequest,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Detailed list of vesting assets at a beneficiary address
     * @summary State of vesting assets
     * @param {string} beneficiary Beneficiary bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async contractsVestingStateBeneficiaryGet(
      beneficiary: string,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VestingState>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.contractsVestingStateBeneficiaryGet(
        beneficiary,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  };
};

/**
 * VestingApi - factory interface
 * @export
 */
export const VestingApiFactory = function (configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = VestingApiFp(configuration);
  return {
    /**
     * Collect assets from the vesting contract
     * @summary Collect assets
     * @param {string} beneficiary Beneficiary\&#39;s bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingCollectBeneficiaryPost(
      beneficiary: string,
      options?: any
    ): AxiosPromise<ContractsVestingLockPost200Response> {
      return localVarFp
        .contractsVestingCollectBeneficiaryPost(beneficiary, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Lock assets into the vesting contract
     * @summary Lock assets
     * @param {ContractsVestingLockPostRequest} contractsVestingLockPostRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingLockPost(
      contractsVestingLockPostRequest: ContractsVestingLockPostRequest,
      options?: any
    ): AxiosPromise<ContractsVestingLockPost200Response> {
      return localVarFp
        .contractsVestingLockPost(contractsVestingLockPostRequest, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Detailed list of vesting assets at a beneficiary address
     * @summary State of vesting assets
     * @param {string} beneficiary Beneficiary bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingStateBeneficiaryGet(beneficiary: string, options?: any): AxiosPromise<VestingState> {
      return localVarFp
        .contractsVestingStateBeneficiaryGet(beneficiary, options)
        .then((request) => request(axios, basePath));
    },
  };
};
