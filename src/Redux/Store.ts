import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

export default configureStore({
  reducer: {
    Auth: AuthSlice,
  },
});
