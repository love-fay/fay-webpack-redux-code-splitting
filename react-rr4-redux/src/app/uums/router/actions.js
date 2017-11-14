/**
 * Created by feichongzheng on 17/9/25.
 */
import {NOT_NEED_FIND_UUMS_RESOURCE_AUTH, FIND_UUMS_RESOURCE_AUTH, FIND_UUMS_RESOURCE_AUTH_FETCH, FIND_UUMS_RESOURCE_AUTH_SUCCESS, FIND_UUMS_RESOURCE_AUTH_ERROR} from './actionTypes';

export const notNeedFindUumsResourceAuth = () => ({
    type: NOT_NEED_FIND_UUMS_RESOURCE_AUTH
});

export const findUumsResourceAuth = () => ({
    type: FIND_UUMS_RESOURCE_AUTH
});

export const findUumsResourceAuthFetch = () => ({
    type: FIND_UUMS_RESOURCE_AUTH_FETCH
});

export const findUumsResourceAuthSuccess = (data) => ({
    type: FIND_UUMS_RESOURCE_AUTH_SUCCESS,
    data: data
});

export const findUumsResourceAuthError = (err) => ({
    type: FIND_UUMS_RESOURCE_AUTH_ERROR,
    err: err
});