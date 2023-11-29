import { createSlice } from "@reduxjs/toolkit";

type UserParams = {
  isLightTheme: boolean;
};

const initialState: UserParams = {
  isLightTheme: false,
};

export const userParamsSlice = createSlice({
  name: "userParams",
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.isLightTheme = !state.isLightTheme;
    },
  },
});

export const { toggleThemeMode } = userParamsSlice.actions;
export default userParamsSlice.reducer;
