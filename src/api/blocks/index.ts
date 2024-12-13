import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { BlocksApiFp } from './helpers';

/**
 * BlocksApi - object-oriented interface
 * @export
 * @class BlocksApi
 * @extends {BaseAPI}
 */
export class BlocksApi extends BaseAPI {
    /**
     * Returns information about the specified block including more advanced technical properties
     * @summary Block information
     * @param {string} hashOrHeight Block height or hex encoded block hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BlocksApi
     */
    public blockInfo(hashOrHeight: string, options?: AxiosRequestConfig) {
        return BlocksApiFp(this.configuration).blockInfo(hashOrHeight, options)();
    }

    /**
     * Returns information about the latest block
     * @summary Latest block
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BlocksApi
     */
    public blockLatest(options?: AxiosRequestConfig) {
        return BlocksApiFp(this.configuration).blockLatest(options)();
    }
}
