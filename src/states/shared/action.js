/*eslint linebreak-style: ["error", "windows"]*/

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';

function asyncPopulateUsersAndThreads(){
  return async (dispatch) =>{
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      console.log('Fetched users:', users);
      console.log('Fetched threads:', threads);

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      console.error('Error in asyncPopulateUsersAndThreads:', error);
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}


export { asyncPopulateUsersAndThreads };