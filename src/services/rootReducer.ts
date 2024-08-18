import { combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from '@slices/ingredients/Ingredients';
import userReducer from '@slices/user/User';
import orderReducer from '@slices/order/Order';
import feedReducer from '@slices/feed/Feed';

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  user: userReducer,
  order: orderReducer,
  feed: feedReducer
});

export type TRootState = ReturnType<typeof rootReducer>;
