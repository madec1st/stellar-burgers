import { rootReducer } from './rootReducer';
import { feedInitialState } from '@slices/feed/Feed';
import { ingredientInitialState } from '@slices/ingredients/Ingredients';
import { orderInitialState } from '@slices/order/Order';
import { userInitialState } from '@slices/user/User';
import { describe, test, expect } from '@jest/globals';

const initialState = rootReducer(undefined, { type: '@@INIT' });
const actionState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

afterEach(() => {
  jest.clearAllMocks();
});

describe('tests for rootReducer', () => {
  test('initial state initialisation', () => {
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('user');

    expect(initialState.feed).toEqual(feedInitialState);
    expect(initialState.ingredients).toEqual(ingredientInitialState);
    expect(initialState.order).toEqual(orderInitialState);
    expect(initialState.user).toEqual(userInitialState);
  }),
    test('unknown action', () => {
      expect(actionState).toEqual(initialState);
    });
});
