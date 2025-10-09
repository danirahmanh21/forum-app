/*eslint linebreak-style: ["error", "windows"]*/

import React, {  useEffect  } from 'react';
import ForumItem from '../components/ForumItem';
import ForumDetail from '../components/ForumDetail';
import ForumReplyInput from '../components/ForumReplyInput';
import {  useDispatch, useSelector  } from 'react-redux';
import {  asyncAddComment, asyncToggleDownVoteThreadDetail, asyncReceiveThreadDetail, asyncToggleUpVoteThreadDetail  } from '../states/forumDetail/action';
import {  useParams  } from 'react-router-dom';
import {  postedAt  } from '../utils';

function DetailPage(){
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states)=>states);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onComment = (content)=>{
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVote = () =>{
    dispatch(asyncToggleUpVoteThreadDetail(id));
  };

  const onDownVote = () =>{
    dispatch(asyncToggleDownVoteThreadDetail(id));
  };

  console.log('threadid is:', id);
  if (!threadDetail){
    return null;
  };
  return (
    <section className='detail-page'>
      {
        threadDetail.parent && (
          <div className='detail-page__parent'>
            <h3>Replying To</h3>
            <ForumItem { ...threadDetail.parent } authUser={ authUser.id }/>
          </div>
        )
      }
      <ForumDetail { ...threadDetail }
        authUser={ authUser.id }
        upVote={ onUpVote }
        downVote={ onDownVote }
      />
      <ForumReplyInput replyForum={ onComment }/>
      <section className='detail-page__comments'>
        <h3>Comments ({ threadDetail.comments.length })</h3>
        { threadDetail.comments.map((comment) => (
          <div key={ comment.id } className='comment-card'>
            <div className='comment-user-info'>
              { comment.owner.avatar && <img src={ comment.owner.avatar } alt={ comment.owner.name } /> }
              <strong>{ comment.owner.name }</strong>
              <span className='comment-date'>{ postedAt(comment.createdAt) }</span>
            </div>
            <p>{ comment.content }</p>
          </div>
        )) }
      </section>
    </section>
  );
}
export default DetailPage;