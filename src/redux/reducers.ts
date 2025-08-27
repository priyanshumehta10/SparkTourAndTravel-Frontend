import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "../features/Home/slice.ts";
import loginReducer from "../features/Login/slice.ts";
import dashboardReducer from "../features/Dashboard/slice.ts";
import authSlice from "../Auth/slice.ts";
import usersSlice from "../features/Users/slice.ts"
import inquirySlice from "../features/Inquiries/slice.ts"
import ReviewSlice from "../features/Review/slice.ts";
import PackagesSlice from "../features/Packages/slice.ts";
import SignupSlice from "../features/Signup/slice.ts";
import PackageGroupsSaga from "../features/PackagesGroup/slice.ts";
export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  dashboard: dashboardReducer,
  auth: authSlice,
  users: usersSlice,
  inquiry: inquirySlice,
  review: ReviewSlice,
  packages: PackagesSlice,
  signup: SignupSlice,
  packageGroups: PackageGroupsSaga,
});
