/**
 * Created by feichongzheng on 17/9/28.
 */
import {request} from '../../../../resource';
import apiPath from './apiPath';

const findForPage = () => request.get(apiPath.findForPage);

export {
    findForPage
};



