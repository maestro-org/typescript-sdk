import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { PoolsApiFp } from './helpers';
import {
    ListPoolsQueryParams,
    PoolBlocksOrderEnum,
    PoolBlocksQueryParams,
    PoolDelegatorsQueryParams,
    PoolHistoryOrderEnum,
    PoolHistoryQueryParams,
} from './type';

/**
 * PoolsApi - object-oriented interface
 * @export
 * @class PoolsApi
 * @extends {BaseAPI}
 */
export class PoolsApi extends BaseAPI {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {ListPoolsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public listPools(queryParams?: ListPoolsQueryParams, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .listPools(queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {PoolBlocksQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolBlocks(poolId: string, queryParams?: PoolBlocksQueryParams, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolBlocks(poolId, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {PoolDelegatorsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolDelegators(poolId: string, queryParams?: PoolDelegatorsQueryParams, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolDelegators(poolId, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param  {PoolHistoryQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolHistory(poolId: string, queryParams?: PoolHistoryQueryParams, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolHistory(poolId, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns current information about the specified pool
     * @summary Stake pool information
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolInfo(poolId: string, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolInfo(poolId, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the metadata declared on-chain by the specified stake pool
     * @summary Stake pool metadata
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolMetadata(poolId: string, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolMetadata(poolId, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of relays declared on-chain by the specified stake pool
     * @summary Stake pool relays
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolRelays(poolId: string, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolRelays(poolId, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of updates relating to the specified pool
     * @summary Stake pool updates
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PoolsApi
     */
    public poolUpdates(poolId: string, options?: AxiosRequestConfig) {
        return PoolsApiFp(this.configuration)
            .poolUpdates(poolId, options)
            .then((request) => request(this.axios));
    }
}
