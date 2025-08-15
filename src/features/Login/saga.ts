import { put, takeLatest, delay } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "./slice";

function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const { username, password } = action.payload;

    // Simulate API call delay
    yield delay(800);

    // Dummy authentication logic
    if (password === "admin123") {
      yield put(loginSuccess({ username, role: "admin" }));
    } else if (password === "user123") {
      yield put(loginSuccess({ username, role: "user" }));
    } else {
      yield put(loginFailure("Invalid username or password"));
    }
  } catch {
    yield put(loginFailure("Something went wrong"));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
