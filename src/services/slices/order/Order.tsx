import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

export const orderInitialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurgerThunk = createAsyncThunk<TOrder, string[]>(
  'order/orderBurger',
  async (ingredients, { rejectWithValue }) => {
    const response = await orderBurgerApi(ingredients);
    if (response?.success) {
      return response.order;
    } else {
      return rejectWithValue('Ошибка при отправке заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    closeModal(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(orderBurgerThunk.rejected, (state, action) => {
      state.orderRequest = false;
      state.error = action.payload as string;
    });
    builder.addCase(
      orderBurgerThunk.fulfilled,
      (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      }
    );
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
