import { smallbucksMultiplier } from "../config/config";
import { IOrderSummary, IOrderType } from "../interfaces/IOrder";
import { IUser } from "../interfaces/IUser";

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

// This calculates cost breakdown for the new user
export const getOrderSummary = (userObj: IUser, investAmount: number, useCoins: boolean, orderType: IOrderType, scid: string): IOrderSummary => {
  const { smallbucks, flags } = userObj;
  const { hasInvested } = flags;
  let discount = 0;
  let smallbucksRemaining;
  let smallbucksUsed;
  
  // Tx fees
  let txFees = getTransactionFees(orderType, investAmount);
  let gstFees = txFees * 0.18;

  // If first order, give smallbucks worth gstFee and waiver off txFees
  let smallbucksUnitsAsGift = 0;
  if (!hasInvested) {
    smallbucksUnitsAsGift = Math.ceil(gstFees) * smallbucksMultiplier;
    discount = txFees;
    txFees = 0;
  }
  const totalTransactionFees = txFees + gstFees;

  // Total money to be deducted (including investAmount)
  let totalCost = investAmount + totalTransactionFees;
  let effectiveCost = totalCost;
  let smallbucksWorth = 0;

  if (useCoins) {
    smallbucksWorth = smallbucks / smallbucksMultiplier;
  }
  if (smallbucksWorth >= totalCost) {
    effectiveCost = 0;
    discount = discount + totalCost;
    smallbucksUsed = totalCost * smallbucksMultiplier;
    smallbucksRemaining = smallbucks - smallbucksUsed;
  }
  else {
    effectiveCost = totalCost - smallbucksWorth;
    discount = discount + smallbucksWorth;
    smallbucksUsed = smallbucks;
    smallbucksRemaining = 0;
  }

  const orderSummary = {
    investAmount,
    totalTransactionFees,
    totalCost,
    effectiveCost,
    discount,
    smallbucksUsed,
    smallbucksRemaining,
    useCoins,
    scid,
    smallbucksEarned: smallbucksUnitsAsGift,
  }

  return orderSummary;
}