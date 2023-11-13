/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * Type of staking-related action
 * @export
 * @enum {string}
 */

export const AccountAction = {
    Registration: 'registration',
    Deregistration: 'deregistration',
    Delegation: 'delegation',
    Withdrawal: 'withdrawal',
} as const;

export type AccountAction = (typeof AccountAction)[keyof typeof AccountAction];

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
    active_stake: number;
    /**
     * Epoch number
     * @type {number}
     * @memberof AccountHistory
     */
    epoch_no: number;
    /**
     * Bech32 encoded pool ID the account was delegated to
     * @type {string}
     * @memberof AccountHistory
     */
    pool_id?: string | null;
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
    delegated_pool?: string | null;
    /**
     * True if the stake key is registered
     * @type {boolean}
     * @memberof AccountInfo
     */
    registered: boolean;
    /**
     * The amount of rewards that are available to be withdrawn
     * @type {number}
     * @memberof AccountInfo
     */
    rewards_available: number;
    /**
     * Bech32 encoded stake address
     * @type {string}
     * @memberof AccountInfo
     */
    stake_address: string;
    /**
     * Total balance controlled by the stake key (sum of UTxO and rewards)
     * @type {number}
     * @memberof AccountInfo
     */
    total_balance: number;
    /**
     * Total rewards earned
     * @type {number}
     * @memberof AccountInfo
     */
    total_rewarded: number;
    /**
     * Total rewards withdrawn
     * @type {number}
     * @memberof AccountInfo
     */
    total_withdrawn: number;
    /**
     * Amount locked in UTxOs controlled by addresses with the stake key
     * @type {number}
     * @memberof AccountInfo
     */
    utxo_balance: number;
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
    amount: number;
    /**
     * Epoch in which the reward was earned
     * @type {number}
     * @memberof AccountReward
     */
    earned_epoch: number;
    /**
     * Bech32 encoded pool ID (if relevant to reward type)
     * @type {string}
     * @memberof AccountReward
     */
    pool_id: string;
    /**
     * Epoch at which the reward is spendable
     * @type {number}
     * @memberof AccountReward
     */
    spendable_epoch: number;
    /**
     *
     * @type {AccountStakingRewardType}
     * @memberof AccountReward
     */
    type: AccountStakingRewardType;
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
    Refund: 'refund',
} as const;

export type AccountRewardType = (typeof AccountRewardType)[keyof typeof AccountRewardType];

/**
 * Staking-related reward type
 * @export
 * @enum {string}
 */

export const AccountStakingRewardType = {
    Member: 'member',
    Leader: 'leader',
    Refund: 'refund',
} as const;

export type AccountStakingRewardType = (typeof AccountStakingRewardType)[keyof typeof AccountStakingRewardType];

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
    abs_slot: number;
    /**
     *
     * @type {AccountAction}
     * @memberof AccountUpdate
     */
    action: AccountAction;
    /**
     * Epoch number in which the transaction occured
     * @type {number}
     * @memberof AccountUpdate
     */
    epoch_no: number;
    /**
     * Transaction hash of the transaction which performed the action
     * @type {string}
     * @memberof AccountUpdate
     */
    tx_hash: string;
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
    bech32?: string | null;
    /**
     *
     * @type {string}
     * @memberof AddressInfo
     */
    hex: string;
    /**
     *
     * @type {NetworkId}
     * @memberof AddressInfo
     */
    network?: NetworkId | null;
    /**
     *
     * @type {PaymentCredential}
     * @memberof AddressInfo
     */
    payment_cred?: PaymentCredential | null;
    /**
     *
     * @type {StakingCredential}
     * @memberof AddressInfo
     */
    staking_cred?: StakingCredential | null;
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
    input: boolean;
    /**
     * Address controlled at least one of the produced UTxOs
     * @type {boolean}
     * @memberof AddressTransaction
     */
    output: boolean;
    /**
     * Absolute slot of the block which contains the transaction
     * @type {number}
     * @memberof AddressTransaction
     */
    slot: number;
    /**
     * Transaction hash
     * @type {string}
     * @memberof AddressTransaction
     */
    tx_hash: string;
}
/**
 * Lovelace or native asset
 * @export
 * @interface Asset
 */
