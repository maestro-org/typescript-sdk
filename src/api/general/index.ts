import { AxiosRequestConfig } from 'axios';
import { BaseAPI, RequiredError } from '../../base';
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
        return GeneralApiFp(this.configuration)
            .chainTip(options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the blockchain era history
     * @summary Era history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public eraHistory(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration)
            .eraHistory(options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the current blockchain protocol parameters
     * @summary Protocol parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public protocolParams(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration)
            .protocolParams(options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the blockchain system start time
     * @summary Blockchain system start
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneralApi
     */
    public systemStart(options?: AxiosRequestConfig) {
        return GeneralApiFp(this.configuration)
            .systemStart(options)
            .then((request) => request(this.axios));
    }
}
