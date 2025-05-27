/* eslint-disable react/react-in-jsx-scope */
/*eslint linebreak-style: ["error", "windows"]*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../states/threads/action';
import ForumInput from '../components/ForumInput';
import ForumList from '../components/ForumList';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) =>{
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onUpVote = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const onNeutralVote = (threadId) => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
    commentsCount: thread.totalComments || 0,
  }));
  console.log('threads from redux:', threads);
  console.log('users from redux:', users);
  console.log('authUser from redux:', authUser);
  return (
    <section className="home-page">
      <ForumInput addForum={onAddThread} />
      <ForumList
        threads={threadList}
        upVote={onUpVote}
        downVote={onDownVote}
        neutralVote={onNeutralVote}
        authUser={authUser.id}
      />
    </section>
  );
}

export default HomePage;