export interface Asset {
    /**
     * Amount of the asset
     * @type {string}
     * @memberof Asset
     */
    amount: string;
    /**
     * Asset (either `lovelace` or concatenation of hex encoded policy ID and asset name for native asset)
     * @type {string}
     * @memberof Asset
     */
    unit: string;
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
    address: string;
    /**
     * Amount of the asset owned by the holder
     * @type {number}
     * @memberof AssetHolder
     */
    amount: number;
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
    account: string;
    /**
     * Amount of the asset held by addresses which use the stake credential
     * @type {number}
     * @memberof AssetHolderAccount
     */
    amount: number;
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
    amount: number;
    /**
     * Hex encoded asset name
     * @type {string}
     * @memberof AssetInPolicy
     */
    name: string;
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
    asset_name: string;
    /**
     * ASCII representation of the asset name
     * @type {string}
     * @memberof AssetInfo
     */
    asset_name_ascii?: string | null;
    /**
     *
     * @type {AssetStandards}
     * @memberof AssetInfo
     */
    asset_standards: AssetStandards;
    /**
     * Number of transactions which burned some of the asset
     * @type {number}
     * @memberof AssetInfo
     */
    burn_tx_count: number;
    /**
     * CIP-14 fingerprint of the asset
     * @type {string}
     * @memberof AssetInfo
     */
    fingerprint: string;
    /**
     * UNIX timestamp of the first mint transaction
     * @type {number}
     * @memberof AssetInfo
     */
    first_mint_time: number;
    /**
     * Transaction hash of the first transaction which minted the asset
     * @type {string}
     * @memberof AssetInfo
     */
    first_mint_tx: string;
    /**
     * Metadata of the most recent transaction which minted the asset
     * @type {object}
     * @memberof AssetInfo
     */
    latest_mint_tx_metadata: object;
    /**
     * Number of transactions which minted some of the asset
     * @type {number}
     * @memberof AssetInfo
     */
    mint_tx_count: number;
    /**
     *
     * @type {TokenRegistryMetadata}
     * @memberof AssetInfo
     */
    token_registry_metadata?: TokenRegistryMetadata | null;
    /**
     * Current amount of the asset minted
     * @type {number}
     * @memberof AssetInfo
     */
    total_supply: number;
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
    cip25_metadata: object;
    /**
     *
     * @type {Cip68Metadata}
     * @memberof AssetStandards
     */
    cip68_metadata?: Cip68Metadata | null;
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
    block_height: number;
    /**
     * Epoch in which the transaction occurred
     * @type {number}
     * @memberof AssetTx
     */
    epoch_no: number;
    /**
     * Transaction hash
     * @type {string}
     * @memberof AssetTx
     */
    tx_hash: string;
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
    address: string;
    /**
     * Amount of the asset contained in the UTxO
     * @type {number}
     * @memberof AssetUtxo
     */
    amount: number;
    /**
     * UTxO transaction index
     * @type {number}
     * @memberof AssetUtxo
     */
    index: number;
    /**
     * Absolute slot of block which produced the UTxO
     * @type {number}
     * @memberof AssetUtxo
     */
    slot: number;
    /**
     * UTxO transaction hash
     * @type {string}
     * @memberof AssetUtxo
     */
    tx_hash: string;
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
    absolute_slot: number;
    /**
     * Identifier of stake pool which minted the block
     * @type {string}
     * @memberof BlockInfo
     */
    block_producer?: string | null;
    /**
     * Number of blocks which have been minted since the block
     * @type {number}
     * @memberof BlockInfo
     */
    confirmations: number;
    /**
     * Epoch in which block was minted
     * @type {number}
     * @memberof BlockInfo
     */
    epoch: number;
    /**
     * Epoch slot at which block was minted
     * @type {number}
     * @memberof BlockInfo
     */
    epoch_slot: number;
    /**
     *
     * @type {LedgerEra}
     * @memberof BlockInfo
     */
    era: LedgerEra;
    /**
     * Block hash
     * @type {string}
     * @memberof BlockInfo
     */
    hash: string;
    /**
     * Block height (number)
     * @type {number}
     * @memberof BlockInfo
     */
    height: number;
    /**
     *
     * @type {OperationalCert}
     * @memberof BlockInfo
     */
    operational_certificate?: OperationalCert | null;
    /**
     * Block hash of the previous block
     * @type {string}
     * @memberof BlockInfo
     */
    previous_block?: string | null;
    /**
     * Ledger protocol version (major, minor)
     * @type {Array<BlockInfoProtocolVersionInner>}
     * @memberof BlockInfo
     */
    protocol_version: Array<BlockInfoProtocolVersionInner>;
    /**
     * Number of script invocations
     * @type {number}
     * @memberof BlockInfo
     */
    script_invocations: number;
    /**
     * Size of the block in bytes
     * @type {number}
     * @memberof BlockInfo
     */
    size: number;
    /**
     * UTC timestamp when the block was minted
     * @type {string}
     * @memberof BlockInfo
     */
    timestamp: string;
    /**
     *
     * @type {ExUnits}
     * @memberof BlockInfo
     */
    total_ex_units: ExUnits;
    /**
     * Total transaction fees collected for all transactions minted in the block
     * @type {number}
     * @memberof BlockInfo
     */
    total_fees: number;
    /**
     * Total lovelace in outputs of transactions included in the block
     * @type {string}
     * @memberof BlockInfo
     */
    total_output_lovelace: string;
    /**
     * Ordered transaction hashes for the transactions in the block
     * @type {Array<string>}
     * @memberof BlockInfo
     */
    tx_hashes: Array<string>;
    /**
     * Null for Byron
     * @type {string}
     * @memberof BlockInfo
     */
    vrf_key?: string | null;
}

/**
 *
 * @export
 * @interface BlockInfoProtocolVersionInner
 */
export interface BlockInfoProtocolVersionInner {}
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
    epoch: number;
    /**
     *
     * @type {number}
     * @memberof Bound
     */
    slot: number;
    /**
     *
     * @type {number}
     * @memberof Bound
     */
    time: number;
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
    cert_index: number;
    /**
     *
     * @type {Datum}
     * @memberof CertRedeemer
     */
    data: Datum;
    /**
     *
     * @type {Array<number>}
     * @memberof CertRedeemer
     */
    ex_units: Array<number>;
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
    mir_transfers: Array<MirCert>;
    /**
     * Stake pool registration certificates
     * @type {Array<PoolRegCert>}
     * @memberof Certificates
     */
    pool_registrations: Array<PoolRegCert>;
    /**
     * Stake pool retirement certificates
     * @type {Array<PoolRetireCert>}
     * @memberof Certificates
     */
    pool_retirements: Array<PoolRetireCert>;
    /**
     * Stake key delegation certificates
     * @type {Array<StakeDelegCert>}
     * @memberof Certificates
     */
    stake_delegations: Array<StakeDelegCert>;
    /**
     * Stake key deregistration certificates
     * @type {Array<StakeRegCert>}
     * @memberof Certificates
     */
    stake_deregistrations: Array<StakeRegCert>;
    /**
     * Stake key registration certificates
     * @type {Array<StakeRegCert>}
     * @memberof Certificates
     */
    stake_registrations: Array<StakeRegCert>;
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
    block_hash: string;
    /**
     * Height (number) of the most recent block
     * @type {number}
     * @memberof ChainTip
     */
    height: number;
    /**
     * Absolute slot of the most recent block
     * @type {number}
     * @memberof ChainTip
     */
    slot: number;
}
/**
 *
 * @export
 * @enum {string}
 */

export const Cip68AssetType = {
    ReferenceNft: 'reference_nft',
    UserNft: 'user_nft',
    UserFt: 'user_ft',
} as const;

export type Cip68AssetType = (typeof Cip68AssetType)[keyof typeof Cip68AssetType];

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
    extra?: string | null;
    /**
     * Asset CIP-68 metadata
     * @type {object}
     * @memberof Cip68Metadata
     */
    metadata: object;
    /**
     *
     * @type {Cip68AssetType}
     * @memberof Cip68Metadata
     */
    purpose: Cip68AssetType;
    /**
     * CIP-68 version
     * @type {number}
     * @memberof Cip68Metadata
     */
    version: number;
}

/**
 *
 * @export
 * @interface ContractsVestingLockPost200Response
 */
export interface ContractsVestingLockPost200Response {
    /**
     *
     * @type {string}
     * @memberof ContractsVestingLockPost200Response
     */
    cbor_hex?: string;
    /**
     *
     * @type {string}
     * @memberof ContractsVestingLockPost200Response
     */
    tx_hash?: string;
}
/**
 *
 * @export
 * @interface ContractsVestingLockPostRequest
 */
