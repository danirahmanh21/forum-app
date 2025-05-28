/* eslint-disable linebreak-style */
import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

// test scenario for isPreload reducer
// isPreload reducer
// 1.should return initial state when given unknown action
// 2.should return false when given SET_IS_PRELOAD with false
// 3.should return true when given SET_IS_PRELOAD with true

describe('isPreloadReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should return false when given SET_IS_PRELOAD with false', () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(false);
  });

  it('should return true when given SET_IS_PRELOAD with true', () => {
    const initialState = false;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: true },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(true);
  });
});