import type { Configuration } from './configuration';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
  url: string;
  options: AxiosRequestConfig;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {

  constructor(protected configuration: Configuration, protected axios: AxiosInstance = globalAxios) {
  }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  constructor(public field: string, msg?: string) {
    super(msg);
    this.name = "RequiredError"
  }
}
