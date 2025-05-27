/*eslint linebreak-style: ["error", "windows"]*/

import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { postedAt } from '../utils';


function ForumDetail({
  id, title, body, createdAt, upVotesBy, downVotesBy, owner, authUser, upVote, downVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);
  return (
    <section className="forum-detail">
      <header>
        <img src={owner.avatar} alt={owner}/>
        <div className="forum-detail___user-info">
          <p className="forum-detail___user-name">{owner.name}</p>
          <p className="forum-detail___user-id">@{owner.id}</p>
        </div>
      </header>

      <article>
        <h2 className="forum-detail__title">{title}</h2>
        <p className="forum-detail__body">{body}</p>
      </article>

      <footer>
        <div className="forum-detail__vote">
          <button type="button" aria-label="upvote" onClick={() => upVote(id)}>
            {isUpVoted ? <FaArrowAltCircleUp style={{ color: 'blue' }}/> : <FaRegArrowAltCircleUp />}
          </button>
          <span>
            {upVotesBy.length}
            {' '}
                        Votes
          </span>
          <button type="button" aria-label="downvote" onClick={() => downVote(id)}>
            {isDownVoted ? <FaArrowAltCircleDown style={{ color: 'red' }}/> : <FaRegArrowAltCircleDown />}
          </button>
          <span>
            {downVotesBy.length}
            {' '}
                        Votes
          </span>
        </div>
        <p className="forum-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ForumDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ForumDetail;