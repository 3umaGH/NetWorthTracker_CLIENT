import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCryptoPrices, fetchStockPrices } from "./thunks";

export type PricesState = {
  cryptoPrices: CryptoPrice[];
  stockPrices: StockPrice[];
  currencyRates: CurrencyRate[];

  isFetchingPrices: boolean;
  error: string;
};

type CryptoPrice = {
  symbol: string;
  price: number;
};

type CurrencyRate = {
  ticker: string;
  price: number;
};

export type StockPrice = {
  ticker: string;
  name: string;
  type: string;
  currency: string;
  price: number;
};

const initialState: PricesState = {
  cryptoPrices: [],
  stockPrices: [],
  currencyRates: [],

  isFetchingPrices: false,
  error: "",
};

export const pricesSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoPrices.pending, (state) => {
      state.isFetchingPrices = true;
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

        state.isFetchingPrices = false;
        state.error = "";
      }
    );
    builder.addCase(fetchCryptoPrices.rejected, (state, action) => {
      state.isFetchingPrices = false;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(fetchStockPrices.pending, (state) => {
      state.isFetchingPrices = true;
    });
    builder.addCase(
      fetchStockPrices.fulfilled,
      (state, action: PayloadAction<StockPrice[]>) => {
        state.stockPrices = action.payload.filter(
          (ticker) => ticker.type == "stock"
        );

        const filteredRates = action.payload
          .filter((ticker) => ticker.type === "currency")
          .map((ticker) => ({
            ...ticker,
            ticker: ticker.ticker.replace("USD", ""), // remove USD part from the currency pair
          }));

        state.currencyRates = [
          ...filteredRates,
          {
            ticker: "USD",
            price: 1.0,
          },
        ].sort((a, b) => a.ticker.localeCompare(b.ticker));


        state.isFetchingPrices = false;
        state.error = "";
      }
    );
    builder.addCase(fetchStockPrices.rejected, (state, action) => {
      state.isFetchingPrices = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const {} = pricesSlice.actions;
export default pricesSlice.reducer;
