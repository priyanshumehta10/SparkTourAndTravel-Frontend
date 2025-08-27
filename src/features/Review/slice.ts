// features/Review/slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface ReviewState {
  data: any[];
  loading: boolean;
  error: string | null;
  created: boolean;
}

const initialState: ReviewState = {
  data: [],
  loading: false,
  error: null,
  created: false,
};

const ReviewSlice = createSlice({
  name: "Review",
  initialState,
  reducers: {
    fetchReviewRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchReviewFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteReviewSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      if (state.data) {
        state.data = state.data.filter(
          (review: any) => review._id !== action.payload
        );
      }
      state.error = null;
    },
    deleteReviewFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createReviewRequest: (state, _action: PayloadAction<FormData>) => {
      state.loading = true;
      state.error = null;
      state.created = false;
    },
    createReviewSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (state.data) {
        state.data = [action.payload, ...state.data]; // prepend new review
      }
      state.error = null;
      state.created = true;
    },
    createReviewFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.created = false;
    },

    resetCreated: (state) => {
      state.created = false;
    },
  },
});

export const {
  fetchReviewRequest,
  fetchReviewSuccess,
  fetchReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
  createReviewFailure,
  createReviewSuccess,
  createReviewRequest,
  resetCreated,
} = ReviewSlice.actions;
export default ReviewSlice.reducer;
