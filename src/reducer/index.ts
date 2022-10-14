import { combineReducers } from 'redux';

import auth from './auth';
import settings from './settings';
const rootReducer: any = combineReducers({
  auth,
  //   inbox,
  //   conversation,
  settings,
  //   notification,
  //   agent,
});

export default (state, action) =>
  action.type === 'USER_LOGOUT'
    ? rootReducer({ settings: state.settings }, action)
    : rootReducer(state, action);
