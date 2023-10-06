import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { TransactionManagerApiFp } from './helpers';

/**
 * TransactionManagerApi - object-oriented interface
 * @export
 * @class TransactionManagerApi
 * @extends {BaseAPI}
 */
export class TransactionManagerApi extends BaseAPI {
    /**
     * Returns the history of submitted transactions
     * @summary Transactions history
     * @param {number} [count] The max number of results per pagination page
     * @param {number} [page] Pagination page number to show results for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerHistory(count?: number, page?: number, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration)
            .txManagerHistory(count, page, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the most recent state of a transaction
     * @summary Transaction state
     * @param {string} txHash Hex encoded transaction hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerState(txHash: string, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration)
            .txManagerState(txHash, options)
            .then((request) => request(this.axios));
    }

    /**
     * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [monitored by Maestro](../Dapp%20Platform/Transaction%20Manager).
     * @summary Submit transaction
     * @param {string} body CBOR encoded transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerSubmit(body: string, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration)
            .txManagerSubmit(body, options)
            .then((request) => request(this.axios));
    }

    /**
     * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [Turbo Submitted and Monitored by Maestro](../Dapp%20Platform/Turbo%20Transaction).
     * @summary Turbo submit transaction
     * @param {string} body CBOR encoded transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerTurboSubmit(body: string, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration)
            .txManagerTurboSubmit(body, options)
            .then((request) => request(this.axios));
    }
}
