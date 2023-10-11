import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { AddressesApiFp } from './helpers';
import {
    TxsByAddressOrderEnum,
    TxsByPaymentCredOrderEnum,
    UtxoRefsAtAddressOrderEnum,
    UtxosByAddressOrderEnum,
    UtxosByPaymentCredOrderEnum,
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
     * @param {number | null} [count] The max number of results per page
     * @param {TxsByAddressOrderEnum} [order] The order in which the results are sorted, by transaction age)
     * @param {number | null} [from] Return only transactions minted on or after a specific slot
     * @param {number | null} [to] Return only transactions minted on or before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public txsByAddress(
        address: string,
        count?: number | null,
        order?: TxsByAddressOrderEnum,
        from?: number | null,
        to?: number | null,
        cursor?: string | null,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .txsByAddress(address, count, order, from, to, cursor, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns transactions in which the specified payment credential spent or received funds.  Specifically, the transactions where: the payment credential was used in an address which controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Payment credential transactions
     * @param {string} credential Payment credential in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {TxsByPaymentCredOrderEnum} [order] The order in which the results are sorted, by transaction age)
     * @param {number | null} [from] Return only transactions minted on or after a specific slot
     * @param {number | null} [to] Return only transactions minted on or before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public txsByPaymentCred(
        credential: string,
        count?: number | null,
        order?: TxsByPaymentCredOrderEnum,
        from?: number | null,
        to?: number | null,
        cursor?: string | null,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .txsByPaymentCred(credential, count, order, from, to, cursor, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns references (pair of transaction hash and output index in transaction) for UTxOs controlled by the specified address
     * @summary UTxO references at an address
     * @param {string} address Address in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {UtxoRefsAtAddressOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxoRefsAtAddress(
        address: string,
        count?: number | null,
        order?: UtxoRefsAtAddressOrderEnum,
        from?: number | null,
        to?: number | null,
        cursor?: string | null,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .utxoRefsAtAddress(address, count, order, from, to, cursor, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return detailed information on UTxOs controlled by an address
     * @summary UTxOs at an address
     * @param {string} address Address in bech32 format
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encodings of the transaction outputs in the response
     * @param {number | null} [count] The max number of results per page
     * @param {UtxosByAddressOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxosByAddress(
        address: string,
        resolveDatums?: boolean | null,
        withCbor?: boolean | null,
        count?: number | null,
        order?: UtxosByAddressOrderEnum,
        from?: number | null,
        to?: number | null,
        cursor?: string | null,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .utxosByAddress(address, resolveDatums, withCbor, count, order, from, to, cursor, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return detailed information on UTxOs which are controlled by some address in the specified list of addresses
     * @summary UTxOs at multiple addresses
     * @param {Array<string>} requestBody
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encodings of the transaction outputs in the response
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxosByAddresses(
        requestBody: Array<string>,
        resolveDatums?: boolean | null,
        withCbor?: boolean | null,
        count?: number | null,
        cursor?: string | null,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .utxosByAddresses(requestBody, resolveDatums, withCbor, count, cursor, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return detailed information on UTxOs controlled by addresses which use the specified payment credential
     * @summary UTxOs by payment credential
     * @param {string} credential Payment credential in bech32 format
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encodings of the transaction outputs in the response
     * @param {number | null} [count] The max number of results per page
     * @param {UtxosByPaymentCredOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created on or before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AddressesApi
     */
    public utxosByPaymentCred(
        credential: string,
        resolveDatums?: boolean | null,
        withCbor?: boolean | null,
        count?: number | null,
        order?: UtxosByPaymentCredOrderEnum,
        from?: number | null,
        to?: number | null,
        cursor?: string | null,
        options?: AxiosRequestConfig,
    ) {
        return AddressesApiFp(this.configuration)
            .utxosByPaymentCred(credential, resolveDatums, withCbor, count, order, from, to, cursor, options)
            .then((request) => request(this.axios));
    }
}

export * from './type';
