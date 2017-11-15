/**
 * Created by feichongzheng on 17/1/5.
 */
import {appSn} from '../appInfo';
import {loginUser} from './user';

const authorization = () => {
    const user = loginUser();
    let Authorization = {};
    Authorization.appSn = appSn;
    user && (Authorization.token = user.token);
    return JSON.stringify(Authorization);
};

const headers = () => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", authorization());
    return headers;
};

const reqGetBrace = (method) => {
    return {
        method: method,
        headers: headers(),
        mode: 'cors',
        cache: 'default'
    };
};

const reqPostBrace = (method, params = {}) => {
    return {
        method: method,
        headers: headers(),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(params)
    };
};

const promise = (req) => {
    return new Promise(function(resolve, reject) {
                fetch(req).then( (res) => {
                    const status = res.status;
                    if (status === 4011) {
                        console.log(res);
                        // FayUc.logout(() => {
                        //     window.location.href = '/login';
                        // });
                    }
                    resolve(res);
                    }).catch( (err) => {
                        reject(err);
                    });
                }
            );
};

const get = (apiPath, data) => {
    const req = new Request(apiPath, reqGetBrace('GET', data));
    return promise(req);
};

const post = (apiPath, data) => {
    const req = new Request(apiPath, reqPostBrace('POST', data));
    return promise(req);
};

export {get, post};
