import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchHomeDataRequest,
  fetchHomeDataSuccess,
  fetchHomeDataFailure,
} from "./slice";
import { getHomeData } from "../../service/api";

function* fetchHomeDataSaga(): SagaIterator {   // ✅ return type
  try {
    const data: any = yield call(getHomeData);
    yield put(fetchHomeDataSuccess(data));
  } catch (error: any) {
    yield put(fetchHomeDataFailure(error.message || "Something went wrong"));
  }
}

export default function* homeSaga(): SagaIterator {
  yield takeLatest(fetchHomeDataRequest.type, fetchHomeDataSaga);
}
