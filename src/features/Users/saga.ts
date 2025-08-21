import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} from "./slice";
import { getUsersData, deleteUserAPI,updateUserAPI } from "../../service/api";

function* fetchUsersSaga(): SagaIterator {
  // ✅ return type
  try {
    const data: any = yield call(getUsersData);
    yield put(fetchUsersSuccess(data));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message || "Something went wrong"));
  }
}
function* deleteUserSaga(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;
    yield call(deleteUserAPI, id);
    yield put(deleteUserSuccess(id));
  } catch (error: any) {
    yield put(deleteUserFailure(error.message || "Failed to delete user"));
  }
}

function* updateUserSaga(action: {
  type: string;
  payload: { id: string; name: string; email: string; role: string };
}): SagaIterator {
  try {
    const { id, name, email, role } = action.payload;

    // Pass each argument individually
    const updatedUser = yield call(updateUserAPI, name, email, role, id);

    yield put(updateUserSuccess(updatedUser.user));
  } catch (error: any) {
    yield put(updateUserFailure(error.message || "Failed to update user"));
  }
}


export default function* usersSaga(): SagaIterator {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga);
  yield takeLatest(updateUserRequest.type, updateUserSaga);
}
