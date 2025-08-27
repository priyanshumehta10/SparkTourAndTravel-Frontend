// features/Review/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { getReviewData, deleteReviewAPI,CreateReviewData } from "../../service/api";
import {
  fetchReviewRequest,
  fetchReviewSuccess,
  fetchReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
  createReviewFailure,
  createReviewSuccess,
  createReviewRequest
} from "./slice";

function* fetchReviewSaga(): SagaIterator {
  try {
    const data: any = yield call(getReviewData);
    console.log(data);
    
    yield put(fetchReviewSuccess(data));
  } catch (error: any) {
    yield put(fetchReviewFailure(error.message || "Something went wrong"));
  }
}

function* deleteReviewSaga(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;
    yield call(deleteReviewAPI, id);
    yield put(deleteReviewSuccess(id));
  } catch (error: any) {
    yield put(deleteReviewFailure(error.message || "Failed to delete user"));
  }
}

function* createReviewSaga(action: { type: any; payload: FormData }): SagaIterator {
  try {
    const data: any = yield call(CreateReviewData, action.payload);
    // API should return the created review object
    yield put(createReviewSuccess(data));
  } catch (error: any) {
    yield put(createReviewFailure(error.message || "Failed to create review"));
  }
}


export default function* ReviewSaga(): SagaIterator {
  yield takeLatest(fetchReviewRequest.type, fetchReviewSaga);
  yield takeLatest(deleteReviewRequest.type, deleteReviewSaga);
  yield takeLatest(createReviewRequest.type, createReviewSaga);
}
