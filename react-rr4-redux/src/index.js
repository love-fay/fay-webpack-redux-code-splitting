/**
 * Created by feichongzheng on 16/12/7.
 */
import React from 'react';
import {render} from 'react-dom';
import Index from './app/route';
import {appName} from './app/appInfo';

document.title = appName;
render(<Index/>, document.getElementById('app'));
