import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchPackageGroupRequest,
  fetchPackageGroupSuccess,
  fetchPackageGroupFailure,
  fetchPackagesByGroupRequest,
  fetchPackagesByGroupRequestSuccess,
  fetchPackagesByGroupRequestFailure,
  fetchPackageDetailsRequest,
  fetchPackageDetailsSuccess,
  fetchPackageDetailsFailure,
} from "./slice";
import {
  getPackageGroupsData,
  getPackagesByGroupsData,
  getPackageDetailsData,
} from "../../service/api";

function* fetchPackageGroupSaga(): SagaIterator {
  try {
    const data: any = yield call(getPackageGroupsData);
    console.log("data in saga", data);

    yield put(fetchPackageGroupSuccess(data));
  } catch (error: any) {
    yield put(
      fetchPackageGroupFailure(error.message || "Something went wrong")
    );
  }
}

function* fetchPackagesByGroupSaga(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;

    const data: any = yield call(getPackagesByGroupsData, id);
    console.log("data in saga", data);

    yield put(fetchPackagesByGroupRequestSuccess(data));
  } catch (error: any) {
    yield put(
      fetchPackagesByGroupRequestFailure(
        error.message || "Something went wrong"
      )
    );
  }
}

function* fetchPackagesDetailsSaga(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;

    const data: any = yield call(getPackageDetailsData, id);
    console.log("data in saga", data);

    yield put(fetchPackageDetailsSuccess(data));
  } catch (error: any) {
    yield put(
      fetchPackageDetailsFailure(
        error.message || "Something went wrong"
      )
    );
  }
}

export default function* homeSaga(): SagaIterator {
  yield takeLatest(fetchPackageGroupRequest.type, fetchPackageGroupSaga);
  yield takeLatest(fetchPackagesByGroupRequest.type, fetchPackagesByGroupSaga);
    yield takeLatest(fetchPackageDetailsRequest.type, fetchPackagesDetailsSaga);

}
