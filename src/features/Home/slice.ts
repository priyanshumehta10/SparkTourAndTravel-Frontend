import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface HomeState {
  data: any;
  loading: boolean;
}

const initialState: HomeState = {
  data: null,
  loading: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    fetchHomeDataRequest: (state) => { state.loading = true; },
    fetchHomeDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHomeDataFailure: (state) => { state.loading = false; },
  },
});

export const { fetchHomeDataRequest, fetchHomeDataSuccess, fetchHomeDataFailure } = homeSlice.actions;
export default homeSlice.reducer;
