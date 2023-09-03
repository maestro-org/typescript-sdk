import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
import { BaseAPI } from './base';

/**
 * Type of staking-related action
 * @export
 * @enum {string}
 */

export const AccountAction = {
  Registration: 'registration',
  Deregistration: 'deregistration',
  Delegation: 'delegation',
  Withdrawal: 'withdrawal'
} as const;

export type AccountAction = typeof AccountAction[keyof typeof AccountAction];


/**
 * Per-epoch information about a stake account
 * @export
 * @interface AccountHistory
 */
export interface AccountHistory {
  /**
   * Active stake of the account in the epoch
   * @type {number}
   * @memberof AccountHistory
   */
  'active_stake': number;
  /**
   * Epoch number
   * @type {number}
   * @memberof AccountHistory
   */
  'epoch_no': number;
  /**
   * Bech32 encoded pool ID the account was delegated to
   * @type {string}
   * @memberof AccountHistory
   */
  'pool_id'?: string | null;
}
/**
 * Summary of information regarding a stake account
 * @export
 * @interface AccountInfo
 */
export interface AccountInfo {
  /**
   * Bech32 pool ID that the stake key is delegated to
   * @type {string}
   * @memberof AccountInfo
   */
  'delegated_pool'?: string | null;
  /**
   * True if the stake key is registered
   * @type {boolean}
   * @memberof AccountInfo
   */
  'registered': boolean;
  /**
   * The amount of rewards that are available to be withdrawn
   * @type {number}
   * @memberof AccountInfo
   */
  'rewards_available': number;
  /**
   * Bech32 encoded stake address
   * @type {string}
   * @memberof AccountInfo
   */
  'stake_address': string;
  /**
   * Total balance controlled by the stake key (sum of UTxO and rewards)
   * @type {number}
   * @memberof AccountInfo
   */
  'total_balance': number;
  /**
   * Total rewards earned
   * @type {number}
   * @memberof AccountInfo
   */
  'total_rewarded': number;
  /**
   * Total rewards withdrawn
   * @type {number}
   * @memberof AccountInfo
   */
  'total_withdrawn': number;
  /**
   * Amount locked in UTxOs controlled by addresses with the stake key
   * @type {number}
   * @memberof AccountInfo
   */
  'utxo_balance': number;
}
/**
 * Stake account related reward
 * @export
 * @interface AccountReward
 */
export interface AccountReward {
  /**
   * Reward amount
   * @type {number}
   * @memberof AccountReward
   */
  'amount': number;
  /**
   * Epoch in which the reward was earned
   * @type {number}
   * @memberof AccountReward
   */
  'earned_epoch': number;
  /**
   * Bech32 encoded pool ID (if relevant to reward type)
   * @type {string}
   * @memberof AccountReward
   */
  'pool_id': string;
  /**
   * Epoch at which the reward is spendable
   * @type {number}
   * @memberof AccountReward
   */
  'spendable_epoch': number;
  /**
   * 
   * @type {AccountStakingRewardType}
   * @memberof AccountReward
   */
  'type': AccountStakingRewardType;
}


/**
 * Type of stake account reward
 * @export
 * @enum {string}
 */

export const AccountRewardType = {
  Member: 'member',
  Leader: 'leader',
  Treasury: 'treasury',
  Reserves: 'reserves',
  Refund: 'refund'
} as const;

export type AccountRewardType = typeof AccountRewardType[keyof typeof AccountRewardType];


/**
 * Staking-related reward type
 * @export
 * @enum {string}
 */

export const AccountStakingRewardType = {
  Member: 'member',
  Leader: 'leader',
  Refund: 'refund'
} as const;

export type AccountStakingRewardType = typeof AccountStakingRewardType[keyof typeof AccountStakingRewardType];


/**
 * Stake account related update
 * @export
 * @interface AccountUpdate
 */
export interface AccountUpdate {
  /**
   * Absolute slot of the block which contained the transaction
   * @type {number}
   * @memberof AccountUpdate
   */
  'abs_slot': number;
  /**
   * 
   * @type {AccountAction}
   * @memberof AccountUpdate
   */
  'action': AccountAction;
  /**
   * Epoch number in which the transaction occured
   * @type {number}
   * @memberof AccountUpdate
   */
  'epoch_no': number;
  /**
   * Transaction hash of the transaction which performed the action
   * @type {string}
   * @memberof AccountUpdate
   */
  'tx_hash': string;
}


/**
 * Information decoded from a Cardano address
 * @export
 * @interface AddressInfo
 */
export interface AddressInfo {
  /**
   * 
   * @type {string}
   * @memberof AddressInfo
   */
  'bech32'?: string | null;
  /**
   * 
   * @type {string}
   * @memberof AddressInfo
   */
  'hex': string;
  /**
   * 
   * @type {NetworkId}
   * @memberof AddressInfo
   */
  'network'?: NetworkId | null;
  /**
   * 
   * @type {PaymentCredential}
   * @memberof AddressInfo
   */
  'payment_cred'?: PaymentCredential | null;
  /**
   * 
   * @type {StakingCredential}
   * @memberof AddressInfo
   */
  'staking_cred'?: StakingCredential | null;
}


/**
 * Transaction which involved a specific address
 * @export
 * @interface AddressTransaction
 */
export interface AddressTransaction {
  /**
   * Address controlled at least one of the consumed UTxOs
   * @type {boolean}
   * @memberof AddressTransaction
   */
  'input': boolean;
  /**
   * Address controlled at least one of the produced UTxOs
   * @type {boolean}
   * @memberof AddressTransaction
   */
  'output': boolean;
  /**
   * Absolute slot of the block which contains the transaction
   * @type {number}
   * @memberof AddressTransaction
   */
  'slot': number;
  /**
   * Transaction hash
   * @type {string}
   * @memberof AddressTransaction
   */
  'tx_hash': string;
}
/**
 * Lovelace or native asset
 * @export
 * @interface Asset
 */
export interface Asset {
  /**
   * Amount of the asset
   * @type {number}
   * @memberof Asset
   */
  'amount': number;
  /**
   * Asset (either `lovelace` or concatenation of hex encoded policy ID and asset name for native asset)
   * @type {string}
   * @memberof Asset
   */
  'unit': string;
}
/**
 * Holder of a specific asset
 * @export
 * @interface AssetHolder
 */
export interface AssetHolder {
  /**
   * Address of the holder
   * @type {string}
   * @memberof AssetHolder
   */
  'address': string;
  /**
   * Amount of the asset owned by the holder
   * @type {number}
   * @memberof AssetHolder
   */
  'amount': number;
}
/**
 * Account which controls some of a specific asset
 * @export
 * @interface AssetHolderAccount
 */
export interface AssetHolderAccount {
  /**
   * Stake/reward address for stake credential
   * @type {string}
   * @memberof AssetHolderAccount
   */
  'account': string;
  /**
   * Amount of the asset held by addresses which use the stake credential
   * @type {number}
   * @memberof AssetHolderAccount
   */
  'amount': number;
}
/**
 * Asset of a specific policy
 * @export
 * @interface AssetInPolicy
 */
export interface AssetInPolicy {
  /**
   * Amount of the asset
   * @type {number}
   * @memberof AssetInPolicy
   */
  'amount': number;
  /**
   * Hex encoded asset name
   * @type {string}
   * @memberof AssetInPolicy
   */
  'name': string;
}
/**
 * Information about a specific Cardano native-asset
 * @export
 * @interface AssetInfo
 */
export interface AssetInfo {
  /**
   * Hex encoding of the asset name
   * @type {string}
   * @memberof AssetInfo
   */
  'asset_name': string;
  /**
   * ASCII representation of the asset name
   * @type {string}
   * @memberof AssetInfo
   */
  'asset_name_ascii'?: string | null;
  /**
   * 
   * @type {AssetStandards}
   * @memberof AssetInfo
   */
  'asset_standards': AssetStandards;
  /**
   * Number of transactions which burned some of the asset
   * @type {number}
   * @memberof AssetInfo
   */
  'burn_tx_count': number;
  /**
   * CIP-14 fingerprint of the asset
   * @type {string}
   * @memberof AssetInfo
   */
  'fingerprint': string;
  /**
   * UNIX timestamp of the first mint transaction
   * @type {number}
   * @memberof AssetInfo
   */
  'first_mint_time': number;
  /**
   * Transaction hash of the first transaction which minted the asset
   * @type {string}
   * @memberof AssetInfo
   */
  'first_mint_tx': string;
  /**
   * Metadata of the most recent transaction which minted the asset
   * @type {object}
   * @memberof AssetInfo
   */
  'latest_mint_tx_metadata': object;
  /**
   * Number of transactions which minted some of the asset
   * @type {number}
   * @memberof AssetInfo
   */
  'mint_tx_count': number;
  /**
   * 
   * @type {TokenRegistryMetadata}
   * @memberof AssetInfo
   */
  'token_registry_metadata'?: TokenRegistryMetadata | null;
  /**
   * Current amount of the asset minted
   * @type {number}
   * @memberof AssetInfo
   */
  'total_supply': number;
}
/**
 * Asset information corresponding to popular standards
 * @export
 * @interface AssetStandards
 */
export interface AssetStandards {
  /**
   * CIP-25 metadata for a specific asset
   * @type {object}
   * @memberof AssetStandards
   */
  'cip25_metadata': object;
  /**
   * 
   * @type {Cip68Metadata}
   * @memberof AssetStandards
   */
  'cip68_metadata'?: Cip68Metadata | null;
}
/**
 * Transaction which moved or minted a specific asset
 * @export
 * @interface AssetTx
 */
export interface AssetTx {
  /**
   * The height of the block which included the transaction
   * @type {number}
   * @memberof AssetTx
   */
  'block_height': number;
  /**
   * Epoch in which the transaction occurred
   * @type {number}
   * @memberof AssetTx
   */
  'epoch_no': number;
  /**
   * Transaction hash
   * @type {string}
   * @memberof AssetTx
   */
  'tx_hash': string;
}
/**
 * UTxO which contains a specific asset
 * @export
 * @interface AssetUtxo
 */
export interface AssetUtxo {
  /**
   * Address which controls the UTxO
   * @type {string}
   * @memberof AssetUtxo
   */
  'address': string;
  /**
   * Amount of the asset contained in the UTxO
   * @type {number}
   * @memberof AssetUtxo
   */
  'amount': number;
  /**
   * UTxO transaction index
   * @type {number}
   * @memberof AssetUtxo
   */
  'index': number;
  /**
   * Absolute slot of block which produced the UTxO
   * @type {number}
   * @memberof AssetUtxo
   */
  'slot': number;
  /**
   * UTxO transaction hash
   * @type {string}
   * @memberof AssetUtxo
   */
  'tx_hash': string;
}
/**
 * Block information
 * @export
 * @interface BlockInfo
 */
export interface BlockInfo {
  /**
   * Absolute slot when block was minted
   * @type {number}
   * @memberof BlockInfo
   */
  'absolute_slot': number;
  /**
   * Identifier of stake pool which minted the block
   * @type {string}
   * @memberof BlockInfo
   */
  'block_producer'?: string | null;
  /**
   * Number of blocks which have been minted since the block
   * @type {number}
   * @memberof BlockInfo
   */
  'confirmations': number;
  /**
   * Epoch in which block was minted
   * @type {number}
   * @memberof BlockInfo
   */
  'epoch': number;
  /**
   * Epoch slot at which block was minted
   * @type {number}
   * @memberof BlockInfo
   */
  'epoch_slot': number;
  /**
   * 
   * @type {LedgerEra}
   * @memberof BlockInfo
   */
  'era': LedgerEra;
  /**
   * Block hash
   * @type {string}
   * @memberof BlockInfo
   */
  'hash': string;
  /**
   * Block height (number)
   * @type {number}
   * @memberof BlockInfo
   */
  'height': number;
  /**
   * 
   * @type {OperationalCert}
   * @memberof BlockInfo
   */
  'operational_certificate'?: OperationalCert | null;
  /**
   * Block hash of the previous block
   * @type {string}
   * @memberof BlockInfo
   */
  'previous_block'?: string | null;
  /**
   * Ledger protocol version (major, minor)
   * @type {Array<BlockInfoProtocolVersionInner>}
   * @memberof BlockInfo
   */
  'protocol_version': Array<BlockInfoProtocolVersionInner>;
  /**
   * Number of script invocations
   * @type {number}
   * @memberof BlockInfo
   */
  'script_invocations': number;
  /**
   * Size of the block in bytes
   * @type {number}
   * @memberof BlockInfo
   */
  'size': number;
  /**
   * UTC timestamp when the block was minted
   * @type {string}
   * @memberof BlockInfo
   */
  'timestamp': string;
  /**
   * 
   * @type {ExUnits}
   * @memberof BlockInfo
   */
  'total_ex_units': ExUnits;
  /**
   * Total transaction fees collected for all transactions minted in the block
   * @type {number}
   * @memberof BlockInfo
   */
  'total_fees': number;
  /**
   * Total lovelace in outputs of transactions included in the block
   * @type {string}
   * @memberof BlockInfo
   */
  'total_output_lovelace': string;
  /**
   * Ordered transaction hashes for the transactions in the block
   * @type {Array<string>}
   * @memberof BlockInfo
   */
  'tx_hashes': Array<string>;
  /**
   * Null for Byron
   * @type {string}
   * @memberof BlockInfo
   */
  'vrf_key'?: string | null;
}


/**
 * 
 * @export
 * @interface BlockInfoProtocolVersionInner
 */
export interface BlockInfoProtocolVersionInner {
}
/**
 * 
 * @export
 * @interface Bound
 */
export interface Bound {
  /**
   * 
   * @type {number}
   * @memberof Bound
   */
  'epoch': number;
  /**
   * 
   * @type {number}
   * @memberof Bound
   */
  'slot': number;
  /**
   * 
   * @type {number}
   * @memberof Bound
   */
  'time': number;
}
/**
 * 
 * @export
 * @interface CertRedeemer
 */
export interface CertRedeemer {
  /**
   * 
   * @type {number}
   * @memberof CertRedeemer
   */
  'cert_index': number;
  /**
   * 
   * @type {Datum}
   * @memberof CertRedeemer
   */
  'data': Datum;
  /**
   * 
   * @type {Array<number>}
   * @memberof CertRedeemer
   */
  'ex_units': Array<number>;
}
/**
 * Certificates found in a transaction
 * @export
 * @interface Certificates
 */
export interface Certificates {
  /**
   * Instantaneous rewards certificates
   * @type {Array<MirCert>}
   * @memberof Certificates
   */
  'mir_transfers': Array<MirCert>;
  /**
   * Stake pool registration certificates
   * @type {Array<PoolRegCert>}
   * @memberof Certificates
   */
  'pool_registrations': Array<PoolRegCert>;
  /**
   * Stake pool retirement certificates
   * @type {Array<PoolRetireCert>}
   * @memberof Certificates
   */
  'pool_retirements': Array<PoolRetireCert>;
  /**
   * Stake key delegation certificates
   * @type {Array<StakeDelegCert>}
   * @memberof Certificates
   */
  'stake_delegations': Array<StakeDelegCert>;
  /**
   * Stake key deregistration certificates
   * @type {Array<StakeRegCert>}
   * @memberof Certificates
   */
  'stake_deregistrations': Array<StakeRegCert>;
  /**
   * Stake key registration certificates
   * @type {Array<StakeRegCert>}
   * @memberof Certificates
   */
  'stake_registrations': Array<StakeRegCert>;
}
/**
 * Blockchain chain-tip (most recently adopted block)
 * @export
 * @interface ChainTip
 */
