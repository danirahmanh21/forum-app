/*eslint linebreak-style: ["error", "windows"]*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS:'RECEIVE_THREADS',
  ADD_THREAD:'ADD_THREAD',
  UP_VOTE_THREAD:'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD:'DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads){
  return {
    type: ActionType.RECEIVE_THREADS,
    payload:{
      threads,
    },
  };
}

function addThreadActionCreator(thread){
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }){
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}


function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    const hasUpVoted = thread.upVotesBy.includes(authUser.id);

    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      if (hasUpVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.upvoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threads } = getState();
    const thread = threads.find((t) => t.id === threadId);
    const hasDownVoted = thread.downVotesBy.includes(authUser.id);

    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      if (hasDownVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.downvoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}


// function asyncUpVoteThread(threadId){
//   return async (dispatch, getState) => {
//     dispatch(showLoading());
//     const { authUser } = getState();
//     dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

//     try {
//       await api.upvoteThread(threadId);
//     } catch (error) {
//       alert(error.message);
//       dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
//     }

//     dispatch(hideLoading());
//   };
// }

// function asyncDownVoteThread(threadId){
//   return async (dispatch, getState) => {
//     dispatch(showLoading());
//     const { authUser } = getState();
//     dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

//     try {
//       await api.downvoteThread(threadId);
//     } catch (error) {
//       alert(error.message);
//       dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
//     }

//     dispatch(hideLoading());
//   };
// }

// function asyncNeutralVoteThread(threadId){
//   return async (dispatch, getState) => {
//     dispatch(showLoading());
//     const { authUser } = getState();
//     dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));

//     try {
//       await api.neutralizeVoteThread(threadId);
//     } catch (error) {
//       alert(error.message);
//       dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
//     }

//     dispatch(hideLoading());
//   };
// }

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};