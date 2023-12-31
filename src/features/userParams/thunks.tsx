import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseAuth, FirebaseDB } from "../../firebase/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { UserParams } from "./userParamsSlice";
import { RootState } from "../../app/Store";

export const saveUserConfig = createAsyncThunk(
  "userParams/saveConfig",
  async (_arg, { getState }) => {
    return new Promise<void>(async (resolve, reject) => {
      const id = FirebaseAuth.currentUser?.uid;
      const state = getState() as RootState;

      if (!id) reject();

      const obj = {
        ...state.userParams,
        encryptionKey: "", // Do not save encryption key to DB.
      };

      try {
        setDoc(
          doc(FirebaseDB, "userData", `${id}`),
          {
            config: obj,
          },
          { merge: true }
        ).then(() => {
          console.log(`${id} Successfully saved configuration...`);
          resolve();
        });
      } catch (err) {
        alert("Unable to save configuration " + err);
        reject();
      }
    });
  }
);

export const fetchUserConfig = createAsyncThunk(
  "userParams/fetchUserConfig",
  async () => {
    return new Promise<UserParams>(async (resolve, reject) => {
      const id = FirebaseAuth.currentUser?.uid;

      try {
        const docs = await getDoc(doc(FirebaseDB, "userData", `${id}`));

        if (!docs.exists() || !id) {
          reject();
          return;
        }

        const data = docs.data().config;

        if (data) resolve(data as UserParams);
        else reject();
      } catch (err) {
        console.error(err);
        reject();
      }
    });
  }
);
