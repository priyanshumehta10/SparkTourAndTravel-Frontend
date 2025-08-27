import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    _id?: string;
}

interface ImageItem {
    url: string;
    public_id: string;
    _id: string;
}

export interface PackageData {
    _id: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    finalPrice: number;
    duration: string;
    images: ImageItem[];
    itinerary: ItineraryDay[];
    Hot: boolean; 
}

export interface PackagesStatePCK {
  dataPerPck?: PackageData;  
  loadingPerPck: boolean;
  error: string | null;
}
interface PackagesState {
  data: any[];
  loading: boolean;
  error: string | null;
  created: boolean;
  loadingPck: boolean;
  edited: boolean;
  loadingPerPck: boolean;
  dataPerPck?: PackagesStatePCK | null;
  tagData?: any[];
}

const initialState: PackagesState = {
  data: [],
  loading: false,
  error: null,
  created: false,
  loadingPck: false,
  edited: false,
  loadingPerPck: false,
  dataPerPck: undefined,
  tagData: []
};

const PackagesSlice = createSlice({
  name: "Packages",
  initialState,
  reducers: {
    fetchPackageRequest: (state, _action: PayloadAction<string>) => {
      state.loadingPerPck = true;
      state.error = null;
    },
    fetchPackageSuccess: (state, action: PayloadAction<PackagesStatePCK>) => {
        
      state.loadingPerPck = false;
      state.dataPerPck = action.payload;
      state.error = null;
    },
    fetchPackageFailure: (state, action: PayloadAction<string>) => {
      state.loadingPerPck = false;
      state.error = action.payload;
    },
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
     fetchAllTagRequest: (state) => {
      state.loadingPck = true;
      state.error = null;
    },
    fetchAllTagSuccess: (state, action: PayloadAction<any[]>) => {
        
      state.loadingPck = false;
      state.tagData = action.payload;
      state.error = null;
    },
    fetchAllTagFailure: (state, action: PayloadAction<string>) => {
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
    editPackageRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      state.edited = false;
    },
    editPackageSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (state.data) {
        state.data = [action.payload, ...state.data];
      }
      state.error = null;
      state.edited = true;
    },
    editPackageFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.edited = false;
    },
    resetCreated: (state) => {
      state.created = false;
      state.edited = false;
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
  fetchPackageRequest,
  fetchPackageSuccess,
  fetchPackageFailure,
  editPackageRequest,
  editPackageSuccess,
  editPackageFailure,
  resetCreated,
  fetchAllTagFailure,
  fetchAllTagSuccess,
  fetchAllTagRequest
} = PackagesSlice.actions;
export default PackagesSlice.reducer;