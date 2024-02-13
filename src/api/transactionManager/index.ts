import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { TransactionManagerApiFp } from './helpers';
import { TxManagerHistoryQueryParams } from './type';

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
     * @param {TxManagerHistoryQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerHistory(queryParams?: TxManagerHistoryQueryParams, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration).txManagerHistory(queryParams, options)();
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
        return TransactionManagerApiFp(this.configuration).txManagerState(txHash, options)();
    }

    /**
     * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [monitored by Maestro](../Dapp%20Platform/Transaction%20Manager).
     * @summary Submit transaction
     * @param {string | Uint8Array} body CBOR encoded transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerSubmit(body: string | Uint8Array, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration).txManagerSubmit(body, options)();
    }

    /**
     * Submit a signed and serialized transaction to the network. A transaction submited with this endpoint will be [Turbo Submitted and Monitored by Maestro](../Dapp%20Platform/Turbo%20Transaction).
     * @summary Turbo submit transaction
     * @param {string | Uint8Array} body CBOR encoded transaction
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionManagerApi
     */
    public txManagerTurboSubmit(body: string | Uint8Array, options?: AxiosRequestConfig) {
        return TransactionManagerApiFp(this.configuration).txManagerTurboSubmit(body, options)();
    }
}
