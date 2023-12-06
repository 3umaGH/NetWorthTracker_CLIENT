import { configureStore } from "@reduxjs/toolkit";

import userParamsReducer from "../features/userParams/userParamsSlice";
import assetsReducer from "../features/assets/assetsSlice";
import pricesReducer from "../features/prices/pricesSlice";

export const store = configureStore({
  reducer: {
    userParams: userParamsReducer,
    assets: assetsReducer,
    prices: pricesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
