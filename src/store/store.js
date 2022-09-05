import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import createSagaMiddleWare from 'redux-saga';
import { rootSaga } from './root-saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Print current environment
// console.log(process.env.NODE_ENV);
const middleWares = [logger, sagaMiddleware];

const composeEnhancer = (
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);