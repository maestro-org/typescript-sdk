import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { GeneralApiFp } from './helpers';

/**
 * GeneralApi - object-oriented interface
 * @export
 * @class GeneralApi
 * @extends {BaseAPI}
 */
export class GeneralApi extends BaseAPI {
    /**
     * Returns the identifier of the most recently processed block on the network
     * @summary Chain tip
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public chainTip(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration).chainTip(options)();
    }

    /**
     * Returns the blockchain era history
     * @summary Era history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public eraHistory(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration).eraHistory(options)();
    }

    /**
     * Returns the current blockchain protocol parameters
     * @summary Protocol parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public protocolParameters(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration).protocolParameters(options)();
    }

    /**
     * Returns the blockchain system start time
     * @summary Blockchain system start
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public systemStart(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration).systemStart(options)();
    }
}
