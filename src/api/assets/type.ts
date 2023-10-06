/**
 * @export
 */
export const AssetTxsOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type AssetTxsOrderEnum = (typeof AssetTxsOrderEnum)[keyof typeof AssetTxsOrderEnum];
/**
 * @export
 */
export const AssetUpdatesOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type AssetUpdatesOrderEnum = (typeof AssetUpdatesOrderEnum)[keyof typeof AssetUpdatesOrderEnum];
/**
 * @export
 */
export const AssetUtxosOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type AssetUtxosOrderEnum = (typeof AssetUtxosOrderEnum)[keyof typeof AssetUtxosOrderEnum];
/**
 * @export
 */
export const PolicyTxsOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type PolicyTxsOrderEnum = (typeof PolicyTxsOrderEnum)[keyof typeof PolicyTxsOrderEnum];
/**
 * @export
 */
export const PolicyUtxosOrderEnum = {
    Asc: 'asc',
    Desc: 'desc',
} as const;
export type PolicyUtxosOrderEnum = (typeof PolicyUtxosOrderEnum)[keyof typeof PolicyUtxosOrderEnum];
