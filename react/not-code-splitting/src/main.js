/**
 * Created by feichongzheng on 16/12/7.
 */
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
require('fetch-ie8');
require('babel-polyfill');
const React = require('react');
const {render} = require('react-dom');
const Main = require('./app/route/Main');

render(<Main/>, document.getElementById('app'));
