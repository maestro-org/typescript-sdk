import { AxiosRequestConfig } from 'axios';
import { BaseAPI } from '../../base';
import { AssetsApiFp } from './helpers';
import {
    AssetAccountsQueryParams,
    AssetAddressesQueryParams,
    AssetTxsQueryParams,
    AssetUpdatesQueryParams,
    AssetUtxosQueryParams,
    PolicyAccountsQueryParams,
    PolicyAddressesQueryParams,
    PolicyInfoQueryParams,
    PolicyTxsQueryParams,
    PolicyUtxosQueryParams,
} from './type';

/**
 * AssetsApi - object-oriented interface
 * @export
 * @class AssetsApi
 * @extends {BaseAPI}
 */
export class AssetsApi extends BaseAPI {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetAccountsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public assetAccounts(asset: string, queryParams?: AssetAccountsQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .assetAccounts(asset, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetAddressesQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public assetAddresses(asset: string, queryParams?: AssetAddressesQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .assetAddresses(asset, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public assetInfo(asset: string, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .assetInfo(asset, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetTxsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public assetTxs(asset: string, queryParams?: AssetTxsQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .assetTxs(asset, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetUpdatesQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public assetUpdates(asset: string, queryParams?: AssetUpdatesQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .assetUpdates(asset, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {AssetUtxosQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public assetUtxos(asset: string, queryParams?: AssetUtxosQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .assetUtxos(asset, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {PolicyAccountsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public policyAccounts(policy: string, queryParams?: PolicyAccountsQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .policyAccounts(policy, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {PolicyAddressesQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public policyAddresses(policy: string, queryParams?: PolicyAddressesQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .policyAddresses(policy, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {PolicyInfoQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public policyInfo(policy: string, queryParams?: PolicyInfoQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .policyInfo(policy, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {PolicyTxsQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public policyTxs(policy: string, queryParams?: PolicyTxsQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .policyTxs(policy, queryParams, options)
            .then((request) => request(this.axios));
    }

    /**
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {PolicyUtxosQueryParams} [queryParams] Query parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssetsApi
     */
    public policyUtxos(policy: string, queryParams?: PolicyUtxosQueryParams, options?: AxiosRequestConfig) {
        return AssetsApiFp(this.configuration)
            .policyUtxos(policy, queryParams, options)
            .then((request) => request(this.axios));
    }
}
