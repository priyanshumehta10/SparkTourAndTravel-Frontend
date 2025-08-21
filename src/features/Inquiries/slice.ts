// features/Inquiry/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
interface InquiryState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: InquiryState = {
  data: [],
  loading: false,
  error: null,
};

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    fetchInquiryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInquirySuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchInquiryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInquiryRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteInquirySuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      // remove deleted user from data
      if (state.data) {
        state.data = state.data.filter(
          (user: any) => user._id !== action.payload
        );
      }
      state.error = null;
    },
    deleteInquiryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchInquiryRequest, fetchInquirySuccess, fetchInquiryFailure, deleteInquiryRequest , deleteInquirySuccess , deleteInquiryFailure } = inquirySlice.actions;
export default inquirySlice.reducer;
