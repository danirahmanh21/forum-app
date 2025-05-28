/* eslint-disable linebreak-style */
import { describe, expect, it } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

// test scenario for users reducer
// users reducer
// 1.should return users when given RECEIVE_USERS action


describe('usersReducer', () =>{
  it('should return users when given RECEIVE_USERS action', () => {
    const initialState = [];
    const users = [
      { email: 'tes@example.com', name: 'tes1' },
      { email: 'tes2@example.com', name: 'tes2' },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(users);
  });
});