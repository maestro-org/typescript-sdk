import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { TransactionsApiFp } from './helpers';

/**
 * TransactionsApi - object-oriented interface
 * @export
 * @class TransactionsApi
 * @extends {BaseAPI}
 */
export class TransactionsApi extends BaseAPI {
    /**
     * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
     * @summary Address by transaction output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public addressByTxo(txHash: string, index: number, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration)
            .addressByTxo(txHash, index, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns hex-encoded CBOR bytes of a transaction
     * @summary CBOR bytes of a transaction
     * @param {string} txHash Transaction Hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public txCborByTxHash(txHash: string, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration)
            .txCborByTxHash(txHash, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns detailed information about a transaction
     * @summary Transaction details
     * @param {string} txHash Transaction hash in hex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public txInfo(txHash: string, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration)
            .txInfo(txHash, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the specified transaction output.
     * @summary Transaction output by output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public txoByTxoRef(txHash: string, index: number, withCbor?: boolean | null, options?: AxiosRequestConfig) {
        return TransactionsApiFp(this.configuration)
            .txoByTxoRef(txHash, index, withCbor, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the specified transaction outputs
     * @summary Transaction outputs by output references
     * @param {Array<string>} requestBody
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionsApi
     */
    public txosByTxoRefs(
        requestBody: Array<string>,
        resolveDatums?: boolean | null,
        withCbor?: boolean | null,
        options?: AxiosRequestConfig,
    ) {
        return TransactionsApiFp(this.configuration)
            .txosByTxoRefs(requestBody, resolveDatums, withCbor, options)
            .then((request) => request(this.axios));
    }
}
