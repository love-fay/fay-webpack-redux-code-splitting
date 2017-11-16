/**
 * Created by feichongzheng on 17/10/24.
 */
import {reducer as appReducer} from './app';
import {reducer as userReducer} from './user';
import {reducer as privilegeReducer} from './resource/privilege';
import {UumsReducerNames} from './constants';

export default {
    [UumsReducerNames.app]: appReducer,
    [UumsReducerNames.user]: userReducer,
    [UumsReducerNames.privilege]: privilegeReducer
};