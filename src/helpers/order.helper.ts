import { smallbucksMultiplier } from "../config/config";
import { orderInterface, userInterface } from "../interfaces";

export const getMaxTransactionFees = (orderType: orderInterface.IOrderType) => {
  const { type } = orderType;
  if (type === 'SIP') return 10;
  return 100;
}

export const getTransactionFees = (orderType: orderInterface.IOrderType, investAmount: number) => {
  const txFeesMaxLimit = getMaxTransactionFees(orderType);
  const txFees = investAmount * 0.015 < txFeesMaxLimit ? investAmount * 0.015 : txFeesMaxLimit;
  return txFees;
}

// This calculates cost breakdown for the new user
export const getOrderSummary = (userObj: userInterface.IUser, investAmount: number, useCoins: number, orderType: orderInterface.IOrderType, scid: string): orderInterface.IOrderSummary => {
  const { smallbucks, flags } = userObj;
  const { hasInvested } = flags;
  let discount = 0;
  let smallbucksRemaining;
  let smallbucksUsed = useCoins ? useCoins : 0;
  let smallbucksWorth = smallbucksUsed / smallbucksMultiplier;

  // useCoins value must be lower than what user holds
  if(smallbucksUsed > smallbucks) {
    throw new Error(`You can only use ${smallbucks} coins.`);
  }

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

  if (smallbucksWorth >= totalTransactionFees) {
    effectiveCost = investAmount;
    discount = discount + totalTransactionFees;
    smallbucksUsed = totalTransactionFees * smallbucksMultiplier;
    smallbucksRemaining = smallbucksWorth - smallbucksUsed;
  }
  else {
    effectiveCost = totalTransactionFees - smallbucksWorth;
    discount = discount + smallbucksWorth;
    smallbucksUsed = smallbucksWorth;
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