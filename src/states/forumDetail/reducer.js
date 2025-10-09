/*eslint linebreak-style: ["error", "windows"]*/

import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  // case ActionType.UP_VOTE_THREAD_DETAIL:
  //   return {
  //     ...threadDetail,
  //     upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
  //       ? threadDetail.upVotesBy
  //       : threadDetail.upVotesBy.concat(action.payload.userId),
  //     downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
  //   };
  case ActionType.UP_VOTE_THREAD_DETAIL:
    const hasUpVoted = threadDetail.upVotesBy.includes(action.payload.userId);
    return {
      ...threadDetail,
      upVotesBy: hasUpVoted
        ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
        : [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };

  // case ActionType.DOWN_VOTE_THREAD_DETAIL:
  //   return {
  //     ...threadDetail,
  //     downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
  //       ? threadDetail.downVotesBy
  //       : threadDetail.downVotesBy.concat(action.payload.userId),
  //     upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
  //   };

  case ActionType.DOWN_VOTE_THREAD_DETAIL:
    const hasDownVoted = threadDetail.downVotesBy.includes(action.payload.userId);
    return {
      ...threadDetail,
      downVotesBy: hasDownVoted
        ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
        : [...threadDetail.downVotesBy, action.payload.userId],
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
    };

  case ActionType.UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy
              : comment.upVotesBy.concat(action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          }
          : comment
      ),
    };

  case ActionType.DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy
              : comment.downVotesBy.concat(action.payload.userId),
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          }
          : comment
      ),
    };

  case ActionType.NEUTRAL_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          }
          : comment
      ),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
