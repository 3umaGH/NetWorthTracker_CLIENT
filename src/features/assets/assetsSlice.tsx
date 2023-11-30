import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Asset, NetworthSnapshot, fiatAsset } from "../../constants";
import { fetchCryptoPrices, fetchStockPrices } from "./thunks";

type AssetsState = {
  assets: Asset[];
  fiatAssets: fiatAsset[];
  networthSnapshots: NetworthSnapshot[];

  cryptoPrices: CryptoPrice[];
  stockPrices: StockPrice[];

  fetching: boolean;
  error: string;
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
      amount: 1,
      lastPrice: 1,
      totalPrice: 0,
      price: 12,
    },
    {
      id: 2,
      note: "Bitcoin Investment",
      ticker: "ETHUSDT",
      type: "Crypto",
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
      amount: 1,
      lastPrice: 1,
      totalPrice: 0,
      price: 12,
    },
  ],
  fiatAssets: [
    { id: 1, note: "Lorem ipsum", amount: 1000, currency: "USD" },
    { id: 2, note: "Dolor sit amet", amount: 750, currency: "EUR" },
    { id: 3, note: "Consectetur adipiscing", amount: 1200, currency: "GBP" },
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
    },
    {
      id: 2,
      dateTime: 2135132456234,
      btcPrice: 45000,
      eurUSD: 1.12,
      totalEUR: 12956165,
      changeEUR: -1503,
      totalUSD: 14524262.5,
      changeUSD: 1503,
      totalBTC: 23.801,
      note: "Investment portfolio",
    },
  ],

  cryptoPrices: [],
  stockPrices: [],

  fetching: false,
  error: "",
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoPrices.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(
      fetchCryptoPrices.fulfilled,
      (state, action: PayloadAction<CryptoPrice[]>) => {
        state.cryptoPrices = action.payload;
        state.fetching = false;
        state.error = "";

        state.assets = state.assets.map((asset) => {
          const price =
            state.cryptoPrices.find((val) => val.symbol === asset.ticker)
              ?.price || -1;

          if (asset.type === "Crypto") {
            return {
              ...asset,
              lastPrice: asset.price,
              price: price,
              change: price - asset.lastPrice,
              totalPrice: price * asset.amount,
            };
          } else return asset;
        });
      }
    );
    builder.addCase(fetchCryptoPrices.rejected, (state, action) => {
      state.cryptoPrices = [];
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
          const price =
            state.stockPrices.find((val) => val.ticker === asset.ticker)
              ?.price || -1;

          if (asset.type === "Stock") {
            return {
              ...asset,
              lastPrice: asset.price,
              price: price,
              change: price - asset.lastPrice,
              totalPrice: price * asset.amount,
            };
          } else return asset;
        });
      }
    );
    builder.addCase(fetchStockPrices.rejected, (state, action) => {
      state.stockPrices = [];
      state.fetching = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { addSnapshot } = assetsSlice.actions;
export default assetsSlice.reducer;
