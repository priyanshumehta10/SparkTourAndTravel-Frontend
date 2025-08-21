import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { loginUser } from "../../service/api";
import { loginRequest, loginSuccess, loginFailure } from "./slice";
import { fetchUser } from "../../Auth/slice"; // action to check user after login

function* loginSaga(action: { type: string; payload: { email: string; password: string } }): SagaIterator {
  try {
    // 1️⃣ Login API
    const data: any = yield call(loginUser, action.payload.email, action.payload.password);
    yield put(loginSuccess(data));

    // 2️⃣ Immediately fetch user info after login
    yield put(fetchUser()); // ✅ no hooks needed

  } catch (error: any) {
    yield put(loginFailure(error.message || "Login failed"));
  }
}

export default function* authWatcherSaga(): SagaIterator {
  yield takeLatest(loginRequest.type, loginSaga);
}