export interface ContractsVestingLockPostRequest {
    /**
     * Sender\'s bech32 address
     * @type {string}
     * @memberof ContractsVestingLockPostRequest
     */
    sender: string;
    /**
     * Beneficiary\'s bech32 address
     * @type {string}
     * @memberof ContractsVestingLockPostRequest
     */
    beneficiary: string;
    /**
     * Asset policy ID of the asset to be locked
     * @type {string}
     * @memberof ContractsVestingLockPostRequest
     */
    asset_policy_id: string;
    /**
     * Asset policy token name of the asset to be locked
     * @type {string}
     * @memberof ContractsVestingLockPostRequest
     */
    asset_token_name: string;
    /**
     * Total amount of the asset to be locked
     * @type {number}
     * @memberof ContractsVestingLockPostRequest
     */
    total_vesting_quantity: number;
    /**
     * Vesting period start in UNIX time (seconds)
     * @type {number}
     * @memberof ContractsVestingLockPostRequest
     */
    vesting_period_start: number;
    /**
     * Vesting period end in UNIX time (seconds)
     * @type {number}
     * @memberof ContractsVestingLockPostRequest
     */
    vesting_period_end: number;
    /**
     * Valid initial unlock period start in UNIX time (seconds)
     * @type {number}
     * @memberof ContractsVestingLockPostRequest
     */
    first_unlock_possible_after: number;
    /**
     * Number of vesting installments used to collect vested assets
     * @type {number}
     * @memberof ContractsVestingLockPostRequest
     */
    total_installments: number;
    /**
     * An arbitrary note associated with locked assets
     * @type {string}
     * @memberof ContractsVestingLockPostRequest
     */
    vesting_memo: string;
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
    blk_count: number;
    /**
     * Epoch number
     * @type {number}
     * @memberof CurrentEpochInfo
     */
    epoch_no: number;
    /**
     * Total fees collected in the epoch so far
     * @type {string}
     * @memberof CurrentEpochInfo
     */
    fees: string;
    /**
     * UNIX timestamp when the epoch began
     * @type {number}
     * @memberof CurrentEpochInfo
     */
    start_time: number;
    /**
     * Total transactions in the epoch so far
     * @type {number}
     * @memberof CurrentEpochInfo
     */
    tx_count: number;
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
    hash: string;
    /**
     *
     * @type {object}
     * @memberof Data
     */
    value: object;
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
    bytes: string;
    /**
     * JSON representation of the datum
     * @type {object}
     * @memberof Datum
     */
    json: object;
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
    bytes?: string | null;
    /**
     * Datum hash
     * @type {string}
     * @memberof DatumOption
     */
    hash: string;
    /**
     * JSON representation of the datum (`null` if datum type is `hash` and corresponding datum bytes have not been seen on-chain)
     * @type {object}
     * @memberof DatumOption
     */
    json: object;
    /**
     *
     * @type {DatumOptionType}
     * @memberof DatumOption
     */
    type: DatumOptionType;
}

/**
 * Datum type (inline datum or datum hash)
 * @export
 * @enum {string}
 */

export const DatumOptionType = {
    Hash: 'hash',
    Inline: 'inline',
} as const;

export type DatumOptionType = (typeof DatumOptionType)[keyof typeof DatumOptionType];

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
    active_epoch_no?: number | null;
    /**
     * Delegator live stake
     * @type {number}
     * @memberof DelegatorInfo
     */
    amount?: number | null;
    /**
     * Transaction hash relating to the most recent delegation
     * @type {string}
     * @memberof DelegatorInfo
     */
    latest_delegation_tx_hash?: string | null;
    /**
     * Bech32 encoded stake address (reward address)
     * @type {string}
     * @memberof DelegatorInfo
     */
    stake_address?: string | null;
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
    blk_count: number;
    /**
     * UNIX timestamp when the epoch ended
     * @type {number}
     * @memberof EpochInfo
     */
    end_time: number;
    /**
     * Epoch number
     * @type {number}
     * @memberof EpochInfo
     */
    epoch_no: number;
    /**
     * Total fees collected in the epoch
     * @type {string}
     * @memberof EpochInfo
     */
    fees: string;
    /**
     * UNIX timestamp when the epoch began
     * @type {number}
     * @memberof EpochInfo
     */
    start_time: number;
    /**
     * Total transactions in the epoch
     * @type {number}
     * @memberof EpochInfo
     */
    tx_count: number;
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
    epoch_length: number;
    /**
     *
     * @type {number}
     * @memberof EraParameters
     */
    safe_zone?: number | null;
    /**
     *
     * @type {number}
     * @memberof EraParameters
     */
    slot_length: number;
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
    end?: Bound | null;
    /**
     *
     * @type {EraParameters}
     * @memberof EraSummary
     */
    parameters: EraParameters;
    /**
     *
     * @type {Bound}
     * @memberof EraSummary
     */
    start: Bound;
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
    memory: number;
    /**
     * CPU execution units
     * @type {number}
     * @memberof ExUnit
     */
    steps: number;
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
    mem: number;
    /**
     *
     * @type {number}
     * @memberof ExUnits
     */
    steps: number;
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
    block_hash: string;
    /**
     * Absolute slot of the most recently processed block (aka chain tip)
     * @type {number}
     * @memberof LastUpdated
     */
    block_slot: number;
    /**
     * UTC timestamp of when the most recently processed block was minted
     * @type {string}
     * @memberof LastUpdated
     */
    timestamp: string;
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
    Notrecognised: 'notrecognised',
} as const;

export type LedgerEra = (typeof LedgerEra)[keyof typeof LedgerEra];

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
    amount: number;
    /**
     * Asset (represented as concatenation of hex encoded policy ID and asset name)
     * @type {string}
     * @memberof MintAsset
     */
    unit: string;
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
    data: Datum;
    /**
     *
     * @type {Array<number>}
     * @memberof MintRedeemer
     */
    ex_units: Array<number>;
    /**
     *
     * @type {string}
     * @memberof MintRedeemer
     */
    policy: string;
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
    block_timestamp: number;
    /**
     * Transaction metadata
     * @type {object}
     * @memberof MintingTx
     */
    metadata: object;
    /**
     * Amount of the asset minted or burned (negative if burned)
     * @type {number}
     * @memberof MintingTx
     */
    mint_amount: number;
    /**
     * Transaction hash
     * @type {string}
     * @memberof MintingTx
     */
    tx_hash: string;
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
    cert_index: number;
    /**
     *
     * @type {MirSource}
     * @memberof MirCert
     */
    from: MirSource;
    /**
     * Where the rewards funds are being sent
     * @type {string}
     * @memberof MirCert
     */
    to: string;
}

