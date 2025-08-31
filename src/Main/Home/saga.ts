import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchHomeDataRequest,
  fetchHomeDataSuccess,
  fetchHomeDataFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
} from "./slice";
import { getHomeData, getReviews } from "../../service/api";

function* fetchHomeDataSaga(): SagaIterator {
  // ✅ return type
  try {
    const data: any = yield call(getHomeData);
    yield put(fetchHomeDataSuccess(data));
  } catch (error: any) {
    yield put(fetchHomeDataFailure(error.message || "Something went wrong"));
  }
}

function* fetchReviewsSaga(): SagaIterator {
  // ✅ return type
  try {
    const data: any = yield call(getReviews);
    console.log("data in saga",data);
    
    yield put(fetchReviewsSuccess(data));
  } catch (error: any) {
    yield put(fetchReviewsFailure(error.message || "Something went wrong"));
  }
}

export default function* homeSaga(): SagaIterator {
  yield takeLatest(fetchHomeDataRequest.type, fetchHomeDataSaga);
  yield takeLatest(fetchReviewsRequest.type, fetchReviewsSaga);
}
