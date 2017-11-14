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
import Login from '../user/components/Login';
import E504 from '../error/components/E504';
import E404 from '../error/components/E404';
import E401D3 from '../error/components/E401D3';
import Layout12 from '../layout/components/Layout12';
import Home from '../home/components/Home';
import App from '../app/components/App';
import User from '../user/components/User';

export default class Main extends Component {

    render () {
        return (
            <div>
                <Router history={historyConfig}>
                    <Route path="/" component={Layout12} >
                        <IndexRoute component={Home} onEnter={this.requireAuth}/>
                        <Route path="app" getComponent={this.getUumsComponent} onEnter={this.requireAuth}/>
                        <Route path="user" getComponent={this.getUumsComponent} onEnter={this.requireAuth}/>
                    </Route>
                    <Route path="login" component={Login}/>
                    <Route path="504" component={E504} />
                    <Route path='404' component={E404} />
                    <Route path='401D3' component={E401D3} />
                    <Route path="*" component={E404} />
                </Router>
            </div>
        );
    }

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
                callback(null, App);
                break;
            case 'user':
                callback(null, User);
                break;
            default :
                historyConfig.pushState({nextPathname: pathname}, '/404');
                break;
        }
    };

    requireAuth = (nextState, replaceState) => {
        if (!this.loggedIn()) {
            replaceState({nextPathname: nextState.location.pathname }, '/login');
        }
    }
}
