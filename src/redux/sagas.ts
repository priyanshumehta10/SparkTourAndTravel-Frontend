import { all } from "redux-saga/effects";
import homeSaga from "../Main/Home/saga";
import loginSaga from "../features/Login/saga";
import dashboardSaga from "../features/Dashboard/saga";
import authSaga from "../Auth/saga";
import usersSaga from "../features/Users/saga";
import inquirySaga from "../features/Inquiries/saga";
import ReviewSaga from "../features/Review/saga";
import PackagesSaga from "../features/Packages/saga"; 
import SignupSaga from "../features/Signup/saga";
import PackageGroups from "../features/PackagesGroup/saga";
import InquirySaga from "../Main/Contact/saga";
import forgetPasswordSaga from "../features/ResetPassword/saga";
import PackageFrontSaga from "../Main/Packages/saga";

export default function* rootSaga() {
  yield all([
    homeSaga(),
    loginSaga(),
    dashboardSaga(),
    authSaga(),
    usersSaga(),
    inquirySaga(),
    ReviewSaga(),
    PackagesSaga(), 
    SignupSaga(),
    PackageGroups(),
    InquirySaga(),
    forgetPasswordSaga(),
    PackageFrontSaga(),
  ]);
}
