import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { Asset, NetworthSnapshot, pregeneratedKey } from "../../constants";
import { FirebaseAuth, FirebaseDB } from "../../firebase/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { AssetsState, Totals } from "./assetsSlice";
import { RootState } from "../../app/Store";
import {
  calculateNextID,
  convertCurrency,
  getCryptoPrice,
  getCurrencyRate,
  getLastSnapshot,
  getStockPrice,
} from "../../util";

export const addNewAsset: AsyncThunk<Asset, Asset, { state: RootState }> =
  createAsyncThunk("assets/addNewAsset", (asset: Asset, { getState }) => {
    return new Promise<Asset>(async (resolve) => {
      const state: RootState = getState() as RootState;

      const prices = state.prices;
      const id = calculateNextID(state.assets.assets);

      const price =
        asset.type === "Crypto"
          ? getCryptoPrice(prices, asset.ticker)
          : getStockPrice(prices, asset.ticker);

      const assetObj = {
        ...asset,
        id: id,
        price: price,
        totalPrice: price * asset.amount,
      };

      resolve(assetObj);
    });
  });

export const createSnapshot = createAsyncThunk(
  "assets/createSnapshot",
  (_arg, { getState }) => {
    return new Promise<NetworthSnapshot>(async (resolve) => {
      const state: RootState = getState() as RootState;

      const assets = state.assets;
      const prices = state.prices;

      const btcPrice = (prices.cryptoPrices.find(
        (val) => val.symbol === "BTCUSDT"
      )?.price || -1) as number;

      const snapshotObj: NetworthSnapshot = {
        id: assets.networthSnapshots.length + 1,
        dateTime: Date.now(),
        btcPrice: parseFloat(btcPrice.toFixed(0)),
        secondaryISO_4217: assets.secondaryISO_4217,
        secondaryRate: getCurrencyRate(prices, assets.secondaryISO_4217),
        totalSecondary: assets.totals.secondaryCurrency,
        // Calculate secondary currency difference if users currency is same as last snapshots, else set it to 0.
        changeSecondary:
          assets.secondaryISO_4217 === getLastSnapshot(assets).secondaryISO_4217
            ? assets.totals.secondaryCurrency -
              (getLastSnapshot(assets).totalSecondary ?? 0)
            : 0,

        totalUSD: assets.totals.USD,
        changeUSD: assets.totals.USD - (getLastSnapshot(assets).totalUSD ?? 0),
        totalBTC: assets.totals.BTC,
        note: "",

        lastAssetPrices: assets.assets.map((asset) => ({
          ticker: asset.ticker,
          lastPrice: asset.price,
        })),
      };

      resolve(snapshotObj);
    });
  }
);

export const updateNumbers = createAsyncThunk(
  "assets/updateNumbers",
  (_arg, { getState }) => {
    return new Promise<Asset[]>(async (resolve) => {
      const state: RootState = getState() as RootState;

      const assets = state.assets.assets;
      const prices = state.prices;

      const newPrices = assets.map((asset) => {
        const price =
          asset.type === "Crypto"
            ? getCryptoPrice(prices, asset.ticker)
            : getStockPrice(prices, asset.ticker);

        return {
          ...asset,
          lastPrice:
            getLastSnapshot(state.assets).lastAssetPrices?.find(
              (val) => val.ticker === asset.ticker
            )?.lastPrice || 0,
          price: price,
          change: price - asset.lastPrice,
          totalPrice: price * asset.amount,
        };
      }) as Asset[];

      resolve(newPrices);
    });
  }
);

export const updateTotals = createAsyncThunk(
  "assets/updateTotals",
  (_arg, { getState }) => {
    return new Promise<Totals>(async (resolve) => {
      const state: RootState = getState() as RootState;

      const assets = state.assets;
      const prices = state.prices;

      const totalUSD =
        assets.assets.reduce(
          (sum, obj) =>
            sum +
            (convertCurrency(
              "to",
              prices,
              obj.currency,
              obj.totalPrice
            ) as number),
          0
        ) +
        assets.fiatAssets.reduce(
          (sum, obj) =>
            sum +
            (convertCurrency("to", prices, obj.currency, obj.amount) as number),
          0
        );

      const totalsObj = {
        // USD
        USD: totalUSD,

        secondaryCurrency: convertCurrency(
          "from",
          prices,
          assets.secondaryISO_4217,
          totalUSD
        ),

        // BTC
        BTC: assets.assets.reduce(
          (sum, obj) =>
            obj.ticker.startsWith("BTC") // Need a better way to determine if asset is in fact BTC.
              ? sum + (obj.amount as number)
              : (sum = sum),
          0
        ),

        // Crypto
        cryptoUSD: assets.assets.reduce(
          (sum, obj) =>
            obj.type === "Crypto"
              ? sum +
                (convertCurrency(
                  "to",
                  prices,
                  obj.currency,
                  obj.totalPrice
                ) as number)
              : (sum = sum),
          0
        ),

        // Fiat
        fiatUSD: assets.fiatAssets.reduce(
          (sum, obj) =>
            sum +
            (convertCurrency("to", prices, obj.currency, obj.amount) as number),
          0
        ),

        // Stocks
        stocksUSD: assets.assets.reduce(
          (sum, obj) =>
            obj.type === "Stock"
              ? sum +
                (convertCurrency(
                  "to",
                  prices,
                  obj.currency,
                  obj.totalPrice
                ) as number)
              : (sum = sum),
          0
        ),
      } as Totals;

      resolve(totalsObj);
    });
  }
);

export const saveUserData = createAsyncThunk(
  "assets/saveData",
  async (_arg, { getState }) => {
    return new Promise<void>(async (resolve, reject) => {
      const id = FirebaseAuth.currentUser?.uid;
      const state = getState() as RootState;
      const key = state.userParams.useCustomEncryption
        ? FirebaseAuth.currentUser?.uid + state.userParams.encryptionKey
        : FirebaseAuth.currentUser?.uid + pregeneratedKey;

      if (!id) reject();

      console.log(
        state.userParams.useCustomEncryption,
        state.userParams.encryptionKey
      );

      const obj = {
        ...state.assets,
      };

      try {
        setDoc(
          doc(FirebaseDB, "userData", `${id}`),
          {
            encString: CryptoJS.AES.encrypt(
              JSON.stringify(obj),
              key
            ).toString(),
          },
          { merge: true }
        ).then(() => {
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
  async (_arg, { getState }) => {
    return new Promise<AssetsState>(async (resolve, reject) => {
      const id = FirebaseAuth.currentUser?.uid;
      const state = getState() as RootState;
      const key = state.userParams.useCustomEncryption
        ? FirebaseAuth.currentUser?.uid + state.userParams.encryptionKey
        : FirebaseAuth.currentUser?.uid + pregeneratedKey;

      try {
        const docs = await getDoc(doc(FirebaseDB, "userData", `${id}`));

        if (!docs.exists() || !id) {
          reject();
          return;
        }

        try {
          const bytes = CryptoJS.AES.decrypt(docs.data().encString, key);
          const decryptedData = JSON.parse(
            bytes.toString(CryptoJS.enc.Utf8)
          ) as AssetsState;
          resolve(decryptedData);
        } catch (err) {
          reject(
            "Encryption Error: Unable to decrypt. Please verify the key provided."
          );
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
);
