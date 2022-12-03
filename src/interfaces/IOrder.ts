export interface IOrderSummary {
  totalCost: number;
  effectiveCost: number;
  discount: number;
  smallbucksUsed: number;
  smallbucksRemaining: number;
  scid: string;
  useCoins: boolean;
  totalTransactionFees: number;
  investAmount: number;
  smallbucksEarned: number;
}

export interface IOrderType {
  type: 'SIP' | 'BUY' | 'INVESTMORE'
}