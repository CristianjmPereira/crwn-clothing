import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Print current environment
// console.log(process.env.NODE_ENV);
const middleWares = [logger];

const composeEnhancer = (
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);