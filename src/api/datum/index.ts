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
        return DatumApiFp(this.configuration)
            .lookupDatum(datumHash, options)
            .then((request) => request(this.axios));
    }
}
