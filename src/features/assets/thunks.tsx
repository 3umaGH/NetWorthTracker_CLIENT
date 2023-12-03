import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";
import { pregeneratedKey } from "../../constants";
import { FirebaseAuth, FirebaseDB } from "../../firebase/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { AssetsState } from "./assetsSlice";

export const fetchCryptoPrices = createAsyncThunk(
  "assets/fetchCryptoPrices",
  async () => {
    return axios
      .get("https://api.binance.com/api/v3/ticker/price")
      .then((response) => response.data);
  }
);

export const fetchStockPrices = createAsyncThunk(
  "assets/fetchStockPrices",
  async () => {
    return axios.get("http://localhost:3000").then((response) => response.data);
  }
);

export const saveUserData = createAsyncThunk(
  "assets/saveData",
  async (_arg, { getState }) => {
    return new Promise<void>(async (resolve, reject) => {
      const id = FirebaseAuth.currentUser?.uid;
      const key = FirebaseAuth.currentUser?.uid + pregeneratedKey;
      const state = getState() as any;

      if (!id) reject();

      const obj = {
        ...state.assets,
        cryptoPrices: [],
        stockPrices: [],
      };

      try {
        setDoc(doc(FirebaseDB, "userData", `${id}`), {
          encString: CryptoJS.AES.encrypt(JSON.stringify(obj), key).toString(),
        }).then(() => {
          console.log(`${id} Successfully saved...`);
          resolve();
        });
      } catch (err) {
        alert("Unable to save data " + err);
        reject();
      }
    });
  }
);

export const fetchUserData = createAsyncThunk(
  "assets/fetchUserData",
  async () => {
    return new Promise<AssetsState>(async (resolve, reject) => {
      const id = FirebaseAuth.currentUser?.uid;
      const key = FirebaseAuth.currentUser?.uid + pregeneratedKey;

      try {
        const docs = await getDoc(doc(FirebaseDB, "userData", `${id}`));

        if (!docs.exists() || !id) {
          reject();
          return;
        }

        const bytes = CryptoJS.AES.decrypt(docs.data().encString, key);
        const decryptedData = JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        ) as AssetsState;

        resolve(decryptedData);
      } catch (err) {
        console.error(err);
        reject();
      }
    });
  }
);
