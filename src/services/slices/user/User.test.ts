import { userInitialState, registerUserThunk, loginUserThunk, getUserDataThunk, updateUserDataThunk, getUserOrdersThunk } from './User';
import userReducer from '@slices/user/User';
import * as mocks from './mock-user-data';

import { describe, test, expect } from '@jest/globals';

const payloadLoginData = mocks.loginDataMock;
const payloadUpdateData = mocks.updateDataMock;
const payloadUserOrdersData = mocks.userOrdersMock;

afterEach(() => {
  jest.clearAllMocks();
});

describe('tests for async function `registerUserThunk`', () => {
  test('pending test', () => { 
    const action = { type: registerUserThunk.pending.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = 'Failed to send register data :('
    const action = { type: registerUserThunk.rejected.type, payload: error };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: registerUserThunk.fulfilled.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('idle');
    expect(state.error).toBeNull;
  })
})

describe('tests for async function `loginUserThunk`', () => {
  test('pending test', () => { 
    const action = { type: loginUserThunk.pending.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = 'Failed to login :('
    const action = { type: loginUserThunk.rejected.type, payload: error };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('failed');
    expect(state.isAuth).toBe(false);
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: loginUserThunk.fulfilled.type, payload: payloadLoginData };
    const state = userReducer(userInitialState, action);

    if (state.user && state.user.user) {
      expect(state.status).toBe('succeeded');
      expect(state.isAuth).toBe(true);
      expect(state.user.user).toEqual(payloadLoginData);
      expect(state.error).toBeNull;
    }
  })
})

describe('tests for async function `getUserDataThunk`', () => {
  test('pending test', () => { 
    const action = { type: getUserDataThunk.pending.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = 'Failed to fetch user token :('
    const action = { type: getUserDataThunk.rejected.type, payload: error };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: getUserDataThunk.fulfilled.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.error).toBeNull;
  })
})

describe('tests for async function `updateUserDataThunk`', () => {
  test('pending test', () => { 
    const action = { type: updateUserDataThunk.pending.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = 'Failed to update user data :('
    const action = { type: updateUserDataThunk.rejected.type, payload: error };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: updateUserDataThunk.fulfilled.type, payload: payloadUpdateData };
    const state = userReducer(userInitialState, action);

    if (state.user && state.user.user) {
      expect(state.status).toBe('succeeded');
      expect(state.user.user.email).toEqual(payloadUpdateData.email);
      expect(state.user.user.name).toEqual(payloadUpdateData.name);
      expect(state.error).toBeNull;
    }
  })
})

describe('tests for async function `getUserOrdersThunk`', () => {
  test('pending test', () => { 
    const action = { type: getUserOrdersThunk.pending.type };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = `Failed to fetch user's orders :(`
    const action = { type: getUserOrdersThunk.rejected.type, payload: error };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: getUserOrdersThunk.fulfilled.type, payload: payloadUserOrdersData };
    const state = userReducer(userInitialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.usersOrders).toEqual(payloadUserOrdersData);
    expect(state.error).toBeNull;
  })
})
