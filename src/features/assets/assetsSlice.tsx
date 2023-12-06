import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset, FiatAsset, NetworthSnapshot } from "../../constants";
import { calculateNextID } from "../../util";

import {
  addNewAsset,
  createSnapshot,
  fetchUserData,
  updateNumbers,
  updateTotals,
} from "./thunks";

export type AssetsState = {
  assets: Asset[];
  fiatAssets: FiatAsset[];
  networthSnapshots: NetworthSnapshot[];

  secondaryISO_4217: string; // Secondary currency

  isLoading: boolean;
  error: string;

  totals: Totals;
};

export type Totals = {
  USD: number;
  secondaryCurrency: number;
  BTC: number;
  cryptoUSD: number;
  fiatUSD: number;
  stocksUSD: number;
};

const initialState: AssetsState = {
  assets: [],
  fiatAssets: [],
  networthSnapshots: [],

  secondaryISO_4217: "EUR",

  isLoading: false,
  error: "",

  totals: {
    USD: 0,
    secondaryCurrency: 0,
    BTC: 0,
    stocksUSD: 0,
    cryptoUSD: 0,
    fiatUSD: 0,
  },
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    setSecondaryCurrency: (state, action: PayloadAction<string>) => {
      state.secondaryISO_4217 = action.payload;
    },

    deleteSnapshot: (state, action) => {
      state.networthSnapshots = state.networthSnapshots.filter(
        (snapshot) => snapshot.id !== action.payload.id
      );
    },

    updateSnapshot: (state, action: PayloadAction<NetworthSnapshot>) => {
      state.networthSnapshots = state.networthSnapshots.map((snapshot) =>
        snapshot.id === action.payload.id
          ? { ...snapshot, ...action.payload }
          : snapshot
      );
    },

    addFiatAsset: (state, action: PayloadAction<FiatAsset>) => {
      const id = calculateNextID(state.fiatAssets);

      state.fiatAssets = [...state.fiatAssets, { ...action.payload, id: id }];
    },

    deleteFiatAsset: (state, action) => {
      state.fiatAssets = state.fiatAssets.filter(
        (asset) => asset.id !== action.payload.id
      );
    },

    updateFiatAsset: (state, action: PayloadAction<FiatAsset>) => {
      state.fiatAssets = state.fiatAssets.map((asset) =>
        asset.id === action.payload.id ? { ...asset, ...action.payload } : asset
      );
    },

    deleteAsset: (state, action) => {
      state.assets = state.assets.filter(
        (asset) => asset.id !== action.payload.id
      );
    },

    updateAsset: (state, action: PayloadAction<Asset>) => {
      state.assets = state.assets.map((asset) =>
        asset.id === action.payload.id
          ? {
              ...asset,
              ...action.payload,
              totalPrice: action.payload.price * action.payload.amount,
            }
          : asset
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addNewAsset.fulfilled,
      (state, action: PayloadAction<Asset>) => {
        state.assets = [...state.assets, action.payload];
      }
    );

    builder.addCase(
      createSnapshot.fulfilled,
      (state, action: PayloadAction<NetworthSnapshot>) => {
        state.networthSnapshots = [...state.networthSnapshots, action.payload];
      }
    );

    builder.addCase(
      updateNumbers.fulfilled,
      (state, action: PayloadAction<Asset[]>) => {
        state.assets = action.payload;
      }
    );

    builder.addCase(
      updateTotals.fulfilled,
      (state, action: PayloadAction<Totals>) => {
        state.totals = action.payload;
      }
    );

    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });

    //TODO: Add error handling
    builder.addCase(fetchUserData.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.assets = action.payload.assets;
      state.secondaryISO_4217 = action.payload.secondaryISO_4217 || "EUR";
      state.fiatAssets = action.payload.fiatAssets;
      state.networthSnapshots = action.payload.networthSnapshots;

      state.isLoading = false;
    });
  },
});

export const {
  setSecondaryCurrency,
  addFiatAsset,
  deleteSnapshot,
  deleteFiatAsset,
  deleteAsset,
  updateSnapshot,
  updateFiatAsset,
  updateAsset,
} = assetsSlice.actions;
export default assetsSlice.reducer;
