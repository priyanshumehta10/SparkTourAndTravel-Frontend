// features/forgetPassword/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface forgetPasswordState {
  data: any[];
  loading: boolean;
  error: string | null;
  created: boolean;
  loadingReset: boolean;
  reset: boolean;
  dataReset: any[] | null;
}

const initialState: forgetPasswordState = {
  data: [],
  loading: false,
  error: null,
  created: false,
  loadingReset: false,
  reset: false,
  dataReset: null,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    forgetPasswordRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.created = false;
    },
    forgetPasswordSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (state.data) {
        state.data = [action.payload, ...state.data]; // prepend new forgetPassword
      }
      state.error = null;
      state.created = true;
    },
    forgetPasswordFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.created = false;
    },
    resetRequest: (state, _action: PayloadAction<any>) => {
      state.loadingReset = true;
      state.error = null;
      state.reset = false;
    },
    resetSuccess: (state, action: PayloadAction<any>) => {
      state.loadingReset = false;
      if (state.dataReset) {
        state.dataReset = [action.payload, ...state.dataReset]; // prepend new forgetPassword
      }
      state.error = null;
      state.reset = true;
    },
    resetFailure: (state, action: PayloadAction<any>) => {
      state.loadingReset = false;
      state.error = action.payload;
      state.reset = false;
    },

    resetCreated: (state) => {
      state.created = false;
      state.reset = false;
    },
  },
});

export const {
  forgetPasswordFailure,
  forgetPasswordSuccess,
  forgetPasswordRequest,
  resetRequest,
  resetSuccess,
  resetFailure,
  resetCreated,
} = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
