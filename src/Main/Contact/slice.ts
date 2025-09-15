// features/Inquiry/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface InquiryState {
  InquiryData: any;
  loadingContact: boolean;
  errorContact: string | null;
  created: boolean;
}

const initialState: InquiryState = {
  InquiryData: null,
  loadingContact: false,
  errorContact: null,
  created: false,
};

const InquirySlice = createSlice({
  name: "Inquiry",
  initialState,
  reducers: {
    createInquiryRequest: (state, _action: PayloadAction<any>) => {
      state.loadingContact = true;
      state.errorContact = null;
      state.created = false;
      state.InquiryData = null;
    },
    createInquirySuccess: (state, action: PayloadAction<any>) => {
      state.loadingContact = false;
      state.InquiryData = action.payload, // prepend new Inquiry
      state.errorContact = null;
      state.created = true;
    },
    createInquiryFailure: (state, action: PayloadAction<any>) => {
      state.loadingContact = false;
      state.errorContact = action.payload;
      state.created = false;
      state.InquiryData = null;
    },

    resetCreated: (state) => {
      state.created = false;
      state.InquiryData = null;
    },
  },
});

export const {
  createInquiryFailure,
  createInquirySuccess,
  createInquiryRequest,
  resetCreated,
} = InquirySlice.actions;
export default InquirySlice.reducer;
