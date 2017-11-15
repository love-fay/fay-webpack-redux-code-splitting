/**
 * Created by feichongzheng on 16/12/18.
 */
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter} from 'react-router-redux';
import {Layout12} from '../layout';
import { E404, E401D3, E504 } from '../error';
import {view as Home} from '../home';
import {view as Login} from '../login';
import {RouterPaths} from '../constants';
import configureStore from '../Store';
let store = configureStore();
import {UumsRouter} from '../uums';

const history = createBrowserHistory();

const HomePage = (props) => {
    return (
        <Layout12>
            <Home {...props}/>
        </Layout12>
    );
};

const UumsPage = (props) => {
    return (
        <Layout12>
            <UumsRouter {...props}/>
        </Layout12>
    );
};

export default () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact strict path="/" component={HomePage}/>
                    <Route path="/504" component={E504}/>
                    <Route path='/404' component={E404}/>
                    <Route path='/401D3' component={E401D3}/>
                    <Route path='/login' component={Login}/>
                    <Route path={RouterPaths.UUMS} component={UumsPage}/>
                    <Route component={E404}/>
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}
