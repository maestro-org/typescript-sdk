import { AxiosRequestConfig } from 'axios';
import { RequestArgs } from '../../base';
import {
    assertParamExists,
    DUMMY_BASE_URL,
    setApiKeyToObject,
    setSearchParams,
    toPathString,
    serializeDataIfNeeded,
    createRequestFunction,
} from '../../common';
import { Configuration } from '../../configuration';
import { ContractsVestingLockPostRequest, ContractsVestingLockPost200Response, VestingState } from '../type';

/**
 * VestingApi - axios parameter creator
 * @export
 */
export const VestingApiAxiosParamCreator = (configuration: Configuration) => ({
    /**
     * Collect assets from the vesting contract
     * @summary Collect assets
     * @param {string} beneficiary Beneficiary\&#39;s bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingCollectBeneficiaryPost: (beneficiary: string, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'beneficiary' is not null or undefined
        assertParamExists('contractsVestingCollectBeneficiaryPost', 'beneficiary', beneficiary);
        const localVarPath = `/contracts/vesting/collect/{beneficiary}`.replace(
            `{${'beneficiary'}}`,
            encodeURIComponent(String(beneficiary)),
        );
        // use dummy base URL string because the URL constructor only accepts absolute URLs.
        const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
        const { baseOptions } = configuration;

        const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options };
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
     * Lock assets into the vesting contract
     * @summary Lock assets
     * @param {ContractsVestingLockPostRequest} contractsVestingLockPostRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    contractsVestingLockPost: (
        contractsVestingLockPostRequest: ContractsVestingLockPostRequest,
        options: AxiosRequestConfig = {},
    ): RequestArgs => {
        // verify required parameter 'contractsVestingLockPostRequest' is not null or undefined
        assertParamExists(
            'contractsVestingLockPost',
            'contractsVestingLockPostRequest',
            contractsVestingLockPostRequest,
        );
        const localVarPath = `/contracts/vesting/lock`;
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
        localVarRequestOptions.data = serializeDataIfNeeded(
            contractsVestingLockPostRequest,
            localVarRequestOptions,
            configuration,
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
    contractsVestingStateBeneficiaryGet: (beneficiary: string, options: AxiosRequestConfig = {}): RequestArgs => {
        // verify required parameter 'beneficiary' is not null or undefined
        assertParamExists('contractsVestingStateBeneficiaryGet', 'beneficiary', beneficiary);
        const localVarPath = `/contracts/vesting/state/{beneficiary}`.replace(
            `{${'beneficiary'}}`,
            encodeURIComponent(String(beneficiary)),
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
 * VestingApi - functional programming interface
 * @export
 */
export const VestingApiFp = (configuration: Configuration) => {
    const localVarAxiosParamCreator = VestingApiAxiosParamCreator(configuration);
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
            options?: AxiosRequestConfig,
        ): () => Promise<ContractsVestingLockPost200Response> {
            const localVarAxiosArgs = localVarAxiosParamCreator.contractsVestingCollectBeneficiaryPost(
                beneficiary,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
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
            options?: AxiosRequestConfig,
        ): () => Promise<ContractsVestingLockPost200Response> {
            const localVarAxiosArgs = localVarAxiosParamCreator.contractsVestingLockPost(
                contractsVestingLockPostRequest,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
        /**
         * Detailed list of vesting assets at a beneficiary address
         * @summary State of vesting assets
         * @param {string} beneficiary Beneficiary bech32 address
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        contractsVestingStateBeneficiaryGet(
            beneficiary: string,
            options?: AxiosRequestConfig,
        ): () => Promise<VestingState> {
            const localVarAxiosArgs = localVarAxiosParamCreator.contractsVestingStateBeneficiaryGet(
                beneficiary,
                options,
            );
            return createRequestFunction(localVarAxiosArgs, configuration);
        },
    };
};
