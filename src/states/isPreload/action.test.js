/* eslint-disable linebreak-style */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setAuthUserActionCreator } from '../authUser/action';


const fakeUser = {
  id: 'user-1',
  name: 'User Test 1',
  email: 'user@example.com',
};

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
  });

  it('should dispatch correct actions when preload succeeds', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeUser);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch correct actions when preload fails', async () => {
    api.getOwnProfile = () => Promise.reject(new Error('Unauthorized'));
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});