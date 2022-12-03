import { getTransactionFees } from "../helpers/order.helper";
import { IOrderSummary, IOrderType } from "../interfaces/IOrder";
import { IUser } from "../interfaces/IUser";
import { Users } from "../models";

export const getUserById = (_id: string, projection = {}) => {
  return Users.findOne({ _id }, projection).lean().exec();
};

export const getOrderSummary = (userObj: IUser, investAmount: number, useCoins: boolean, orderType: IOrderType, scid: string): IOrderSummary => {
  const { flags, smallbucks } = userObj;
  const { hasInvested } = flags;

  // Tx fees
  let txFees = getTransactionFees(orderType, investAmount);
  let discount = 0;
  let smallbucksRemaining;
  let smallbucksUsed;

  if (!hasInvested) {
    txFees = txFees * 0.5;
  }
  
  // Calculate final tx fees; total cost = effective tx fees + 18% GST
  txFees = txFees + txFees * 0.18;

  // Total money to be deducted (including investAmount)
  let totalCost = investAmount + txFees;
  let effectiveCost = totalCost;
  let smallbucksWorth = 0;

  if (useCoins) {
    smallbucksWorth = smallbucks * 0.1;
  }
  if (smallbucksWorth >= totalCost) {
    effectiveCost = 0;
    discount = totalCost;
    smallbucksUsed = totalCost * 10;
    smallbucksRemaining = smallbucks - smallbucksUsed;
  }
  else {
    effectiveCost = totalCost - smallbucksWorth;
    discount = smallbucksWorth;
    smallbucksUsed = smallbucks;
    smallbucksRemaining = 0;
  }

  const orderSummary = {
    totalCost,
    effectiveCost,
    discount,
    smallbucksUsed,
    smallbucksRemaining,
    useCoins,
  }

  return orderSummary;
}