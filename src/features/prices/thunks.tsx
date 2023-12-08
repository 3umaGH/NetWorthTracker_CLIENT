import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateNumbers, updateTotals } from "../assets/thunks";

export const fetchCryptoPrices = createAsyncThunk(
  "prices/fetchCryptoPrices",
  async (_a, { dispatch }) => {
    return axios
      .get("https://api.binance.com/api/v3/ticker/price")
      .then((response) => {
        dispatch(updateNumbers()).then(() => dispatch(updateTotals()));
        return response.data;
      });
  }
);

export const fetchStockPrices = createAsyncThunk(
  "prices/fetchStockPrices",
  async (_a, { dispatch }) => {
    return axios
      .get("https://stockpriceparserapi-production.up.railway.app/")
      .then((response) => {
        dispatch(updateNumbers()).then(() => dispatch(updateTotals()));
        return response.data;
      });
  }
);
