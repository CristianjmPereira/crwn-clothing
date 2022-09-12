import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import createSagaMiddleWare from 'redux-saga';
import { rootSaga } from './root-saga';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Print current environment
// console.log(process.env.NODE_ENV);
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger, 
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer = (
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);