/**
 * The pot from which an MIR reward is being funded by
 * @export
 * @enum {string}
 */

export const MirSource = {
    Reserves: 'reserves',
    Treasury: 'treasury',
} as const;

export type MirSource = (typeof MirSource)[keyof typeof MirSource];

/**
 *
 * @export
 * @enum {string}
 */

export const NetworkId = {
    Mainnet: 'mainnet',
    Testnet: 'testnet',
} as const;

export type NetworkId = (typeof NetworkId)[keyof typeof NetworkId];

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
    hot_vkey: string;
    /**
     *
     * @type {number}
     * @memberof OperationalCert
     */
    kes_period: number;
    /**
     *
     * @type {string}
     * @memberof OperationalCert
     */
    kes_signature: string;
    /**
     *
     * @type {number}
     * @memberof OperationalCert
     */
    sequence_number: number;
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
    data: Array<AccountHistory>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAccountHistory
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAccountHistory
     */
    next_cursor?: string | null;
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
    data: Array<AccountReward>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAccountReward
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAccountReward
     */
    next_cursor?: string | null;
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
    data: Array<AccountUpdate>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAccountUpdate
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAccountUpdate
     */
    next_cursor?: string | null;
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
    data: Array<string>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAddress
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAddress
     */
    next_cursor?: string | null;
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
    data: Array<AddressTransaction>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAddressTransaction
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAddressTransaction
     */
    next_cursor?: string | null;
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
    data: Array<Asset>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAsset
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAsset
     */
    next_cursor?: string | null;
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
    data: Array<AssetHolder>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAssetHolder
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAssetHolder
     */
    next_cursor?: string | null;
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
    data: Array<AssetHolderAccount>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAssetHolderAccount
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAssetHolderAccount
     */
    next_cursor?: string | null;
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
    data: Array<AssetInfo>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAssetInfo
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAssetInfo
     */
    next_cursor?: string | null;
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
    data: Array<AssetTx>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAssetTx
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAssetTx
     */
    next_cursor?: string | null;
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
    data: Array<AssetUtxo>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedAssetUtxo
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedAssetUtxo
     */
    next_cursor?: string | null;
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
    data: Array<DelegatorInfo>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedDelegatorInfo
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedDelegatorInfo
     */
    next_cursor?: string | null;
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
    data: Array<MintingTx>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedMintingTx
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedMintingTx
     */
    next_cursor?: string | null;
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
    data: Array<PaymentCredentialTransaction>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPaymentCredentialTransaction
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPaymentCredentialTransaction
     */
    next_cursor?: string | null;
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
    data: Array<PolicyHolder>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPolicyHolder
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPolicyHolder
     */
    next_cursor?: string | null;
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
    data: Array<PolicyHolderAccount>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPolicyHolderAccount
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPolicyHolderAccount
     */
    next_cursor?: string | null;
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
    data: Array<PolicyUtxo>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPolicyUtxo
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPolicyUtxo
     */
    next_cursor?: string | null;
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
    data: Array<PoolBlock>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPoolBlock
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPoolBlock
     */
    next_cursor?: string | null;
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
    data: Array<PoolHistory>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPoolHistory
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPoolHistory
     */
    next_cursor?: string | null;
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
    data: Array<PoolListInfo>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedPoolListInfo
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedPoolListInfo
     */
    next_cursor?: string | null;
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
    data: Array<UtxoRef>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedUtxoRef
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedUtxoRef
     */
    next_cursor?: string | null;
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
    data: Array<UtxoWithBytes>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedUtxoWithBytes
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedUtxoWithBytes
     */
    next_cursor?: string | null;
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
    data: Array<UtxoWithSlot>;
    /**
     *
     * @type {LastUpdated}
     * @memberof PaginatedUtxoWithSlot
     */
    last_updated: LastUpdated;
    /**
     * Pagination cursor
     * @type {string}
     * @memberof PaginatedUtxoWithSlot
     */
    next_cursor?: string | null;
}
/**
 *
 * @export
 * @enum {string}
 */

export const PaymentCredKind = {
    Key: 'key',
    Script: 'script',
} as const;

