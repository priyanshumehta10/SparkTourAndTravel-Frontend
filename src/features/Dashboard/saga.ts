import { put, takeLatest, call } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  fetchDashboardStatsRequest,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
} from "./slice.ts";
import { getDashboardAPI } from "../../service/api.ts";

function* fetchDashboardStatsSaga(): SagaIterator {
  try {
    const data: any = yield call(getDashboardAPI);

    yield put(fetchDashboardStatsSuccess(data));
  } catch (error) {
    yield put(fetchDashboardStatsFailure("Failed to load dashboard data"));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardStatsRequest.type, fetchDashboardStatsSaga);
}
