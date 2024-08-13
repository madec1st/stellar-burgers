import { orderBurgerThunk, orderInitialState } from './Order';
import orderReducer from '@slices/order/Order';
import * as mocks from './mock-order-data';

import { describe, test, expect } from '@jest/globals';

const payloadData = mocks.orderMock;

afterEach(() => {
  jest.clearAllMocks();
});

describe('tests for async function `orderBurgerThunk`', () => {
  test('pending test', () => { 
    const action = { type: orderBurgerThunk.pending.type };
    const state = orderReducer(orderInitialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = 'Failed to send the order :('
    const action = { type: orderBurgerThunk.rejected.type, payload: error };
    const state = orderReducer(orderInitialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: orderBurgerThunk.fulfilled.type, payload: payloadData };
    const state = orderReducer(orderInitialState, action);

    expect(state.orderModalData).toBe(payloadData);
    expect(state.error).toBeNull;
  })
})