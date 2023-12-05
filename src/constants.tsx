export const currencySymbol = "$";

export const pregeneratedKey = "564bhBF324S653SDF" // Not secure TODO: make secure

export type Ticker = string;

export type Asset = {
  id: number;
  note: string;
  ticker: Ticker;
  type: "Crypto" | "Stock";
  currency: string;
  amount: number;
  lastPrice: number;
  totalPrice: number;
  price: number;
};

export type FiatAsset = {
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

  lastAssetPrices: { ticker: string; lastPrice: number }[];
};
