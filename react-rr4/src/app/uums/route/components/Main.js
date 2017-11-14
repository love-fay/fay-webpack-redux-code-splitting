/**
 * Created by feichongzheng on 16/12/18.
 */
import React, {Component} from 'react';
import cookie from 'react-cookie';
import Bundle from '../../../bundle/components/Bundle';
import loadE404 from 'bundle-loader?lazy&name=[E401D3]!../../../error/components/E404';
import loadApp from 'bundle-loader?lazy&name=[App]!../../app/components/App';
import loadUser from 'bundle-loader?lazy&name=[User]!../../user/components/User';

const E404 = (props) => (
    <Bundle load={loadE404}>
        {(E404) => {
            return <E404 {...props}/>;
        }}
    </Bundle>
);

const App = (props) => (
    <Bundle load={loadApp}>
        {(App) => {
            return <App {...props}/>;
        }}
    </Bundle>
);

const User = (props) => (
    <Bundle load={loadUser}>
        {(User) => {
            return <User {...props}/>;
        }}
    </Bundle>
);

export default class Main extends Component {

    constructor (props) {
        super(props);
        this.state = {
            component: <div>正在申请组件...</div>,
        };
    }

    componentWillReceiveProps (nextProps) {
        if (this.props !== nextProps) {
            this.uumsRoute(nextProps);
        }
    }

    componentWillMount(){
        this.uumsRoute(this.props);
    }

    uumsRoute = (props) => {
        const {pathname} = props.location;
        switch (pathname) {
            case '/app':
                this.getUumsComponent(<App {...props}/>);
                break;
            case '/user':
                this.getUumsComponent(<User {...props}/>);
                break;
            default :
                this.setState({component: <E404 {...props}/>});
        }
    };

    getUumsComponent = (component) => {
        if (this.loggedIn()) {
            /**
             * 此处访问后端接口获取此路径是否被授权，以及该菜单下所有可操作的请求资源，如果有权限则进入下面的代码，如果没有则跳转至无权限提示页面
             * （为了演示，这些代码此处都已删除）
             */
            this.setState({component: component});
        } else {
            this.props.history.push('/login', null);
        }
    };

    loggedIn = () => {
        let user = cookie.load('current-user');
        return typeof (user) === 'object';
    };

    render () {
        return this.state.component;
    }
}
