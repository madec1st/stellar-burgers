import { combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from '@slices/Ingredients';

export const rootReducer = combineReducers({
  getIngredients: ingredientReducer
});

export type TRootState = ReturnType<typeof rootReducer>;
