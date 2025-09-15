import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchMyOrdersRequest,
  fetchMyOrdersSuccess,
  fetchMyOrdersFailure,

} from "./slice";
import {
  getMyOrdersData,

} from "../../service/api";
import type { PayloadAction } from "@reduxjs/toolkit";

function* fetchMyOrdersSaga(action: PayloadAction<any>): SagaIterator {
  try {
    const data: any = yield call(getMyOrdersData,action.payload);
    console.log("data in saga", data);

    yield put(fetchMyOrdersSuccess(data));
  } catch (error: any) {
    yield put(
      fetchMyOrdersFailure(error.message || "Something went wrong")
    );
  }
}



export default function* ordersSaga(): SagaIterator {
  yield takeLatest(fetchMyOrdersRequest.type, fetchMyOrdersSaga);

}
