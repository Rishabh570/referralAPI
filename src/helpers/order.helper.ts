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
  const { smallbucks, flags, referralCode } = userObj;
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

  // If first order, give smallbucks worth gstFee and waiver off txFees
  let smallbucksUnitsAsGift = 0;
  if (!hasInvested) {
    smallbucksUnitsAsGift = Math.ceil(gstFees) * smallbucksMultiplier;
    discount = txFees;
    txFees = 0;
  }

  let totalTransactionFees = txFees + gstFees;

  // Total money to be deducted (including investAmount)
  let totalCost = investAmount + totalTransactionFees;
  let effectiveCost = totalCost;

  // 1. old user > +ve smallbucksWorth & +ve txFees
  // 2. old user > smallbucksWorth = 0 & +ve txFees
  // 3. new user > smallbucksWorth = 0 & txFees = 0

  if (hasInvested) {
    if (smallbucksWorth >= txFees) {
      // old user has +ve smallbucksWorth
      discount = txFees;
      smallbucksUsed = txFees * smallbucksMultiplier;
      smallbucksRemaining = smallbucks - smallbucksUsed;
    }
    else {
      // old use doesn't have enough smallbucksWorth
      discount = smallbucksWorth;
      smallbucksRemaining = smallbucks - smallbucksUsed; 
    }
  }
  else {
    // new user, both smallbucksWorth and txFees are zero
    smallbucksUsed = 0;
    smallbucksRemaining = 0;
  }

  effectiveCost = effectiveCost - discount;

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