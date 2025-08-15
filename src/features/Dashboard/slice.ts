import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface DashboardState {
  stats: Record<string, number> | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardStatsSuccess: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      state.loading = false;
      state.stats = action.payload;
    },
    fetchDashboardStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardStatsRequest,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
