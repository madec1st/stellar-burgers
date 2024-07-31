import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TFeedState = TOrdersData & {
  moreDetailsOrder: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  moreDetailsOrder: null,
  loading: false,
  error: null
};

export const feedApiThunk = createAsyncThunk('feed', async (_, thunkAPI) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    viewFullOrder: (state, action: PayloadAction<TOrder>) => {
      state.moreDetailsOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(feedApiThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feedApiThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        feedApiThunk.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.error = null;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const { viewFullOrder } = feedSlice.actions;
export default feedSlice.reducer;
