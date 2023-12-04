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

  const totalUSD =
    state.assets.reduce(
      (sum, obj) =>
        sum + (convertCurrency(state, obj.currency, obj.totalPrice) as number),
      0
    ) +
    state.fiatAssets.reduce(
      (sum, obj) =>
        sum + (convertCurrency(state, obj.currency, obj.amount) as number),
      0
    );

  state.totals = {
    // USD
    USD: totalUSD,

    // EUR
    EUR: totalUSD / state.eurUSDRate,

    // BTC
    BTC: state.assets.reduce(
      (sum, obj) =>
        obj.ticker.startsWith("BTC") // Need a better way to determine if asset is in fact BTC.
          ? sum + (obj.amount as number)
          : (sum = sum),
      0
    ),

    // Crypto
    crypto: state.assets.reduce(
      (sum, obj) =>
        obj.type === "Crypto"
          ? sum +
            (convertCurrency(state, obj.currency, obj.totalPrice) as number)
          : (sum = sum),
      0
    ),

    // Fiat
    fiat: state.fiatAssets.reduce(
      (sum, obj) =>
        sum + (convertCurrency(state, obj.currency, obj.amount) as number),
      0
    ),

    // Stocks
    stocks: state.assets.reduce(
      (sum, obj) =>
        obj.type === "Stock"
          ? sum +
            (convertCurrency(state, obj.currency, obj.totalPrice) as number)
          : (sum = sum),
      0
    ),
  };
};

export const convertCurrency = (
  // TODO: Check if its possible to support more currencies
  state: AssetsState,
  currency: string,
  value: number
) => {
  if (currency === "USD") return value;

  const rate =
    state.stockPrices.find((val) => val.ticker === `${currency}USD`)?.price ||
    -1;

  if (rate === -1) return value;

  return value * rate;
};

export const getCryptoPrice = (state: AssetsState, ticker: string) => {
  return state.cryptoPrices.find((val) => val.symbol === ticker)?.price || -1;
};

export const getStockPrice = (state: AssetsState, ticker: string) => {
  return state.stockPrices.find((val) => val.ticker === ticker)?.price || -1;
};

export const getLastSnapshot = (state: AssetsState) => {
  return state.networthSnapshots[state.networthSnapshots.length - 1] ?? [];
};
export const formatTotalCurrency = (inputNum: number) => {
  const absNum = Math.abs(inputNum);

  if (absNum >= 1000000) {
    return (
      (inputNum >= 0 ? absNum / 1000000 : -absNum / 1000000).toFixed(3) + "M"
    );
  } else if (absNum >= 1000) {
    return (inputNum >= 0 ? absNum / 1000 : -absNum / 1000).toFixed(2) + "K";
  } else {
    return inputNum.toFixed().toString();
  }
};

export const matchAssetPrices = (
  state: AssetsState,
  type: "Crypto" | "Stock" | "All"
) => {
  state.assets = state.assets.map((asset) => {
    const price =
      asset.type === "Crypto"
        ? getCryptoPrice(state, asset.ticker)
        : getStockPrice(state, asset.ticker);

    if (type === "All" ? true : asset.type == type) {
      return {
        ...asset,
        lastPrice:
          getLastSnapshot(state).lastAssetPrices?.find(
            (val) => val.ticker === asset.ticker
          )?.lastPrice || 0,
        price: price,
        change: price - asset.lastPrice,
        totalPrice: price * asset.amount,
      };
    } else return asset;
  });
  updateTotals(state);
};
