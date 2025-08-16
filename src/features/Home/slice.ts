import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HomeState {
  data: any;
  loading: boolean;
  error: string | null;   
}

const initialState: HomeState = {
  data: null,
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    fetchHomeDataRequest: (state) => {
      state.loading = true;
      state.error = null; 
      state.data = null; 
    },
    fetchHomeDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchHomeDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;  
      state.data = null; 
    },
  },
});

export const {
  fetchHomeDataRequest,
  fetchHomeDataSuccess,
  fetchHomeDataFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