export type PaymentCredKind = (typeof PaymentCredKind)[keyof typeof PaymentCredKind];

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
    bech32: string;
    /**
     * Hex-encoding of the script or key credential
     * @type {string}
     * @memberof PaymentCredential
     */
    hex: string;
    /**
     *
     * @type {PaymentCredKind}
     * @memberof PaymentCredential
     */
    kind: PaymentCredKind;
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
    input: boolean;
    /**
     * Payment credential controlled at least one of the produced UTxOs
     * @type {boolean}
     * @memberof PaymentCredentialTransaction
     */
    output: boolean;
    /**
     * Payment credential was an additional required signer
     * @type {boolean}
     * @memberof PaymentCredentialTransaction
     */
    required_signer: boolean;
    /**
     * Absolute slot of the block which contains the transaction
     * @type {number}
     * @memberof PaymentCredentialTransaction
     */
    slot: number;
    /**
     * Transaction hash
     * @type {string}
     * @memberof PaymentCredentialTransaction
     */
    tx_hash: string;
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
    cert_index: number;
    /**
     *
     * @type {number}
     * @memberof Pointer
     */
    slot: number;
    /**
     *
     * @type {number}
     * @memberof Pointer
     */
    tx_index: number;
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
    address: string;
    /**
     * List of assets owned by the holder belonging to the policy
     * @type {Array<AssetInPolicy>}
     * @memberof PolicyHolder
     */
    assets: Array<AssetInPolicy>;
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
    account: string;
    /**
     * List of assets owned by the holder belonging to the policy
     * @type {Array<AssetInPolicy>}
     * @memberof PolicyHolderAccount
     */
    assets: Array<AssetInPolicy>;
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
    address: string;
    /**
     * List of assets contained in the UTxO belonging to the policy
     * @type {Array<AssetInPolicy>}
     * @memberof PolicyUtxo
     */
    assets: Array<AssetInPolicy>;
    /**
     * UTxO transaction index
     * @type {number}
     * @memberof PolicyUtxo
     */
    index: number;
    /**
     * Absolute slot of block which produced the UTxO
     * @type {number}
     * @memberof PolicyUtxo
     */
    slot: number;
    /**
     * UTxO transaction hash
     * @type {string}
     * @memberof PolicyUtxo
     */
    tx_hash: string;
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
    abs_slot?: number | null;
    /**
     * Block hash
     * @type {string}
     * @memberof PoolBlock
     */
    block_hash: string;
    /**
     * Block height (block number)
     * @type {number}
     * @memberof PoolBlock
     */
    block_height: number;
    /**
     * UNIX timestamp when the block was mined
     * @type {number}
     * @memberof PoolBlock
     */
    block_time: number;
    /**
     * Epoch number
     * @type {number}
     * @memberof PoolBlock
     */
    epoch_no?: number | null;
    /**
     * Epoch slot
     * @type {number}
     * @memberof PoolBlock
     */
    epoch_slot?: number | null;
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
    active_stake?: number | null;
    /**
     * Pool active stake as percentage of total active stake
     * @type {string}
     * @memberof PoolHistory
     */
    active_stake_pct?: string | null;
    /**
     * Blocks created in the epoch
     * @type {number}
     * @memberof PoolHistory
     */
    block_cnt?: number | null;
    /**
     * Total rewards earned by pool delegators for the epoch
     * @type {number}
     * @memberof PoolHistory
     */
    deleg_rewards: number;
    /**
     * Delegators in the epoch
     * @type {number}
     * @memberof PoolHistory
     */
    delegator_cnt?: number | null;
    /**
     * Epoch number
     * @type {number}
     * @memberof PoolHistory
     */
    epoch_no: number;
    /**
     * Annual return percentage for delegators for the epoch
     * @type {string}
     * @memberof PoolHistory
     */
    epoch_ros: string;
    /**
     * Pool fixed cost
     * @type {number}
     * @memberof PoolHistory
     */
    fixed_cost: number;
    /**
     * Pool margin
     * @type {number}
     * @memberof PoolHistory
     */
    margin?: number | null;
    /**
     * Fees collected for the epoch
     * @type {number}
     * @memberof PoolHistory
     */
    pool_fees: number;
    /**
     * Pool saturation percent
     * @type {string}
     * @memberof PoolHistory
     */
    saturation_pct?: string | null;
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
    active_epoch_no: number;
    /**
     * Active stake
     * @type {string}
     * @memberof PoolInfo
     */
    active_stake?: string | null;
    /**
     * Number of blocks created
     * @type {number}
     * @memberof PoolInfo
     */
    block_count?: number | null;
    /**
     * Pool fixed cost
     * @type {string}
     * @memberof PoolInfo
     */
    fixed_cost: string;
    /**
     * Number of current delegators
     * @type {number}
     * @memberof PoolInfo
     */
    live_delegators: number;
    /**
     * Account balance of pool owners
     * @type {string}
     * @memberof PoolInfo
     */
    live_pledge?: string | null;
    /**
     * Live saturation
     * @type {string}
     * @memberof PoolInfo
     */
    live_saturation?: string | null;
    /**
     * Live stake
     * @type {string}
     * @memberof PoolInfo
     */
    live_stake?: string | null;
    /**
     * Pool margin
     * @type {string}
     * @memberof PoolInfo
     */
    margin: string;
    /**
     * Hash of the pool metadata
     * @type {string}
     * @memberof PoolInfo
     */
    meta_hash?: string | null;
    /**
     *
     * @type {PoolMetaJson}
     * @memberof PoolInfo
     */
    meta_json?: PoolMetaJson | null;
    /**
     * URL pointing to the pool metadata
     * @type {string}
     * @memberof PoolInfo
     */
    meta_url?: string | null;
    /**
     * Pool operational certificate
     * @type {string}
     * @memberof PoolInfo
     */
    op_cert?: string | null;
    /**
     * Operational certificate counter
     * @type {number}
     * @memberof PoolInfo
     */
    op_cert_counter?: number | null;
    /**
     * List of stake keys which control the pool
     * @type {Array<string>}
     * @memberof PoolInfo
     */
    owners: Array<string>;
    /**
     * Pool pledge
     * @type {string}
     * @memberof PoolInfo
     */
    pledge: string;
    /**
     * Bech32 encoded pool ID
     * @type {string}
     * @memberof PoolInfo
     */
    pool_id_bech32: string;
    /**
     * Hex encoded pool ID
     * @type {string}
     * @memberof PoolInfo
     */
    pool_id_hex: string;
    /**
     * Status of the pool
     * @type {string}
     * @memberof PoolInfo
     */
    pool_status?: string | null;
    /**
     * Relays declared by the pool
     * @type {Array<Relay>}
     * @memberof PoolInfo
     */
    relays: Array<Relay>;
    /**
     * Epoch at which the pool will be retired
     * @type {number}
     * @memberof PoolInfo
     */
    retiring_epoch?: number | null;
    /**
     * Reward address associated with the pool
     * @type {string}
     * @memberof PoolInfo
     */
    reward_addr?: string | null;
    /**
     * Pool stake share
     * @type {string}
     * @memberof PoolInfo
     */
    sigma?: string | null;
    /**
     * VRF key hash
     * @type {string}
     * @memberof PoolInfo
     */
    vrf_key_hash: string;
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
    pool_id_bech32: string;
    /**
     * Pool ticker symbol
     * @type {string}
     * @memberof PoolListInfo
     */
    ticker?: string | null;
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
    description?: string | null;
    /**
     * Pool home page URL
     * @type {string}
     * @memberof PoolMetaJson
     */
    homepage?: string | null;
    /**
     * Pool name
     * @type {string}
     * @memberof PoolMetaJson
     */
    name: string;
    /**
     * Pool ticker symbol
     * @type {string}
     * @memberof PoolMetaJson
     */
    ticker?: string | null;
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
    meta_hash?: string | null;
    /**
     *
     * @type {PoolMetaJson}
     * @memberof PoolMetadata
     */
    meta_json?: PoolMetaJson | null;
    /**
     * URL pointing to the pool metadata
     * @type {string}
     * @memberof PoolMetadata
     */
    meta_url?: string | null;
    /**
     * Bech32 encoded pool ID
     * @type {string}
     * @memberof PoolMetadata
     */
    pool_id_bech32: string;
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
    cert_index: number;
    /**
     * Pool fixed cost
     * @type {number}
     * @memberof PoolRegCert
     */
    fixed_cost: number;
    /**
     * Epoch at which the update will become active
     * @type {number}
     * @memberof PoolRegCert
     */
    from_epoch: number;
    /**
     * Pool margin
     * @type {number}
     * @memberof PoolRegCert
     */
    margin: number;
    /**
     * Hash of metadata that the metadata URL should point to
     * @type {string}
     * @memberof PoolRegCert
     */
    metadata_hash?: string | null;
    /**
     * URL pointing to pool metadata declared by the stake pool
     * @type {string}
     * @memberof PoolRegCert
     */
    metadata_url?: string | null;
    /**
     * Stake addresses which control the stake pool
     * @type {Array<string>}
     * @memberof PoolRegCert
     */
    owner_addresses: Array<string>;
    /**
     * Pool pledge
     * @type {number}
     * @memberof PoolRegCert
     */
    pledge: number;
    /**
     * Pool ID of the stake pool being updated
     * @type {string}
     * @memberof PoolRegCert
     */
    pool_id: string;
    /**
     * Relays declared by the stake pool
     * @type {Array<Relay>}
     * @memberof PoolRegCert
     */
    relays: Array<Relay>;
    /**
     * Stake address which will receive rewards from the stake pool
     * @type {string}
     * @memberof PoolRegCert
     */
    reward_address: string;
    /**
     * VRF key hash of the stake pool
     * @type {string}
     * @memberof PoolRegCert
     */
    vrf_key_hash: string;
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
    pool_id_bech32: string;
    /**
     * Relays declared by the pool
     * @type {Array<Relay>}
     * @memberof PoolRelay
     */
    relays: Array<Relay>;
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
    after_epoch: number;
    /**
     * Index of the certificate in the transaction
     * @type {number}
     * @memberof PoolRetireCert
     */
    cert_index: number;
    /**
     * Bech32 pool ID of the pool being retired
     * @type {string}
     * @memberof PoolRetireCert
     */
    pool_id: string;
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
    active_epoch_no: number;
    /**
     * UNIX timestamp of the block containing the transaction
     * @type {number}
     * @memberof PoolUpdate
     */
    block_time?: number | null;
    /**
     * Pool fixed cost
     * @type {number}
     * @memberof PoolUpdate
     */
    fixed_cost: number;
    /**
     * Pool margin
     * @type {number}
     * @memberof PoolUpdate
     */
    margin: number;
    /**
     * Hash of the pool metadata
     * @type {string}
     * @memberof PoolUpdate
     */
    meta_hash?: string | null;
    /**
     *
     * @type {PoolMetaJson}
     * @memberof PoolUpdate
     */
    meta_json?: PoolMetaJson | null;
    /**
     * URL pointing to the pool metadata
     * @type {string}
     * @memberof PoolUpdate
     */
    meta_url?: string | null;
    /**
     * List of stake keys which control the pool
     * @type {Array<string>}
     * @memberof PoolUpdate
     */
    owners: Array<string>;
    /**
     * Pool pledge
     * @type {number}
     * @memberof PoolUpdate
     */
    pledge: number;
    /**
     * Bech32 encoded pool ID
     * @type {string}
     * @memberof PoolUpdate
     */
    pool_id_bech32: string;
    /**
     * Hex encoded pool ID
     * @type {string}
     * @memberof PoolUpdate
     */
    pool_id_hex: string;
    /**
     * Status of the pool
     * @type {string}
     * @memberof PoolUpdate
     */
    pool_status?: string | null;
    /**
     * Relays declared by the pool
     * @type {Array<Relay>}
     * @memberof PoolUpdate
     */
    relays: Array<Relay>;
    /**
     * Epoch at which the pool will be retired
     * @type {number}
     * @memberof PoolUpdate
     */
    retiring_epoch?: number | null;
    /**
     * Reward address associated with the pool
     * @type {string}
     * @memberof PoolUpdate
     */
    reward_addr?: string | null;
    /**
     * Transaction hash for the transaction which contained the update
     * @type {string}
     * @memberof PoolUpdate
     */
    tx_hash: string;
    /**
     * VRF key hash
     * @type {string}
     * @memberof PoolUpdate
     */
    vrf_key_hash: string;
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
    memory: string;
    /**
     *
     * @type {string}
     * @memberof Prices
     */
    steps: string;
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
    coins_per_utxo_byte: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    collateral_percentage: number;
    /**
     *
     * @type {{ [key: string]: { [key: string]: number; }; }}
     * @memberof ProtocolParameters
     */
    cost_models: { [key: string]: { [key: string]: number } };
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    desired_number_of_pools: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    max_block_body_size: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    max_block_header_size: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    max_collateral_inputs: number;
    /**
     *
     * @type {ExUnit}
     * @memberof ProtocolParameters
     */
    max_execution_units_per_block: ExUnit;
    /**
     *
     * @type {ExUnit}
     * @memberof ProtocolParameters
     */
    max_execution_units_per_transaction: ExUnit;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    max_tx_size: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    max_value_size: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    min_fee_coefficient: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    min_fee_constant: number;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    min_pool_cost: number;
    /**
     *
     * @type {string}
     * @memberof ProtocolParameters
     */
    monetary_expansion: string;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    pool_deposit: number;
    /**
     *
     * @type {string}
     * @memberof ProtocolParameters
     */
    pool_influence: string;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    pool_retirement_epoch_bound: number;
    /**
     *
     * @type {Prices}
     * @memberof ProtocolParameters
     */
    prices: Prices;
    /**
     *
     * @type {Version}
     * @memberof ProtocolParameters
     */
    protocol_version: Version;
    /**
     *
     * @type {number}
     * @memberof ProtocolParameters
     */
    stake_key_deposit: number;
    /**
     *
     * @type {string}
     * @memberof ProtocolParameters
     */
    treasury_expansion: string;
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
    certificates: Array<CertRedeemer>;
    /**
     * Redeemers attempting to mint assets of a script-controlled policy ID
     * @type {Array<MintRedeemer>}
     * @memberof Redeemers
     */
    mints: Array<MintRedeemer>;
    /**
     * Redeemers attempting to spend a UTxO locked at a script
     * @type {Array<SpendRedeemer>}
     * @memberof Redeemers
     */
    spends: Array<SpendRedeemer>;
    /**
     * Redeemers attempting to withdraw rewards for a script-controlled stake account
     * @type {Array<WdrlRedeemer>}
     * @memberof Redeemers
     */
    withdrawals: Array<WdrlRedeemer>;
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
    dns?: string | null;
    /**
     *
     * @type {string}
     * @memberof Relay
     */
    ipv4?: string | null;
    /**
     *
     * @type {string}
     * @memberof Relay
     */
    ipv6?: string | null;
    /**
     *
     * @type {number}
     * @memberof Relay
     */
    port?: number | null;
    /**
     *
     * @type {string}
     * @memberof Relay
     */
    srv?: string | null;
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
    bytes?: string | null;
    /**
     * Script hash
     * @type {string}
     * @memberof Script
     */
    hash: string;
    /**
     * JSON representation of script (`null` if not `native` script)
     * @type {object}
     * @memberof Script
     */
    json: object;
    /**
     *
     * @type {ScriptType}
     * @memberof Script
     */
    type: ScriptType;
}

