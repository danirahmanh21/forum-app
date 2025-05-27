/* eslint-disable linebreak-style */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread 1',
    body: 'Thread body 1',
    upVotesBy: [],
    downVotesBy: [],
    ownerId: 'users-1',
    createdAt: '2021-06-21T07:00:00.000Z',
  },
];

const fakeUsersResponse = [
  {
    'id': 'user-1',
    'name': 'User Test 1',
    'email': 'user@example.com',
    'avatar': 'https://generated-image-url.jpg'
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });


  it('should dispatch action correctly when data fetching success', async () =>{
    //arrange
    //stub implementaion
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    //mock dispatch
    const dispatch = vi.fn();

    //action
    await asyncPopulateUsersAndThreads()(dispatch);

    //assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () =>{
    //arrange
    //stub implementaion
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    //mock dispatch
    const dispatch = vi.fn();
    //mock allert
    window.alert = vi.fn();

    //action
    await asyncPopulateUsersAndThreads()(dispatch);

    //assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

});