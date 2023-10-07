import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { AddressesApiFp } from './helpers';
import {
    TxsByAddressQueryParams,
    TxsByPaymentCredQueryParams,
    UtxosByAddressQueryParams,
    UtxosByAddressesQueryParams,
    UtxosByPaymentCredQueryParams,
} from './type';

/**
 * AddressesApi - object-oriented interface
 * @export
 * @class AddressesApi
 * @extends {BaseAPI}
 */
export class AddressesApi extends BaseAPI {
    /**
     * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
     * @summary Decode address
     * @param {string} address Address in bech32/hex/base58 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public decodeAddress(address: string, options?: AxiosRequestConfig) {
        return AddressesApiFp(this.configuration)
            .decodeAddress(address, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Address transaction count
     * @param {string} address Address in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public txCountByAddress(address: string, options?: AxiosRequestConfig) {
        return AddressesApiFp(this.configuration)
            .txCountByAddress(address, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns transactions in which the specified address spent or received funds.  Specifically, the transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Address transactions
     * @param {string} address Address in bech32 format
     * @param {TxsByAddressQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public txsByAddress(address: string, queryParams?: TxsByAddressQueryParams, options?: AxiosRequestConfig) {
        return AddressesApiFp(this.configuration)
            .txsByAddress(address, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns transactions in which the specified payment credential spent or received funds.  Specifically, the transactions where: the payment credential was used in an address which controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Payment credential transactions
     * @param {string} credential Payment credential in bech32 format
     * @param {TxsByPaymentCredQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public txsByPaymentCred(
        credential: string,
        queryParams?: TxsByPaymentCredQueryParams,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .txsByPaymentCred(credential, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns references (pair of transaction hash and output index in transaction) for UTxOs controlled by the specified address
     * @summary UTxO references at an address
     * @param {string} address Address in bech32 format
     * @param {UtxoRefsAtAddressQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxoRefsAtAddress(address: string, queryParams?: TxsByPaymentCredQueryParams, options?: AxiosRequestConfig) {
        return AddressesApiFp(this.configuration)
            .utxoRefsAtAddress(address, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return detailed information on UTxOs controlled by an address
     * @summary UTxOs at an address
     * @param {string} address Address in bech32 format
     * @param {UtxosByAddressQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxosByAddress(address: string, queryParams?: UtxosByAddressQueryParams, options?: AxiosRequestConfig) {
        return AddressesApiFp(this.configuration)
            .utxosByAddress(address, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return detailed information on UTxOs which are controlled by some address in the specified list of addresses
     * @summary UTxOs at multiple addresses
     * @param {Array<string>} requestBody
     * @param {UtxosByAddressesQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxosByAddresses(
        requestBody: Array<string>,
        queryParams?: UtxosByAddressesQueryParams,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .utxosByAddresses(requestBody, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return detailed information on UTxOs controlled by addresses which use the specified payment credential
     * @summary UTxOs by payment credential
     * @param {string} credential Payment credential in bech32 format
     * @param {UtxosByPaymentCredQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxosByPaymentCred(
        credential: string,
        queryParams?: UtxosByPaymentCredQueryParams,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .utxosByPaymentCred(credential, queryParams, options)
            .then((request) => request(this.axios));
    }
}
