
// TODO: use expected return type
// export const decodeAuthToken = (token: string): any => jwt.decode(token);

import { IOrderType } from "../interfaces/IOrder";

export const getMaxTransactionFees = (orderType: IOrderType) => {
  const { type } = orderType;
  if (type === 'SIP') return 10;
  return 100;
}

export const getTransactionFees = (orderType: IOrderType, investAmount: number) => {
  const txFeesMaxLimit = getMaxTransactionFees(orderType);
  const txFees = investAmount * 0.015 < txFeesMaxLimit ? investAmount * 0.015 : txFeesMaxLimit;
  return txFees;
}