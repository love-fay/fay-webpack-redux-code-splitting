/**
 * Created by feichongzheng on 17/9/25.
 */
import appSagas from './sagas';
import appReducer from './reducer';
import view from './views/app';
import {UumsReducerNames} from '../constants';
const appName = UumsReducerNames.app;
const reducer = {
    [appName]: appReducer
};

const sagas = {
    [appName]: appSagas
};

export {sagas, reducer, view};