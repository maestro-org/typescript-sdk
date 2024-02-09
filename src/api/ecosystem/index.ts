import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { EcosystemApiFp } from './helpers';

/**
 * EcosystemApi - object-oriented interface
 * @export
 * @class EcosystemApi
 * @extends {BaseAPI}
 */
export class EcosystemApi extends BaseAPI {
    /**
     * Returns the Cardano address corresponding to an ADA Handle
     * @summary Resolve ADA Handle
     * @param {string} handle Ada Handle to resolve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EcosystemApi
     */
    public adahandleResolve(handle: string, options?: AxiosRequestConfig) {
        return EcosystemApiFp(this.configuration)
            .adahandleResolve(handle, options)
            .then((request) => request());
    }
}
