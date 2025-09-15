import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface User {
  user: any | null;
  loading: boolean;
  error: string | null;
  signupConfirmation?: boolean; 
}

const initialState: User = {
  user: null,
  loading: false,
  error: null,
    signupConfirmation: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupRequest: (state, _action: PayloadAction<{ email: string; password: string; name:string; }>) => {
      state.loading = true;
      state.error = null;
      state.signupConfirmation = false;
    },
    signupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.signupConfirmation = true;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.signupConfirmation = false;
    },
    
    signupReset: (state) => {
      state.loading = false;
      state.signupConfirmation = false;
            state.error = null;

    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { signupRequest, signupSuccess, signupFailure, logout,signupReset } = signupSlice.actions;
export default signupSlice.reducer;
