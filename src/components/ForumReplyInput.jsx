/* eslint-disable no-unused-vars */
/*eslint linebreak-style: ["error", "windows"]*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ForumReplyInput({ replyForum }){
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  function handleBodyChange({ target }) {
    if (target.value.length <= 8000){
      setBody(target.value);
    }
  }

  function replyForumHandler() {
    if (body.trim()){
      replyForum(body);
      setBody('');
      //navigate('/');
    }
  }

  return (
    <div className="talk-reply-input">
      <textarea type= "text" placeholder="send a reply" value={body} onChange={handleBodyChange} />
      <p className="talk-reply-input__char-left">
        <strong>{body.length}</strong>
                /8000
      </p>
      <button type="submit" onClick={replyForumHandler}>Reply</button>
    </div>
  );
}

ForumReplyInput.propTypes ={
  replyForum: PropTypes.func.isRequired,
};

export default ForumReplyInput;