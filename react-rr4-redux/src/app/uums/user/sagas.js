/**
 * Created by feichongzheng on 17/9/28.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import {api} from '../resource';
import {findUserForPageFetch, findUserForPageSuccess, findUserForPageError} from './actions';
import {FIND_USER_FOR_PAGE} from './actionTypes';

function userPage() {
    /**
     * 异步请求省略
     */
    return {
        "data":{
            "pageData":[
                {"id":"1","nickname":"超级管理员","username":"root","name":"root","sn":"root","createDate":"2017-10-30 17:07","isAvailable":1},
                {"id":"2","nickname":"爱死费崇政","username":"fay","name":"爱死费崇政","sn":"fay","createDate":"2017-09-06 13:10","isAvailable":1}],
            "currentPage":0,
            "totalPage":1,
            "pageSize":20,
            "totalRows":2
        },"success":true};
}

function* fetchUserPage(data) {
    const params = data.params;
    try {
        yield put(findUserForPageFetch());
        const result = yield call(userPage);
        yield put(findUserForPageSuccess(result, params));
    } catch (e) {
        yield put(findUserForPageError(e, params));
    }
}

function* sagas() {
    yield takeLatest(FIND_USER_FOR_PAGE, fetchUserPage);
}

export default sagas;