import { AxiosRequestConfig } from "axios";
import { BaseAPI } from "../../base";
import { EpochsApiFp } from "./helpers";

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
    return EpochsApiFp(this.configuration)
      .currentEpoch(options)
      .then((request) => request(this.axios));
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
    return EpochsApiFp(this.configuration)
      .epochInfo(epochNo, options)
      .then((request) => request(this.axios));
  }
}