export interface ChainTip {
  /**
   * Block hash of the most recent block
   * @type {string}
   * @memberof ChainTip
   */
  'block_hash': string;
  /**
   * Height (number) of the most recent block
   * @type {number}
   * @memberof ChainTip
   */
  'height': number;
  /**
   * Absolute slot of the most recent block
   * @type {number}
   * @memberof ChainTip
   */
  'slot': number;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const Cip68AssetType = {
  ReferenceNft: 'reference_nft',
  UserNft: 'user_nft',
  UserFt: 'user_ft'
} as const;

export type Cip68AssetType = typeof Cip68AssetType[keyof typeof Cip68AssetType];


/**
 * 
 * @export
 * @interface Cip68Metadata
 */
export interface Cip68Metadata {
  /**
   * Custom user defined Plutus data
   * @type {string}
   * @memberof Cip68Metadata
   */
  'extra'?: string | null;
  /**
   * Asset CIP-68 metadata
   * @type {object}
   * @memberof Cip68Metadata
   */
  'metadata': object;
  /**
   * 
   * @type {Cip68AssetType}
   * @memberof Cip68Metadata
   */
  'purpose': Cip68AssetType;
  /**
   * CIP-68 version
   * @type {number}
   * @memberof Cip68Metadata
   */
  'version': number;
}


/**
 * Information summary of the current epoch
 * @export
 * @interface CurrentEpochInfo
 */
export interface CurrentEpochInfo {
  /**
   * Total blocks in the epoch so far
   * @type {number}
   * @memberof CurrentEpochInfo
   */
  'blk_count': number;
  /**
   * Epoch number
   * @type {number}
   * @memberof CurrentEpochInfo
   */
  'epoch_no': number;
  /**
   * Total fees collected in the epoch so far
   * @type {string}
   * @memberof CurrentEpochInfo
   */
  'fees': string;
  /**
   * UNIX timestamp when the epoch began
   * @type {number}
   * @memberof CurrentEpochInfo
   */
  'start_time': number;
  /**
   * Total transactions in the epoch so far
   * @type {number}
   * @memberof CurrentEpochInfo
   */
  'tx_count': number;
}
/**
 * 
 * @export
 * @interface Data
 */
export interface Data {
  /**
   * 
   * @type {string}
   * @memberof Data
   */
  'hash': string;
  /**
   * 
   * @type {object}
   * @memberof Data
   */
  'value': object;
}
/**
 * 
 * @export
 * @interface Datum
 */
export interface Datum {
  /**
   * Hex encoded datum CBOR bytes
   * @type {string}
   * @memberof Datum
   */
  'bytes': string;
  /**
   * JSON representation of the datum
   * @type {object}
   * @memberof Datum
   */
  'json': object;
}
/**
 * Datum (inline or hash)
 * @export
 * @interface DatumOption
 */
export interface DatumOption {
  /**
   * Hex encoded datum CBOR bytes (`null` if datum type is `hash` and corresponding datum bytes have not been seen on-chain)
   * @type {string}
   * @memberof DatumOption
   */
  'bytes'?: string | null;
  /**
   * Datum hash
   * @type {string}
   * @memberof DatumOption
   */
  'hash': string;
  /**
   * JSON representation of the datum (`null` if datum type is `hash` and corresponding datum bytes have not been seen on-chain)
   * @type {object}
   * @memberof DatumOption
   */
  'json': object;
  /**
   * 
   * @type {DatumOptionType}
   * @memberof DatumOption
   */
  'type': DatumOptionType;
}


/**
 * Datum type (inline datum or datum hash)
 * @export
 * @enum {string}
 */

export const DatumOptionType = {
  Hash: 'hash',
  Inline: 'inline'
} as const;

export type DatumOptionType = typeof DatumOptionType[keyof typeof DatumOptionType];


/**
 * Information summary of a delegator
 * @export
 * @interface DelegatorInfo
 */
export interface DelegatorInfo {
  /**
   * Epoch at which the delegation becomes active
   * @type {number}
   * @memberof DelegatorInfo
   */
  'active_epoch_no'?: number | null;
  /**
   * Delegator live stake
   * @type {number}
   * @memberof DelegatorInfo
   */
  'amount'?: number | null;
  /**
   * Transaction hash relating to the most recent delegation
   * @type {string}
   * @memberof DelegatorInfo
   */
  'latest_delegation_tx_hash'?: string | null;
  /**
   * Bech32 encoded stake address (reward address)
   * @type {string}
   * @memberof DelegatorInfo
   */
  'stake_address'?: string | null;
}
/**
 * Information summary of an epoch
 * @export
 * @interface EpochInfo
 */
export interface EpochInfo {
  /**
   * Total blocks in the epoch
   * @type {number}
   * @memberof EpochInfo
   */
  'blk_count': number;
  /**
   * UNIX timestamp when the epoch ended
   * @type {number}
   * @memberof EpochInfo
   */
  'end_time': number;
  /**
   * Epoch number
   * @type {number}
   * @memberof EpochInfo
   */
  'epoch_no': number;
  /**
   * Total fees collected in the epoch
   * @type {string}
   * @memberof EpochInfo
   */
  'fees': string;
  /**
   * UNIX timestamp when the epoch began
   * @type {number}
   * @memberof EpochInfo
   */
  'start_time': number;
  /**
   * Total transactions in the epoch
   * @type {number}
   * @memberof EpochInfo
   */
  'tx_count': number;
}
/**
 * 
 * @export
 * @interface EraParameters
 */
export interface EraParameters {
  /**
   * 
   * @type {number}
   * @memberof EraParameters
   */
  'epoch_length': number;
  /**
   * 
   * @type {number}
   * @memberof EraParameters
   */
  'safe_zone'?: number | null;
  /**
   * 
   * @type {number}
   * @memberof EraParameters
   */
  'slot_length': number;
}
/**
 * 
 * @export
 * @interface EraSummary
 */
export interface EraSummary {
  /**
   * 
   * @type {Bound}
   * @memberof EraSummary
   */
  'end'?: Bound | null;
  /**
   * 
   * @type {EraParameters}
   * @memberof EraSummary
   */
  'parameters': EraParameters;
  /**
   * 
   * @type {Bound}
   * @memberof EraSummary
   */
  'start': Bound;
}
/**
 * Execution units for Plutus scripts
 * @export
 * @interface ExUnit
 */
export interface ExUnit {
  /**
   * Memory execution units
   * @type {number}
   * @memberof ExUnit
   */
  'memory': number;
  /**
   * CPU execution units
   * @type {number}
   * @memberof ExUnit
   */
  'steps': number;
}
/**
 * 
 * @export
 * @interface ExUnits
 */
export interface ExUnits {
  /**
   * 
   * @type {number}
   * @memberof ExUnits
   */
  'mem': number;
  /**
   * 
   * @type {number}
   * @memberof ExUnits
   */
  'steps': number;
}
/**
 * Details of the most recent block processed by the indexer (aka chain tip); that is, the data returned is correct as of this block in time.
 * @export
 * @interface LastUpdated
 */
export interface LastUpdated {
  /**
   * Hex-encoded hash of the most recently processed block (aka chain tip)
   * @type {string}
   * @memberof LastUpdated
   */
  'block_hash': string;
  /**
   * Absolute slot of the most recently processed block (aka chain tip)
   * @type {number}
   * @memberof LastUpdated
   */
  'block_slot': number;
  /**
   * UTC timestamp of when the most recently processed block was minted
   * @type {string}
   * @memberof LastUpdated
   */
  'timestamp': string;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const LedgerEra = {
  Byron: 'byron',
  Shelley: 'shelley',
  Allegra: 'allegra',
  Mary: 'mary',
  Alonzo: 'alonzo',
  Vasil: 'vasil',
  Valentine: 'valentine',
  Conway: 'conway',
  Notrecognised: 'notrecognised'
} as const;

export type LedgerEra = typeof LedgerEra[keyof typeof LedgerEra];


/**
 * Lovelace or native asset
 * @export
 * @interface MintAsset
 */
export interface MintAsset {
  /**
   * Amount of the asset minted or burned (negative is burn)
   * @type {number}
   * @memberof MintAsset
   */
  'amount': number;
  /**
   * Asset (represented as concatenation of hex encoded policy ID and asset name)
   * @type {string}
   * @memberof MintAsset
   */
  'unit': string;
}
/**
 * 
 * @export
 * @interface MintRedeemer
 */
export interface MintRedeemer {
  /**
   * 
   * @type {Datum}
   * @memberof MintRedeemer
   */
  'data': Datum;
  /**
   * 
   * @type {Array<number>}
   * @memberof MintRedeemer
   */
  'ex_units': Array<number>;
  /**
   * 
   * @type {string}
   * @memberof MintRedeemer
   */
  'policy': string;
}
/**
 * Transaction which minted or burned a specific asset
 * @export
 * @interface MintingTx
 */
export interface MintingTx {
  /**
   * UNIX timestamp of the block which included transaction
   * @type {number}
   * @memberof MintingTx
   */
  'block_timestamp': number;
  /**
   * Transaction metadata
   * @type {object}
   * @memberof MintingTx
   */
  'metadata': object;
  /**
   * Amount of the asset minted or burned (negative if burned)
   * @type {number}
   * @memberof MintingTx
   */
  'mint_amount': number;
  /**
   * Transaction hash
   * @type {string}
   * @memberof MintingTx
   */
  'tx_hash': string;
}
/**
 * Certificate for sending an instantaneous reward
 * @export
 * @interface MirCert
 */
export interface MirCert {
  /**
   * Index of the certificate in the transaction
   * @type {number}
   * @memberof MirCert
   */
  'cert_index': number;
  /**
   * 
   * @type {MirSource}
   * @memberof MirCert
   */
  'from': MirSource;
  /**
   * Where the rewards funds are being sent
   * @type {string}
   * @memberof MirCert
   */
  'to': string;
}


/**
 * The pot from which an MIR reward is being funded by
 * @export
 * @enum {string}
 */

export const MirSource = {
  Reserves: 'reserves',
  Treasury: 'treasury'
} as const;

export type MirSource = typeof MirSource[keyof typeof MirSource];


/**
 * 
 * @export
 * @enum {string}
 */

export const NetworkId = {
  Mainnet: 'mainnet',
  Testnet: 'testnet'
} as const;

export type NetworkId = typeof NetworkId[keyof typeof NetworkId];


/**
 * 
 * @export
 * @interface OperationalCert
 */
export interface OperationalCert {
  /**
   * 
   * @type {string}
   * @memberof OperationalCert
   */
  'hot_vkey': string;
  /**
   * 
   * @type {number}
   * @memberof OperationalCert
   */
  'kes_period': number;
  /**
   * 
   * @type {string}
   * @memberof OperationalCert
   */
  'kes_signature': string;
  /**
   * 
   * @type {number}
   * @memberof OperationalCert
   */
  'sequence_number': number;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAccountHistory
 */
export interface PaginatedAccountHistory {
  /**
   * Endpoint response data
   * @type {Array<AccountHistory>}
   * @memberof PaginatedAccountHistory
   */
  'data': Array<AccountHistory>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAccountHistory
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAccountHistory
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAccountReward
 */
export interface PaginatedAccountReward {
  /**
   * Endpoint response data
   * @type {Array<AccountReward>}
   * @memberof PaginatedAccountReward
   */
  'data': Array<AccountReward>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAccountReward
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAccountReward
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAccountUpdate
 */
export interface PaginatedAccountUpdate {
  /**
   * Endpoint response data
   * @type {Array<AccountUpdate>}
   * @memberof PaginatedAccountUpdate
   */
  'data': Array<AccountUpdate>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAccountUpdate
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAccountUpdate
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAddress
 */
export interface PaginatedAddress {
  /**
   * Endpoint response data
   * @type {Array<string>}
   * @memberof PaginatedAddress
   */
  'data': Array<string>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAddress
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAddress
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAddressTransaction
 */
export interface PaginatedAddressTransaction {
  /**
   * Endpoint response data
   * @type {Array<AddressTransaction>}
   * @memberof PaginatedAddressTransaction
   */
  'data': Array<AddressTransaction>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAddressTransaction
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAddressTransaction
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAsset
 */
export interface PaginatedAsset {
  /**
   * Endpoint response data
   * @type {Array<Asset>}
   * @memberof PaginatedAsset
   */
  'data': Array<Asset>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAsset
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAsset
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAssetHolder
 */
export interface PaginatedAssetHolder {
  /**
   * Endpoint response data
   * @type {Array<AssetHolder>}
   * @memberof PaginatedAssetHolder
   */
  'data': Array<AssetHolder>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAssetHolder
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAssetHolder
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAssetHolderAccount
 */
export interface PaginatedAssetHolderAccount {
  /**
   * Endpoint response data
   * @type {Array<AssetHolderAccount>}
   * @memberof PaginatedAssetHolderAccount
   */
  'data': Array<AssetHolderAccount>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAssetHolderAccount
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAssetHolderAccount
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAssetInfo
 */
export interface PaginatedAssetInfo {
  /**
   * Endpoint response data
   * @type {Array<AssetInfo>}
   * @memberof PaginatedAssetInfo
   */
  'data': Array<AssetInfo>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAssetInfo
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAssetInfo
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAssetTx
 */
export interface PaginatedAssetTx {
  /**
   * Endpoint response data
   * @type {Array<AssetTx>}
   * @memberof PaginatedAssetTx
   */
  'data': Array<AssetTx>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAssetTx
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAssetTx
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedAssetUtxo
 */
export interface PaginatedAssetUtxo {
  /**
   * Endpoint response data
   * @type {Array<AssetUtxo>}
   * @memberof PaginatedAssetUtxo
   */
  'data': Array<AssetUtxo>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedAssetUtxo
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedAssetUtxo
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedDelegatorInfo
 */
export interface PaginatedDelegatorInfo {
  /**
   * Endpoint response data
   * @type {Array<DelegatorInfo>}
   * @memberof PaginatedDelegatorInfo
   */
  'data': Array<DelegatorInfo>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedDelegatorInfo
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedDelegatorInfo
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedMintingTx
 */
export interface PaginatedMintingTx {
  /**
   * Endpoint response data
   * @type {Array<MintingTx>}
   * @memberof PaginatedMintingTx
   */
  'data': Array<MintingTx>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedMintingTx
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedMintingTx
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPaymentCredentialTransaction
 */
export interface PaginatedPaymentCredentialTransaction {
  /**
   * Endpoint response data
   * @type {Array<PaymentCredentialTransaction>}
   * @memberof PaginatedPaymentCredentialTransaction
   */
  'data': Array<PaymentCredentialTransaction>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPaymentCredentialTransaction
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPaymentCredentialTransaction
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPolicyHolder
 */
export interface PaginatedPolicyHolder {
  /**
   * Endpoint response data
   * @type {Array<PolicyHolder>}
   * @memberof PaginatedPolicyHolder
   */
  'data': Array<PolicyHolder>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPolicyHolder
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPolicyHolder
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPolicyHolderAccount
 */
export interface PaginatedPolicyHolderAccount {
  /**
   * Endpoint response data
   * @type {Array<PolicyHolderAccount>}
   * @memberof PaginatedPolicyHolderAccount
   */
  'data': Array<PolicyHolderAccount>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPolicyHolderAccount
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPolicyHolderAccount
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPolicyUtxo
 */
export interface PaginatedPolicyUtxo {
  /**
   * Endpoint response data
   * @type {Array<PolicyUtxo>}
   * @memberof PaginatedPolicyUtxo
   */
  'data': Array<PolicyUtxo>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPolicyUtxo
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPolicyUtxo
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPoolBlock
 */
export interface PaginatedPoolBlock {
  /**
   * Endpoint response data
   * @type {Array<PoolBlock>}
   * @memberof PaginatedPoolBlock
   */
  'data': Array<PoolBlock>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPoolBlock
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPoolBlock
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPoolHistory
 */
export interface PaginatedPoolHistory {
  /**
   * Endpoint response data
   * @type {Array<PoolHistory>}
   * @memberof PaginatedPoolHistory
   */
  'data': Array<PoolHistory>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPoolHistory
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPoolHistory
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedPoolListInfo
 */
export interface PaginatedPoolListInfo {
  /**
   * Endpoint response data
   * @type {Array<PoolListInfo>}
   * @memberof PaginatedPoolListInfo
   */
  'data': Array<PoolListInfo>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedPoolListInfo
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedPoolListInfo
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedUtxoRef
 */
export interface PaginatedUtxoRef {
  /**
   * Endpoint response data
   * @type {Array<UtxoRef>}
   * @memberof PaginatedUtxoRef
   */
  'data': Array<UtxoRef>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedUtxoRef
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedUtxoRef
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedUtxoWithBytes
 */
export interface PaginatedUtxoWithBytes {
  /**
   * Endpoint response data
   * @type {Array<UtxoWithBytes>}
   * @memberof PaginatedUtxoWithBytes
   */
  'data': Array<UtxoWithBytes>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedUtxoWithBytes
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedUtxoWithBytes
   */
  'next_cursor'?: string | null;
}
/**
 * A paginated response. Pass in the `next_cursor` in a subsequent request as the `cursor` query parameter to fetch the next page of results.
 * @export
 * @interface PaginatedUtxoWithSlot
 */
export interface PaginatedUtxoWithSlot {
  /**
   * Endpoint response data
   * @type {Array<UtxoWithSlot>}
   * @memberof PaginatedUtxoWithSlot
   */
  'data': Array<UtxoWithSlot>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof PaginatedUtxoWithSlot
   */
  'last_updated': LastUpdated;
  /**
   * Pagination cursor
   * @type {string}
   * @memberof PaginatedUtxoWithSlot
   */
  'next_cursor'?: string | null;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const PaymentCredKind = {
  Key: 'key',
  Script: 'script'
} as const;

export type PaymentCredKind = typeof PaymentCredKind[keyof typeof PaymentCredKind];


/**
 * Payment credential, the payment part of a Cardano address
 * @export
 * @interface PaymentCredential
 */
export interface PaymentCredential {
  /**
   * Bech32-encoding of the credential key hash or script hash
   * @type {string}
   * @memberof PaymentCredential
   */
  'bech32': string;
  /**
   * Hex-encoding of the script or key credential
   * @type {string}
   * @memberof PaymentCredential
   */
  'hex': string;
  /**
   * 
   * @type {PaymentCredKind}
   * @memberof PaymentCredential
   */
  'kind': PaymentCredKind;
}


/**
 * Transaction which involved a specific address
 * @export
 * @interface PaymentCredentialTransaction
 */
export interface PaymentCredentialTransaction {
  /**
   * Payment credential controlled at least one of the consumed UTxOs
   * @type {boolean}
   * @memberof PaymentCredentialTransaction
   */
  'input': boolean;
  /**
   * Payment credential controlled at least one of the produced UTxOs
   * @type {boolean}
   * @memberof PaymentCredentialTransaction
   */
  'output': boolean;
  /**
   * Payment credential was an additional required signer
   * @type {boolean}
   * @memberof PaymentCredentialTransaction
   */
  'required_signer': boolean;
  /**
   * Absolute slot of the block which contains the transaction
   * @type {number}
   * @memberof PaymentCredentialTransaction
   */
  'slot': number;
  /**
   * Transaction hash
   * @type {string}
   * @memberof PaymentCredentialTransaction
   */
  'tx_hash': string;
}
/**
 * 
 * @export
 * @interface Pointer
 */
export interface Pointer {
  /**
   * 
   * @type {number}
   * @memberof Pointer
   */
  'cert_index': number;
  /**
   * 
   * @type {number}
   * @memberof Pointer
   */
  'slot': number;
  /**
   * 
   * @type {number}
   * @memberof Pointer
   */
  'tx_index': number;
}
/**
 * Holder of assets of a specific policy
 * @export
 * @interface PolicyHolder
 */
export interface PolicyHolder {
  /**
   * Address of the holder
   * @type {string}
   * @memberof PolicyHolder
   */
  'address': string;
  /**
   * List of assets owned by the holder belonging to the policy
   * @type {Array<AssetInPolicy>}
   * @memberof PolicyHolder
   */
  'assets': Array<AssetInPolicy>;
}
/**
 * Account which controls some assets of a specific policy
 * @export
 * @interface PolicyHolderAccount
 */
export interface PolicyHolderAccount {
  /**
   * Address of the holder
   * @type {string}
   * @memberof PolicyHolderAccount
   */
  'account': string;
  /**
   * List of assets owned by the holder belonging to the policy
   * @type {Array<AssetInPolicy>}
   * @memberof PolicyHolderAccount
   */
  'assets': Array<AssetInPolicy>;
}
/**
 * UTxO which contains assets of a specific policy
 * @export
 * @interface PolicyUtxo
 */
export interface PolicyUtxo {
  /**
   * Address which controls the UTxO
   * @type {string}
   * @memberof PolicyUtxo
   */
  'address': string;
  /**
   * List of assets contained in the UTxO belonging to the policy
   * @type {Array<AssetInPolicy>}
   * @memberof PolicyUtxo
   */
  'assets': Array<AssetInPolicy>;
  /**
   * UTxO transaction index
   * @type {number}
   * @memberof PolicyUtxo
   */
  'index': number;
  /**
   * Absolute slot of block which produced the UTxO
   * @type {number}
   * @memberof PolicyUtxo
   */
  'slot': number;
  /**
   * UTxO transaction hash
   * @type {string}
   * @memberof PolicyUtxo
   */
  'tx_hash': string;
}
/**
 * Block created by a stake pool
 * @export
 * @interface PoolBlock
 */
export interface PoolBlock {
  /**
   * Absolute slot of the block
   * @type {number}
   * @memberof PoolBlock
   */
  'abs_slot'?: number | null;
  /**
   * Block hash
   * @type {string}
   * @memberof PoolBlock
   */
  'block_hash': string;
  /**
   * Block height (block number)
   * @type {number}
   * @memberof PoolBlock
   */
  'block_height': number;
  /**
   * UNIX timestamp when the block was mined
   * @type {number}
   * @memberof PoolBlock
   */
  'block_time': number;
  /**
   * Epoch number
   * @type {number}
   * @memberof PoolBlock
   */
  'epoch_no'?: number | null;
  /**
   * Epoch slot
   * @type {number}
   * @memberof PoolBlock
   */
  'epoch_slot'?: number | null;
}
/**
 * Per-epoch history of a stake pool
 * @export
 * @interface PoolHistory
 */
export interface PoolHistory {
  /**
   * Active stake in the epoch
   * @type {number}
   * @memberof PoolHistory
   */
  'active_stake'?: number | null;
  /**
   * Pool active stake as percentage of total active stake
   * @type {string}
   * @memberof PoolHistory
   */
  'active_stake_pct'?: string | null;
  /**
   * Blocks created in the epoch
   * @type {number}
   * @memberof PoolHistory
   */
  'block_cnt'?: number | null;
  /**
   * Total rewards earned by pool delegators for the epoch
   * @type {number}
   * @memberof PoolHistory
   */
  'deleg_rewards': number;
  /**
   * Delegators in the epoch
   * @type {number}
   * @memberof PoolHistory
   */
  'delegator_cnt'?: number | null;
  /**
   * Epoch number
   * @type {number}
   * @memberof PoolHistory
   */
  'epoch_no': number;
  /**
   * Annual return percentage for delegators for the epoch
   * @type {string}
   * @memberof PoolHistory
   */
  'epoch_ros': string;
  /**
   * Pool fixed cost
   * @type {number}
   * @memberof PoolHistory
   */
  'fixed_cost': number;
  /**
   * Pool margin
   * @type {number}
   * @memberof PoolHistory
   */
  'margin'?: number | null;
  /**
   * Fees collected for the epoch
   * @type {number}
   * @memberof PoolHistory
   */
  'pool_fees': number;
  /**
   * Pool saturation percent
   * @type {string}
   * @memberof PoolHistory
   */
  'saturation_pct'?: string | null;
}
/**
 * Information summary of a stake pool
 * @export
 * @interface PoolInfo
 */
export interface PoolInfo {
  /**
   * Epoch when the update takes effect
   * @type {number}
   * @memberof PoolInfo
   */
  'active_epoch_no': number;
  /**
   * Active stake
   * @type {number}
   * @memberof PoolInfo
   */
  'active_stake'?: number | null;
  /**
   * Number of blocks created
   * @type {number}
   * @memberof PoolInfo
   */
  'block_count'?: number | null;
  /**
   * Pool fixed cost
   * @type {number}
   * @memberof PoolInfo
   */
  'fixed_cost': number;
  /**
   * Number of current delegators
   * @type {number}
   * @memberof PoolInfo
   */
  'live_delegators': number;
  /**
   * Account balance of pool owners
   * @type {number}
   * @memberof PoolInfo
   */
  'live_pledge'?: number | null;
  /**
   * Live saturation
   * @type {string}
   * @memberof PoolInfo
   */
  'live_saturation'?: string | null;
  /**
   * Live stake
   * @type {number}
   * @memberof PoolInfo
   */
  'live_stake'?: number | null;
  /**
   * Pool margin
   * @type {number}
   * @memberof PoolInfo
   */
  'margin': number;
  /**
   * Hash of the pool metadata
   * @type {string}
   * @memberof PoolInfo
   */
  'meta_hash'?: string | null;
  /**
   * 
   * @type {PoolMetaJson}
   * @memberof PoolInfo
   */
  'meta_json'?: PoolMetaJson | null;
  /**
   * URL pointing to the pool metadata
   * @type {string}
   * @memberof PoolInfo
   */
  'meta_url'?: string | null;
  /**
   * Pool operational certificate
   * @type {string}
   * @memberof PoolInfo
   */
  'op_cert'?: string | null;
  /**
   * Operational certificate counter
   * @type {number}
   * @memberof PoolInfo
   */
  'op_cert_counter'?: number | null;
  /**
   * List of stake keys which control the pool
   * @type {Array<string>}
   * @memberof PoolInfo
   */
  'owners': Array<string>;
  /**
   * Pool pledge
   * @type {number}
   * @memberof PoolInfo
   */
  'pledge': number;
  /**
   * Bech32 encoded pool ID
   * @type {string}
   * @memberof PoolInfo
   */
  'pool_id_bech32': string;
  /**
   * Hex encoded pool ID
   * @type {string}
   * @memberof PoolInfo
   */
  'pool_id_hex': string;
  /**
   * Status of the pool
   * @type {string}
   * @memberof PoolInfo
   */
  'pool_status'?: string | null;
  /**
   * Relays declared by the pool
   * @type {Array<Relay>}
   * @memberof PoolInfo
   */
  'relays': Array<Relay>;
  /**
   * Epoch at which the pool will be retired
   * @type {number}
   * @memberof PoolInfo
   */
  'retiring_epoch'?: number | null;
  /**
   * Reward address associated with the pool
   * @type {string}
   * @memberof PoolInfo
   */
  'reward_addr'?: string | null;
  /**
   * Pool stake share
   * @type {string}
   * @memberof PoolInfo
   */
  'sigma'?: string | null;
  /**
   * VRF key hash
   * @type {string}
   * @memberof PoolInfo
   */
  'vrf_key_hash': string;
}
/**
 * Stake pool identifier
 * @export
 * @interface PoolListInfo
 */
export interface PoolListInfo {
  /**
   * Bech32 encoded pool ID
   * @type {string}
   * @memberof PoolListInfo
   */
  'pool_id_bech32': string;
  /**
   * Pool ticker symbol
   * @type {string}
   * @memberof PoolListInfo
   */
  'ticker'?: string | null;
}
/**
 * JSON metadata associated with a stake pool
 * @export
 * @interface PoolMetaJson
 */
export interface PoolMetaJson {
  /**
   * Pool description
   * @type {string}
   * @memberof PoolMetaJson
   */
  'description'?: string | null;
  /**
   * Pool home page URL
   * @type {string}
   * @memberof PoolMetaJson
   */
  'homepage'?: string | null;
  /**
   * Pool name
   * @type {string}
   * @memberof PoolMetaJson
   */
  'name': string;
  /**
   * Pool ticker symbol
   * @type {string}
   * @memberof PoolMetaJson
   */
  'ticker'?: string | null;
}
/**
 * Metadata associated with a stake pool
 * @export
 * @interface PoolMetadata
 */
export interface PoolMetadata {
  /**
   * Hash of the pool metadata
   * @type {string}
   * @memberof PoolMetadata
   */
  'meta_hash'?: string | null;
  /**
   * 
   * @type {PoolMetaJson}
   * @memberof PoolMetadata
   */
  'meta_json'?: PoolMetaJson | null;
  /**
   * URL pointing to the pool metadata
   * @type {string}
   * @memberof PoolMetadata
   */
  'meta_url'?: string | null;
  /**
   * Bech32 encoded pool ID
   * @type {string}
   * @memberof PoolMetadata
   */
  'pool_id_bech32': string;
}
/**
 * Certificate for registering or updating a stake pool
 * @export
 * @interface PoolRegCert
 */
export interface PoolRegCert {
  /**
   * Index of the certificate in the transaction
   * @type {number}
   * @memberof PoolRegCert
   */
  'cert_index': number;
  /**
   * Pool fixed cost
   * @type {number}
   * @memberof PoolRegCert
   */
  'fixed_cost': number;
  /**
   * Epoch at which the update will become active
   * @type {number}
   * @memberof PoolRegCert
   */
  'from_epoch': number;
  /**
   * Pool margin
   * @type {number}
   * @memberof PoolRegCert
   */
  'margin': number;
  /**
   * Hash of metadata that the metadata URL should point to
   * @type {string}
   * @memberof PoolRegCert
   */
  'metadata_hash'?: string | null;
  /**
   * URL pointing to pool metadata declared by the stake pool
   * @type {string}
   * @memberof PoolRegCert
   */
  'metadata_url'?: string | null;
  /**
   * Stake addresses which control the stake pool
   * @type {Array<string>}
   * @memberof PoolRegCert
   */
  'owner_addresses': Array<string>;
  /**
   * Pool pledge
   * @type {number}
   * @memberof PoolRegCert
   */
  'pledge': number;
  /**
   * Pool ID of the stake pool being updated
   * @type {string}
   * @memberof PoolRegCert
   */
  'pool_id': string;
  /**
   * Relays declared by the stake pool
   * @type {Array<Relay>}
   * @memberof PoolRegCert
   */
  'relays': Array<Relay>;
  /**
   * Stake address which will receive rewards from the stake pool
   * @type {string}
   * @memberof PoolRegCert
   */
  'reward_address': string;
  /**
   * VRF key hash of the stake pool
   * @type {string}
   * @memberof PoolRegCert
   */
  'vrf_key_hash': string;
}
/**
 * Relay declared by a stake pool
 * @export
 * @interface PoolRelay
 */
export interface PoolRelay {
  /**
   * Bech32 encoded pool ID
   * @type {string}
   * @memberof PoolRelay
   */
  'pool_id_bech32': string;
  /**
   * Relays declared by the pool
   * @type {Array<Relay>}
   * @memberof PoolRelay
   */
  'relays': Array<Relay>;
}
/**
 * Certificate for retiring a stake pool
 * @export
 * @interface PoolRetireCert
 */
export interface PoolRetireCert {
  /**
   * Pool will be retired at the end of this epoch
   * @type {number}
   * @memberof PoolRetireCert
   */
  'after_epoch': number;
  /**
   * Index of the certificate in the transaction
   * @type {number}
   * @memberof PoolRetireCert
   */
  'cert_index': number;
  /**
   * Bech32 pool ID of the pool being retired
   * @type {string}
   * @memberof PoolRetireCert
   */
  'pool_id': string;
}
/**
 * Update to a stake pool
 * @export
 * @interface PoolUpdate
 */
export interface PoolUpdate {
  /**
   * Epoch when the update takes effect
   * @type {number}
   * @memberof PoolUpdate
   */
  'active_epoch_no': number;
  /**
   * UNIX timestamp of the block containing the transaction
   * @type {number}
   * @memberof PoolUpdate
   */
  'block_time'?: number | null;
  /**
   * Pool fixed cost
   * @type {number}
   * @memberof PoolUpdate
   */
  'fixed_cost': number;
  /**
   * Pool margin
   * @type {number}
   * @memberof PoolUpdate
   */
  'margin': number;
  /**
   * Hash of the pool metadata
   * @type {string}
   * @memberof PoolUpdate
   */
  'meta_hash'?: string | null;
  /**
   * 
   * @type {PoolMetaJson}
   * @memberof PoolUpdate
   */
  'meta_json'?: PoolMetaJson | null;
  /**
   * URL pointing to the pool metadata
   * @type {string}
   * @memberof PoolUpdate
   */
  'meta_url'?: string | null;
  /**
   * List of stake keys which control the pool
   * @type {Array<string>}
   * @memberof PoolUpdate
   */
  'owners': Array<string>;
  /**
   * Pool pledge
   * @type {number}
   * @memberof PoolUpdate
   */
  'pledge': number;
  /**
   * Bech32 encoded pool ID
   * @type {string}
   * @memberof PoolUpdate
   */
  'pool_id_bech32': string;
  /**
   * Hex encoded pool ID
   * @type {string}
   * @memberof PoolUpdate
   */
  'pool_id_hex': string;
  /**
   * Status of the pool
   * @type {string}
   * @memberof PoolUpdate
   */
  'pool_status'?: string | null;
  /**
   * Relays declared by the pool
   * @type {Array<Relay>}
   * @memberof PoolUpdate
   */
  'relays': Array<Relay>;
  /**
   * Epoch at which the pool will be retired
   * @type {number}
   * @memberof PoolUpdate
   */
  'retiring_epoch'?: number | null;
  /**
   * Reward address associated with the pool
   * @type {string}
   * @memberof PoolUpdate
   */
  'reward_addr'?: string | null;
  /**
   * Transaction hash for the transaction which contained the update
   * @type {string}
   * @memberof PoolUpdate
   */
  'tx_hash': string;
  /**
   * VRF key hash
   * @type {string}
   * @memberof PoolUpdate
   */
  'vrf_key_hash': string;
}
/**
 * 
 * @export
 * @interface Prices
 */
export interface Prices {
  /**
   * 
   * @type {string}
   * @memberof Prices
   */
  'memory': string;
  /**
   * 
   * @type {string}
   * @memberof Prices
   */
  'steps': string;
}
/**
 * 
 * @export
 * @interface ProtocolParameters
 */
export interface ProtocolParameters {
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'coins_per_utxo_byte': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'collateral_percentage': number;
  /**
   * 
   * @type {{ [key: string]: { [key: string]: number; }; }}
   * @memberof ProtocolParameters
   */
  'cost_models': { [key: string]: { [key: string]: number; }; };
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'desired_number_of_pools': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'max_block_body_size': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'max_block_header_size': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'max_collateral_inputs': number;
  /**
   * 
   * @type {ExUnit}
   * @memberof ProtocolParameters
   */
  'max_execution_units_per_block': ExUnit;
  /**
   * 
   * @type {ExUnit}
   * @memberof ProtocolParameters
   */
  'max_execution_units_per_transaction': ExUnit;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'max_tx_size': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'max_value_size': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'min_fee_coefficient': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'min_fee_constant': number;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'min_pool_cost': number;
  /**
   * 
   * @type {string}
   * @memberof ProtocolParameters
   */
  'monetary_expansion': string;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'pool_deposit': number;
  /**
   * 
   * @type {string}
   * @memberof ProtocolParameters
   */
  'pool_influence': string;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'pool_retirement_epoch_bound': number;
  /**
   * 
   * @type {Prices}
   * @memberof ProtocolParameters
   */
  'prices': Prices;
  /**
   * 
   * @type {Version}
   * @memberof ProtocolParameters
   */
  'protocol_version': Version;
  /**
   * 
   * @type {number}
   * @memberof ProtocolParameters
   */
  'stake_key_deposit': number;
  /**
   * 
   * @type {string}
   * @memberof ProtocolParameters
   */
  'treasury_expansion': string;
}
/**
 * 
 * @export
 * @interface Redeemers
 */
export interface Redeemers {
  /**
   * Redeemers attempting to delegate or deregister a script-controlled stake account
   * @type {Array<CertRedeemer>}
   * @memberof Redeemers
   */
  'certificates': Array<CertRedeemer>;
  /**
   * Redeemers attempting to mint assets of a script-controlled policy ID
   * @type {Array<MintRedeemer>}
   * @memberof Redeemers
   */
  'mints': Array<MintRedeemer>;
  /**
   * Redeemers attempting to spend a UTxO locked at a script
   * @type {Array<SpendRedeemer>}
   * @memberof Redeemers
   */
  'spends': Array<SpendRedeemer>;
  /**
   * Redeemers attempting to withdraw rewards for a script-controlled stake account
   * @type {Array<WdrlRedeemer>}
   * @memberof Redeemers
   */
  'withdrawals': Array<WdrlRedeemer>;
}
/**
 * Stake pool relay
 * @export
 * @interface Relay
 */
export interface Relay {
  /**
   * 
   * @type {string}
   * @memberof Relay
   */
  'dns'?: string | null;
  /**
   * 
   * @type {string}
   * @memberof Relay
   */
  'ipv4'?: string | null;
  /**
   * 
   * @type {string}
   * @memberof Relay
   */
  'ipv6'?: string | null;
  /**
   * 
   * @type {number}
   * @memberof Relay
   */
  'port'?: number | null;
  /**
   * 
   * @type {string}
   * @memberof Relay
   */
  'srv'?: string | null;
}
/**
 * Details of a Native or Plutus script
 * @export
 * @interface Script
 */
export interface Script {
  /**
   * Script bytes (`null` if `native` script)
   * @type {string}
   * @memberof Script
   */
  'bytes'?: string | null;
  /**
   * Script hash
   * @type {string}
   * @memberof Script
   */
  'hash': string;
  /**
   * JSON representation of script (`null` if not `native` script)
   * @type {object}
   * @memberof Script
   */
  'json': object;
  /**
   * 
   * @type {ScriptType}
   * @memberof Script
   */
  'type': ScriptType;
}


/**
 * Script type and version
 * @export
 * @enum {string}
 */

export const ScriptType = {
  Native: 'native',
  Plutusv1: 'plutusv1',
  Plutusv2: 'plutusv2'
} as const;

export type ScriptType = typeof ScriptType[keyof typeof ScriptType];


/**
 * 
 * @export
 * @interface SpendRedeemer
 */
export interface SpendRedeemer {
  /**
   * 
   * @type {Datum}
   * @memberof SpendRedeemer
   */
  'data': Datum;
  /**
   * 
   * @type {Array<number>}
   * @memberof SpendRedeemer
   */
  'ex_units': Array<number>;
  /**
   * 
   * @type {number}
   * @memberof SpendRedeemer
   */
  'input_index': number;
}
/**
 * Certificate for stake key delegation
 * @export
 * @interface StakeDelegCert
 */
export interface StakeDelegCert {
  /**
   * Index of the certificate in the transaction
   * @type {number}
   * @memberof StakeDelegCert
   */
  'cert_index': number;
  /**
   * Pool ID of the stake pool the stake key is delegating to
   * @type {string}
   * @memberof StakeDelegCert
   */
  'pool_id': string;
  /**
   * Stake address corresponding to stake key being delegated
   * @type {string}
   * @memberof StakeDelegCert
   */
  'stake_address': string;
}
/**
 * Certificate for registering a stake key
 * @export
 * @interface StakeRegCert
 */
export interface StakeRegCert {
  /**
   * Index of the certificate in the transaction
   * @type {number}
   * @memberof StakeRegCert
   */
  'cert_index': number;
  /**
   * Stake address corresponding to stake key being updated
   * @type {string}
   * @memberof StakeRegCert
   */
  'stake_address': string;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const StakingCredKind = {
  Key: 'key',
  Script: 'script',
  Pointer: 'pointer'
} as const;

export type StakingCredKind = typeof StakingCredKind[keyof typeof StakingCredKind];


/**
 * Staking credential, the delegation part of a Cardano address
 * @export
 * @interface StakingCredential
 */
export interface StakingCredential {
  /**
   * Bech32-encoding of the credential key hash or script hash
   * @type {string}
   * @memberof StakingCredential
   */
  'bech32'?: string | null;
  /**
   * 
   * @type {string}
   * @memberof StakingCredential
   */
  'hex'?: string | null;
  /**
   * 
   * @type {StakingCredKind}
   * @memberof StakingCredential
   */
  'kind': StakingCredKind;
  /**
   * 
   * @type {Pointer}
   * @memberof StakingCredential
   */
  'pointer'?: Pointer | null;
  /**
   * 
   * @type {string}
   * @memberof StakingCredential
   */
  'reward_address'?: string | null;
}


/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedAccountInfo
 */
export interface TimestampedAccountInfo {
  /**
   * 
   * @type {AccountInfo}
   * @memberof TimestampedAccountInfo
   */
  'data': AccountInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedAccountInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedAddress
 */
export interface TimestampedAddress {
  /**
   * Bech32-encoded Cardano Address
   * @type {string}
   * @memberof TimestampedAddress
   */
  'data': string;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedAddress
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedAssetInfo
 */
export interface TimestampedAssetInfo {
  /**
   * 
   * @type {AssetInfo}
   * @memberof TimestampedAssetInfo
   */
  'data': AssetInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedAssetInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedBlockInfo
 */
export interface TimestampedBlockInfo {
  /**
   * 
   * @type {BlockInfo}
   * @memberof TimestampedBlockInfo
   */
  'data': BlockInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedBlockInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedChainTip
 */
export interface TimestampedChainTip {
  /**
   * 
   * @type {ChainTip}
   * @memberof TimestampedChainTip
   */
  'data': ChainTip;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedChainTip
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedCurrentEpochInfo
 */
export interface TimestampedCurrentEpochInfo {
  /**
   * 
   * @type {CurrentEpochInfo}
   * @memberof TimestampedCurrentEpochInfo
   */
  'data': CurrentEpochInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedCurrentEpochInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedDatum
 */
export interface TimestampedDatum {
  /**
   * 
   * @type {Datum}
   * @memberof TimestampedDatum
   */
  'data': Datum;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedDatum
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedEpochInfo
 */
export interface TimestampedEpochInfo {
  /**
   * 
   * @type {EpochInfo}
   * @memberof TimestampedEpochInfo
   */
  'data': EpochInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedEpochInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedEraSummaries
 */
export interface TimestampedEraSummaries {
  /**
   * 
   * @type {Array<EraSummary>}
   * @memberof TimestampedEraSummaries
   */
  'data': Array<EraSummary>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedEraSummaries
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedPoolInfo
 */
export interface TimestampedPoolInfo {
  /**
   * 
   * @type {PoolInfo}
   * @memberof TimestampedPoolInfo
   */
  'data': PoolInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedPoolInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedPoolMetadata
 */
export interface TimestampedPoolMetadata {
  /**
   * 
   * @type {PoolMetadata}
   * @memberof TimestampedPoolMetadata
   */
  'data': PoolMetadata;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedPoolMetadata
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedPoolRelays
 */
export interface TimestampedPoolRelays {
  /**
   * A list of stake pool relays declared on-chain
   * @type {Array<PoolRelay>}
   * @memberof TimestampedPoolRelays
   */
  'data': Array<PoolRelay>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedPoolRelays
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedPoolUpdates
 */
export interface TimestampedPoolUpdates {
  /**
   * List of updates to a stake pool
   * @type {Array<PoolUpdate>}
   * @memberof TimestampedPoolUpdates
   */
  'data': Array<PoolUpdate>;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedPoolUpdates
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedProtocolParameters
 */
export interface TimestampedProtocolParameters {
  /**
   * 
   * @type {ProtocolParameters}
   * @memberof TimestampedProtocolParameters
   */
  'data': ProtocolParameters;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedProtocolParameters
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedScript
 */
export interface TimestampedScript {
  /**
   * 
   * @type {Script}
   * @memberof TimestampedScript
   */
  'data': Script;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedScript
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedSystemStart
 */
export interface TimestampedSystemStart {
  /**
   * 
   * @type {string}
   * @memberof TimestampedSystemStart
   */
  'data': string;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedSystemStart
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedTransactionInfo
 */
export interface TimestampedTransactionInfo {
  /**
   * 
   * @type {TransactionInfo}
   * @memberof TimestampedTransactionInfo
   */
  'data': TransactionInfo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedTransactionInfo
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedTxCbor
 */
export interface TimestampedTxCbor {
  /**
   * Hex encoded transaction CBOR bytes
   * @type {string}
   * @memberof TimestampedTxCbor
   */
  'data': string;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedTxCbor
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedTxCount
 */
export interface TimestampedTxCount {
  /**
   * Number of transactions
   * @type {number}
   * @memberof TimestampedTxCount
   */
  'data': number;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedTxCount
   */
  'last_updated': LastUpdated;
}
/**
 * Timestamped response. Returns the endpoint response data along with the chain-tip of the indexer, which details at which point in the chain\'s history the data was correct as-of.
 * @export
 * @interface TimestampedUtxo
 */
export interface TimestampedUtxo {
  /**
   * 
   * @type {Utxo}
   * @memberof TimestampedUtxo
   */
  'data': Utxo;
  /**
   * 
   * @type {LastUpdated}
   * @memberof TimestampedUtxo
   */
  'last_updated': LastUpdated;
}
/**
 * Token registry metadata
 * @export
 * @interface TokenRegistryMetadata
 */
export interface TokenRegistryMetadata {
  /**
   * Recommended value for decimal places
   * @type {number}
   * @memberof TokenRegistryMetadata
   */
  'decimals': number;
  /**
   * Asset description
   * @type {string}
   * @memberof TokenRegistryMetadata
   */
  'description': string;
  /**
   * Base64 encoded logo PNG associated with the asset
   * @type {string}
   * @memberof TokenRegistryMetadata
   */
  'logo': string;
  /**
   * Asset name
   * @type {string}
   * @memberof TokenRegistryMetadata
   */
  'name': string;
  /**
   * Asset ticker
   * @type {string}
   * @memberof TokenRegistryMetadata
   */
  'ticker': string;
  /**
   * URL associated with the asset
   * @type {string}
   * @memberof TokenRegistryMetadata
   */
  'url': string;
}
/**
 * Transaction Information
 * @export
 * @interface TransactionInfo
 */
export interface TransactionInfo {
  /**
   * Additional required signers
   * @type {Array<string>}
   * @memberof TransactionInfo
   */
  'additional_signers': Array<string>;
  /**
   * Absolute slot of the block which includes the transaction
   * @type {number}
   * @memberof TransactionInfo
   */
  'block_absolute_slot': number;
  /**
   * Hash of the block which includes the transaction
   * @type {string}
   * @memberof TransactionInfo
   */
  'block_hash': string;
  /**
   * Block height (number) of the block which includes the transaction
   * @type {number}
   * @memberof TransactionInfo
   */
  'block_height': number;
  /**
   * UNIX timestamp of the block which includes the transaction
   * @type {number}
   * @memberof TransactionInfo
   */
  'block_timestamp': number;
  /**
   * The transaction\'s position within the block which includes it
   * @type {number}
   * @memberof TransactionInfo
   */
  'block_tx_index': number;
  /**
   * 
   * @type {Certificates}
   * @memberof TransactionInfo
   */
  'certificates': Certificates;
  /**
   * Collateral inputs, to be taken if Plutus scripts are not successful
   * @type {Array<Utxo>}
   * @memberof TransactionInfo
   */
  'collateral_inputs': Array<Utxo>;
  /**
   * 
   * @type {Utxo}
   * @memberof TransactionInfo
   */
  'collateral_return'?: Utxo | null;
  /**
   * The amount of lovelace used for deposits (negative if being returned)
   * @type {number}
   * @memberof TransactionInfo
   */
  'deposit': number;
  /**
   * The fee specified in the transaction
   * @type {number}
   * @memberof TransactionInfo
   */
  'fee': number;
  /**
   * Transaction inputs
   * @type {Array<Utxo>}
   * @memberof TransactionInfo
   */
  'inputs': Array<Utxo>;
  /**
   * The slot before which the transaction would not be accepted onto the chain
   * @type {number}
   * @memberof TransactionInfo
   */
  'invalid_before'?: number | null;
  /**
   * The slot from which the transaction would not be accepted onto the chain
   * @type {number}
   * @memberof TransactionInfo
   */
  'invalid_hereafter'?: number | null;
  /**
   * Transaction metadata JSON
   * @type {object}
   * @memberof TransactionInfo
   */
  'metadata': object;
  /**
   * Native assets minted or burned by the transaction
   * @type {Array<MintAsset>}
   * @memberof TransactionInfo
   */
  'mint': Array<MintAsset>;
  /**
   * Transaction outputs
   * @type {Array<Utxo>}
   * @memberof TransactionInfo
   */
  'outputs': Array<Utxo>;
  /**
   * 
   * @type {Redeemers}
   * @memberof TransactionInfo
   */
  'redeemers': Redeemers;
  /**
   * Reference inputs
   * @type {Array<Utxo>}
   * @memberof TransactionInfo
   */
  'reference_inputs': Array<Utxo>;
  /**
   * Native and Plutus scripts which were executed while processing the transaction
   * @type {Array<Script>}
   * @memberof TransactionInfo
   */
  'scripts_executed': Array<Script>;
  /**
   * False if any executed Plutus scripts failed (aka phase-two validity), meaning collateral was processed.
   * @type {boolean}
   * @memberof TransactionInfo
   */
  'scripts_successful': boolean;
  /**
   * Size of the transaction in bytes
   * @type {number}
   * @memberof TransactionInfo
   */
  'size': number;
  /**
   * Transaction hash (identifier)
   * @type {string}
   * @memberof TransactionInfo
   */
  'tx_hash': string;
  /**
   * Stake account withdrawals
   * @type {Array<Withdrawal>}
   * @memberof TransactionInfo
   */
  'withdrawals': Array<Withdrawal>;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const TxStatus = {
  Failed: 'Failed',
  Onchain: 'Onchain',
  Pending: 'Pending',
  Rejected: 'Rejected',
  Rolledback: 'Rolledback'
} as const;

export type TxStatus = typeof TxStatus[keyof typeof TxStatus];


/**
 * 
 * @export
 * @interface TxStatusInfo
 */
export interface TxStatusInfo {
  /**
   * 
   * @type {string}
   * @memberof TxStatusInfo
   */
  'tx_hash': string;
  /**
   * 
   * @type {TxStatus}
   * @memberof TxStatusInfo
   */
  'tx_status': TxStatus;
}


/**
 * Transaction output
 * @export
 * @interface Utxo
 */
export interface Utxo {
  /**
   * Address which controls the UTxO
   * @type {string}
   * @memberof Utxo
   */
  'address': string;
  /**
   * List of assets contained in the UTxO
   * @type {Array<Asset>}
   * @memberof Utxo
   */
  'assets': Array<Asset>;
  /**
   * 
   * @type {DatumOption}
   * @memberof Utxo
   */
  'datum'?: DatumOption | null;
  /**
   * UTxO transaction index
   * @type {number}
   * @memberof Utxo
   */
  'index': number;
  /**
   * 
   * @type {Script}
   * @memberof Utxo
   */
  'reference_script'?: Script | null;
  /**
   * UTxO transaction hash
   * @type {string}
   * @memberof Utxo
   */
  'tx_hash': string;
}
/**
 * UTxO reference (transaction hash and output index)
 * @export
 * @interface UtxoRef
 */
export interface UtxoRef {
  /**
   * UTxO transaction index
   * @type {number}
   * @memberof UtxoRef
   */
  'index': number;
  /**
   * UTxO transaction hash
   * @type {string}
   * @memberof UtxoRef
   */
  'tx_hash': string;
}
/**
 * Transaction output (with field for optionally-returned CBOR bytes)
 * @export
 * @interface UtxoWithBytes
 */
export interface UtxoWithBytes {
  /**
   * Address which controls the UTxO
   * @type {string}
   * @memberof UtxoWithBytes
   */
  'address': string;
  /**
   * List of assets contained in the UTxO
   * @type {Array<Asset>}
   * @memberof UtxoWithBytes
   */
  'assets': Array<Asset>;
  /**
   * 
   * @type {DatumOption}
   * @memberof UtxoWithBytes
   */
  'datum'?: DatumOption | null;
  /**
   * UTxO transaction index
   * @type {number}
   * @memberof UtxoWithBytes
   */
  'index': number;
  /**
   * 
   * @type {Script}
   * @memberof UtxoWithBytes
   */
  'reference_script'?: Script | null;
  /**
   * UTxO transaction hash
   * @type {string}
   * @memberof UtxoWithBytes
   */
  'tx_hash': string;
  /**
   * Hex encoded transaction output CBOR bytes
   * @type {string}
   * @memberof UtxoWithBytes
   */
  'txout_cbor'?: string | null;
}
/**
 * Transaction output
 * @export
 * @interface UtxoWithSlot
 */
export interface UtxoWithSlot {
  /**
   * Address which controls the UTxO
   * @type {string}
   * @memberof UtxoWithSlot
   */
  'address': string;
  /**
   * List of assets contained in the UTxO
   * @type {Array<Asset>}
   * @memberof UtxoWithSlot
   */
  'assets': Array<Asset>;
  /**
   * 
   * @type {DatumOption}
   * @memberof UtxoWithSlot
   */
  'datum'?: DatumOption | null;
  /**
   * UTxO transaction index
   * @type {number}
   * @memberof UtxoWithSlot
   */
  'index': number;
  /**
   * 
   * @type {Script}
   * @memberof UtxoWithSlot
   */
  'reference_script'?: Script | null;
  /**
   * Absolute slot of block which produced the UTxO
   * @type {number}
   * @memberof UtxoWithSlot
   */
  'slot': number;
  /**
   * UTxO transaction hash
   * @type {string}
   * @memberof UtxoWithSlot
   */
  'tx_hash': string;
  /**
   * Hex encoded transaction output CBOR bytes
   * @type {string}
   * @memberof UtxoWithSlot
   */
  'txout_cbor'?: string | null;
}
/**
 * 
 * @export
 * @interface Version
 */
export interface Version {
  /**
   * 
   * @type {number}
   * @memberof Version
   */
  'major': number;
  /**
   * 
   * @type {number}
   * @memberof Version
   */
  'minor': number;
}
/**
 * 
 * @export
 * @interface WdrlRedeemer
 */
export interface WdrlRedeemer {
  /**
   * 
   * @type {Datum}
   * @memberof WdrlRedeemer
   */
  'data': Datum;
  /**
   * 
   * @type {Array<number>}
   * @memberof WdrlRedeemer
   */
  'ex_units': Array<number>;
  /**
   * 
   * @type {string}
   * @memberof WdrlRedeemer
   */
  'stake_address': string;
}
/**
 * 
 * @export
 * @interface Withdrawal
 */
export interface Withdrawal {
  /**
   * 
   * @type {number}
   * @memberof Withdrawal
   */
  'amount': number;
  /**
   * 
   * @type {string}
   * @memberof Withdrawal
   */
  'stake_address': string;
}

/**
 * AccountsApi - axios parameter creator
 * @export
 */
export const AccountsApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns a list of addresses seen on-chain which use the specified stake key
     * @summary Stake account addresses
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountAddresses: async (stakeAddr: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'stakeAddr' is not null or undefined
      assertParamExists('accountAddresses', 'stakeAddr', stakeAddr)
      const localVarPath = `/accounts/{stake_addr}/addresses`
        .replace(`{${"stake_addr"}}`, encodeURIComponent(String(stakeAddr)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of native assets which are owned by addresses with the specified stake key
     * @summary Stake account assets
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {string | null} [policy] Filter results to only show assets of the specified policy
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountAssets: async (stakeAddr: string, policy?: string | null, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'stakeAddr' is not null or undefined
      assertParamExists('accountAssets', 'stakeAddr', stakeAddr)
      const localVarPath = `/accounts/{stake_addr}/assets`
        .replace(`{${"stake_addr"}}`, encodeURIComponent(String(stakeAddr)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (policy !== undefined) {
        localVarQueryParameter['policy'] = policy;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns per-epoch history for the specified stake key
     * @summary Stake account history
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [epochNo] Fetch result for only a specific epoch
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountHistory: async (stakeAddr: string, epochNo?: number | null, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'stakeAddr' is not null or undefined
      assertParamExists('accountHistory', 'stakeAddr', stakeAddr)
      const localVarPath = `/accounts/{stake_addr}/history`
        .replace(`{${"stake_addr"}}`, encodeURIComponent(String(stakeAddr)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (epochNo !== undefined) {
        localVarQueryParameter['epoch_no'] = epochNo;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns various information regarding a stake account
     * @summary Stake account information
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountInfo: async (stakeAddr: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'stakeAddr' is not null or undefined
      assertParamExists('accountInfo', 'stakeAddr', stakeAddr)
      const localVarPath = `/accounts/{stake_addr}`
        .replace(`{${"stake_addr"}}`, encodeURIComponent(String(stakeAddr)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
     * @summary Stake account rewards
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountRewards: async (stakeAddr: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'stakeAddr' is not null or undefined
      assertParamExists('accountRewards', 'stakeAddr', stakeAddr)
      const localVarPath = `/accounts/{stake_addr}/rewards`
        .replace(`{${"stake_addr"}}`, encodeURIComponent(String(stakeAddr)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
     * @summary Stake account updates
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountUpdates: async (stakeAddr: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'stakeAddr' is not null or undefined
      assertParamExists('accountUpdates', 'stakeAddr', stakeAddr)
      const localVarPath = `/accounts/{stake_addr}/updates`
        .replace(`{${"stake_addr"}}`, encodeURIComponent(String(stakeAddr)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * AccountsApi - functional programming interface
 * @export
 */
export const AccountsApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = AccountsApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns a list of addresses seen on-chain which use the specified stake key
     * @summary Stake account addresses
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async accountAddresses(stakeAddr: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAddress>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.accountAddresses(stakeAddr, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of native assets which are owned by addresses with the specified stake key
     * @summary Stake account assets
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {string | null} [policy] Filter results to only show assets of the specified policy
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async accountAssets(stakeAddr: string, policy?: string | null, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAsset>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.accountAssets(stakeAddr, policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns per-epoch history for the specified stake key
     * @summary Stake account history
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [epochNo] Fetch result for only a specific epoch
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async accountHistory(stakeAddr: string, epochNo?: number | null, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAccountHistory>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.accountHistory(stakeAddr, epochNo, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns various information regarding a stake account
     * @summary Stake account information
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async accountInfo(stakeAddr: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAccountInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.accountInfo(stakeAddr, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
     * @summary Stake account rewards
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async accountRewards(stakeAddr: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAccountReward>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.accountRewards(stakeAddr, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
     * @summary Stake account updates
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async accountUpdates(stakeAddr: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAccountUpdate>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.accountUpdates(stakeAddr, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * AccountsApi - factory interface
 * @export
 */
export const AccountsApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = AccountsApiFp(configuration)
  return {
    /**
     * Returns a list of addresses seen on-chain which use the specified stake key
     * @summary Stake account addresses
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountAddresses(stakeAddr: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAddress> {
      return localVarFp.accountAddresses(stakeAddr, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of native assets which are owned by addresses with the specified stake key
     * @summary Stake account assets
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {string | null} [policy] Filter results to only show assets of the specified policy
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountAssets(stakeAddr: string, policy?: string | null, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAsset> {
      return localVarFp.accountAssets(stakeAddr, policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns per-epoch history for the specified stake key
     * @summary Stake account history
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [epochNo] Fetch result for only a specific epoch
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountHistory(stakeAddr: string, epochNo?: number | null, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAccountHistory> {
      return localVarFp.accountHistory(stakeAddr, epochNo, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns various information regarding a stake account
     * @summary Stake account information
     * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountInfo(stakeAddr: string, options?: any): AxiosPromise<TimestampedAccountInfo> {
      return localVarFp.accountInfo(stakeAddr, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
     * @summary Stake account rewards
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountRewards(stakeAddr: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAccountReward> {
      return localVarFp.accountRewards(stakeAddr, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
     * @summary Stake account updates
     * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    accountUpdates(stakeAddr: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAccountUpdate> {
      return localVarFp.accountUpdates(stakeAddr, count, cursor, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * AccountsApi - object-oriented interface
 * @export
 * @class AccountsApi
 * @extends {BaseAPI}
 */
export class AccountsApi extends BaseAPI {
  /**
   * Returns a list of addresses seen on-chain which use the specified stake key
   * @summary Stake account addresses
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountAddresses(stakeAddr: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration).accountAddresses(stakeAddr, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of native assets which are owned by addresses with the specified stake key
   * @summary Stake account assets
   * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
   * @param {string | null} [policy] Filter results to only show assets of the specified policy
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountAssets(stakeAddr: string, policy?: string | null, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration).accountAssets(stakeAddr, policy, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns per-epoch history for the specified stake key
   * @summary Stake account history
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [epochNo] Fetch result for only a specific epoch
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountHistory(stakeAddr: string, epochNo?: number | null, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration).accountHistory(stakeAddr, epochNo, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns various information regarding a stake account
   * @summary Stake account information
   * @param {string} stakeAddr Bech32 encoded reward/stake address (\&#39;stake1...\&#39;)
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountInfo(stakeAddr: string, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration).accountInfo(stakeAddr, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of staking-related rewards for the specified stake key (pool `member` or `leader` rewards, deposit `refund`)
   * @summary Stake account rewards
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountRewards(stakeAddr: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration).accountRewards(stakeAddr, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of updates relating to the specified stake key ( `registration`, `deregistration`, `delegation`, `withdrawal`)
   * @summary Stake account updates
   * @param {string} stakeAddr Bech32 encoded stake/reward address (\&#39;stake1...\&#39;)
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public accountUpdates(stakeAddr: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AccountsApiFp(this.configuration).accountUpdates(stakeAddr, count, cursor, options).then((request) => request(this.axios));
  }
}



/**
 * AddressesApi - axios parameter creator
 * @export
 */
export const AddressesApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
     * @summary Decode address
     * @param {string} address Address in bech32/hex/base58 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    decodeAddress: async (address: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'address' is not null or undefined
      assertParamExists('decodeAddress', 'address', address)
      const localVarPath = `/addresses/{address}/decode`
        .replace(`{${"address"}}`, encodeURIComponent(String(address)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Address transaction count
     * @param {string} address Address in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txCountByAddress: async (address: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'address' is not null or undefined
      assertParamExists('txCountByAddress', 'address', address)
      const localVarPath = `/addresses/{address}/transactions/count`
        .replace(`{${"address"}}`, encodeURIComponent(String(address)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
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
     */
    txsByAddress: async (address: string, count?: number | null, order?: TxsByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'address' is not null or undefined
      assertParamExists('txsByAddress', 'address', address)
      const localVarPath = `/addresses/{address}/transactions`
        .replace(`{${"address"}}`, encodeURIComponent(String(address)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
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
     */
    txsByPaymentCred: async (credential: string, count?: number | null, order?: TxsByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'credential' is not null or undefined
      assertParamExists('txsByPaymentCred', 'credential', credential)
      const localVarPath = `/addresses/cred/{credential}/transactions`
        .replace(`{${"credential"}}`, encodeURIComponent(String(credential)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
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
     */
    utxoRefsAtAddress: async (address: string, count?: number | null, order?: UtxoRefsAtAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'address' is not null or undefined
      assertParamExists('utxoRefsAtAddress', 'address', address)
      const localVarPath = `/addresses/{address}/utxo_refs`
        .replace(`{${"address"}}`, encodeURIComponent(String(address)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
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
     */
    utxosByAddress: async (address: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'address' is not null or undefined
      assertParamExists('utxosByAddress', 'address', address)
      const localVarPath = `/addresses/{address}/utxos`
        .replace(`{${"address"}}`, encodeURIComponent(String(address)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (resolveDatums !== undefined) {
        localVarQueryParameter['resolve_datums'] = resolveDatums;
      }

      if (withCbor !== undefined) {
        localVarQueryParameter['with_cbor'] = withCbor;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
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
     */
    utxosByAddresses: async (requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'requestBody' is not null or undefined
      assertParamExists('utxosByAddresses', 'requestBody', requestBody)
      const localVarPath = `/addresses/utxos`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (resolveDatums !== undefined) {
        localVarQueryParameter['resolve_datums'] = resolveDatums;
      }

      if (withCbor !== undefined) {
        localVarQueryParameter['with_cbor'] = withCbor;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
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
     */
    utxosByPaymentCred: async (credential: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'credential' is not null or undefined
      assertParamExists('utxosByPaymentCred', 'credential', credential)
      const localVarPath = `/addresses/cred/{credential}/utxos`
        .replace(`{${"credential"}}`, encodeURIComponent(String(credential)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (resolveDatums !== undefined) {
        localVarQueryParameter['resolve_datums'] = resolveDatums;
      }

      if (withCbor !== undefined) {
        localVarQueryParameter['with_cbor'] = withCbor;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * AddressesApi - functional programming interface
 * @export
 */
export const AddressesApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = AddressesApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
     * @summary Decode address
     * @param {string} address Address in bech32/hex/base58 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async decodeAddress(address: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AddressInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.decodeAddress(address, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Address transaction count
     * @param {string} address Address in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async txCountByAddress(address: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedTxCount>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txCountByAddress(address, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
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
     */
    async txsByAddress(address: string, count?: number | null, order?: TxsByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAddressTransaction>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txsByAddress(address, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
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
     */
    async txsByPaymentCred(credential: string, count?: number | null, order?: TxsByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPaymentCredentialTransaction>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txsByPaymentCred(credential, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
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
     */
    async utxoRefsAtAddress(address: string, count?: number | null, order?: UtxoRefsAtAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoRef>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.utxoRefsAtAddress(address, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
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
     */
    async utxosByAddress(address: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByAddress(address, resolveDatums, withCbor, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
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
     */
    async utxosByAddresses(requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByAddresses(requestBody, resolveDatums, withCbor, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
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
     */
    async utxosByPaymentCred(credential: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithSlot>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.utxosByPaymentCred(credential, resolveDatums, withCbor, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * AddressesApi - factory interface
 * @export
 */
export const AddressesApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = AddressesApiFp(configuration)
  return {
    /**
     * Returns the different information encoded within a Cardano address, including details of the payment and delegation parts of the address
     * @summary Decode address
     * @param {string} address Address in bech32/hex/base58 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    decodeAddress(address: string, options?: any): AxiosPromise<AddressInfo> {
      return localVarFp.decodeAddress(address, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the number of transactions in which the address spent or received some funds.  Specifically, the number of transactions where: the address controlled at least one of the transaction inputs and/or receives one of the outputs AND the transaction is phase-2 valid, OR, the address controlled at least one of the collateral inputs and/or receives the collateral return output AND the transaction is phase-2 invalid. [Read more](https://docs.cardano.org/plutus/collateral-mechanism/).
     * @summary Address transaction count
     * @param {string} address Address in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txCountByAddress(address: string, options?: any): AxiosPromise<TimestampedTxCount> {
      return localVarFp.txCountByAddress(address, options).then((request) => request(axios, basePath));
    },
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
     */
    txsByAddress(address: string, count?: number | null, order?: TxsByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAddressTransaction> {
      return localVarFp.txsByAddress(address, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
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
     */
    txsByPaymentCred(credential: string, count?: number | null, order?: TxsByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedPaymentCredentialTransaction> {
      return localVarFp.txsByPaymentCred(credential, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
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
     */
    utxoRefsAtAddress(address: string, count?: number | null, order?: UtxoRefsAtAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedUtxoRef> {
      return localVarFp.utxoRefsAtAddress(address, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
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
     */
    utxosByAddress(address: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedUtxoWithSlot> {
      return localVarFp.utxosByAddress(address, resolveDatums, withCbor, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
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
     */
    utxosByAddresses(requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedUtxoWithSlot> {
      return localVarFp.utxosByAddresses(requestBody, resolveDatums, withCbor, count, cursor, options).then((request) => request(axios, basePath));
    },
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
     */
    utxosByPaymentCred(credential: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedUtxoWithSlot> {
      return localVarFp.utxosByPaymentCred(credential, resolveDatums, withCbor, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
  };
};

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
    return AddressesApiFp(this.configuration).decodeAddress(address, options).then((request) => request(this.axios));
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
    return AddressesApiFp(this.configuration).txCountByAddress(address, options).then((request) => request(this.axios));
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
  public txsByAddress(address: string, count?: number | null, order?: TxsByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration).txsByAddress(address, count, order, from, to, cursor, options).then((request) => request(this.axios));
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
  public txsByPaymentCred(credential: string, count?: number | null, order?: TxsByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration).txsByPaymentCred(credential, count, order, from, to, cursor, options).then((request) => request(this.axios));
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
  public utxoRefsAtAddress(address: string, count?: number | null, order?: UtxoRefsAtAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration).utxoRefsAtAddress(address, count, order, from, to, cursor, options).then((request) => request(this.axios));
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
  public utxosByAddress(address: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByAddressOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration).utxosByAddress(address, resolveDatums, withCbor, count, order, from, to, cursor, options).then((request) => request(this.axios));
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
  public utxosByAddresses(requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration).utxosByAddresses(requestBody, resolveDatums, withCbor, count, cursor, options).then((request) => request(this.axios));
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
  public utxosByPaymentCred(credential: string, resolveDatums?: boolean | null, withCbor?: boolean | null, count?: number | null, order?: UtxosByPaymentCredOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AddressesApiFp(this.configuration).utxosByPaymentCred(credential, resolveDatums, withCbor, count, order, from, to, cursor, options).then((request) => request(this.axios));
  }
}

/**
 * @export
 */
export const TxsByAddressOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type TxsByAddressOrderEnum = typeof TxsByAddressOrderEnum[keyof typeof TxsByAddressOrderEnum];
/**
 * @export
 */
export const TxsByPaymentCredOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type TxsByPaymentCredOrderEnum = typeof TxsByPaymentCredOrderEnum[keyof typeof TxsByPaymentCredOrderEnum];
/**
 * @export
 */
export const UtxoRefsAtAddressOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type UtxoRefsAtAddressOrderEnum = typeof UtxoRefsAtAddressOrderEnum[keyof typeof UtxoRefsAtAddressOrderEnum];
/**
 * @export
 */
export const UtxosByAddressOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type UtxosByAddressOrderEnum = typeof UtxosByAddressOrderEnum[keyof typeof UtxosByAddressOrderEnum];
/**
 * @export
 */
export const UtxosByPaymentCredOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type UtxosByPaymentCredOrderEnum = typeof UtxosByPaymentCredOrderEnum[keyof typeof UtxosByPaymentCredOrderEnum];


/**
 * AssetsApi - axios parameter creator
 * @export
 */
export const AssetsApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAccounts: async (asset: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists('assetAccounts', 'asset', asset)
      const localVarPath = `/assets/{asset}/accounts`
        .replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAddresses: async (asset: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists('assetAddresses', 'asset', asset)
      const localVarPath = `/assets/{asset}/addresses`
        .replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetInfo: async (asset: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists('assetInfo', 'asset', asset)
      const localVarPath = `/assets/{asset}`
        .replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetTxs: async (asset: string, fromHeight?: number | null, count?: number | null, order?: AssetTxsOrderEnum, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists('assetTxs', 'asset', asset)
      const localVarPath = `/assets/{asset}/txs`
        .replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (fromHeight !== undefined) {
        localVarQueryParameter['from_height'] = fromHeight;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUpdates: async (asset: string, count?: number | null, order?: AssetUpdatesOrderEnum, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists('assetUpdates', 'asset', asset)
      const localVarPath = `/assets/{asset}/updates`
        .replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUtxos: async (asset: string, address?: string | null, count?: number | null, order?: AssetUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'asset' is not null or undefined
      assertParamExists('assetUtxos', 'asset', asset)
      const localVarPath = `/assets/{asset}/utxos`
        .replace(`{${"asset"}}`, encodeURIComponent(String(asset)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (address !== undefined) {
        localVarQueryParameter['address'] = address;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAccounts: async (policy: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists('policyAccounts', 'policy', policy)
      const localVarPath = `/assets/policy/{policy}/accounts`
        .replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAddresses: async (policy: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists('policyAddresses', 'policy', policy)
      const localVarPath = `/assets/policy/{policy}/addresses`
        .replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyInfo: async (policy: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists('policyInfo', 'policy', policy)
      const localVarPath = `/assets/policy/{policy}`
        .replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyTxs: async (policy: string, fromHeight?: number | null, count?: number | null, order?: PolicyTxsOrderEnum, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists('policyTxs', 'policy', policy)
      const localVarPath = `/assets/policy/{policy}/txs`
        .replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (fromHeight !== undefined) {
        localVarQueryParameter['from_height'] = fromHeight;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyUtxos: async (policy: string, count?: number | null, order?: PolicyUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'policy' is not null or undefined
      assertParamExists('policyUtxos', 'policy', policy)
      const localVarPath = `/assets/policy/{policy}/utxos`
        .replace(`{${"policy"}}`, encodeURIComponent(String(policy)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (from !== undefined) {
        localVarQueryParameter['from'] = from;
      }

      if (to !== undefined) {
        localVarQueryParameter['to'] = to;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * AssetsApi - functional programming interface
 * @export
 */
export const AssetsApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = AssetsApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetAccounts(asset: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetHolderAccount>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetAccounts(asset, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetAddresses(asset: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetHolder>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetAddresses(asset, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetInfo(asset: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAssetInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetInfo(asset, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetTxs(asset: string, fromHeight?: number | null, count?: number | null, order?: AssetTxsOrderEnum, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetTx>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetTxs(asset, fromHeight, count, order, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetUpdates(asset: string, count?: number | null, order?: AssetUpdatesOrderEnum, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedMintingTx>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetUpdates(asset, count, order, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async assetUtxos(asset: string, address?: string | null, count?: number | null, order?: AssetUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetUtxo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.assetUtxos(asset, address, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyAccounts(policy: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPolicyHolderAccount>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyAccounts(policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyAddresses(policy: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPolicyHolder>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyAddresses(policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyInfo(policy: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyInfo(policy, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyTxs(policy: string, fromHeight?: number | null, count?: number | null, order?: PolicyTxsOrderEnum, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedAssetTx>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyTxs(policy, fromHeight, count, order, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async policyUtxos(policy: string, count?: number | null, order?: PolicyUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPolicyUtxo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.policyUtxos(policy, count, order, from, to, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * AssetsApi - factory interface
 * @export
 */
export const AssetsApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = AssetsApiFp(configuration)
  return {
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of the specified asset; in other words, instead of returning the addresses which hold some of the asset, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding specific asset
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAccounts(asset: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAssetHolderAccount> {
      return localVarFp.assetAccounts(asset, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of addresses which control some amount of the specified asset
     * @summary Native asset addresses
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetAddresses(asset: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAssetHolder> {
      return localVarFp.assetAddresses(asset, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Return a summary of information about an asset
     * @summary Native asset information
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetInfo(asset: string, options?: any): AxiosPromise<TimestampedAssetInfo> {
      return localVarFp.assetInfo(asset, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of the specified asset
     * @summary Native asset transactions
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetTxs(asset: string, fromHeight?: number | null, count?: number | null, order?: AssetTxsOrderEnum, cursor?: string | null, options?: any): AxiosPromise<PaginatedAssetTx> {
      return localVarFp.assetTxs(asset, fromHeight, count, order, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of transactions in which some of the specified asset was minted or burned
     * @summary Native asset updates
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUpdates(asset: string, count?: number | null, order?: AssetUpdatesOrderEnum, cursor?: string | null, options?: any): AxiosPromise<PaginatedMintingTx> {
      return localVarFp.assetUpdates(asset, count, order, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
     * @summary Native asset UTxOs
     * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
     * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
     * @param {number | null} [count] The max number of results per page
     * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    assetUtxos(asset: string, address?: string | null, count?: number | null, order?: AssetUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAssetUtxo> {
      return localVarFp.assetUtxos(asset, address, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
     * @summary Accounts of addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAccounts(policy: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedPolicyHolderAccount> {
      return localVarFp.policyAccounts(policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of addresses which hold some of an asset of the specified policy ID
     * @summary Addresses holding assets of specific policy
     * @param {string} policy Hex encoded Policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyAddresses(policy: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedPolicyHolder> {
      return localVarFp.policyAddresses(policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns information about assets of the specified minting policy ID
     * @summary Information on assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyInfo(policy: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedAssetInfo> {
      return localVarFp.policyInfo(policy, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
     * @summary Transactions moving assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [fromHeight] Return only transactions after supplied block height
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyTxs(policy: string, fromHeight?: number | null, count?: number | null, order?: PolicyTxsOrderEnum, cursor?: string | null, options?: any): AxiosPromise<PaginatedAssetTx> {
      return localVarFp.policyTxs(policy, fromHeight, count, order, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
     * @summary UTxOs containing assets of specific policy
     * @param {string} policy Hex encoded policy ID
     * @param {number | null} [count] The max number of results per page
     * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
     * @param {number | null} [from] Return only UTxOs created on or after a specific slot
     * @param {number | null} [to] Return only UTxOs created before a specific slot
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    policyUtxos(policy: string, count?: number | null, order?: PolicyUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedPolicyUtxo> {
      return localVarFp.policyUtxos(policy, count, order, from, to, cursor, options).then((request) => request(axios, basePath));
    },
  };
};

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
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public assetAccounts(asset: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).assetAccounts(asset, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of addresses which control some amount of the specified asset
   * @summary Native asset addresses
   * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public assetAddresses(asset: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).assetAddresses(asset, count, cursor, options).then((request) => request(this.axios));
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
    return AssetsApiFp(this.configuration).assetInfo(asset, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of transactions in which a transaction input or output contains some of the specified asset
   * @summary Native asset transactions
   * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
   * @param {number | null} [fromHeight] Return only transactions after supplied block height
   * @param {number | null} [count] The max number of results per page
   * @param {AssetTxsOrderEnum} [order] The order in which the results are sorted (by block height)
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public assetTxs(asset: string, fromHeight?: number | null, count?: number | null, order?: AssetTxsOrderEnum, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).assetTxs(asset, fromHeight, count, order, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of transactions in which some of the specified asset was minted or burned
   * @summary Native asset updates
   * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
   * @param {number | null} [count] The max number of results per page
   * @param {AssetUpdatesOrderEnum} [order] The order in which the results are sorted (by block height)
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public assetUpdates(asset: string, count?: number | null, order?: AssetUpdatesOrderEnum, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).assetUpdates(asset, count, order, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns references for UTxOs which contain some of the specified asset, each paired with the amount of the asset contained in the UTxO
   * @summary Native asset UTxOs
   * @param {string} asset Asset, encoded as concatenation of hex of policy ID and asset name
   * @param {string | null} [address] Return only UTxOs controlled by a specific address (bech32 encoding)
   * @param {number | null} [count] The max number of results per page
   * @param {AssetUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
   * @param {number | null} [from] Return only UTxOs created on or after a specific slot
   * @param {number | null} [to] Return only UTxOs created before a specific slot
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public assetUtxos(asset: string, address?: string | null, count?: number | null, order?: AssetUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).assetUtxos(asset, address, count, order, from, to, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of accounts (as stake/reward addresses) associated with addresses which control some of an asset of the specified policy; in other words, instead of returning the addresses which hold the assets, the addresses are merged by their delegation part/account. Assets controlled by Byron, enterprise, or pointer addresses are omitted.  CAUTION: An asset being associated with a particular stake account does not necessarily mean the owner of that account controls the asset; use \"asset addresses\" unless you are sure you want to work with stake keys. Read more [here]( https://medium.com/adamant-security/multi-sig-concerns-mangled-addresses-and-the-dangers-of-using-stake-keys-in-your-cardano-project-94894319b1d8).
   * @summary Accounts of addresses holding assets of specific policy
   * @param {string} policy Hex encoded Policy ID
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public policyAccounts(policy: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).policyAccounts(policy, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of addresses which hold some of an asset of the specified policy ID
   * @summary Addresses holding assets of specific policy
   * @param {string} policy Hex encoded Policy ID
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public policyAddresses(policy: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).policyAddresses(policy, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns information about assets of the specified minting policy ID
   * @summary Information on assets of specific policy
   * @param {string} policy Hex encoded policy ID
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public policyInfo(policy: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).policyInfo(policy, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of transactions in which a transaction input or output contains some of at least one asset of the specified minting policy ID
   * @summary Transactions moving assets of specific policy
   * @param {string} policy Hex encoded policy ID
   * @param {number | null} [fromHeight] Return only transactions after supplied block height
   * @param {number | null} [count] The max number of results per page
   * @param {PolicyTxsOrderEnum} [order] The order in which the results are sorted (by block height)
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public policyTxs(policy: string, fromHeight?: number | null, count?: number | null, order?: PolicyTxsOrderEnum, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).policyTxs(policy, fromHeight, count, order, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns UTxO references of UTxOs which contain some of at least one asset of the specified policy ID, each paired with a list of assets of the policy contained in the UTxO and the corresponding amounts
   * @summary UTxOs containing assets of specific policy
   * @param {string} policy Hex encoded policy ID
   * @param {number | null} [count] The max number of results per page
   * @param {PolicyUtxosOrderEnum} [order] The order in which the results are sorted (by slot at which UTxO was produced)
   * @param {number | null} [from] Return only UTxOs created on or after a specific slot
   * @param {number | null} [to] Return only UTxOs created before a specific slot
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AssetsApi
   */
  public policyUtxos(policy: string, count?: number | null, order?: PolicyUtxosOrderEnum, from?: number | null, to?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return AssetsApiFp(this.configuration).policyUtxos(policy, count, order, from, to, cursor, options).then((request) => request(this.axios));
  }
}

/**
 * @export
 */
export const AssetTxsOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type AssetTxsOrderEnum = typeof AssetTxsOrderEnum[keyof typeof AssetTxsOrderEnum];
/**
 * @export
 */
export const AssetUpdatesOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type AssetUpdatesOrderEnum = typeof AssetUpdatesOrderEnum[keyof typeof AssetUpdatesOrderEnum];
/**
 * @export
 */
export const AssetUtxosOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type AssetUtxosOrderEnum = typeof AssetUtxosOrderEnum[keyof typeof AssetUtxosOrderEnum];
/**
 * @export
 */
export const PolicyTxsOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type PolicyTxsOrderEnum = typeof PolicyTxsOrderEnum[keyof typeof PolicyTxsOrderEnum];
/**
 * @export
 */
export const PolicyUtxosOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type PolicyUtxosOrderEnum = typeof PolicyUtxosOrderEnum[keyof typeof PolicyUtxosOrderEnum];


/**
 * BlocksApi - axios parameter creator
 * @export
 */
export const BlocksApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns information about the specified block including more advanced technical properties
     * @summary Block information
     * @param {string} hashOrHeight Block height or hex encoded block hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blockInfo: async (hashOrHeight: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'hashOrHeight' is not null or undefined
      assertParamExists('blockInfo', 'hashOrHeight', hashOrHeight)
      const localVarPath = `/blocks/{hash_or_height}`
        .replace(`{${"hash_or_height"}}`, encodeURIComponent(String(hashOrHeight)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * BlocksApi - functional programming interface
 * @export
 */
export const BlocksApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = BlocksApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns information about the specified block including more advanced technical properties
     * @summary Block information
     * @param {string} hashOrHeight Block height or hex encoded block hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async blockInfo(hashOrHeight: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedBlockInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.blockInfo(hashOrHeight, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * BlocksApi - factory interface
 * @export
 */
export const BlocksApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = BlocksApiFp(configuration)
  return {
    /**
     * Returns information about the specified block including more advanced technical properties
     * @summary Block information
     * @param {string} hashOrHeight Block height or hex encoded block hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blockInfo(hashOrHeight: string, options?: any): AxiosPromise<TimestampedBlockInfo> {
      return localVarFp.blockInfo(hashOrHeight, options).then((request) => request(axios, basePath));
    },
  };
};

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
    return BlocksApiFp(this.configuration).blockInfo(hashOrHeight, options).then((request) => request(this.axios));
  }
}



/**
 * DatumApi - axios parameter creator
 * @export
 */
export const DatumApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
     * @summary Datum by datum hash
     * @param {string} datumHash Hex encoded datum hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    lookupDatum: async (datumHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'datumHash' is not null or undefined
      assertParamExists('lookupDatum', 'datumHash', datumHash)
      const localVarPath = `/datum/{datum_hash}`
        .replace(`{${"datum_hash"}}`, encodeURIComponent(String(datumHash)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * DatumApi - functional programming interface
 * @export
 */
export const DatumApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = DatumApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
     * @summary Datum by datum hash
     * @param {string} datumHash Hex encoded datum hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async lookupDatum(datumHash: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedDatum>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.lookupDatum(datumHash, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * DatumApi - factory interface
 * @export
 */
export const DatumApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = DatumApiFp(configuration)
  return {
    /**
     * Returns the datum corresponding to the specified datum hash, if the datum has been seen on-chain
     * @summary Datum by datum hash
     * @param {string} datumHash Hex encoded datum hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    lookupDatum(datumHash: string, options?: any): AxiosPromise<TimestampedDatum> {
      return localVarFp.lookupDatum(datumHash, options).then((request) => request(axios, basePath));
    },
  };
};

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
    return DatumApiFp(this.configuration).lookupDatum(datumHash, options).then((request) => request(this.axios));
  }
}



/**
 * EcosystemApi - axios parameter creator
 * @export
 */
export const EcosystemApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns the Cardano address corresponding to an ADA Handle
     * @summary Resolve ADA Handle
     * @param {string} handle Ada Handle to resolve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    adahandleResolve: async (handle: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'handle' is not null or undefined
      assertParamExists('adahandleResolve', 'handle', handle)
      const localVarPath = `/ecosystem/adahandle/{handle}`
        .replace(`{${"handle"}}`, encodeURIComponent(String(handle)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * EcosystemApi - functional programming interface
 * @export
 */
export const EcosystemApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = EcosystemApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns the Cardano address corresponding to an ADA Handle
     * @summary Resolve ADA Handle
     * @param {string} handle Ada Handle to resolve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async adahandleResolve(handle: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAddress>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.adahandleResolve(handle, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * EcosystemApi - factory interface
 * @export
 */
export const EcosystemApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = EcosystemApiFp(configuration)
  return {
    /**
     * Returns the Cardano address corresponding to an ADA Handle
     * @summary Resolve ADA Handle
     * @param {string} handle Ada Handle to resolve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    adahandleResolve(handle: string, options?: any): AxiosPromise<TimestampedAddress> {
      return localVarFp.adahandleResolve(handle, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * EcosystemApi - object-oriented interface
 * @export
 * @class EcosystemApi
 * @extends {BaseAPI}
 */
export class EcosystemApi extends BaseAPI {
  /**
   * Returns the Cardano address corresponding to an ADA Handle
   * @summary Resolve ADA Handle
   * @param {string} handle Ada Handle to resolve
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EcosystemApi
   */
  public adahandleResolve(handle: string, options?: AxiosRequestConfig) {
    return EcosystemApiFp(this.configuration).adahandleResolve(handle, options).then((request) => request(this.axios));
  }
}



/**
 * EpochsApi - axios parameter creator
 * @export
 */
export const EpochsApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentEpoch: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/epochs/current`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a summary of information about a specific epoch
     * @summary Specific epoch details
     * @param {number} epochNo Epoch number to return information about
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    epochInfo: async (epochNo: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'epochNo' is not null or undefined
      assertParamExists('epochInfo', 'epochNo', epochNo)
      const localVarPath = `/epochs/{epoch_no}/info`
        .replace(`{${"epoch_no"}}`, encodeURIComponent(String(epochNo)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * EpochsApi - functional programming interface
 * @export
 */
export const EpochsApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = EpochsApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async currentEpoch(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedCurrentEpochInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.currentEpoch(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a summary of information about a specific epoch
     * @summary Specific epoch details
     * @param {number} epochNo Epoch number to return information about
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async epochInfo(epochNo: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedEpochInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.epochInfo(epochNo, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * EpochsApi - factory interface
 * @export
 */
export const EpochsApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = EpochsApiFp(configuration)
  return {
    /**
     * Returns a summary of information about the current epoch
     * @summary Current epoch details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentEpoch(options?: any): AxiosPromise<TimestampedCurrentEpochInfo> {
      return localVarFp.currentEpoch(options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a summary of information about a specific epoch
     * @summary Specific epoch details
     * @param {number} epochNo Epoch number to return information about
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    epochInfo(epochNo: number, options?: any): AxiosPromise<TimestampedEpochInfo> {
      return localVarFp.epochInfo(epochNo, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * EpochsApi - object-oriented interface
 * @export
 * @class EpochsApi
 * @extends {BaseAPI}
 */
export class EpochsApi extends BaseAPI {
  /**
   * Returns a summary of information about the current epoch
   * @summary Current epoch details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EpochsApi
   */
  public currentEpoch(options?: AxiosRequestConfig) {
    return EpochsApiFp(this.configuration).currentEpoch(options).then((request) => request(this.axios));
  }

  /**
   * Returns a summary of information about a specific epoch
   * @summary Specific epoch details
   * @param {number} epochNo Epoch number to return information about
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof EpochsApi
   */
  public epochInfo(epochNo: number, options?: AxiosRequestConfig) {
    return EpochsApiFp(this.configuration).epochInfo(epochNo, options).then((request) => request(this.axios));
  }
}



/**
 * GeneralApi - axios parameter creator
 * @export
 */
export const GeneralApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns the identifier of the most recently processed block on the network
     * @summary Chain-tip
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    chainTip: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/chain-tip`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the blockchain era history
     * @summary Era history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    eraHistory: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/era-history`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the current blockchain protocol parameters
     * @summary Protocol parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    protocolParams: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/protocol-params`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the blockchain system start time
     * @summary Blockchain system start
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    systemStart: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/system-start`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * GeneralApi - functional programming interface
 * @export
 */
export const GeneralApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = GeneralApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns the identifier of the most recently processed block on the network
     * @summary Chain-tip
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async chainTip(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedChainTip>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.chainTip(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the blockchain era history
     * @summary Era history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async eraHistory(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedEraSummaries>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.eraHistory(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the current blockchain protocol parameters
     * @summary Protocol parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async protocolParams(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedProtocolParameters>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.protocolParams(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the blockchain system start time
     * @summary Blockchain system start
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async systemStart(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedSystemStart>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.systemStart(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * GeneralApi - factory interface
 * @export
 */
export const GeneralApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = GeneralApiFp(configuration)
  return {
    /**
     * Returns the identifier of the most recently processed block on the network
     * @summary Chain-tip
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    chainTip(options?: any): AxiosPromise<TimestampedChainTip> {
      return localVarFp.chainTip(options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the blockchain era history
     * @summary Era history
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    eraHistory(options?: any): AxiosPromise<TimestampedEraSummaries> {
      return localVarFp.eraHistory(options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the current blockchain protocol parameters
     * @summary Protocol parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    protocolParams(options?: any): AxiosPromise<TimestampedProtocolParameters> {
      return localVarFp.protocolParams(options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the blockchain system start time
     * @summary Blockchain system start
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    systemStart(options?: any): AxiosPromise<TimestampedSystemStart> {
      return localVarFp.systemStart(options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * GeneralApi - object-oriented interface
 * @export
 * @class GeneralApi
 * @extends {BaseAPI}
 */
export class GeneralApi extends BaseAPI {
  /**
   * Returns the identifier of the most recently processed block on the network
   * @summary Chain-tip
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeneralApi
   */
  public chainTip(options?: AxiosRequestConfig) {
    return GeneralApiFp(this.configuration).chainTip(options).then((request) => request(this.axios));
  }

  /**
   * Returns the blockchain era history
   * @summary Era history
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeneralApi
   */
  public eraHistory(options?: AxiosRequestConfig) {
    return GeneralApiFp(this.configuration).eraHistory(options).then((request) => request(this.axios));
  }

  /**
   * Returns the current blockchain protocol parameters
   * @summary Protocol parameters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeneralApi
   */
  public protocolParams(options?: AxiosRequestConfig) {
    return GeneralApiFp(this.configuration).protocolParams(options).then((request) => request(this.axios));
  }

  /**
   * Returns the blockchain system start time
   * @summary Blockchain system start
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GeneralApi
   */
  public systemStart(options?: AxiosRequestConfig) {
    return GeneralApiFp(this.configuration).systemStart(options).then((request) => request(this.axios));
  }
}



/**
 * PoolsApi - axios parameter creator
 * @export
 */
export const PoolsApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPools: async (count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/pools`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolBlocks: async (poolId: string, epochNo?: number | null, count?: number | null, order?: PoolBlocksOrderEnum, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolBlocks', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/blocks`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (epochNo !== undefined) {
        localVarQueryParameter['epoch_no'] = epochNo;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolDelegators: async (poolId: string, count?: number | null, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolDelegators', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/delegators`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolHistory: async (poolId: string, epochNo?: number | null, count?: number | null, order?: PoolHistoryOrderEnum, cursor?: string | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolHistory', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/history`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (epochNo !== undefined) {
        localVarQueryParameter['epoch_no'] = epochNo;
      }

      if (count !== undefined) {
        localVarQueryParameter['count'] = count;
      }

      if (order !== undefined) {
        localVarQueryParameter['order'] = order;
      }

      if (cursor !== undefined) {
        localVarQueryParameter['cursor'] = cursor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns current information about the specified pool
     * @summary Stake pool information
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolInfo: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolInfo', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/info`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the metadata declared on-chain by the specified stake pool
     * @summary Stake pool metadata
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolMetadata: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolMetadata', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/metadata`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of relays declared on-chain by the specified stake pool
     * @summary Stake pool relays
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolRelays: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolRelays', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/relays`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of updates relating to the specified pool
     * @summary Stake pool updates
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolUpdates: async (poolId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'poolId' is not null or undefined
      assertParamExists('poolUpdates', 'poolId', poolId)
      const localVarPath = `/pools/{pool_id}/updates`
        .replace(`{${"pool_id"}}`, encodeURIComponent(String(poolId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * PoolsApi - functional programming interface
 * @export
 */
export const PoolsApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = PoolsApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listPools(count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolListInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.listPools(count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolBlocks(poolId: string, epochNo?: number | null, count?: number | null, order?: PoolBlocksOrderEnum, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolBlock>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolBlocks(poolId, epochNo, count, order, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolDelegators(poolId: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedDelegatorInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolDelegators(poolId, count, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolHistory(poolId: string, epochNo?: number | null, count?: number | null, order?: PoolHistoryOrderEnum, cursor?: string | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedPoolHistory>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolHistory(poolId, epochNo, count, order, cursor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns current information about the specified pool
     * @summary Stake pool information
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolInfo(poolId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolInfo(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the metadata declared on-chain by the specified stake pool
     * @summary Stake pool metadata
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolMetadata(poolId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolMetadata>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolMetadata(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of relays declared on-chain by the specified stake pool
     * @summary Stake pool relays
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolRelays(poolId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolRelays>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolRelays(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns a list of updates relating to the specified pool
     * @summary Stake pool updates
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async poolUpdates(poolId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedPoolUpdates>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.poolUpdates(poolId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * PoolsApi - factory interface
 * @export
 */
export const PoolsApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = PoolsApiFp(configuration)
  return {
    /**
     * Returns a list of currently registered stake pools
     * @summary List registered stake pools
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPools(count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedPoolListInfo> {
      return localVarFp.listPools(count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
     * @summary Stake pool blocks
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolBlocks(poolId: string, epochNo?: number | null, count?: number | null, order?: PoolBlocksOrderEnum, cursor?: string | null, options?: any): AxiosPromise<PaginatedPoolBlock> {
      return localVarFp.poolBlocks(poolId, epochNo, count, order, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of delegators of the specified pool
     * @summary Stake pool delegators
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [count] The max number of results per page
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolDelegators(poolId: string, count?: number | null, cursor?: string | null, options?: any): AxiosPromise<PaginatedDelegatorInfo> {
      return localVarFp.poolDelegators(poolId, count, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
     * @summary Stake pool history
     * @param {string} poolId Pool ID in bech32 format
     * @param {number | null} [epochNo] Epoch number to fetch results for
     * @param {number | null} [count] The max number of results per page
     * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
     * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolHistory(poolId: string, epochNo?: number | null, count?: number | null, order?: PoolHistoryOrderEnum, cursor?: string | null, options?: any): AxiosPromise<PaginatedPoolHistory> {
      return localVarFp.poolHistory(poolId, epochNo, count, order, cursor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns current information about the specified pool
     * @summary Stake pool information
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolInfo(poolId: string, options?: any): AxiosPromise<TimestampedPoolInfo> {
      return localVarFp.poolInfo(poolId, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the metadata declared on-chain by the specified stake pool
     * @summary Stake pool metadata
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolMetadata(poolId: string, options?: any): AxiosPromise<TimestampedPoolMetadata> {
      return localVarFp.poolMetadata(poolId, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of relays declared on-chain by the specified stake pool
     * @summary Stake pool relays
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolRelays(poolId: string, options?: any): AxiosPromise<TimestampedPoolRelays> {
      return localVarFp.poolRelays(poolId, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of updates relating to the specified pool
     * @summary Stake pool updates
     * @param {string} poolId Pool ID in bech32 format
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    poolUpdates(poolId: string, options?: any): AxiosPromise<TimestampedPoolUpdates> {
      return localVarFp.poolUpdates(poolId, options).then((request) => request(axios, basePath));
    },
  };
};

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
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PoolsApi
   */
  public listPools(count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return PoolsApiFp(this.configuration).listPools(count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Return information about blocks minted by a given pool for all epochs (or just for epoch `epoch_no` if provided)
   * @summary Stake pool blocks
   * @param {string} poolId Pool ID in bech32 format
   * @param {number | null} [epochNo] Epoch number to fetch results for
   * @param {number | null} [count] The max number of results per page
   * @param {PoolBlocksOrderEnum} [order] The order in which the results are sorted (by block absolute slot)
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PoolsApi
   */
  public poolBlocks(poolId: string, epochNo?: number | null, count?: number | null, order?: PoolBlocksOrderEnum, cursor?: string | null, options?: AxiosRequestConfig) {
    return PoolsApiFp(this.configuration).poolBlocks(poolId, epochNo, count, order, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns a list of delegators of the specified pool
   * @summary Stake pool delegators
   * @param {string} poolId Pool ID in bech32 format
   * @param {number | null} [count] The max number of results per page
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PoolsApi
   */
  public poolDelegators(poolId: string, count?: number | null, cursor?: string | null, options?: AxiosRequestConfig) {
    return PoolsApiFp(this.configuration).poolDelegators(poolId, count, cursor, options).then((request) => request(this.axios));
  }

  /**
   * Returns per-epoch information about the specified pool (or just for epoch `epoch_no` if provided)
   * @summary Stake pool history
   * @param {string} poolId Pool ID in bech32 format
   * @param {number | null} [epochNo] Epoch number to fetch results for
   * @param {number | null} [count] The max number of results per page
   * @param {PoolHistoryOrderEnum} [order] The order in which the results are sorted (by epoch number)
   * @param {string | null} [cursor] Pagination cursor string, use the cursor included in a page of results to fetch the next page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PoolsApi
   */
  public poolHistory(poolId: string, epochNo?: number | null, count?: number | null, order?: PoolHistoryOrderEnum, cursor?: string | null, options?: AxiosRequestConfig) {
    return PoolsApiFp(this.configuration).poolHistory(poolId, epochNo, count, order, cursor, options).then((request) => request(this.axios));
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
    return PoolsApiFp(this.configuration).poolInfo(poolId, options).then((request) => request(this.axios));
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
    return PoolsApiFp(this.configuration).poolMetadata(poolId, options).then((request) => request(this.axios));
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
    return PoolsApiFp(this.configuration).poolRelays(poolId, options).then((request) => request(this.axios));
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
    return PoolsApiFp(this.configuration).poolUpdates(poolId, options).then((request) => request(this.axios));
  }
}

/**
 * @export
 */
export const PoolBlocksOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type PoolBlocksOrderEnum = typeof PoolBlocksOrderEnum[keyof typeof PoolBlocksOrderEnum];
/**
 * @export
 */
export const PoolHistoryOrderEnum = {
  Asc: 'asc',
  Desc: 'desc'
} as const;
export type PoolHistoryOrderEnum = typeof PoolHistoryOrderEnum[keyof typeof PoolHistoryOrderEnum];


/**
 * ScriptsApi - axios parameter creator
 * @export
 */
export const ScriptsApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns the script corresponding to the specified script hash, if the script has been seen on-chain
     * @summary Script by script hash
     * @param {string} scriptHash Hex encoded script hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    scriptByHash: async (scriptHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'scriptHash' is not null or undefined
      assertParamExists('scriptByHash', 'scriptHash', scriptHash)
      const localVarPath = `/scripts/{script_hash}`
        .replace(`{${"script_hash"}}`, encodeURIComponent(String(scriptHash)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * ScriptsApi - functional programming interface
 * @export
 */
export const ScriptsApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = ScriptsApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns the script corresponding to the specified script hash, if the script has been seen on-chain
     * @summary Script by script hash
     * @param {string} scriptHash Hex encoded script hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async scriptByHash(scriptHash: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedScript>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.scriptByHash(scriptHash, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * ScriptsApi - factory interface
 * @export
 */
export const ScriptsApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = ScriptsApiFp(configuration)
  return {
    /**
     * Returns the script corresponding to the specified script hash, if the script has been seen on-chain
     * @summary Script by script hash
     * @param {string} scriptHash Hex encoded script hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    scriptByHash(scriptHash: string, options?: any): AxiosPromise<TimestampedScript> {
      return localVarFp.scriptByHash(scriptHash, options).then((request) => request(axios, basePath));
    },
  };
};

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
    return ScriptsApiFp(this.configuration).scriptByHash(scriptHash, options).then((request) => request(this.axios));
  }
}



/**
 * TransactionsApi - axios parameter creator
 * @export
 */
export const TransactionsApiAxiosParamCreator = function(configuration: Configuration) {
  return {
    /**
     * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
     * @summary Address by transaction output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addressByTxo: async (txHash: string, index: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'txHash' is not null or undefined
      assertParamExists('addressByTxo', 'txHash', txHash)
      // verify required parameter 'index' is not null or undefined
      assertParamExists('addressByTxo', 'index', index)
      const localVarPath = `/transactions/{tx_hash}/outputs/{index}/address`
        .replace(`{${"tx_hash"}}`, encodeURIComponent(String(txHash)))
        .replace(`{${"index"}}`, encodeURIComponent(String(index)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns hex-encoded CBOR bytes of a transaction
     * @summary CBOR bytes of a transaction
     * @param {string} txHash Transaction Hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txCborByTxHash: async (txHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'txHash' is not null or undefined
      assertParamExists('txCborByTxHash', 'txHash', txHash)
      const localVarPath = `/transactions/{tx_hash}/cbor`
        .replace(`{${"tx_hash"}}`, encodeURIComponent(String(txHash)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns detailed information about a transaction
     * @summary Transaction details
     * @param {string} txHash Transaction hash in hex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txInfo: async (txHash: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'txHash' is not null or undefined
      assertParamExists('txInfo', 'txHash', txHash)
      const localVarPath = `/transactions/{tx_hash}`
        .replace(`{${"tx_hash"}}`, encodeURIComponent(String(txHash)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the specified transaction output. Attempts to resolve the datum hash to the corresponding bytes and JSON, should the output contain a datum hash.
     * @summary Transaction output by output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txoByTxoRef: async (txHash: string, index: number, withCbor?: boolean | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'txHash' is not null or undefined
      assertParamExists('txoByTxoRef', 'txHash', txHash)
      // verify required parameter 'index' is not null or undefined
      assertParamExists('txoByTxoRef', 'index', index)
      const localVarPath = `/transactions/{tx_hash}/outputs/{index}/txo`
        .replace(`{${"tx_hash"}}`, encodeURIComponent(String(txHash)))
        .replace(`{${"index"}}`, encodeURIComponent(String(index)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (withCbor !== undefined) {
        localVarQueryParameter['with_cbor'] = withCbor;
      }



      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns the specified transaction outputs. Returns 404 if any of the outputs specified do not exist. Results are sorted lexicographically by output reference and duplicates are omitted.
     * @summary Transaction outputs by output references
     * @param {Array<string>} requestBody 
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txosByTxoRefs: async (requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'requestBody' is not null or undefined
      assertParamExists('txosByTxoRefs', 'requestBody', requestBody)
      const localVarPath = `/transactions/outputs`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions = configuration.baseOptions;

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api-key required
      setApiKeyToObject(localVarHeaderParameter, "api-key", configuration)

      if (resolveDatums !== undefined) {
        localVarQueryParameter['resolve_datums'] = resolveDatums;
      }

      if (withCbor !== undefined) {
        localVarQueryParameter['with_cbor'] = withCbor;
      }



      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration)

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};

/**
 * TransactionsApi - functional programming interface
 * @export
 */
export const TransactionsApiFp = function(configuration: Configuration) {
  const localVarAxiosParamCreator = TransactionsApiAxiosParamCreator(configuration)
  return {
    /**
     * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
     * @summary Address by transaction output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addressByTxo(txHash: string, index: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedAddress>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addressByTxo(txHash, index, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns hex-encoded CBOR bytes of a transaction
     * @summary CBOR bytes of a transaction
     * @param {string} txHash Transaction Hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async txCborByTxHash(txHash: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedTxCbor>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txCborByTxHash(txHash, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns detailed information about a transaction
     * @summary Transaction details
     * @param {string} txHash Transaction hash in hex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async txInfo(txHash: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedTransactionInfo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txInfo(txHash, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the specified transaction output. Attempts to resolve the datum hash to the corresponding bytes and JSON, should the output contain a datum hash.
     * @summary Transaction output by output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async txoByTxoRef(txHash: string, index: number, withCbor?: boolean | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TimestampedUtxo>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txoByTxoRef(txHash, index, withCbor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
    /**
     * Returns the specified transaction outputs. Returns 404 if any of the outputs specified do not exist. Results are sorted lexicographically by output reference and duplicates are omitted.
     * @summary Transaction outputs by output references
     * @param {Array<string>} requestBody 
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async txosByTxoRefs(requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaginatedUtxoWithBytes>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.txosByTxoRefs(requestBody, resolveDatums, withCbor, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, configuration);
    },
  }
};

/**
 * TransactionsApi - factory interface
 * @export
 */
export const TransactionsApiFactory = function(configuration: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = TransactionsApiFp(configuration)
  return {
    /**
     * Returns the address which was specified in the given transaction output.  Note that if the transaction is invalid this will only return a result for the collateral return output, should one be present in the transaction. If the transaction is valid it will not return a result for the collateral return output.
     * @summary Address by transaction output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addressByTxo(txHash: string, index: number, options?: any): AxiosPromise<TimestampedAddress> {
      return localVarFp.addressByTxo(txHash, index, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns hex-encoded CBOR bytes of a transaction
     * @summary CBOR bytes of a transaction
     * @param {string} txHash Transaction Hash
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txCborByTxHash(txHash: string, options?: any): AxiosPromise<TimestampedTxCbor> {
      return localVarFp.txCborByTxHash(txHash, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns detailed information about a transaction
     * @summary Transaction details
     * @param {string} txHash Transaction hash in hex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txInfo(txHash: string, options?: any): AxiosPromise<TimestampedTransactionInfo> {
      return localVarFp.txInfo(txHash, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the specified transaction output. Attempts to resolve the datum hash to the corresponding bytes and JSON, should the output contain a datum hash.
     * @summary Transaction output by output reference
     * @param {string} txHash Transaction Hash
     * @param {number} index Output Index
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txoByTxoRef(txHash: string, index: number, withCbor?: boolean | null, options?: any): AxiosPromise<TimestampedUtxo> {
      return localVarFp.txoByTxoRef(txHash, index, withCbor, options).then((request) => request(axios, basePath));
    },
    /**
     * Returns the specified transaction outputs. Returns 404 if any of the outputs specified do not exist. Results are sorted lexicographically by output reference and duplicates are omitted.
     * @summary Transaction outputs by output references
     * @param {Array<string>} requestBody 
     * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
     * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    txosByTxoRefs(requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, options?: any): AxiosPromise<PaginatedUtxoWithBytes> {
      return localVarFp.txosByTxoRefs(requestBody, resolveDatums, withCbor, options).then((request) => request(axios, basePath));
    },
  };
};

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
    return TransactionsApiFp(this.configuration).addressByTxo(txHash, index, options).then((request) => request(this.axios));
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
    return TransactionsApiFp(this.configuration).txCborByTxHash(txHash, options).then((request) => request(this.axios));
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
    return TransactionsApiFp(this.configuration).txInfo(txHash, options).then((request) => request(this.axios));
  }

  /**
   * Returns the specified transaction output. Attempts to resolve the datum hash to the corresponding bytes and JSON, should the output contain a datum hash.
   * @summary Transaction output by output reference
   * @param {string} txHash Transaction Hash
   * @param {number} index Output Index
   * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TransactionsApi
   */
  public txoByTxoRef(txHash: string, index: number, withCbor?: boolean | null, options?: AxiosRequestConfig) {
    return TransactionsApiFp(this.configuration).txoByTxoRef(txHash, index, withCbor, options).then((request) => request(this.axios));
  }

  /**
   * Returns the specified transaction outputs. Returns 404 if any of the outputs specified do not exist. Results are sorted lexicographically by output reference and duplicates are omitted.
   * @summary Transaction outputs by output references
   * @param {Array<string>} requestBody 
   * @param {boolean | null} [resolveDatums] Try find and include the corresponding datums for datum hashes
   * @param {boolean | null} [withCbor] Include the CBOR encoding of the transaction output in the response
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TransactionsApi
   */
  public txosByTxoRefs(requestBody: Array<string>, resolveDatums?: boolean | null, withCbor?: boolean | null, options?: AxiosRequestConfig) {
    return TransactionsApiFp(this.configuration).txosByTxoRefs(requestBody, resolveDatums, withCbor, options).then((request) => request(this.axios));
  }
}



