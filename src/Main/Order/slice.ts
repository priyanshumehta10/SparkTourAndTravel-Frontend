import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MyOrdersState {
  data: any;
  loadingPck: boolean;
  error: string | null;
  MyOrdersLoading: boolean;
  MyOrdersError: any;
  MyOrdersdata: any;
  payRemainingAmountLoading: boolean;
  payRemainingAmountError: any;
  payRemainingAmountdata : string | null;

}

const initialState: MyOrdersState = {
  data: null,
  loadingPck: false,
  error: null,
  MyOrdersLoading: false,
  MyOrdersError: null,
  MyOrdersdata: null,
    payRemainingAmountLoading : false,
  payRemainingAmountError : null,
  payRemainingAmountdata : null,

};

const MyOrdersSlice = createSlice({
  name: "MyOrders",
  initialState,
  reducers: {
    fetchMyOrdersRequest: (state,_action) => {
      state.MyOrdersLoading = true;
      state.MyOrdersError = null;
      state.MyOrdersdata = null;
    },
    fetchMyOrdersSuccess: (state, action: PayloadAction<any>) => {
      state.MyOrdersLoading = false;
      state.MyOrdersdata = action.payload.bookings;
      state.MyOrdersError = null;
    },
    fetchMyOrdersFailure: (state, action: PayloadAction<string>) => {
      state.MyOrdersLoading = false;
      state.MyOrdersError = action.payload;
      state.MyOrdersdata = null;
    },
    fetchpayRemainingAmountRequest: (state,_action) => {
      state.payRemainingAmountLoading = true;
      state.payRemainingAmountError = null;
      state.payRemainingAmountdata = null;
    },
    fetchpayRemainingAmountSuccess: (state, action: PayloadAction<any>) => {
      state.payRemainingAmountLoading = false;
      state.payRemainingAmountdata = action.payload;
      state.payRemainingAmountError = null;
    },
    fetchpayRemainingAmountFailure: (state, action: PayloadAction<string>) => {
      state.payRemainingAmountLoading = false;
      state.payRemainingAmountError = action.payload;
      state.payRemainingAmountdata = null;
    },
    resetRemainingAmountSlice: (state) => {
      state.payRemainingAmountLoading = false;
      state.payRemainingAmountError = null;
      state.payRemainingAmountdata = null;
    }
  },
});

export const {
  fetchMyOrdersRequest,
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,
  fetchpayRemainingAmountRequest,
  fetchpayRemainingAmountSuccess,
  fetchpayRemainingAmountFailure,
  resetRemainingAmountSlice
} = MyOrdersSlice.actions;

export default MyOrdersSlice.reducer;
