/**
 * Created by feichongzheng on 17/9/28.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import {findAppForPageFetch, findAppForPageSuccess, findAppForPageError} from './actions';
import {FIND_APP_FOR_PAGE} from './actionTypes';

function appPage() {
    /**
     * 异步请求省略
     */
    return {
        "data":{
            "pageData":[{
                "id":"1",
                "name":"系统一",
                "sn":"system1",
                "url":"http://www.system1.com",
                "description":"系统一"
            },{
                "id":"2",
                "name":"系统二",
                "sn":"system2",
                "url":"http://www.system2.com",
                "description":"系统二"
            }],
            "currentPage":0,
            "totalPage":1,
            "pageSize":20,
            "totalRows":2
        },"success":true};
}

function* fetchAppPage(data) {
    const params = data.params;
    try {
        yield put(findAppForPageFetch());
        const result = yield call(appPage);
        yield put(findAppForPageSuccess(result, params));
    } catch (e) {
        yield put(findAppForPageError(e, params));
    }
}

function* sagas() {
    yield takeLatest(FIND_APP_FOR_PAGE, fetchAppPage);
}

export default sagas;