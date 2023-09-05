export type MaestroSupportedNetworks = "Mainnet" | "Preprod" | "Preview";

export interface ConfigurationParameters {
  apiKey: string;
  network: MaestroSupportedNetworks;
  baseOptions?: any;
}

export class Configuration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey: string;
  /**
   * base url of network request
   *
   * @type {string}
   * @memberof Configuration
   */
  baseUrl: string;
  /**
    * base options for axios calls
    *
    * @type {any}
    * @memberof Configuration
    */
  baseOptions?: any;

  constructor(param: ConfigurationParameters) {
    this.apiKey = param.apiKey;
    this.baseUrl = `https://${param.network}.gomaestro-api.org/v1`;
    this.baseOptions = param.baseOptions
  }

  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  }
}
