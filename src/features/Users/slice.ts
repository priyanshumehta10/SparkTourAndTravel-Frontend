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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    // ✅ Delete user reducers
    deleteUserRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      // remove deleted user from data
      if (state.data) {
        state.data = state.data.filter(
          (user: any) => user._id !== action.payload
        );
      }
      state.error = null;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      // Update the user inside state.data array
      if (state.data) {
        state.data = state.data.map((u: any) =>
          u._id === action.payload.id ? action.payload : u
        );
      }
      state.error = null;
    },

    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
