import ingredientReducer, { ingredientInitialState } from '@slices/ingredients/Ingredients'
import * as mocks from './mock-ingredients-data';
import { fetchIngredientsThunk, addFilling, addBun, moveIngredientUp, moveIngredientDown, removeFilling } from "@slices/ingredients/Ingredients";
import { describe, test, expect } from '@jest/globals';

const payloadData = mocks.payloadMock;

const actionAddFilling = addFilling(mocks.fillingMock);
const actionAddBun = addBun(mocks.bunMock);
const actionMoveUp = moveIngredientUp(2);
const actionMoveDown = moveIngredientDown(0);
const actionRemoveFilling = removeFilling(mocks.fillingMock);

const fillingState = ingredientReducer(mocks.initialState, actionAddFilling);
const bunState = ingredientReducer(mocks.initialState, actionAddBun);
const movedUpIngredientState = ingredientReducer(mocks.selectedFillingMock, actionMoveUp);
const movedDownIngredientState = ingredientReducer(mocks.selectedFillingMock, actionMoveDown);
const stateWithRemovedIngredient = ingredientReducer(mocks.selectedFillingMock, actionRemoveFilling);

afterEach(() => {
  jest.clearAllMocks();
});

describe('tests for async function `fetchIngredientsThunk`', () => {
  test('pending test', () => { 
    const action = { type: fetchIngredientsThunk.pending.type };
    const state = ingredientReducer(ingredientInitialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull;
  }),

  test('rejected test', () => {
    const error = 'Failed to fetch ingredients :('
    const action = { type: fetchIngredientsThunk.rejected.type, payload: error };
    const state = ingredientReducer(ingredientInitialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  }),

  test('fulfilled test', async () => {
    const action = { type: fetchIngredientsThunk.fulfilled.type, payload: payloadData };
    const state = ingredientReducer(ingredientInitialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull;
    expect(state.data).toEqual(payloadData);
  })
})

describe('tests for adding ingredients', () => {
  test('addFilling test', () => {
    expect(fillingState).toEqual(mocks.expectedFillingState)
  }),

  test('addBun test', () => {
    expect(bunState).toEqual(mocks.expectedBunState)
  })
})

describe('tests for move ingredients', () => {
  test('moveIngredientUp test', () => {
    expect(movedUpIngredientState).toEqual(mocks.expectedStateWithMovedUp)
  }),

  test('moveIngredientDown test', () => {
    expect(movedDownIngredientState).toEqual(mocks.expectedStateWithMovedDown)
  })
})

describe('test for remove ingredient', () => {
  test('removeFilling test', () => {
    expect(stateWithRemovedIngredient).toEqual(mocks.expectedStateWithRemovedIngredient)
  })
})