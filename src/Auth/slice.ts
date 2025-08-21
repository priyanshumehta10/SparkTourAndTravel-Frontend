import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    id: string;
    email: string;
    role: string; // ✅ add role here
    [key: string]: any;
  } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = true;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logOut(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = true;
    },
    logOutSuccess(state, _action) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logOutFailure(state) {
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { fetchUser, setUser, clearUser, logOut,logOutSuccess,logOutFailure } = authSlice.actions;
export default authSlice.reducer;
