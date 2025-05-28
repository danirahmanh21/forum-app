/* eslint-disable linebreak-style */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncReceiveUsers, receiveUsersActionCreator } from './action';

const fakeUsers = [
  {
    id: 'user-1',
    name: 'User Test 1',
    email: 'user@example.com',
    avatar: 'https://generated-image-url.jpg'
  },
];

describe('asyncReceiveUsers thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
  });
  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
  });

  it('should dispatch users on success', async () => {
    api.getAllUsers = () => Promise.resolve({ users: fakeUsers });
    const dispatch = vi.fn();

    await asyncReceiveUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
  });

  it('should call alert on failure', async () => {
    api.getAllUsers = () => Promise.reject(new Error('Failed'));
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncReceiveUsers()(dispatch);

    expect(window.alert).toHaveBeenCalledWith('Failed');
  });
});