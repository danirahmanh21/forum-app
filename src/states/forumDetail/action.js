/*eslint linebreak-style: ["error", "windows"]*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL:'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL:'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',

  UP_VOTE_COMMENT:'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT:'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT:'NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator(){
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator(userId){
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId){
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralVoteThreadDetailActionCreator(userId){
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId){
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) =>{
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const hasUpvoted = threadDetail.upVotesBy.includes(authUser.id);

    //update ui instasntly
    dispatch(upVoteThreadDetailActionCreator(authUser.id));

    try {
      if (hasUpvoted) {
        // if already upvoted, neutralize the vote
        await api.neutralizeVoteThread(threadDetail.id);
      } else {

        //if not yet upvoted, upvote the thread
        await api.upvoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThreadDetail(threadId){
  return async (dispatch, getState) =>{
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    const hasDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    //update ui instasntly
    dispatch(downVoteThreadDetailActionCreator(authUser.id));

    try {
      if (hasDownVoted) {
        // if already downvoted, neutralize the vote
        await api.neutralizeVoteThread(threadDetail.id);
      } else {
        //if not yet downvoted, downvote the thread
        await api.downvoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

// function asyncUpVoteThreadDetail(){
//   return async (dispatch, getState) =>{
//     dispatch(showLoading());
//     const { authUser, threadDetail } = getState();
//     dispatch(upVoteThreadDetailActionCreator(authUser.id));

//     try {
//       await api.upvoteThread(threadDetail.id);
//     } catch (error) {
//       alert(error.message);
//     }

//     dispatch(hideLoading());
//   };
// }

// function asyncDownVoteThreadDetail(){
//   return async (dispatch, getState) =>{
//     dispatch(showLoading());
//     const { authUser, threadDetail } = getState();
//     dispatch(downVoteThreadDetailActionCreator(authUser.id));

//     try {
//       await api.downvoteThread(threadDetail.id);
//     } catch (error) {
//       alert(error.message);
//     }

//     dispatch(hideLoading());
//   };
// }

// function asyncNeutralVoteThreadDetail() {
//   return async (dispatch, getState) => {
//     dispatch(showLoading());
//     const { authUser, threadDetail } = getState();
//     dispatch(neutralVoteThreadDetailActionCreator(authUser.id));

//     try {
//       await api.neutralizeVoteThread(threadDetail.id);
//     } catch (error) {
//       alert(error.message);
//     }

//     dispatch(hideLoading());
//   };
// }

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upvoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downvoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralizeVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createComment({ threadId, content });
      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}


export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncAddComment,
};