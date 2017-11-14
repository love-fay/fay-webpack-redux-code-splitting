/**
 * Created by feichongzheng on 16/12/18.
 */

import 'node-waves/src/less/waves.less';
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter} from 'react-router-redux';

import {Layout12} from '../layout';
import { E404, E401D3, E504 } from '../error';
import {view as Home} from '../home';
import {view as Login} from '../login';
import {UumsRouterPaths} from '../constants';

import configureStore from '../Store';
let store = configureStore();
import {UumsRouter, App, Org, Group, Position, OrgRole, Person, Role, User, MenuResource, ControllerResource, UnifyManage, Dict, Log, DictType} from '../uums';

const history = createBrowserHistory();

export default () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/504" component={E504}/>
                    <Route path='/404' component={E404}/>
                    <Route path='/401D3' component={E401D3}/>
                    <Route path='/login' component={Login}/>
                    <Layout12>
                        <UumsRouter>
                            <Route path={UumsRouterPaths.APP} component={App}/>
                            <Route path={UumsRouterPaths.ORG} component={Org}/>
                            <Route path={UumsRouterPaths.GROUP} component={Group}/>
                            <Route path={UumsRouterPaths.POSITION} component={Position}/>
                            <Route path={UumsRouterPaths.ORGROLE} component={OrgRole}/>
                            <Route path={UumsRouterPaths.USER} component={User}/>
                            <Route path={UumsRouterPaths.ROLE} component={Role}/>
                            <Route path={UumsRouterPaths.PERSON} component={Person}/>
                            <Route path={UumsRouterPaths.MENURESOURCE} component={MenuResource}/>
                            <Route path={UumsRouterPaths.CONTROLLERRESOURCE} component={ControllerResource}/>
                            <Route path={UumsRouterPaths.UNIFYMANAGE} component={UnifyManage}/>
                            <Route path={UumsRouterPaths.DICT} component={Dict}/>
                            <Route path={UumsRouterPaths.DICTTYPE} component={DictType}/>
                            <Route path={UumsRouterPaths.LOG} component={Log}/>
                            <Route exact strict path="/" component={Home}/>
                        </UumsRouter>
                    </Layout12>
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}
