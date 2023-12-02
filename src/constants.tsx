export const currencySymbol = "$";

export const availableCurrencies = ["USD", "EUR"]; // TODO: make dynamic

export const currencySymbols = {
  USD: "$",
  EUR: "€",
};

export type Ticker = string;

export type Asset = {
  id: number;
  note: string;
  ticker: Ticker;
  type: "Crypto" | "Stock";
  currency: keyof typeof currencySymbols;
  amount: number;
  lastPrice: number;
  totalPrice: number;
  price: number;
};

export type fiatAsset = {
  id: number;
  note: string;
  amount: number;
  currency: keyof typeof currencySymbols;
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
