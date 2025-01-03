import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import tokenReducer from "./tokenReducer";
import apiReducer from "./apiReducer";
import bcReducer from "./bcReducer";
import pcesAccsReducer from "./pcesAccsReducer";
import configReducer from "./configReducer";
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

import {
  persistReducer,
  persistStore,   
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist";



const appReducers = combineReducers({
  tokenReducer,
  apiReducer,
  bcReducer,
  pcesAccsReducer,
  configReducer,
});


const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  whitelist: ['tokenReducer', 'bcReducer', 'pcesAccsReducer', 'configReducer'],
  timeout: 400000,
};

const persistedReducer = persistReducer(persistConfig, appReducers);

/* const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunk, logger),
}); */

if (typeof thunk !== 'function') {
  throw new Error('Thunk middleware must be a function '+typeof thunk);
} else {
  console.log('Thunk is a function');
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunk,logger),
});

const persistor = persistStore(store);

export default { store, persistor };