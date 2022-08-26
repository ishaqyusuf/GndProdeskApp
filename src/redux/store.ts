import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { listReducer as list } from './reducers/list';
import { formReducer as form } from './reducers/form';
import { authReducer as auth } from './reducers/auth';
import { dataReducer as data } from './reducers/data';

const rootReducer = combineReducers({
  list,
  form,
  auth,
  data,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
