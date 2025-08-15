import { put, takeLatest, delay } from "redux-saga/effects";
import { fetchHomeDataRequest, fetchHomeDataSuccess, fetchHomeDataFailure } from "./slice.ts";

function* fetchHomeDataSaga() {
  try {
    yield delay(500);
    yield put(fetchHomeDataSuccess({ message: "Home data loaded" }));
  } catch {
    yield put(fetchHomeDataFailure());
  }
}

export default function* homeSaga() {
  yield takeLatest(fetchHomeDataRequest.type, fetchHomeDataSaga);
}
