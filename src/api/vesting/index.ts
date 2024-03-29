import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { ContractsVestingLockPostRequest } from '../type';
import { VestingApiFp } from './helpers';

/**
 * VestingApi - object-oriented interface
 * @export
 * @class VestingApi
 * @extends {BaseAPI}
 */
export class VestingApi extends BaseAPI {
    /**
     * Collect assets from the vesting contract
     * @summary Collect assets
     * @param {string} beneficiary Beneficiary\&#39;s bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VestingApi
     */
    public contractsVestingCollectBeneficiaryPost(beneficiary: string, options?: AxiosRequestConfig) {
        return VestingApiFp(this.configuration).contractsVestingCollectBeneficiaryPost(beneficiary, options)();
    }

    /**
     * Lock assets into the vesting contract
     * @summary Lock assets
     * @param {ContractsVestingLockPostRequest} contractsVestingLockPostRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VestingApi
     */
    public contractsVestingLockPost(
        contractsVestingLockPostRequest: ContractsVestingLockPostRequest,
        options?: AxiosRequestConfig,
    ) {
        return VestingApiFp(this.configuration).contractsVestingLockPost(contractsVestingLockPostRequest, options)();
    }

    /**
     * Detailed list of vesting assets at a beneficiary address
     * @summary State of vesting assets
     * @param {string} beneficiary Beneficiary bech32 address
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VestingApi
     */
    public contractsVestingStateBeneficiaryGet(beneficiary: string, options?: AxiosRequestConfig) {
        return VestingApiFp(this.configuration).contractsVestingStateBeneficiaryGet(beneficiary, options)();
    }
}
