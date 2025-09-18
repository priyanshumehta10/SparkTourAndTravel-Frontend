import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  getAdminOrdersData,
  confirmCancel
} from "../../service/api";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchCancelConfirmReq,fetchCancelConfirmRequestSuccess,fetchCancelConfirmRequestFailure
} from "./slice";
import type { PayloadAction } from "@reduxjs/toolkit";



// Fetch all package groups
function* fetchOrdersSaga(): SagaIterator {
  try {
    const data: any = yield call(getAdminOrdersData);
    yield put(fetchOrdersSuccess(data));
  } catch (error: any) {
    yield put(fetchOrdersFailure(error.message || "Something went wrong"));
  }
}

function* fetchCancelConfirm(
  action: PayloadAction<any>
): SagaIterator {
  try {
    const data: any = yield call(confirmCancel, action.payload);

    yield put(fetchCancelConfirmRequestSuccess(data));
  } catch (error: any) {
    yield put(
      fetchCancelConfirmRequestFailure(error.message || "Something went wrong")
    );
  }
}


// Root saga
export default function* OrdersSaga(): SagaIterator {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
    yield takeLatest(fetchCancelConfirmReq.type, fetchCancelConfirm);

}
