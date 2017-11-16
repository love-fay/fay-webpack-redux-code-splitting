import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
const logger = createLogger();

import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import {uumsReducer, uumsSagas} from './uums';

const history = createHistory();
const rMiddleware = routerMiddleware(history);

const win = window;

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [rMiddleware, sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares, logger),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const reducer = combineReducers({
    ...uumsReducer,
    router: routerReducer
});

let store = createStore(reducer, {}, storeEnhancers);

store.sagaMiddleware = sagaMiddleware;
uumsSagas && uumsSagas.map((item) => {
    store.sagaMiddleware.run(item);
});

export default store;
