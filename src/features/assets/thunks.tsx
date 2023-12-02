import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptoPrices = createAsyncThunk(
  "assets/fetchCryptoPrices",
  () => {
    return axios
      .get("https://api.binance.com/api/v3/ticker/price")
      .then((response) => response.data);
  }
);

export const fetchStockPrices = createAsyncThunk(
  "assets/fetchStockPrices",
  () => {
    return axios.get("http://localhost:3000").then((response) => response.data);
  }
);
