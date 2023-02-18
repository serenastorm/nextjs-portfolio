import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import likesReducer from "./likesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      likes: likesReducer,
    },
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
