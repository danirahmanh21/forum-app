/* eslint-disable linebreak-style */
import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

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