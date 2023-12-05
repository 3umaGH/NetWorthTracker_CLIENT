// Redux Toolkit related imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Constants related imports
import { Asset, FiatAsset, NetworthSnapshot } from "../../constants";

// Thunks related imports
import { fetchCryptoPrices, fetchStockPrices, fetchUserData } from "./thunks";

// Utility functions related imports
import {
  getCryptoPrice,
  getLastSnapshot,
  getStockPrice,
  matchAssetPrices,
  updateTotals,
} from "../../util";

export type AssetsState = {
  assets: Asset[];
  fiatAssets: FiatAsset[];
  networthSnapshots: NetworthSnapshot[];

  cryptoPrices: CryptoPrice[];
  stockPrices: StockPrice[];
  currencyRates: CurrencyRate[];

  fetchingPrices: boolean;
  loadingAssets: boolean;

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

type CurrencyRate = {
  ticker: string;
  price: number;
}

type StockPrice = {
  ticker: string;
  type: string;
  currency: string;
  price: number;
};

const initialState: AssetsState = {
  assets: [],
  fiatAssets: [],
  networthSnapshots: [],

  cryptoPrices: [],
  stockPrices: [],
  currencyRates: [],

  fetchingPrices: false,
  loadingAssets: false,
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
          changeEUR: state.totals.EUR - (getLastSnapshot(state).totalEUR ?? 0),
          totalUSD: state.totals.USD,
          changeUSD: state.totals.USD - (getLastSnapshot(state).totalUSD ?? 0),
          totalBTC: state.totals.BTC,
          note: "",

          lastAssetPrices: state.assets.map((asset) => ({
            ticker: asset.ticker,
            lastPrice: asset.price,
          })),
        } as NetworthSnapshot,
      ];
    },

    deleteSnapshot: (state, action) => {
      state.networthSnapshots = state.networthSnapshots.filter(
        (snapshot) => snapshot.id !== action.payload.id
      );
    },

    updateSnapshot: (state, action) => {
      state.networthSnapshots = state.networthSnapshots.map((snapshot) =>
        snapshot.id === action.payload.id
          ? { ...snapshot, ...action.payload }
          : snapshot
      );
    },

    addFiatAsset: (state, action: PayloadAction<FiatAsset>) => {
      const id =
        state.fiatAssets.length > 0
          ? state.fiatAssets[state.fiatAssets.length - 1].id + 1
          : 0;

      state.fiatAssets = [...state.fiatAssets, { ...action.payload, id: id }];

      updateTotals(state);
    },

    deleteFiatAsset: (state, action) => {
      state.fiatAssets = state.fiatAssets.filter(
        (asset) => asset.id !== action.payload.id
      );
      updateTotals(state);
    },

    updateFiatAsset: (state, action) => {
      state.fiatAssets = state.fiatAssets.map((asset) =>
        asset.id === action.payload.id ? { ...asset, ...action.payload } : asset
      );

      updateTotals(state);
    },

    addAsset: (state, action: PayloadAction<Asset>) => {
      const id =
        state.assets.length > 0
          ? state.assets[state.assets.length - 1].id + 1
          : 0;
      const price =
        action.payload.type === "Crypto"
          ? getCryptoPrice(state, action.payload.ticker)
          : getStockPrice(state, action.payload.ticker);

      state.assets = [
        ...state.assets,
        {
          ...action.payload,
          id: id,
          price: price,
          totalPrice: price * action.payload.amount,
        },
      ];

      matchAssetPrices(state, "All");
    },

    deleteAsset: (state, action) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload.id
      );
      updateTotals(state);
    },

    updateAsset: (state, action) => {
      state.assets = state.assets.map((asset) =>
        asset.id === action.payload.id
          ? {
              ...asset,
              ...action.payload,
              totalPrice: action.payload.price * action.payload.amount,
            }
          : asset
      );

      updateTotals(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoPrices.pending, (state) => {
      state.fetchingPrices = true;
    });
    builder.addCase(
      fetchCryptoPrices.fulfilled,
      (state, action: PayloadAction<CryptoPrice[]>) => {
        state.cryptoPrices = action.payload.map((pair) => {
          return {
            ...pair,
            price: parseFloat(String(pair.price)),
          };
        });

        state.fetchingPrices = false;
        state.error = "";

        matchAssetPrices(state, "Crypto");
      }
    );
    builder.addCase(fetchCryptoPrices.rejected, (state, action) => {
      state.fetchingPrices = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(fetchStockPrices.pending, (state) => {
      state.fetchingPrices = true;
    });
    builder.addCase(
      fetchStockPrices.fulfilled,
      (state, action: PayloadAction<StockPrice[]>) => {
        state.stockPrices = action.payload.filter((ticker) => ticker.type == "stock");

        state.currencyRates = action.payload
        .filter((ticker) => ticker.type === "currency")
        .map((ticker) => ({
          ...ticker,
          ticker: ticker.ticker.replace("USD", "") // remove USD part from the currency pair
        }));

        state.currencyRates = [
          ...state.currencyRates,
          {
            ticker: "USD",
            price: 1.00,
          }
        ];
        
        state.fetchingPrices = false;
        state.error = "";

        matchAssetPrices(state, "Stock");
      }
    );
    builder.addCase(fetchStockPrices.rejected, (state, action) => {
      state.fetchingPrices = false;
      state.error = action.error.message || "Something went wrong";
    });


    builder.addCase(fetchUserData.pending, (state) => {
      state.loadingAssets = true;
    });

    //TODO: Add error handling
    builder.addCase(fetchUserData.rejected, (state) => {
      state.loadingAssets = false;
    });


    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.assets = action.payload.assets;
      state.eurUSDRate = action.payload.eurUSDRate;
      state.fiatAssets = action.payload.fiatAssets;
      state.networthSnapshots = action.payload.networthSnapshots;

      state.loadingAssets = false;
      

      updateTotals(state);
    });


  },
});

export const {
  addSnapshot,
  addFiatAsset,
  addAsset,
  deleteSnapshot,
  deleteFiatAsset,
  deleteAsset,
  updateSnapshot,
  updateFiatAsset,
  updateAsset,
} = assetsSlice.actions;
export default assetsSlice.reducer;
