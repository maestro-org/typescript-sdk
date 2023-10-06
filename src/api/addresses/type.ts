/**
 * @export
 */
export const TxsByAddressOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type TxsByAddressOrderEnum = (typeof TxsByAddressOrderEnum)[keyof typeof TxsByAddressOrderEnum];
/**
 * @export
 */
export const TxsByPaymentCredOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type TxsByPaymentCredOrderEnum = (typeof TxsByPaymentCredOrderEnum)[keyof typeof TxsByPaymentCredOrderEnum];
/**
 * @export
 */
export const UtxoRefsAtAddressOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type UtxoRefsAtAddressOrderEnum = (typeof UtxoRefsAtAddressOrderEnum)[keyof typeof UtxoRefsAtAddressOrderEnum];
/**
 * @export
 */
export const UtxosByAddressOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type UtxosByAddressOrderEnum = (typeof UtxosByAddressOrderEnum)[keyof typeof UtxosByAddressOrderEnum];
/**
 * @export
 */
export const UtxosByPaymentCredOrderEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;
export type UtxosByPaymentCredOrderEnum =
  (typeof UtxosByPaymentCredOrderEnum)[keyof typeof UtxosByPaymentCredOrderEnum];
