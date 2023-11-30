import { AssetsState } from "./features/assets/assetsSlice";

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

export const updateTotals = (state: AssetsState) => {
  state.eurUSDRate =
    state.stockPrices.find((val) => val.ticker === "EURUSD")?.price || -1;

  state.totals.USD =
    state.assets.reduce((sum, obj) => sum + (obj.totalPrice as number), 0) +
    state.fiatAssets.reduce((sum, obj) => sum + (obj.amount as number), 0);

  state.totals.EUR = state.totals.USD / state.eurUSDRate;

  (state.totals.BTC = state.assets.reduce(
    (sum, obj) =>
      obj.ticker.startsWith("BTC") // Need a better way to determine if asset is in fact BTC.
        ? sum + (obj.amount as number)
        : (sum = sum),
    0
  )),
    (state.totals.crypto = state.assets.reduce(
      (sum, obj) =>
        obj.type === "Crypto" ? sum + (obj.totalPrice as number) : (sum = sum),
      0
    ));
  state.totals.fiat = state.fiatAssets.reduce(
    // TODO: Convert different currencies to usd
    (sum, obj) => sum + (obj.amount as number),
    0
  );
  state.totals.stocks = state.assets.reduce(
    (sum, obj) =>
      obj.type === "Stock" ? sum + (obj.totalPrice as number) : (sum = sum),
    0
  );
};

export const getCryptoPrice = (state: AssetsState, ticker: string) => {
  return state.cryptoPrices.find((val) => val.symbol === ticker)?.price || -1;
};

export const getStockPrice = (state: AssetsState, ticker: string) => {
  return state.stockPrices.find((val) => val.ticker === ticker)?.price || -1;
};

export const getLastSnapshot = (state: AssetsState) => {
  return state.networthSnapshots[state.networthSnapshots.length - 1];
}