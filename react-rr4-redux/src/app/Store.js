import {createStore, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
const logger = createLogger();

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

const history = createHistory();
const rMiddleware = routerMiddleware(history);

import Perf from 'react-addons-perf';

const win = window;
win.Perf = Perf;

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [rMiddleware, sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares, logger),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

import createReducer from './reducers';

export function injectAsyncStore(store, asyncReducers, sagas) {
    injectAsyncReducers(store, asyncReducers);
    injectAsyncSagas(store, sagas);
}

export function injectAsyncReducers(store, asyncReducers) {
    let flag = false;
    if (asyncReducers) {
        for (let key in asyncReducers) {
            if(Object.prototype.hasOwnProperty.call(asyncReducers, key)) {
                if (!store.asyncReducers[key]) {
                    store.asyncReducers[key] = asyncReducers[key];
                    flag = true;
                }
            }
        }
        flag && store.replaceReducer(createReducer(store.asyncReducers));
    }
}

export function injectAsyncSagas(store, sagas) {
    if (sagas) {
        for (let key in sagas) {
            if(Object.prototype.hasOwnProperty.call(sagas, key)) {
                if (!store.asyncSagas[key]) {
                    store.asyncSagas[key] = sagas[key];
                    store.sagaMiddleware.run(sagas[key]);
                }
            }
        }
    }
}

export default function configureStore() {
    let store = createStore(createReducer(), {}, storeEnhancers);
    store.asyncReducers = {};
    store.asyncSagas = {};
    store.sagaMiddleware = sagaMiddleware;
    return store;
}
