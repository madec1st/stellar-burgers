import { combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from '@slices/Ingredients';
import userReducer from '@slices/User';
import orderDeducer from '@slices/Order';
import feedReducer from '@slices/Feed';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  user: userReducer,
  order: orderDeducer,
  feed: feedReducer
});

export type TRootState = ReturnType<typeof rootReducer>;
