/**
 * Created by feichongzheng on 17/9/25.
 */
import userSagas from './sagas';
import userReducer from './reducer';
import view from './views/user';
import {reducer as authReducer, sagas as authSagas} from '../resource/auth';
import {ReducerNames} from '../../constants';
const userName = ReducerNames.uums.user;
const authName = ReducerNames.uums.auth;

const reducer = {
    [userName]: userReducer,
    [authName]: authReducer
};

const sagas = {
    [userName]: userSagas,
    [authName]: authSagas
};

export {sagas, reducer, view};