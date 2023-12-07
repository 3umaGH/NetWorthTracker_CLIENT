import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserConfig } from "./thunks";

export type UserParams = {
  isLightTheme: boolean;
  discreetMode: boolean;

  useCustomEncryption: boolean;
  encryptionKey: string;
};

const initialState: UserParams = {
  isLightTheme: false,
  discreetMode: false,

  useCustomEncryption: false,
  encryptionKey: "",
};

export const userParamsSlice = createSlice({
  name: "userParams",
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.isLightTheme = !state.isLightTheme;
    },
    toggleDiscreetMode: (state) => {
      state.discreetMode = !state.discreetMode;
    },

    setupEncryptionKey: (state, action: PayloadAction<string>) => {
      state.useCustomEncryption = true;
      state.encryptionKey = action.payload;
    },

    removeEncryption: (state) => {
      state.useCustomEncryption = false;
      state.encryptionKey = "";
    },

    updateEncryptionKey: (state, action: PayloadAction<string>) => {
      state.encryptionKey = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserConfig.fulfilled, (state, action) => {
      state.discreetMode = action.payload.discreetMode;
      state.isLightTheme = action.payload.isLightTheme;
      state.useCustomEncryption = action.payload.useCustomEncryption || false;
    });
  },
});

export const {
  toggleThemeMode,
  toggleDiscreetMode,
  removeEncryption,
  setupEncryptionKey,
  updateEncryptionKey,
} = userParamsSlice.actions;
export default userParamsSlice.reducer;
