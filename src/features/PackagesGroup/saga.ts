import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  getPackageGroupsData,
  getPackageGroupData,
  createPackageGroupData,
  editPackageGroupData,
  deletePackageGroupAPI,
} from "../../service/api";
import {
  fetchPackageGroupsRequest,
  fetchPackageGroupsSuccess,
  fetchPackageGroupsFailure,
  fetchPackageGroupRequest,
  fetchPackageGroupSuccess,
  fetchPackageGroupFailure,
  createPackageGroupRequest,
  createPackageGroupSuccess,
  createPackageGroupFailure,
  editPackageGroupRequest,
  editPackageGroupSuccess,
  editPackageGroupFailure,
  deletePackageGroupRequest,
  deletePackageGroupSuccess,
  deletePackageGroupFailure,
} from "./slice";



// Fetch all package groups
function* fetchPackageGroupsSaga(): SagaIterator {
  try {
    const data: any = yield call(getPackageGroupsData);
    yield put(fetchPackageGroupsSuccess(data));
  } catch (error: any) {
    yield put(fetchPackageGroupsFailure(error.message || "Something went wrong"));
  }
}

// Fetch single package group
function* fetchPackageGroupSaga(action: { type: string; payload: string }): SagaIterator {
  try {
    const id = action.payload;
    const data: any = yield call(getPackageGroupData, id);
    yield put(fetchPackageGroupSuccess({ data }));
  } catch (error: any) {
    yield put(fetchPackageGroupFailure(error.message || "Something went wrong"));
  }
}

// Create package group
function* createPackageGroupSaga(action: { type: any; payload: any }): SagaIterator {
  try {
    const data: any = yield call(createPackageGroupData, action.payload);
    yield put(createPackageGroupSuccess(data));
  } catch (error: any) {
    yield put(createPackageGroupFailure(error.message || "Failed to create package group"));
  }
}

// Edit package group
function* editPackageGroupSaga(action: { type: any; payload: any }): SagaIterator {
  try {
    const data: any = yield call(editPackageGroupData, action.payload);
    yield put(editPackageGroupSuccess(data));
  } catch (error: any) {
    yield put(editPackageGroupFailure(error.message || "Failed to edit package group"));
  }
}

// Delete package group
function* deletePackageGroupSaga(action: { type: string; payload: string }): SagaIterator {
  try {
    const id = action.payload;
    yield call(deletePackageGroupAPI, id);
    yield put(deletePackageGroupSuccess(id));
  } catch (error: any) {
    yield put(deletePackageGroupFailure(error.message || "Failed to delete package group"));
  }
}

// Root saga
export default function* PackageGroupsSaga(): SagaIterator {
  yield takeLatest(fetchPackageGroupsRequest.type, fetchPackageGroupsSaga);
  yield takeLatest(fetchPackageGroupRequest.type, fetchPackageGroupSaga);
  yield takeLatest(createPackageGroupRequest.type, createPackageGroupSaga);
  yield takeLatest(editPackageGroupRequest.type, editPackageGroupSaga);
  yield takeLatest(deletePackageGroupRequest.type, deletePackageGroupSaga);
}
