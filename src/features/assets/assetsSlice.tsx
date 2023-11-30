import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Asset, NetworthSnapshot, fiatAsset } from "../../constants";
import { fetchCryptoPrices, fetchStockPrices } from "./thunks";
import {
  getCryptoPrice,
  getLastSnapshot,
  getStockPrice,
  updateTotals,
} from "../../util";

export type AssetsState = {
  assets: Asset[];
  fiatAssets: fiatAsset[];
  networthSnapshots: NetworthSnapshot[];

  cryptoPrices: CryptoPrice[];
  stockPrices: StockPrice[];

  fetching: boolean;
  error: string;

  totals: {
    USD: number;
    EUR: number;
    BTC: number;

    stocks: number;
    crypto: number;
    fiat: number;
  };

  eurUSDRate: number;
};

type CryptoPrice = {
  symbol: string;
  price: number;
};

type StockPrice = {
  ticker: string;
  price: number;
};

const initialState: AssetsState = {
  assets: [
    {
      id: 1,
      note: "Bitcoin Investment",
      ticker: "BTCUSDT",
      type: "Crypto",
      currency:"USD",
      amount: 1,
      lastPrice: 1,
      totalPrice: 0,
      price: 12,
    },
    {
      id: 3,
      note: "Bitcoin Investment",
      ticker: "VWCE:FRA:EUR",
      type: "Stock",
      currency:"EUR",
      amount: 885,
      lastPrice: 1,
      totalPrice: 0,
      price: 12,
    },
  ],
  fiatAssets: [
    { id: 1, note: "Lorem ipsum", amount: 1000, currency: "USD" },
    { id: 2, note: "Dolor sit amet", amount: 750, currency: "EUR" },
  ],
  networthSnapshots: [
    {
      id: 1,
      dateTime: 53245623634,
      btcPrice: 589452,
      eurUSD: 1.09,
      totalEUR: 12956165,
      changeEUR: 1503,
      totalUSD: 14113125.85,
      changeUSD: -1503,
      totalBTC: 15.353456454,
      note: "Bought a space ship",

      lastAssetPrices: [],
    },
  ],

  cryptoPrices: [],
  stockPrices: [],

  fetching: false,
  error: "",

  totals: {
    USD: 0,
    EUR: 0,
    BTC: 0,
    stocks: 0,
    crypto: 0,
    fiat: 0,
  },

  eurUSDRate: 0,
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addSnapshot: (state) => {
      const btcPrice = (state.cryptoPrices.find(
        (val) => val.symbol === "BTCUSDT"
      )?.price || -1) as number;

      state.networthSnapshots = [
        ...state.networthSnapshots,
        {
          id: state.networthSnapshots.length + 1,
          dateTime: Date.now(),
          btcPrice: btcPrice.toFixed(0) || -1,
          eurUSD: state.eurUSDRate,
          totalEUR: state.totals.EUR,
          changeEUR: state.totals.EUR - getLastSnapshot(state).totalEUR,
          totalUSD: state.totals.USD,
          changeUSD: state.totals.USD - getLastSnapshot(state).totalUSD,
          totalBTC: state.totals.BTC,
          note: state.networthSnapshots.length + "",

          lastAssetPrices: state.assets.map((asset) => ({
            ticker: asset.ticker,
            lastPrice: asset.price,
          })),
        } as NetworthSnapshot,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoPrices.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(
      fetchCryptoPrices.fulfilled,
      (state, action: PayloadAction<CryptoPrice[]>) => {
        state.cryptoPrices = action.payload.map((pair) => {
          // Binance api returns number as a string for some reason, so parsing the price to a number.
          return {
            ...pair,
            price: parseFloat(String(pair.price)),
          };
        });

        state.fetching = false;
        state.error = "";

        state.assets = state.assets.map((asset) => {
          const price = getCryptoPrice(state, asset.ticker);

          if (asset.type === "Crypto") {
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
      }
    );
    builder.addCase(fetchCryptoPrices.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(fetchStockPrices.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(
      fetchStockPrices.fulfilled,
      (state, action: PayloadAction<StockPrice[]>) => {
        state.stockPrices = action.payload;
        state.fetching = false;
        state.error = "";

        state.assets = state.assets.map((asset) => {
          const price = getStockPrice(state, asset.ticker);

          if (asset.type === "Stock") {
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
      }
    );
    builder.addCase(fetchStockPrices.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { addSnapshot } = assetsSlice.actions;
export default assetsSlice.reducer;
