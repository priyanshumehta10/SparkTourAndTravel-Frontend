import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { signupUser } from "../../service/api";
import { signupRequest, signupSuccess, signupFailure } from "./slice";
import { fetchUser } from "../../Auth/slice"; // action to check user after signup

function* signupSaga(action: { type: string; payload: { email: string; password: string; name:string; } }): SagaIterator {
  try {
    // 1️⃣ signup API
    const data: any = yield call(signupUser, action.payload.email, action.payload.password,action.payload.name);
    yield put(signupSuccess(data));

    // 2️⃣ Immediately fetch user info after signup
    yield put(fetchUser()); // ✅ no hooks needed

  } catch (error: any) {
    yield put(signupFailure(error.response.data.message || "signup failed"));
  }
}

export default function* authWatcherSaga(): SagaIterator {
  yield takeLatest(signupRequest.type, signupSaga);
}
