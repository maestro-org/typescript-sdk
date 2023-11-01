import type { AxiosResponse } from 'axios';
import type { Configuration } from './configuration';
import type { RequestArgs } from './base';
import { RequiredError } from './base';

/**
 *
 * @export
 */
export const DUMMY_BASE_URL = 'https://example.com';

/**
 *
 * @throws {RequiredError}
 * @export
 */
export const assertParamExists = function (functionName: string, paramName: string, paramValue: unknown) {
    if (paramValue === null || paramValue === undefined) {
        throw new RequiredError(
            paramName,
            `Required parameter ${paramName} was null or undefined when calling ${functionName}.`,
        );
    }
};

/**
 *
 * @export
 */
export const setApiKeyToObject = function (object: any, keyParamName: string, configuration: Configuration) {
    object[keyParamName] = configuration.apiKey;
};

function setFlattenedQueryParams(urlSearchParams: URLSearchParams, parameter: any, key: string = ''): void {
    if (parameter == null) return;
    if (typeof parameter === 'object') {
        if (Array.isArray(parameter)) {
            (parameter as any[]).forEach((item) => setFlattenedQueryParams(urlSearchParams, item, key));
        } else {
            Object.keys(parameter).forEach((currentKey) =>
                setFlattenedQueryParams(
                    urlSearchParams,
                    parameter[currentKey],
                    `${key}${key !== '' ? '.' : ''}${currentKey}`,
                ),
            );
        }
    } else if (urlSearchParams.has(key)) {
        urlSearchParams.append(key, parameter);
    } else {
        urlSearchParams.set(key, parameter);
    }
}

/**
 *
 * @export
 */
export const setSearchParams = function (url: URL, ...objects: any[]) {
    const searchParams = new URLSearchParams(url.search);
    setFlattenedQueryParams(searchParams, objects);
    url.search = searchParams.toString();
};

/**
 *
 * @export
 */
export const serializeDataIfNeeded = function (value: any, requestOptions: any, configuration?: Configuration) {
    const nonString = typeof value !== 'string';
    const needsSerialization =
        nonString && configuration && configuration.isJsonMime
            ? configuration.isJsonMime(requestOptions.headers['Content-Type'])
            : nonString;
    return needsSerialization ? JSON.stringify(value !== undefined ? value : {}) : value || '';
};

/**
 *
 * @export
 */
export const toPathString = function (url: URL) {
    return url.pathname + url.search + url.hash;
};

/**
 *
 * @export
 */
export const createRequestFunction = function (axiosArgs: RequestArgs, configuration: Configuration) {
    return <T = unknown, R = AxiosResponse<T>>() => {
        const axiosRequestArgs = { ...axiosArgs.options, url: configuration.baseUrl + axiosArgs.url };
        return configuration.axiosInstance.request<T, R>(axiosRequestArgs);
    };
};
