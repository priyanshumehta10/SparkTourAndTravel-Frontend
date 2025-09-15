import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MyOrdersState {
  data: any;
  loadingPck: boolean;
  error: string | null;
  MyOrdersLoading: boolean;
  MyOrdersError: any;
  MyOrdersdata: any;
}

const initialState: MyOrdersState = {
  data: null,
  loadingPck: false,
  error: null,
  MyOrdersLoading: false,
  MyOrdersError: null,
  MyOrdersdata: null,
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
  },
});

export const {
  fetchMyOrdersRequest,
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,
} = MyOrdersSlice.actions;

export default MyOrdersSlice.reducer;
