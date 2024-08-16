import { feedApiThunk, feedInitialState } from './Feed';
import feedReducer from '@slices/feed/Feed';
import * as mocks from './mock-orders-data';

import { describe, test, expect } from '@jest/globals';

const payloadData = mocks.payloadMock;

afterEach(() => {
  jest.clearAllMocks();
});

describe('tests for async function `feedApiThunk`', () => {
  test('pending test', () => {
    const action = { type: feedApiThunk.pending.type };
    const state = feedReducer(feedInitialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull;
  }),
    test('rejected test', () => {
      const error = 'Failed to fetch orders :(';
      const action = { type: feedApiThunk.rejected.type, payload: error };
      const state = feedReducer(feedInitialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    }),
    test('fulfilled test', async () => {
      const action = {
        type: feedApiThunk.fulfilled.type,
        payload: payloadData
      };
      const state = feedReducer(feedInitialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBeNull;
      expect(state.orders).toEqual(payloadData.orders);
      expect(state.total).toEqual(payloadData.total);
      expect(state.totalToday).toEqual(payloadData.totalToday);
    });
});
