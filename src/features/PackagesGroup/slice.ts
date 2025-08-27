import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PackageGroupData {
  _id: string;
  name: string;
  photo: {
    url: string;
    public_id: string;
  };
  packages?: any[]; // optional: can define type if needed
  active?: boolean;
}

interface PackageGroupsState {
  data: PackageGroupData[];
  loading: boolean;
  error: string | null;
  created: boolean;
  loadingGroup: boolean;
  edited: boolean;
  loadingPerGroup: boolean;
  dataPerGroup?: PackageGroupData | null;
}

const initialState: PackageGroupsState = {
  data: [],
  loading: false,
  error: null,
  created: false,
  loadingGroup: false,
  edited: false,
  loadingPerGroup: false,
  dataPerGroup:  null,
};

const PackageGroupsSlice = createSlice({
  name: "PackageGroups",
  initialState,
  reducers: {
    // Fetch single group
    fetchPackageGroupRequest: (state, _action: PayloadAction<string>) => {
      state.loadingPerGroup = true;
      state.error = null;
    },
    fetchPackageGroupSuccess: (state, action: PayloadAction<any>) => {
      state.loadingPerGroup = false;
      state.dataPerGroup = action.payload.data;
      state.error = null;
    },
    fetchPackageGroupFailure: (state, action: PayloadAction<string>) => {
      state.loadingPerGroup = false;
      state.error = action.payload;
    },

    // Fetch all groups
    fetchPackageGroupsRequest: (state) => {
      state.loadingGroup = true;
      state.error = null;
    },
    fetchPackageGroupsSuccess: (state, action: PayloadAction<PackageGroupData[]>) => {
      state.loadingGroup = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchPackageGroupsFailure: (state, action: PayloadAction<string>) => {
      state.loadingGroup = false;
      state.error = action.payload;
    },

    // Delete group
    deletePackageGroupRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deletePackageGroupSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = state.data.filter((group) => group._id !== action.payload);
      state.error = null;
    },
    deletePackageGroupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create group
    createPackageGroupRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.created = false;
    },
    createPackageGroupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = [action.payload, ...state.data];
      state.error = null;
      state.created = true;
    },
    createPackageGroupFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.created = false;
    },

    // Edit group
    editPackageGroupRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.edited = false;
    },
    editPackageGroupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      // Replace old group with updated one
      state.data = state.data.map((g) =>
        g._id === action.payload._id ? action.payload : g
      );
      state.error = null;
      state.edited = true;
    },
    editPackageGroupFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.edited = false;
    },

    // Reset flags
    resetCreatedGroup: (state) => {
      state.created = false;
      state.edited = false;
    },
  },
});

export const {
  fetchPackageGroupsRequest,
  fetchPackageGroupsSuccess,
  fetchPackageGroupsFailure,
  fetchPackageGroupRequest,
  fetchPackageGroupSuccess,
  fetchPackageGroupFailure,
  deletePackageGroupRequest,
  deletePackageGroupSuccess,
  deletePackageGroupFailure,
  createPackageGroupRequest,
  createPackageGroupSuccess,
  createPackageGroupFailure,
  editPackageGroupRequest,
  editPackageGroupSuccess,
  editPackageGroupFailure,
  resetCreatedGroup,
} = PackageGroupsSlice.actions;

export default PackageGroupsSlice.reducer;
