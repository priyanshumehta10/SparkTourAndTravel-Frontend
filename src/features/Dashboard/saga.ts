import { put, takeLatest, delay } from "redux-saga/effects";
import {
  fetchDashboardStatsRequest,
  fetchDashboardStatsSuccess,
  fetchDashboardStatsFailure,
} from "./slice.ts";

function* fetchDashboardStatsSaga() {
  try {
    // simulate API call delay
    yield delay(800);

    // mock data
    const mockStats = {
      users: 120,
      posts: 350,
      sales: 78,
    };

    yield put(fetchDashboardStatsSuccess(mockStats));
  } catch (error) {
    yield put(fetchDashboardStatsFailure("Failed to load dashboard data"));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardStatsRequest.type, fetchDashboardStatsSaga);
}
