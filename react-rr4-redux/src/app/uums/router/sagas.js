/**
 * Created by feichongzheng on 17/9/28.
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import {api} from '../resource';
import {findUumsResourceAuthFetch, findUumsResourceAuthSuccess, findUumsResourceAuthError} from './actions';
import {FIND_UUMS_RESOURCE_AUTH} from './actionTypes';

function resourceAuth() {
    const promise = api.resource.find();
    return promise.then((res) => res.json())
            .then((res) => res)
            .catch( (err) => {
                throw err;
            });
}

function* fetchAuthResource() {
    try {
        yield put(findUumsResourceAuthFetch());
        const data = yield call(resourceAuth);
        yield put(findUumsResourceAuthSuccess(data));
    } catch (e) {
        yield put(findUumsResourceAuthError(e));
    }
}

function* sagas() {
    yield takeLatest(FIND_UUMS_RESOURCE_AUTH, fetchAuthResource);
}

export default sagas;