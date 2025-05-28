/* eslint-disable linebreak-style */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

// test scenario for authUser thunk
// authUser action
// 1.should dispatch correct action on succesful login
// 2.should handle login failure and show alert
//3.should clear authUser and accessToken on logout

const fakeToken = 'fake-token';
const fakeAuthUser = {
  id: 'user-1',
  name: 'User Test 1',
  email: 'user@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeError = new Error('Login Failed');

describe('authUser async action', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccesToken = api.putAccessToken;
  });
  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccesToken;
  });

  it('should dispatch correct action on succesful login', async () => {
    api.login = () => Promise.resolve(fakeToken);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    api.putAccessToken = vi.fn();

    const dispatch = vi.fn();
    await asyncSetAuthUser({ email : 'user1@example.com', password: '123456' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should handle login failure and show alert', async () => {
    api.login = () => Promise.reject(fakeError);
    window.alert = vi.fn();

    const dispatch = vi.fn();
    await asyncSetAuthUser({ email: 'wrong', password: 'wrong' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should clear authUser and accessToken on logout', () => {
    const dispatch = vi.fn();
    api.putAccessToken = vi.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});