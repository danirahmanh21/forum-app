/* eslint-disable linebreak-style */
import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return authUser when given SET_AUTH_USER action', () => {
    const initialState = null;
    const user = { email: 'tes@example.com', name: 'tes1' };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: user },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(user);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = { email: 'tes@example.com', name: 'tes1' };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});