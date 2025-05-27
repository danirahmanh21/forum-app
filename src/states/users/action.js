/*eslint linebreak-style: ["error", "windows"]*/

import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  console.log('🚀 Creating RECEIVE_USERS action with:', users);

  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }){
  return async ()=>{
    try {
      await api.register({ name, email, password });
      alert('Registration Succesful!');
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncReceiveUsers(){
  return async (dispatch)=> {
    try {
      const { users } = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  asyncReceiveUsers,
  asyncRegisterUser,
  receiveUsersActionCreator,
};