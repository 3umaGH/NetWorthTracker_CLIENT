export const currencySymbol = "$";

export const pregeneratedKey = "564bhBF324S653SDF"; // Not secure TODO: make secure

export const encryptionPasswordProps = {
  maxLength: 100,
  minLength: 4,
}

export const currencySymbols = {
  EUR: "€",
  USD: "$",
  JPY: "¥",
  GBP: "£",
  AUD: "A$",
  CAD: "CA$",
  CHF: "CHF",
  HKD: "HK$",
  NZD: "NZ$",
  CNY: "CN¥",
  SEK: "kr",
  MXN: "MX$",
  SGD: "S$",
  NOK: "kr",
  KRW: "₩",
  TRY: "₺",
  INR: "₹",
  RUB: "₽",
  BRL: "R$",
  ZAR: "R",
  DKK: "kr",
  THB: "฿",
};

export const currencySymbolBackPosition = [
  // List of currencies that usually have their symbol at the back of the number
  "CAD",
  "CHF",
  "CNY",
  "MXN",
  "KRW",
  "TRY",
  "INR",
  "RUB",
  "THB",
  "NOK",
  "DKK",
  "EUR",
  "SEK",
];

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
  secondaryISO_4217: string;
  secondaryRate: number;
  totalSecondary: number;
  changeSecondary: number;
  totalUSD: number;
  changeUSD: number;
  totalBTC: number;
  note: string;

  lastAssetPrices: { ticker: string; lastPrice: number }[];
};
