import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types for data received from backend
interface UsersStats {
  total: number;
  admins: number;
  normalUsers: number;
}

interface PackagesStats {
  total: number;
}

interface InquiriesStats {
  total: number;
}

interface BookingByPackage {
  packageTitle: string;
  count: number;
}

interface BookingByMonth {
  month: number;
  count: number;
}

interface BookingsStats {
  total: number;
  revenue: number;
  byPackage: BookingByPackage[];
  byMonth: BookingByMonth[];
}

export interface DashboardStats {
  users: UsersStats;
  packages: PackagesStats;
  inquiries: InquiriesStats;
  bookings: BookingsStats;
}

export interface DashboardState {
  stats: DashboardStats | null;
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
      state.stats = null;
    },
    fetchDashboardStatsSuccess: (
      state,
      action: PayloadAction<DashboardStats>
    ) => {
      state.loading = false;
      state.stats = action.payload;
    },
    fetchDashboardStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.stats = null;
    },
  },
});

export const {
  fetchDashboardStatsRequest,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
