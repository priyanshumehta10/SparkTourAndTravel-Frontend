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
  payRemainingAmountdata: string | null;
  cancelRequestLoading: boolean;
  cancelRequestError: any;
  cancelRequestData: any;
  canceledRequest: boolean;
}

const initialState: MyOrdersState = {
  data: null,
  loadingPck: false,
  error: null,
  MyOrdersLoading: false,
  MyOrdersError: null,
  MyOrdersdata: null,
  payRemainingAmountLoading: false,
  payRemainingAmountError: null,
  payRemainingAmountdata: null,
  cancelRequestLoading: false,
  cancelRequestError: null,
  cancelRequestData: null,
  canceledRequest : false,
};

const MyOrdersSlice = createSlice({
  name: "MyOrders",
  initialState,
  reducers: {
    fetchMyOrdersRequest: (state, _action) => {
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
    fetchpayRemainingAmountRequest: (state, _action) => {
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
    // inside your slice
    fetchCancel: (state, _action: PayloadAction<any>) => {
      state.cancelRequestLoading = true;
      state.cancelRequestError = null;
      state.cancelRequestData = null;
      state.canceledRequest = false;
    },
    fetchCancelRequestSuccess: (state, action: PayloadAction<any>) => {
      state.cancelRequestLoading = false;
      state.cancelRequestData = action.payload;
      state.cancelRequestError = null;
      state.canceledRequest = true;
    },
    fetchCancelRequestFailure: (state, action: PayloadAction<any>) => {
      state.cancelRequestLoading = false;
      state.cancelRequestError = action.payload;
      state.cancelRequestData = null;
      state.canceledRequest = false;
    },
    resetCancelRequest:(state) => {
      state.cancelRequestLoading = false;
      state.cancelRequestError = null;
      state.cancelRequestData = null;
      state.canceledRequest = false;
    },

    resetRemainingAmountSlice: (state) => {
      state.payRemainingAmountLoading = false;
      state.payRemainingAmountError = null;
      state.payRemainingAmountdata = null;
    },
  },
});

export const {
  fetchMyOrdersRequest,
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,
  fetchpayRemainingAmountRequest,
  fetchpayRemainingAmountSuccess,
  fetchpayRemainingAmountFailure,
  resetRemainingAmountSlice,
  fetchCancel,
  fetchCancelRequestSuccess,
  fetchCancelRequestFailure,
  resetCancelRequest,
} = MyOrdersSlice.actions;

export default MyOrdersSlice.reducer;
