export interface IOrderSummary {
  totalCost: number;
  effectiveCost: number;
  discount: number;
  smallbucksUsed: number;
  smallbucksRemaining: number;
}

export interface IOrderType {
  type: 'SIP' | 'BUY' | 'INVESTMORE'
}