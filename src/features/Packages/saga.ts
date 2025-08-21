import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { getPackagesData, deletePackageAPI, createPackageData } from "../../service/api";
import {
  fetchPackagesRequest,
  fetchPackagesSuccess,
  fetchPackagesFailure,
  deletePackageRequest,
  deletePackageSuccess,
  deletePackageFailure,
  createPackageFailure,
  createPackageSuccess,
  createPackageRequest
} from "./slice";

function* fetchPackagesSaga(): SagaIterator {
  try {
    const data: any = yield call(getPackagesData);
    yield put(fetchPackagesSuccess(data));
  } catch (error: any) {
    yield put(fetchPackagesFailure(error.message || "Something went wrong"));
  }
}

function* deletePackageSaga(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;
    yield call(deletePackageAPI, id);
    yield put(deletePackageSuccess(id));
  } catch (error: any) {
    yield put(deletePackageFailure(error.message || "Failed to delete package"));
  }
}

function* createPackageSaga(action: {
  type: any;
  payload: any;
}): SagaIterator {
  try {
    const data: any = yield call(createPackageData, action.payload);
    yield put(createPackageSuccess(data));
  } catch (error: any) {
    yield put(createPackageFailure(error.message || "Failed to create package"));
  }
}

export default function* PackagesSaga(): SagaIterator {
  yield takeLatest(fetchPackagesRequest.type, fetchPackagesSaga);
  yield takeLatest(deletePackageRequest.type, deletePackageSaga);
  yield takeLatest(createPackageRequest.type, createPackageSaga);
}