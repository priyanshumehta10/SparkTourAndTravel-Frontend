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
  createOrderSuccess,
  createOrderFailure,
  createOrderRequest,
  confirmOrderRequest,
  confirmOrderSuccess,
  confirmOrderFailure,
  fetchFilterPackageGroupSuccess,
  fetchFilterPackageGroupRequest,
  fetchFilterPackageGroupFailure
} from "./slice";
import {
  getPackageGroupsData,
  getPackagesByGroupsData,
  getPackageDetailsData,
  createOrder,
  confirmOrder,
  getFilterPackageGroupsData
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

function* fetchFilterPackageGroupSaga(action: {
  type: string;
  payload: any;
}): SagaIterator {
  try {
    const data: any = yield call(getFilterPackageGroupsData,action.payload);
    console.log("data in saga", data);

    yield put(fetchFilterPackageGroupSuccess(data));
  } catch (error: any) {
    yield put(
      fetchFilterPackageGroupFailure(error.message || "Something went wrong")
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
      fetchPackageDetailsFailure(error.message || "Something went wrong")
    );
  }
}

function* createOrderSaga(action: { type: any; payload: any }): SagaIterator {
  try {
    const data: any = yield call(createOrder, action.payload);
    console.log("data in saga", data);

    yield put(createOrderSuccess(data));
  } catch (error: any) {
    yield put(createOrderFailure(error.message || "Something went wrong"));
  }
}

function* confirmOrderSaga(action: { type: any; payload: any }): SagaIterator {
  try {
    const data: any = yield call(confirmOrder, action.payload);
    console.log("data in saga", data);

    yield put(confirmOrderSuccess(data));
  } catch (error: any) {
    yield put(confirmOrderFailure(error.response.data.message || "Something went wrong"));
  }
}

export default function* homeSaga(): SagaIterator {
  yield takeLatest(fetchPackageGroupRequest.type, fetchPackageGroupSaga);
  yield takeLatest(fetchFilterPackageGroupRequest.type, fetchFilterPackageGroupSaga);
  yield takeLatest(fetchPackagesByGroupRequest.type, fetchPackagesByGroupSaga);
  yield takeLatest(fetchPackageDetailsRequest.type, fetchPackagesDetailsSaga);
  yield takeLatest(createOrderRequest.type, createOrderSaga);
  yield takeLatest(confirmOrderRequest.type, confirmOrderSaga);
}
