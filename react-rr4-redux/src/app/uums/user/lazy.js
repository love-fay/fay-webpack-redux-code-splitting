/**
 * Created by feichongzheng on 17/9/25.
 */
import userSagas from './sagas';
import userReducer from './reducer';
import view from './views/user';
// import {reducer as privilegeReducer, sagas as privilegeSagas} from '../resource/privilege';
import {UumsReducerNames} from '../constants';
const userName = UumsReducerNames.user;
// const privilegeName = UumsReducerNames.privilege;

const reducer = {
    [userName]: userReducer
    // [privilegeName]: privilegeReducer
};

const sagas = {
    [userName]: userSagas
    // [privilegeName]: privilegeSagas
};

export {sagas, reducer, view};