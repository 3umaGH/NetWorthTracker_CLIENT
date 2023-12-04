import { createSlice } from "@reduxjs/toolkit";
import { fetchUserConfig } from "./thunks";

export type UserParams = {
  isLightTheme: boolean;
  discreetMode: boolean;
};

const initialState: UserParams = {
  isLightTheme: false,
  discreetMode: false,
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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserConfig.fulfilled, (state, action) => {
      state.discreetMode = action.payload.discreetMode;
      state.isLightTheme = action.payload.isLightTheme;
    });
  },
});

export const { toggleThemeMode, toggleDiscreetMode } = userParamsSlice.actions;
export default userParamsSlice.reducer;
