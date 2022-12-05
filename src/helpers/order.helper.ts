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
  let smallbucksUsed = useCoins || 0;
  let smallbucksWorth = smallbucksUsed / smallbucksMultiplier;

  // useCoins value must be lower than what user holds
  if (smallbucksUsed > smallbucks) {
    throw new Error(`You can only use ${smallbucks} coins.`);
  }

  // Tx fees
  let txFees = getTransactionFees(orderType, investAmount);
  let gstFees = txFees * 0.18;

  let totalTransactionFees = txFees + gstFees;

  // If first order, give smallbucks worth gstFee and waiver off txFees
  let smallbucksUnitsAsGift = 0;
  if (!hasInvested) {
    smallbucksUnitsAsGift = Math.ceil(gstFees) * smallbucksMultiplier;
    discount = txFees;
    txFees = 0;
  }

  // Total money to be deducted (including investAmount)
  let totalCost = investAmount + totalTransactionFees;
  let effectiveCost = totalCost;

  if (smallbucksWorth >= txFees) {
    discount = txFees;
    smallbucksUsed = discount * smallbucksMultiplier;
  }
  else {
    discount = hasInvested ? smallbucksWorth : txFees;
    smallbucksUsed = discount * smallbucksMultiplier
    if(!hasInvested){
      smallbucksUsed = 0;
    }
  }
  
  smallbucksRemaining = Math.max(0, smallbucks - smallbucksUsed);
  effectiveCost -= discount;

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