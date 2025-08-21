// features/Inquiry/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { getInquiryData ,deleteInquiryAPI } from "../../service/api";
import { fetchInquiryRequest, fetchInquirySuccess, fetchInquiryFailure ,deleteInquiryRequest , deleteInquirySuccess , deleteInquiryFailure } from "./slice";

function* fetchInquirySaga(): SagaIterator {
  try {
    const data: any = yield call(getInquiryData);
    yield put(fetchInquirySuccess(data));
  } catch (error: any) {
    yield put(fetchInquiryFailure(error.message || "Something went wrong"));
  }
}

function* deleteInquirySaga(action: {
  type: string;
  payload: string;
}): SagaIterator {
  try {
    const id = action.payload;
    yield call(deleteInquiryAPI, id);
    yield put(deleteInquirySuccess(id));
  } catch (error: any) {
    yield put(deleteInquiryFailure(error.message || "Failed to delete user"));
  }
}



export default function* inquirySaga(): SagaIterator {
  yield takeLatest(fetchInquiryRequest.type, fetchInquirySaga);
    yield takeLatest(deleteInquiryRequest.type, deleteInquirySaga);

}
