/**
 * Created by feichongzheng on 17/1/5.
 */
import request from 'superagent';
import message from 'antd/lib/message';
import 'FayAntd/message/style/index.js';
import Config from '../config.json';
import cookie from 'react-cookie';

const uumsServer = Config.uumsServer;

/**
 * 利用AJAX发送异步post请求
 * @param {string} basepath - 请求路径
 * @param {json} data - 请求数据
 * @param {function} successCallback - 获取到正确返回后执行的方法
 * @param {function} errCallback - 获取到错误返回后执行的方法
 * @return {void} - 无返回结果，相关错误信息会出现弹出框
 */
const requestToUumsByPost = (basepath, data, successCallback, errCallback) => {
    baseQuestByPost(basepath, data, uumsServer, successCallback, errCallback);
};

/**
 * 利用AJAX发送异步post请求
 * @param {string} basepath - 请求路径
 * @param {json} data - 请求数据
 * @param {string} httpServer - 请求协议+后台服务器地址
 * @param {function} successCallback - 获取到正确返回后执行的方法
 * @param {function} errCallback - 获取到错误返回后执行的方法
 * @return {void} - 无返回结果，相关错误信息会出现弹出框
 */
const baseQuestByPost = (basepath, data, httpServer, successCallback, errCallback) => {
    let user = cookie.load('current-user');
    let Authorization = {};
    Authorization.appSn = Config.appSn;
    user && (Authorization.token = user.token);
    message.destroy();
    request.post(httpServer + basepath)
        .set('Authorization', JSON.stringify(Authorization))
        .set('Content-Type', 'application/json')
        .send(data)
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err && err.status === 404) {
                message.error('发生404错误：' + res.body.message);
            } else if (res) {
                if (res.ok) {
                    const result = JSON.parse(res.text);
                    if (result.success) {
                        successCallback && successCallback(result.data);
                    } else {
                        const errMessage = result.errMessage;
                        errCallback ? errCallback(errMessage) : message.error(errMessage);
                    }
                } else {
                    if (res.status === 4011) {
                        FayUc.logout(() => {
                            window.location.href = '/login';
                        });
                    } else {
                        message.error('请求统一用户服务器失败！');
                        errCallback && errCallback('请求统一用户服务器失败！');
                    }
                }
            } else {
                message.error('请求统一用户服务器失败！');
                errCallback && errCallback('请求统一用户服务器失败！');
            }
        });
};

let Request = {
    requestToUumsByPost: requestToUumsByPost,
};

export default Request;
