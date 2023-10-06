import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { ScriptsApiFp } from './helpers';

/**
 * ScriptsApi - object-oriented interface
 * @export
 * @class ScriptsApi
 * @extends {BaseAPI}
 */
export class ScriptsApi extends BaseAPI {
    /**
     * Returns the script corresponding to the specified script hash, if the script has been seen on-chain
     * @summary Script by script hash
     * @param {string} scriptHash Hex encoded script hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ScriptsApi
     */
    public scriptByHash(scriptHash: string, options?: AxiosRequestConfig) {
        return ScriptsApiFp(this.configuration)
            .scriptByHash(scriptHash, options)
            .then((request) => request(this.axios));
    }
}
