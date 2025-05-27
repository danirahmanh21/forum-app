/* eslint-disable linebreak-style */

/* eslint-disable linebreak-style */
import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducers function', () => {
  it('should return initial state when given unknown action', () => {
    //arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    //action
    const nextState = threadsReducer(initialState, action);

    //assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the talks when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama test',
            body: 'Ini adalah thread pertama test',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua test',
            body: 'Ini adalah thread kedua test',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalCommentsq: 0
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the talks when given by ADD_THREADS action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama test',
        body: 'Ini adalah thread pertama test',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua tes',
          body: 'Ini adalah thread Kedua Tes',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0
        },
      },
    };


    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should handle UP_VOTE_THREAD correctly', () =>{
    const initialState = [
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

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action: upvote
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['users-1'],
        downVotesBy: [],
      },
    ]);

    // action: toggle upvote off
    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

  it('should handle DOWN_VOTE_THREAD correctly', () =>{
    const initialState = [
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

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action: upvote
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: ['users-1'],
      },
    ]);

    // action: toggle upvote off
    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });

});

