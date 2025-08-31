import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchPackageGroupRequest,
  fetchPackageGroupSuccess,
  fetchPackageGroupFailure,
} from "./slice";
import {  getPackageGroupsData } from "../../service/api";

function* fetchPackageGroupSaga(): SagaIterator {
  try {
    const data: any = yield call(getPackageGroupsData);
    console.log("data in saga",data);
    
    yield put(fetchPackageGroupSuccess(data));
  } catch (error: any) {
    yield put(fetchPackageGroupFailure(error.message || "Something went wrong"));
  }
}

export default function* homeSaga(): SagaIterator {
  yield takeLatest(fetchPackageGroupRequest.type, fetchPackageGroupSaga);
}
