/*eslint linebreak-style: ["error", "windows"]*/

import { ActionType } from './action';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    if (!action.payload?.users) {
      console.warn('RECEIVE_USERS received but no users found in payload.');
      return users;
    }
    return action.payload.users;
  default:
    return users;
  }
}


export default usersReducer;