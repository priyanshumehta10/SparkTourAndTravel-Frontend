import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface User {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: User = {
  user: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    resetLoginError:(state) => {
      state.error = null;

    }
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, resetLoginError } = loginSlice.actions;
export default loginSlice.reducer;
