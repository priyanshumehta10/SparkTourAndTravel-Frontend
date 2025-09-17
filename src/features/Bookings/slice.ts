import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



interface OrderssState {
  error: string | null;
  loading: boolean;
  OrdersData?: any | null;
}

const initialState: OrderssState = {
  error: null,
  loading: false,
  OrdersData:  null,
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
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,

} = OrdersSlice.actions;

export default OrdersSlice.reducer;
