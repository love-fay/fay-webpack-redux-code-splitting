/**
 * Created by feichongzheng on 17/10/24.
 */
import {sagas as appSagas} from './app';
import {sagas as userSagas} from './user';
import {sagas as privilegeSagas} from './resource/privilege';

export default [
    appSagas,
    userSagas,
    privilegeSagas
];