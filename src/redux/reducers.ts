import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "../features/Home/slice.ts";
import loginReducer from "../features/Login/slice.ts";
import dashboardReducer from "../features/Dashboard/slice.ts";
export default combineReducers({
  home: homeReducer,
  login: loginReducer,
  dashboard: dashboardReducer,
});
