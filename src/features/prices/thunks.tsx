import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptoPrices = createAsyncThunk(
  "prices/fetchCryptoPrices",
  async () => {
    return axios
      .get("https://api.binance.com/api/v3/ticker/price")
      .then((response) => response.data);
  }
);

export const fetchStockPrices = createAsyncThunk(
  "prices/fetchStockPrices",
  async () => {
    return axios
      .get("https://stockpriceparserapi-production.up.railway.app/")
      .then((response) => response.data);
  }
);
