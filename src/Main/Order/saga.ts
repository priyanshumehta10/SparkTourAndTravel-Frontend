import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchMyOrdersRequest,
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,
  fetchpayRemainingAmountRequest,
  fetchpayRemainingAmountSuccess,
  fetchpayRemainingAmountFailure,
  fetchCancel,
  fetchCancelRequestSuccess,
  fetchCancelRequestFailure,
} from "./slice";
import { getMyOrdersData, payRemaining,CancelRequest } from "../../service/api";
import type { PayloadAction } from "@reduxjs/toolkit";

function* fetchMyOrdersSaga(action: PayloadAction<any>): SagaIterator {
  try {
    const data: any = yield call(getMyOrdersData, action.payload);
    console.log("data in saga", data);

    yield put(fetchMyOrdersSuccess(data));
  } catch (error: any) {
    yield put(fetchMyOrdersFailure(error.message || "Something went wrong"));
  }
}

function* fetchpayRemainingAmount(action: PayloadAction<any>): SagaIterator {
  try {
    const data: any = yield call(payRemaining, action.payload);
    console.log("data in saga", data);

    yield put(fetchpayRemainingAmountSuccess(data));
  } catch (error: any) {
    yield put(
      fetchpayRemainingAmountFailure(error.message || "Something went wrong")
    );
  }
}

function* fetchCancelRequest(
  action: PayloadAction<{ bookingId: string; reason: string }>
): SagaIterator {
  try {
    const data: any = yield call(CancelRequest, action.payload);

    yield put(fetchCancelRequestSuccess(data));
  } catch (error: any) {
    yield put(
      fetchCancelRequestFailure(error.message || "Something went wrong")
    );
  }
}

export default function* ordersSaga(): SagaIterator {
  yield takeLatest(fetchMyOrdersRequest.type, fetchMyOrdersSaga);
  yield takeLatest(
    fetchpayRemainingAmountRequest.type,
    fetchpayRemainingAmount
  );
  yield takeLatest(fetchCancel.type, fetchCancelRequest);
}
