import { defaultInitialState, reducers } from "@/shared/data";
import { type AuthState } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = defaultInitialState.authReducer;

const authSlice = createSlice({
  name: reducers.authReducer,
  initialState,
  reducers: {},
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