/**
 * Script type and version
 * @export
 * @enum {string}
 */

export const ScriptType = {
    Native: 'native',
    Plutusv1: 'plutusv1',
    Plutusv2: 'plutusv2',
} as const;

export type ScriptType = (typeof ScriptType)[keyof typeof ScriptType];

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
    data: Datum;
    /**
     *
     * @type {Array<number>}
     * @memberof SpendRedeemer
     */
    ex_units: Array<number>;
    /**
     *
     * @type {number}
     * @memberof SpendRedeemer
     */
    input_index: number;
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
    cert_index: number;
    /**
     * Pool ID of the stake pool the stake key is delegating to
     * @type {string}
     * @memberof StakeDelegCert
     */
    pool_id: string;
    /**
     * Stake address corresponding to stake key being delegated
     * @type {string}
     * @memberof StakeDelegCert
     */
    stake_address: string;
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
    cert_index: number;
    /**
     * Stake address corresponding to stake key being updated
     * @type {string}
     * @memberof StakeRegCert
     */
    stake_address: string;
}
/**
 *
 * @export
 * @enum {string}
 */

export const StakingCredKind = {
    Key: 'key',
    Script: 'script',
    Pointer: 'pointer',
} as const;

export type StakingCredKind = (typeof StakingCredKind)[keyof typeof StakingCredKind];

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
    bech32?: string | null;
    /**
     *
     * @type {string}
     * @memberof StakingCredential
     */
    hex?: string | null;
    /**
     *
     * @type {StakingCredKind}
     * @memberof StakingCredential
     */
    kind: StakingCredKind;
    /**
     *
     * @type {Pointer}
     * @memberof StakingCredential
     */
    pointer?: Pointer | null;
    /**
     *
     * @type {string}
     * @memberof StakingCredential
     */
    reward_address?: string | null;
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
    data: AccountInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedAccountInfo
     */
    last_updated: LastUpdated;
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
    data: string;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedAddress
     */
    last_updated: LastUpdated;
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
    data: AssetInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedAssetInfo
     */
    last_updated: LastUpdated;
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
    data: BlockInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedBlockInfo
     */
    last_updated: LastUpdated;
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
    data: ChainTip;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedChainTip
     */
    last_updated: LastUpdated;
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
    data: CurrentEpochInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedCurrentEpochInfo
     */
    last_updated: LastUpdated;
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
    data: Datum;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedDatum
     */
    last_updated: LastUpdated;
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
    data: EpochInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedEpochInfo
     */
    last_updated: LastUpdated;
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
    data: Array<EraSummary>;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedEraSummaries
     */
    last_updated: LastUpdated;
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
    data: PoolInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedPoolInfo
     */
    last_updated: LastUpdated;
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
    data: PoolMetadata;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedPoolMetadata
     */
    last_updated: LastUpdated;
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
    data: Array<PoolRelay>;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedPoolRelays
     */
    last_updated: LastUpdated;
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
    data: Array<PoolUpdate>;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedPoolUpdates
     */
    last_updated: LastUpdated;
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
    data: ProtocolParameters;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedProtocolParameters
     */
    last_updated: LastUpdated;
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
    data: Script;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedScript
     */
    last_updated: LastUpdated;
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
    data: string;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedSystemStart
     */
    last_updated: LastUpdated;
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
    data: TransactionInfo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedTransactionInfo
     */
    last_updated: LastUpdated;
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
    data: string;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedTxCbor
     */
    last_updated: LastUpdated;
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
    data: number;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedTxCount
     */
    last_updated: LastUpdated;
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
    data: Utxo;
    /**
     *
     * @type {LastUpdated}
     * @memberof TimestampedUtxo
     */
    last_updated: LastUpdated;
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
    decimals: number;
    /**
     * Asset description
     * @type {string}
     * @memberof TokenRegistryMetadata
     */
    description: string;
    /**
     * Base64 encoded logo PNG associated with the asset
     * @type {string}
     * @memberof TokenRegistryMetadata
     */
    logo: string;
    /**
     * Asset name
     * @type {string}
     * @memberof TokenRegistryMetadata
     */
    name: string;
    /**
     * Asset ticker
     * @type {string}
     * @memberof TokenRegistryMetadata
     */
    ticker: string;
    /**
     * URL associated with the asset
     * @type {string}
     * @memberof TokenRegistryMetadata
     */
    url: string;
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
    additional_signers: Array<string>;
    /**
     * Absolute slot of the block which includes the transaction
     * @type {number}
     * @memberof TransactionInfo
     */
    block_absolute_slot: number;
    /**
     * Hash of the block which includes the transaction
     * @type {string}
     * @memberof TransactionInfo
     */
    block_hash: string;
    /**
     * Block height (number) of the block which includes the transaction
     * @type {number}
     * @memberof TransactionInfo
     */
    block_height: number;
    /**
     * UNIX timestamp of the block which includes the transaction
     * @type {number}
     * @memberof TransactionInfo
     */
    block_timestamp: number;
    /**
     * The transaction\'s position within the block which includes it
     * @type {number}
     * @memberof TransactionInfo
     */
    block_tx_index: number;
    /**
     *
     * @type {Certificates}
     * @memberof TransactionInfo
     */
    certificates: Certificates;
    /**
     * Collateral inputs, to be taken if Plutus scripts are not successful
     * @type {Array<Utxo>}
     * @memberof TransactionInfo
     */
    collateral_inputs: Array<Utxo>;
    /**
     *
     * @type {Utxo}
     * @memberof TransactionInfo
     */
    collateral_return?: Utxo | null;
    /**
     * The amount of lovelace used for deposits (negative if being returned)
     * @type {number}
     * @memberof TransactionInfo
     */
    deposit: number;
    /**
     * The fee specified in the transaction
     * @type {number}
     * @memberof TransactionInfo
     */
    fee: number;
    /**
     * Transaction inputs
     * @type {Array<Utxo>}
     * @memberof TransactionInfo
     */
    inputs: Array<Utxo>;
    /**
     * The slot before which the transaction would not be accepted onto the chain
     * @type {number}
     * @memberof TransactionInfo
     */
    invalid_before?: number | null;
    /**
     * The slot from which the transaction would not be accepted onto the chain
     * @type {number}
     * @memberof TransactionInfo
     */
    invalid_hereafter?: number | null;
    /**
     * Transaction metadata JSON
     * @type {object}
     * @memberof TransactionInfo
     */
    metadata: object;
    /**
     * Native assets minted or burned by the transaction
     * @type {Array<MintAsset>}
     * @memberof TransactionInfo
     */
    mint: Array<MintAsset>;
    /**
     * Transaction outputs
     * @type {Array<Utxo>}
     * @memberof TransactionInfo
     */
    outputs: Array<Utxo>;
    /**
     *
     * @type {Redeemers}
     * @memberof TransactionInfo
     */
    redeemers: Redeemers;
    /**
     * Reference inputs
     * @type {Array<Utxo>}
     * @memberof TransactionInfo
     */
    reference_inputs: Array<Utxo>;
    /**
     * Native and Plutus scripts which were executed while processing the transaction
     * @type {Array<Script>}
     * @memberof TransactionInfo
     */
    scripts_executed: Array<Script>;
    /**
     * False if any executed Plutus scripts failed (aka phase-two validity), meaning collateral was processed.
     * @type {boolean}
     * @memberof TransactionInfo
     */
    scripts_successful: boolean;
    /**
     * Size of the transaction in bytes
     * @type {number}
     * @memberof TransactionInfo
     */
    size: number;
    /**
     * Transaction hash (identifier)
     * @type {string}
     * @memberof TransactionInfo
     */
    tx_hash: string;
    /**
     * Stake account withdrawals
     * @type {Array<Withdrawal>}
     * @memberof TransactionInfo
     */
    withdrawals: Array<Withdrawal>;
}
/**
 * Transaction Manager state
 * @export
 * @interface TxManagerState
 */
