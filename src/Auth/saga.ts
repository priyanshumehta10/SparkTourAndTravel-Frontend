import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUser, setUser, clearUser,logOut,logOutSuccess,logOutFailure  } from "./slice"; // lowercase
import { checkLoginAPI, checkLogOutAPI } from "../service/api";
import type { SagaIterator } from "redux-saga";

function* checkLoginSaga(): SagaIterator {
  try {
    const data: any = yield call(checkLoginAPI);
    yield put(setUser(data.user));
  } catch (err) {
    yield put(clearUser());
  }
}

function* checkLogOutSaga(): SagaIterator {
  try {
    const data: any = yield call(checkLogOutAPI);
    yield put(logOutSuccess(data.user));
  } catch (err) {
    yield put(logOutFailure());
  }
}

export default function* AuthSaga(): SagaIterator {
  yield takeLatest(fetchUser.type, checkLoginSaga);
  yield takeLatest(logOut.type, checkLogOutSaga);
}
