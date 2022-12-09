import { combineReducers } from 'redux';

import auth from './auth';
import { dashboardAnalytics } from './dahboard';

import listStore, { projects } from './list';
import settings from './settings';

const rootReducer: any = combineReducers({
  auth,
  //   inbox,
  //   conversation,
  settings,
  dashboardAnalytics: dashboardAnalytics.reducer,
  projects: projects.reducer,
});

export default (state, action) =>
  action.type === 'USER_LOGOUT'
    ? rootReducer({ settings: state.settings }, action)
    : rootReducer(state, action);