export interface TxManagerState {
    /**
     * block number
     * @type {string}
     * @memberof TxManagerState
     */
    block: string;
    /**
     * transaction state
     * @type {string}
     * @memberof TxManagerState
     */
    state: string;
    /**
     * transaction state timestamp
     * @type {string}
     * @memberof TxManagerState
     */
    timestamp: string;
    /**
     * transaction hash
     * @type {string}
     * @memberof TxManagerState
     */
    transaction_hash: string;
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
    Rolledback: 'Rolledback',
} as const;

export type TxStatus = (typeof TxStatus)[keyof typeof TxStatus];

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
    tx_hash: string;
    /**
     *
     * @type {TxStatus}
     * @memberof TxStatusInfo
     */
    tx_status: TxStatus;
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
    address: string;
    /**
     * List of assets contained in the UTxO
     * @type {Array<Asset>}
     * @memberof Utxo
     */
    assets: Array<Asset>;
    /**
     *
     * @type {DatumOption}
     * @memberof Utxo
     */
    datum?: DatumOption | null;
    /**
     * UTxO transaction index
     * @type {number}
     * @memberof Utxo
     */
    index: number;
    /**
     *
     * @type {Script}
     * @memberof Utxo
     */
    reference_script?: Script | null;
    /**
     * UTxO transaction hash
     * @type {string}
     * @memberof Utxo
     */
    tx_hash: string;
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
    index: number;
    /**
     * UTxO transaction hash
     * @type {string}
     * @memberof UtxoRef
     */
    tx_hash: string;
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
    address: string;
    /**
     * List of assets contained in the UTxO
     * @type {Array<Asset>}
     * @memberof UtxoWithBytes
     */
    assets: Array<Asset>;
    /**
     *
     * @type {DatumOption}
     * @memberof UtxoWithBytes
     */
    datum?: DatumOption | null;
    /**
     * UTxO transaction index
     * @type {number}
     * @memberof UtxoWithBytes
     */
    index: number;
    /**
     *
     * @type {Script}
     * @memberof UtxoWithBytes
     */
    reference_script?: Script | null;
    /**
     * UTxO transaction hash
     * @type {string}
     * @memberof UtxoWithBytes
     */
    tx_hash: string;
    /**
     * Hex encoded transaction output CBOR bytes
     * @type {string}
     * @memberof UtxoWithBytes
     */
    txout_cbor?: string | null;
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
    address: string;
    /**
     * List of assets contained in the UTxO
     * @type {Array<Asset>}
     * @memberof UtxoWithSlot
     */
    assets: Array<Asset>;
    /**
     *
     * @type {DatumOption}
     * @memberof UtxoWithSlot
     */
    datum?: DatumOption | null;
    /**
     * UTxO transaction index
     * @type {number}
     * @memberof UtxoWithSlot
     */
    index: number;
    /**
     *
     * @type {Script}
     * @memberof UtxoWithSlot
     */
    reference_script?: Script | null;
    /**
     * Absolute slot of block which produced the UTxO
     * @type {number}
     * @memberof UtxoWithSlot
     */
    slot: number;
    /**
     * UTxO transaction hash
     * @type {string}
     * @memberof UtxoWithSlot
     */
    tx_hash: string;
    /**
     * Hex encoded transaction output CBOR bytes
     * @type {string}
     * @memberof UtxoWithSlot
     */
    txout_cbor?: string | null;
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
    major: number;
    /**
     *
     * @type {number}
     * @memberof Version
     */
    minor: number;
}
/**
 * Vesting states at a beneficiary address
 * @export
 * @interface VestingState
 */
