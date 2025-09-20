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
  PackageDetailsLoading: boolean;
  PackageDetailsError: string | null;
  PackageDetailsdata: any;
  createOrderLoading: boolean;
  createOrderError: string | null;
  createOrderdata: any;
  confirmOrderLoading: boolean;
  confirmOrderError: string | null;
  confirmOrderdata: any;
  filterPackageGroupLoading: boolean;
  filterPackageGroupError: string | null;
  filterPackageGroupdata: any;
  confirmedOrder: boolean;
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
  PackageDetailsLoading: false,
  PackageDetailsError: null,
  PackageDetailsdata: null,
  createOrderLoading: false,
  createOrderError: null,
  createOrderdata: null,
  confirmOrderLoading: false,
  confirmOrderError: null,
  confirmOrderdata: null,
  filterPackageGroupLoading: false,
  filterPackageGroupError: null,
  filterPackageGroupdata: null,
  confirmedOrder: false,
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
    fetchFilterPackageGroupRequest: (state, _action: PayloadAction<any>) => {
      state.filterPackageGroupLoading = true;
      state.filterPackageGroupError = null;
      state.filterPackageGroupdata = null;
    },
    fetchFilterPackageGroupSuccess: (state, action: PayloadAction<any>) => {
      state.filterPackageGroupLoading = false;
      state.filterPackageGroupdata = action.payload;
      state.filterPackageGroupError = null;
    },
    fetchFilterPackageGroupFailure: (state, action: PayloadAction<string>) => {
      state.filterPackageGroupLoading = false;
      state.filterPackageGroupError = action.payload;
      state.filterPackageGroupdata = null;
    },
    fetchPackagesByGroupRequest: (state, _action: PayloadAction<string>) => {
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
    fetchPackageDetailsRequest: (state, _action: PayloadAction<string>) => {
      state.PackageDetailsLoading = true;
      state.PackageDetailsError = null;
      state.PackageDetailsdata = null;
    },
    fetchPackageDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.PackageDetailsLoading = false;
      state.PackageDetailsError = null;
      state.PackageDetailsdata = action.payload;
    },
    fetchPackageDetailsFailure: (state, action: PayloadAction<string>) => {
      state.PackageDetailsLoading = false;
      state.PackageDetailsError = action.payload;
      state.PackageDetailsdata = null;
    },
    createOrderRequest: (state, _action: PayloadAction<any>) => {
      state.createOrderLoading = true;
      state.createOrderError = null;
      state.createOrderdata = null;
    },
    createOrderSuccess: (state, action: PayloadAction<any>) => {
      state.createOrderLoading = false;
      state.createOrderError = null;
      state.createOrderdata = action.payload;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.createOrderLoading = false;
      state.createOrderError = action.payload;
      state.createOrderdata = null;
    },
    confirmOrderRequest: (state, _action: PayloadAction<any>) => {
      state.confirmOrderLoading = true;
      state.confirmOrderError = null;
      state.confirmOrderdata = null;
      state.confirmedOrder = false;
    },
    confirmOrderSuccess: (state, action: PayloadAction<any>) => {
      state.confirmOrderLoading = false;
      state.confirmOrderError = null;
      state.confirmOrderdata = action.payload;
      state.confirmedOrder = true;
    },
    confirmOrderFailure: (state, action: PayloadAction<string>) => {
      state.confirmOrderLoading = false;
      state.confirmOrderError = action.payload;
      state.confirmOrderdata = null;
      state.confirmedOrder = false;
    },
    resetCreateBookSlice: (state) => {
      state.createOrderLoading = false;
      state.createOrderdata = null;
    },
    resetConfirmBookSlice: (state) => {
      state.confirmOrderLoading = true;
      state.confirmOrderError = null;
      state.confirmOrderdata = null;
      state.confirmedOrder = false;
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
  fetchPackageDetailsFailure,
  createOrderSuccess,
  createOrderFailure,
  createOrderRequest,
  confirmOrderRequest,
  confirmOrderSuccess,
  confirmOrderFailure,
  resetCreateBookSlice,
  resetConfirmBookSlice,
  fetchFilterPackageGroupSuccess,
  fetchFilterPackageGroupRequest,
  fetchFilterPackageGroupFailure,
} = PackageGroupSlice.actions;

export default PackageGroupSlice.reducer;
