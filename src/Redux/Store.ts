import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    User: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
