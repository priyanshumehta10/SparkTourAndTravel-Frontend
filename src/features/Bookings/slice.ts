import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OrderssState {
  error: string | null;
  loading: boolean;
  OrdersData?: any | null;
  cancelConfirmLoading: boolean;
  cancelConfirmError: any;
  cancelConfirmData: any;
}

const initialState: OrderssState = {
  error: null,
  loading: false,
  OrdersData: null,
  cancelConfirmLoading: false,
  cancelConfirmError: null,
  cancelConfirmData: null,
};

const OrdersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {
    // Fetch single group
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.OrdersData = action.payload.bookings;
      state.error = null;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCancelConfirmReq: (state, _action: PayloadAction<any>) => {
      state.cancelConfirmLoading = true;
      state.cancelConfirmError = null;
      state.cancelConfirmData = null;
    },
    fetchCancelConfirmRequestSuccess: (state, action: PayloadAction<any>) => {
      state.cancelConfirmLoading = false;
      state.cancelConfirmData = action.payload;
      state.cancelConfirmError = null;
    },
    fetchCancelConfirmRequestFailure: (state, action: PayloadAction<any>) => {
      state.cancelConfirmLoading = false;
      state.cancelConfirmError = action.payload;
      state.cancelConfirmData = null;
    },
  },
});

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure,fetchCancelConfirmReq,fetchCancelConfirmRequestSuccess,fetchCancelConfirmRequestFailure } =
  OrdersSlice.actions;

export default OrdersSlice.reducer;
