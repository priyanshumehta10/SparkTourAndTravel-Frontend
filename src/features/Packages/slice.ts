import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface PackagesState {
  data: any[];
  loading: boolean;
  error: string | null;
  created: boolean;
  loadingPck: boolean;
}

const initialState: PackagesState = {
  data: [],
  loading: false,
  error: null,
  created: false,
  loadingPck: false,
};

const PackagesSlice = createSlice({
  name: "Packages",
  initialState,
  reducers: {
    fetchPackagesRequest: (state) => {
      state.loadingPck = true;
      state.error = null;
    },
    fetchPackagesSuccess: (state, action: PayloadAction<any[]>) => {
        
      state.loadingPck = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchPackagesFailure: (state, action: PayloadAction<string>) => {
      state.loadingPck = false;
      state.error = action.payload;
    },
    deletePackageRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deletePackageSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      if (state.data) {
        state.data = state.data.filter(
          (pkg: any) => pkg._id !== action.payload
        );
      }
      state.error = null;
    },
    deletePackageFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPackageRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.created = false;
    },
    createPackageSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (state.data) {
        state.data = [action.payload, ...state.data];
      }
      state.error = null;
      state.created = true;
    },
    createPackageFailure: (state, action: PayloadAction<any>) => {
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
  fetchPackagesRequest,
  fetchPackagesSuccess,
  fetchPackagesFailure,
  deletePackageRequest,
  deletePackageSuccess,
  deletePackageFailure,
  createPackageFailure,
  createPackageSuccess,
  createPackageRequest,
  resetCreated
} = PackagesSlice.actions;
export default PackagesSlice.reducer;