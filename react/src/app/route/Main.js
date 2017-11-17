/**
 * Created by feichongzheng on 16/12/18.
 */
require('../../lib/antd/dist/antd.less');
import React, {Component} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import {useBasename} from 'history';
import createHistory from 'history/lib/createBrowserHistory';
const historyConfig = useBasename(createHistory)({
    basename: '/',
});
import cookie from 'react-cookie';

export default class Main extends Component {

    render () {
        return (
            <div>
                <Router history={historyConfig}>
                    <Route path="/" getComponent={this.getLayout12} >
                        <IndexRoute getComponent={this.getHome} onEnter={this.requireAuth}/>
                        <Route path="app" getComponent={this.getUumsComponent} onEnter={this.requireAuth}/>
                        <Route path="user" getComponent={this.getUumsComponent} onEnter={this.requireAuth}/>
                    </Route>
                    <Route path="login" getComponent={this.getComponent}/>
                    <Route path="504" getComponent={this.getComponent} />
                    <Route path='404' getComponent={this.getComponent} />
                    <Route path='401D3' getComponent={this.getComponent} />
                    <Route path="*" getComponent={this.getComponent} />
                </Router>
            </div>
        );
    }

    getComponent = (nextState, callback) => {
        let pathname = nextState.pathname;
        switch (pathname) {
            case 'login':
                require.ensure([], (require) => {
                    callback(null, require('../user/components/Login'));
                }, 'Login');
                break;
            case '504':
                require.ensure([], (require) => {
                    callback(null, require('../error/components/E504'));
                }, 'E504');
                break;
            case '404':
                require.ensure([], (require) => {
                    callback(null, require('../error/components/E404'));
                }, 'E404');
                break;
            case '401D3':
                require.ensure([], (require) => {
                    callback(null, require('../error/components/E401D3'));
                }, 'E401D3');
                break;
            default :
                historyConfig.pushState({nextPathname: pathname}, '/404');
        }
    };

    getLayout12 = (nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../layout/components/Layout12'));
        }, 'Layout12');
    };

    getHome = (nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../home/components/Home'));
        }, 'Home');
    };

    loggedIn = () => {
        let user = cookie.load('current-user');
        return typeof (user) === 'object';
    };

    getUumsComponent = (nextState, callback) => {
        let pathname = nextState.pathname;
        /**
         * 此处访问后端接口获取此路径是否被授权，以及该菜单下所有可操作的请求资源，如果有权限则进入下面的代码，如果没有则跳转至无权限提示页面
         * （为了演示，这些代码此处都已删除）
         */
        switch (pathname) {
            case 'app':
                require.ensure([], (require) => {
                    callback(null, require('../app/components/App'));
                }, 'App');
                break;
            case 'user':
                require.ensure([], (require) => {
                    callback(null, require('../user/components/User'));
                }, 'User');
                break;
            default :
                historyConfig.pushState({nextPathname: pathname}, '/404');
        }
    };

    requireAuth = (nextState, replaceState) => {
        if (!this.loggedIn()) {
            replaceState({nextPathname: nextState.location.pathname }, '/login');
        }
    }
}
