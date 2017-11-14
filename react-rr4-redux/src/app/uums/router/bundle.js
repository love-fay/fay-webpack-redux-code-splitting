/**
 * Created by feichongzheng on 17/9/25.
 */
import routerSagas from './sagas';
import routerReducer from './reducer';
import view from './views/router';
import {ReducerNames} from '../../constants';
const routerName = ReducerNames.uums.router;
const reducer = {
    [routerName]: routerReducer
};

const sagas = {
    [routerName]: routerSagas
};

export {sagas, reducer, view};