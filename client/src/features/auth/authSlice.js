// import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/serivices/auth";

const initialState= {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;

export const selectUser = (state) =>
  state.auth.user;