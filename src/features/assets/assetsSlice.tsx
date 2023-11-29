import { createSlice } from "@reduxjs/toolkit";
import { Asset, NetworthSnapshot, fiatAsset } from "../../constants";

type AssetsState = {
  assets: Asset[];
  fiatAssets: fiatAsset[];
  networthSnapshots: NetworthSnapshot[];
};

const initialState: AssetsState = {
  assets: [
    {
      id: 1,
      note: "Bitcoin Investment",
      ticker: "BTC",
      type: "Crypto",
      amount: 1,
      lastPrice: 95000,
      price: 100000,
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
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    /*toggleThemeMode: (state) => {
      state.isLightTheme = !state.isLightTheme;
    },*/
  },
});

export const {} = assetsSlice.actions;
export default assetsSlice.reducer;
