import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from './cartRedux';
import userReducer from './userRedux';
//import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootRedurer = combineReducers({ user:userReducer, cart:cartReducer});

const persistedReducer = persistReducer(persistConfig, rootRedurer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
