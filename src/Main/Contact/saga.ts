// features/Inquiry/saga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import { CreateInquiryData } from "../../service/api";
import {
  createInquiryFailure,
  createInquirySuccess,
  createInquiryRequest
} from "./slice";



function* createInquirySaga(action: { type: any; payload: FormData }): SagaIterator {
  try {
    const data: any = yield call(CreateInquiryData, action.payload);
    console.log(data);
    
    // API should return the created Inquiry object
    yield put(createInquirySuccess(data.message));
  } catch (error: any) {
    console.log(error);
    
    yield put(createInquiryFailure(error.response.data.message || "Failed to create Inquiry"));
  }
}


export default function* InquirySaga(): SagaIterator {
  yield takeLatest(createInquiryRequest.type, createInquirySaga);
}
