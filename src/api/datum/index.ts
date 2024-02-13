import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { DatumApiFp } from './helpers';

/**
 * DatumApi - object-oriented interface
 * @export
 * @class DatumApi
 * @extends {BaseAPI}
 */
export class DatumApi extends BaseAPI {
    /**
     * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
     * @summary Datum by datum hash
     * @param {string} datumHash Hex encoded datum hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatumApi
     */
    public lookupDatum(datumHash: string, options?: AxiosRequestConfig) {
        return DatumApiFp(this.configuration).lookupDatum(datumHash, options)();
    }

    /**
     * Returns the datums corresponding to the specified datum hashes, for the datums which have been seen on-chain
     * @summary Datums by datum hashes
     * @param {Array<string>} requestBody Array of hex encoded datum hashes
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DatumApi
     */
    public lookupDatums(requestBody: Array<string>, options?: AxiosRequestConfig) {
        return DatumApiFp(this.configuration).lookupDatums(requestBody, options)();
    }
}
