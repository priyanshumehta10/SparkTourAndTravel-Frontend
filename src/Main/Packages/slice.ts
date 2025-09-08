import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PackageGroupState {
  data: any;
  loadingPck: boolean;
  error: string | null;
  PackageGroupLoading: boolean;
  PackageGroupError: any;
  PackageGroupdata: any;
  PackagesByGroupLoading: boolean;
  PackagesByGroupError: string | null;
  PackagesByGroupdata: any;
  PackageDetailsLoading :boolean;
  PackageDetailsError : string | null;
  PackageDetailsdata :any;
}

const initialState: PackageGroupState = {
  data: null,
  loadingPck: false,
  error: null,
  PackageGroupLoading: false,
  PackageGroupError: null,
  PackageGroupdata: null,
  PackagesByGroupLoading: false,
  PackagesByGroupError: null,
  PackagesByGroupdata: null,
  PackageDetailsLoading:false,
  PackageDetailsError: null,
  PackageDetailsdata: null,
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
    fetchPackagesByGroupRequest: (state,_action: PayloadAction<string>) => {
      state.PackagesByGroupLoading = true;
      state.PackagesByGroupError = null;
      state.PackagesByGroupdata = null;
    },
    fetchPackagesByGroupRequestSuccess: (state, action: PayloadAction<any>) => {
      state.PackagesByGroupLoading = false;
      state.PackagesByGroupError = null;
      state.PackagesByGroupdata = action.payload;
    },
    fetchPackagesByGroupRequestFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.PackagesByGroupLoading = false;
      state.PackagesByGroupError = action.payload;
      state.PackagesByGroupdata = null;
    },
    fetchPackageDetailsRequest: (state,_action: PayloadAction<string>) => {
      state.PackageDetailsLoading = true;
      state.PackageDetailsError = null;
      state.PackageDetailsdata = null;
    },
    fetchPackageDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.PackageDetailsLoading = false;
      state.PackageDetailsError = null;
      state.PackageDetailsdata = action.payload;
    },
    fetchPackageDetailsFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.PackageDetailsLoading = false;
      state.PackageDetailsError = action.payload;
      state.PackageDetailsdata = null;
    },
  },
});

export const {
  fetchPackageGroupRequest,
  fetchPackageGroupSuccess,
  fetchPackageGroupFailure,
  fetchPackagesByGroupRequest,
  fetchPackagesByGroupRequestSuccess,
  fetchPackagesByGroupRequestFailure,
  fetchPackageDetailsRequest,
  fetchPackageDetailsSuccess,
  fetchPackageDetailsFailure
} = PackageGroupSlice.actions;

export default PackageGroupSlice.reducer;
