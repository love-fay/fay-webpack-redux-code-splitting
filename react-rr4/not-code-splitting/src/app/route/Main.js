/**
 * Created by feichongzheng on 16/12/18.
 */
import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Layout12 from '../layout/components/Layout12';
import E401D3 from '../error/components/E401D3';
import E504 from '../error/components/E504';
import E404 from '../error/components/E404';
import Home from '../home/components/Home';
import Login from '../uums/user/components/Login';
import UumsRoute from '../uums/route/components/Main';

const history = createBrowserHistory();

const Layout12Page = (props) => {
    const pathname = props.location.pathname;
    return pathname === '/' ?
        <Layout12 {...props}>
            <Route path={`${props.match.url}`} component={Home}/>
        </Layout12> :
        <Layout12 {...props}>
            <Route path={`${props.match.url}`} component={UumsRoute}/>
        </Layout12>;
};

export default () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/504" component={E504} />
                <Route path='/404' component={E404} />
                <Route path='/401D3' component={E401D3} />
                <Route path="/" component={Layout12Page}/>
            </Switch>
        </Router>
    );
}
