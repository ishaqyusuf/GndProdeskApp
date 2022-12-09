import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const middleware: any[] = [];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
if (__DEV__) middleware.push(createLogger());

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});
const persistor = persistStore(store);

export { store, persistor };
