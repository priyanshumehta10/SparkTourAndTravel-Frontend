// features/Inquiry/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface InquiryState {
  data: any[];
  loading: boolean;
  error: string | null;
  created: boolean;
}

const initialState: InquiryState = {
  data: [],
  loading: false,
  error: null,
  created: false,
};

const InquirySlice = createSlice({
  name: "Inquiry",
  initialState,
  reducers: {
    createInquiryRequest: (state, _action: PayloadAction<FormData>) => {
      state.loading = true;
      state.error = null;
      state.created = false;
    },
    createInquirySuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (state.data) {
        state.data = [action.payload, ...state.data]; // prepend new Inquiry
      }
      state.error = null;
      state.created = true;
    },
    createInquiryFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.created = false;
    },

    resetCreated: (state) => {
      state.created = false;
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
