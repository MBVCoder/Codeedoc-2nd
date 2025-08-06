import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    token: null,
    email: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken , email} = action.payload;
      state.user = username;
      state.token = accessToken;
      state.email = email;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setCredentials, logout} = AuthSlice.actions;

export default AuthSlice.reducer;
