/**
 * Created by feichongzheng on 17/9/28.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    findPrivilegeFetch, findPrivilegeSuccess, findPrivilegeError
} from './actions';
import {FIND_PRIVILEGE} from './actionTypes';

function findPrivilege(data) {
    const {dataId} = data;
        /**
     * 异步请求省略
     */
    if(dataId === '1'){
        return {
            "data":{
                "系统一":[
                    "APP_系统一,MENU_统一用户,MENU_用户管理,CONTROLLER_重置用户密码",
                    "APP_系统一,MENU_统一配置,MENU_应用系统,CONTROLLER_更新应用系统",
                    "APP_系统一,MENU_统一配置,MENU_系统角色",
                ]
            },"success":true}
    }else if(dataId === '2'){
        return {
            "data":{
                "系统一":[
                    "APP_系统一,MENU_统一用户,MENU_用户管理,CONTROLLER_重置用户密码",
                    "APP_系统一,MENU_统一配置,MENU_应用系统,CONTROLLER_更新应用系统",
                    "APP_系统一,MENU_统一配置,MENU_系统角色",
                    "APP_系统一,MENU_统一配置,MENU_系统角色,CONTROLLER_删除角色",
                    "APP_系统一,MENU_统一配置,MENU_应用系统,CONTROLLER_新增应用系统",
                    "APP_系统一,MENU_统一配置,MENU_系统角色,CONTROLLER_新增角色",
                    "APP_系统一,MENU_统一配置,MENU_系统角色,CONTROLLER_为角色剔除用户",
                ],
                "系统二":[
                    "APP_系统二,MENU_菜单A,MENU_子菜单AA,CONTROLLER_新增",
                    "APP_系统二,MENU_菜单A,MENU_子菜单AA,CONTROLLER_更新",
                    "APP_系统二,MENU_菜单B,MENU_子菜单BA",
                    "APP_系统二,MENU_菜单A,MENU_子菜单AB,CONTROLLER_新增",
                    "APP_系统二,MENU_菜单A,MENU_子菜单AC,CONTROLLER_更新",
                    "APP_系统二,MENU_菜单A,MENU_子菜单AD,CONTROLLER_更新",
                    "APP_系统二,MENU_菜单A,MENU_子菜单AE,CONTROLLER_新增",
                ]
            },"success":true}
    }else{
        return {
            "data":{
            },"success":true}
    }
}

function* fetchPrivilege(data) {
    try {
        yield put(findPrivilegeFetch());
        const result = yield call(findPrivilege, data.params);
        yield put(findPrivilegeSuccess(result));
    } catch (e) {
        yield put(findPrivilegeError(e));
    }
}

function* sagas() {
    yield takeLatest(FIND_PRIVILEGE, fetchPrivilege);
}

export default sagas;