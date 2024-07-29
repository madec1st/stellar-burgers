import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TInitialState = {
  data: TIngredient[];
  selected: {
    filling: TIngredient[];
    bun: TIngredient | null;
  };
  loading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  data: [],
  selected: {
    filling: [],
    bun: null
  },
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
    updateData: (state, action: PayloadAction<TIngredient[]>) => {
      state.data = action.payload;
    },
    addFilling: (state, action: PayloadAction<TIngredient>) => {
      state.selected.filling.push(action.payload);
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.selected.bun = action.payload;
    },
    removeFilling: (state, action: PayloadAction<TIngredient>) => {
      state.selected.filling = state.selected.filling.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
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

export const { updateData, addFilling, addBun, removeFilling } =
  ingredientSlice.actions;
export default ingredientSlice.reducer;
