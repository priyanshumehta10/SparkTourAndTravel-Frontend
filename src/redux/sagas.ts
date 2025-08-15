import { all } from "redux-saga/effects";
import homeSaga from "../features/Home/saga";
import loginSaga from "../features/Login/saga";
import dashboardSaga from "../features/Dashboard/saga";

export default function* rootSaga() {
  yield all([
    homeSaga(),
    loginSaga(),
    dashboardSaga(),
  ]);
}
