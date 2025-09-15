// features/forgetPassword/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { CreateforgetPasswordData,ResetPasswordData } from "../../service/api";
import {
  forgetPasswordFailure,
  forgetPasswordSuccess,
  forgetPasswordRequest,
  resetRequest,
  resetSuccess,
  resetFailure,
} from "./slice";

function* forgetPasswordSaga(action: {
  type: any;
  payload: any;
}): SagaIterator {
  try {
    const data: any = yield call(CreateforgetPasswordData, action.payload);
    // API should return the created forgetPassword object
    yield put(forgetPasswordSuccess(data));
  } catch (error: any) {
    yield put(
      forgetPasswordFailure(error.response.data.message || "Failed to create forgetPassword")
    );
  }
}

function* resetSaga(action: { type: any; payload: any }): SagaIterator {
  try {
    const data: any = yield call(ResetPasswordData, action.payload);
    // API should return the created forgetPassword object
    yield put(resetSuccess(data));
  } catch (error: any) {
    yield put(
      resetFailure(error.response.data.message || "Failed to create forgetPassword")
    );
  }
}

export default function* ForgetPasswordSaga(): SagaIterator {
  yield takeLatest(forgetPasswordRequest.type, forgetPasswordSaga);
  yield takeLatest(resetRequest.type, resetSaga);
}
