import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