export interface VestingState {
    /**
     * Asset policy token name of the asset to be locked
     * @type {string}
     * @memberof VestingState
     */
    asset_name: string;
    /**
     * Asset policy token symbol of the asset to be locked
     * @type {string}
     * @memberof VestingState
     */
    asset_symbol: string;
    /**
     * Remaning amount of the token left to vest
     * @type {number}
     * @memberof VestingState
     */
    remaining_vesting_quantity?: number;
    /**
     * Number of vesting installments used to collect vested assets
     * @type {number}
     * @memberof VestingState
     */
    total_installments: number;
    /**
     * Total amount of the asset that will be vested
     * @type {number}
     * @memberof VestingState
     */
    total_vesting_quantity: number;
    /**
     * Vesting period start in UNIX time (seconds)
     * @type {number}
     * @memberof VestingState
     */
    vesting_period_start: number;
    /**
     * Vesting period end in UNIX time (seconds)
     * @type {number}
     * @memberof VestingState
     */
    vesting_period_end: number;
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
    data: Datum;
    /**
     *
     * @type {Array<number>}
     * @memberof WdrlRedeemer
     */
    ex_units: Array<number>;
    /**
     *
     * @type {string}
     * @memberof WdrlRedeemer
     */
    stake_address: string;
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
    amount: number;
    /**
     *
     * @type {string}
     * @memberof Withdrawal
     */
    stake_address: string;
}
