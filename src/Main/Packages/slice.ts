import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PackageGroupState {
  data: any;
  loadingPck: boolean;
  error: string | null; 
  PackageGroupLoading: boolean;
  PackageGroupError: any; 
  PackageGroupdata: any;   
}

const initialState: PackageGroupState = {
  data: null,
  loadingPck: false,
  error: null,
    PackageGroupLoading: false,
  PackageGroupError: null,
  PackageGroupdata: null,
};

const PackageGroupSlice = createSlice({
  name: "home",
  initialState,
  reducers: {

     fetchPackageGroupRequest: (state) => {
      state.PackageGroupLoading = true;
      state.PackageGroupError = null; 
      state.PackageGroupdata = null; 
    },
    fetchPackageGroupSuccess: (state, action: PayloadAction<any>) => {
      state.PackageGroupLoading = false;
      state.PackageGroupdata = action.payload;
      state.PackageGroupError = null;
    },
    fetchPackageGroupFailure: (state, action: PayloadAction<string>) => {
      state.PackageGroupLoading = false;
      state.PackageGroupError = action.payload;  
      state.PackageGroupdata = null; 
    },
  },
});

export const {
  fetchPackageGroupRequest,
  fetchPackageGroupSuccess,
  fetchPackageGroupFailure,
} = PackageGroupSlice.actions;

export default PackageGroupSlice.reducer;
