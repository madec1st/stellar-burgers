import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type TInitialState = {
  data: TIngredient[];
  selected: {
    filling: TConstructorIngredient[];
    bun: TConstructorIngredient | null;
  };
  moreDetailsIngredient: TIngredient | null;
  loading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  data: [],
  selected: {
    filling: [],
    bun: null
  },
  moreDetailsIngredient: null,
  loading: false,
  error: null
};

export const fetchIngredientsThunk = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addFilling: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.selected.filling.push(action.payload);
    },
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.selected.bun = action.payload;
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.selected.filling.length) {
        const temp = state.selected.filling[index - 1];
        state.selected.filling[index - 1] = state.selected.filling[index];
        state.selected.filling[index] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.selected.filling.length - 1) {
        const temp = state.selected.filling[index + 1];
        state.selected.filling[index + 1] = state.selected.filling[index];
        state.selected.filling[index] = temp;
      }
    },
    removeFilling: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.selected.filling = state.selected.filling.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    viewDetails: (state, action: PayloadAction<TIngredient>) => {
      state.moreDetailsIngredient = action.payload;
    },
    hideDetails: (state) => {
      state.moreDetailsIngredient = null;
    },
    clearConstructor: (state) => {
      state.selected.bun = null;
      state.selected.filling = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  }
});

export const {
  addFilling,
  addBun,
  moveIngredientUp,
  moveIngredientDown,
  removeFilling,
  viewDetails,
  hideDetails,
  clearConstructor
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
