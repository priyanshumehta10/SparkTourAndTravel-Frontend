import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  getAdminOrdersData,
} from "../../service/api";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from "./slice";



// Fetch all package groups
function* fetchOrdersSaga(): SagaIterator {
  try {
    const data: any = yield call(getAdminOrdersData);
    yield put(fetchOrdersSuccess(data));
  } catch (error: any) {
    yield put(fetchOrdersFailure(error.message || "Something went wrong"));
  }
}



// Root saga
export default function* OrdersSaga(): SagaIterator {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
}
