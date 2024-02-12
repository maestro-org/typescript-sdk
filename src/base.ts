/* eslint-disable max-classes-per-file */
import type { AxiosRequestConfig } from 'axios';
import type { Configuration } from './configuration';

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
    constructor(protected configuration: Configuration) {}
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    constructor(public field: string, msg?: string) {
        super(msg);
        this.name = 'RequiredError';
    }
}
