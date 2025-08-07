import { createSlice } from "@reduxjs/toolkit";

const userData = localStorage.getItem("user");

const initialState = {
  user: userData ? JSON.parse(userData) : null,
  accessToken: userData ? JSON.parse(userData).accessToken : null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
    },
  },
});

export const {setCredentials, logout} = AuthSlice.actions;

export default AuthSlice.reducer;
