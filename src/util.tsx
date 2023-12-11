import { currencySymbolBackPosition, currencySymbols } from "./constants";
import { AssetsState } from "./features/assets/assetsSlice";
import { PricesState } from "./features/prices/pricesSlice";

export const formatCurrency = (
  inputNum: number,
  currency: string,
  digits = 0
) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(inputNum);
};

export const formatBTC = (inputNum: number, digits = 5) => {
  return `${inputNum.toFixed(digits)} ₿`;
};

export const formatTimeMillis = (inputNum: number) => {
  const fullDate = new Date(inputNum);

  return `${fullDate.getFullYear()}/${
    fullDate.getMonth() + 1
  }/${fullDate.getDate()}`;
};

export const convertCurrency = (
  type: "to" | "from" = "to",
  state: PricesState,
  currency: string,
  value: number
) => {
  if (currency === "USD") return value;

  const rate =
    state.currencyRates.find((val) => val.ticker === currency)?.price || -1;

  if (rate === -1) return value;

  const val = type === "to" ? value * rate : value / rate;

  return val;
};

export const getCryptoPrice = (state: PricesState, ticker: string) => {
  return state.cryptoPrices.find((val) => val.symbol === ticker)?.price || -1;
};

export const getStockPrice = (state: PricesState, ticker: string) => {
  return state.stockPrices.find((val) => val.ticker === ticker)?.price || -1;
};

export const getCurrencyRate = (state: PricesState, currency: string) => {
  return (
    state.currencyRates.find((val) => val.ticker === currency)?.price || -1
  );
};

export const getStockCurrency = (state: PricesState, ticker: string) => {
  return (
    state.stockPrices.find((val) => val.ticker === ticker)?.currency || "USD"
  );
};

export const getCurrencySymbol = (currencyCode: string) => {
  const upperCaseCurrencyCode = currencyCode.toUpperCase();

  if (currencySymbols.hasOwnProperty(upperCaseCurrencyCode))
    return currencySymbols[
      upperCaseCurrencyCode as keyof typeof currencySymbols
    ];
  else return "";
};

export const formatTotalCurrency = (
  inputNum: number,
  currency: keyof typeof currencySymbols,
  maxDecimals: number = 3
) => {
  const absNum = Math.abs(inputNum);

  let suffix = "";
  let number;

  if (absNum >= 1000000) {
    number = (inputNum >= 0 ? absNum / 1000000 : -absNum / 1000000).toFixed(3);
    suffix = "M";
  } else if (absNum >= 1000) {
    number = (inputNum >= 0 ? absNum / 1000 : -absNum / 1000).toFixed(2);
    suffix = "K";
  } else {
    number = inputNum.toFixed(maxDecimals).toString();
  }

  return currencySymbolBackPosition.includes(currency)
    ? `${number}${suffix} ${currencySymbols[currency]}`
    : `${currencySymbols[currency]}${number}${suffix}`;
};

export const getLastSnapshot = (state: AssetsState) => {
  return state.networthSnapshots[state.networthSnapshots.length - 1] ?? [];
};

export const calculateNextID = (array: any[]) => {
  return array.length > 0 ? array[array.length - 1].id + 1 : 0;
};

export const combineAssets = (
  data: {
    ticker: string;
    total: number;
    amount: number;
    currency: string;
  }[]
) => {
  const resultMap = data.reduce((result, item) => {
    const { ticker, total, amount, currency } = item;

    if (result.has(ticker)) {
      result.set(ticker, {
        total: result.get(ticker).total + total,
        amount: result.get(ticker).amount + amount,
        currency: currency,
      });
    } else {
      result.set(ticker, { ticker, total, amount, currency });
    }

    return result;
  }, new Map());

  const resultArray = Array.from(
    resultMap,
    ([ticker, { total, amount, currency }]) => ({
      ticker,
      total,
      amount,
      currency: currency ?? "USD", // For older snapshot versions
    })
  );

  return resultArray;
};
