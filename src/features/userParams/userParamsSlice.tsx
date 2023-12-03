import { createSlice } from "@reduxjs/toolkit";

type UserParams = {
  isLightTheme: boolean;
  discreetMode: boolean;
};

const initialState: UserParams = {
  isLightTheme: false,
  discreetMode: true,
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
});

export const { toggleThemeMode } = userParamsSlice.actions;
export default userParamsSlice.reducer;
