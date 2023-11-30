export const currencySymbol = "$";

export type Ticker = string;

export type Asset = {
  id: number;
  note: string;
  ticker: Ticker;
  type: "Crypto" | "Stock";
  amount: number;
  lastPrice: number;
  totalPrice: number,
  price: number;
};

export type fiatAsset = {
  id: number;
  note: string;
  amount: number;
  currency: string;
};

export type NetworthSnapshot = {
  id: number;
  dateTime: number;
  btcPrice: number;
  eurUSD: number;
  totalEUR: number;
  changeEUR: number;
  totalUSD: number;
  changeUSD: number;
  totalBTC: number;
  note: string;
};
