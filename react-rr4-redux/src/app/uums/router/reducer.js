/**
 * Created by feichongzheng on 17/9/25.
 */
import {NOT_NEED_FIND_UUMS_RESOURCE_AUTH, FIND_UUMS_RESOURCE_AUTH_FETCH, FIND_UUMS_RESOURCE_AUTH_SUCCESS, FIND_UUMS_RESOURCE_AUTH_ERROR} from './actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case NOT_NEED_FIND_UUMS_RESOURCE_AUTH: {
            return {
                type: NOT_NEED_FIND_UUMS_RESOURCE_AUTH
            };
        }
        case FIND_UUMS_RESOURCE_AUTH_FETCH: {
            return {
                type: FIND_UUMS_RESOURCE_AUTH_FETCH
            };
        }
        case FIND_UUMS_RESOURCE_AUTH_SUCCESS: {
            return {
                type: FIND_UUMS_RESOURCE_AUTH_SUCCESS, data: action.data
            };
        }
        case FIND_UUMS_RESOURCE_AUTH_ERROR: {
            return {
                type: FIND_UUMS_RESOURCE_AUTH_ERROR, err: action.err
            };
        }
        default: {
            return state;
        }
    }
}