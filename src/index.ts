import { AccountsApi, AddressesApi, AssetsApi, BlocksApi, DatumApi, EcosystemApi, EpochsApi, GeneralApi, PoolsApi, ScriptsApi, TransactionManagerApi, TransactionsApi, VestingApi } from "./api";
import { Configuration } from "./configuration";

export * from "./api";
export * from "./configuration";

export class MaestroClient {
  accounts: AccountsApi
  addresses: AddressesApi
  assets: AssetsApi
  blocks: BlocksApi
  datum: DatumApi
  ecosystem: EcosystemApi
  epochs: EpochsApi
  general: GeneralApi
  pools: PoolsApi
  scripts: ScriptsApi
  transactions: TransactionsApi
  txManager: TransactionManagerApi
  vesting: VestingApi
  constructor(config: Configuration) {
    this.accounts = new AccountsApi(config);
    this.addresses = new AddressesApi(config);
    this.assets = new AssetsApi(config);
    this.blocks = new BlocksApi(config);
    this.datum = new DatumApi(config);
    this.ecosystem = new EcosystemApi(config);
    this.epochs = new EpochsApi(config);
    this.general = new GeneralApi(config);
    this.pools = new PoolsApi(config);
    this.scripts = new ScriptsApi(config);
    this.transactions = new TransactionsApi(config);
    this.txManager = new TransactionManagerApi(config);
    this.vesting = new VestingApi(config);
  }
}
