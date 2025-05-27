/*eslint linebreak-style: ["error", "windows"]*/

import React from 'react';
import PropTypes from 'prop-types';
import ForumItem, { forumItemShape } from './ForumItem';

function ForumList({ threads, upVote, downVote, neutralVote, authUser }) {
  return (
    <div className="forum-list">
      {threads.map((thread) => (
        <ForumItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
          commentsCount={thread.commentsCount}
        />
      ))}
    </div>
  );
}

ForumList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(forumItemShape)),
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
  authUser: PropTypes.string,
};
export default ForumList;