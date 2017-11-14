/**
 * Created by feichongzheng on 16/12/18.
 */
import React, {Component} from 'react';
import cookie from 'react-cookie';
import Request from '../../resource/request';
import Bundle from '../../../bundle/components/Bundle';
import loadE401D3 from 'bundle-loader?lazy&name=[E401D3]!../../../error/components/E401D3';
import loadE404 from 'bundle-loader?lazy&name=[E401D3]!../../../error/components/E404';
import loadApp from 'bundle-loader?lazy&name=[App]!../../app/components/App';
import loadOrg from 'bundle-loader?lazy&name=[Org]!../../org/components/Org';
import loadGroup from 'bundle-loader?lazy&name=[Group]!../../group/components/Group';
import loadRole from 'bundle-loader?lazy&name=[Role]!../../role/components/Role';
import loadPosition from 'bundle-loader?lazy&name=[Position]!../../position/components/Position';
import loadOrgRole from 'bundle-loader?lazy&name=[OrgRole]!../../orgRole/components/OrgRole';
import loadUser from 'bundle-loader?lazy&name=[User]!../../user/components/User';
import loadMenuResource from 'bundle-loader?lazy&name=[MenuResource]!../../menuResource/components/MenuResource';
import loadControllerResource from 'bundle-loader?lazy&name=[ControllerResource]!../../controllerResource/components/ControllerResource';
import loadUnifyManage from 'bundle-loader?lazy&name=[UnifyManage]!../../unifyManage/components/UnifyManage';
import loadPerson from 'bundle-loader?lazy&name=[Person]!../../person/components/Person';

const E401D3 = (props) => (
    <Bundle load={loadE401D3}>
        {(E401D3) => {
            return <E401D3 {...props}/>;
        }}
    </Bundle>
);

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

const Org = (props) => (
    <Bundle load={loadOrg}>
        {(Org) => {
            return <Org {...props}/>;
        }}
    </Bundle>
);

const Group = (props) => (
    <Bundle load={loadGroup}>
        {(Group) => {
            return <Group {...props}/>;
        }}
    </Bundle>
);

const Role = (props) => (
    <Bundle load={loadRole}>
        {(Role) => {
            return <Role {...props}/>;
        }}
    </Bundle>
);

const Position = (props) => (
    <Bundle load={loadPosition}>
        {(Position) => {
            return <Position {...props}/>;
        }}
    </Bundle>
);

const OrgRole = (props) => (
    <Bundle load={loadOrgRole}>
        {(OrgRole) => {
            return <OrgRole {...props}/>;
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

const MenuResource = (props) => (
    <Bundle load={loadMenuResource}>
        {(MenuResource) => {
            return <MenuResource {...props}/>;
        }}
    </Bundle>
);

const ControllerResource = (props) => (
    <Bundle load={loadControllerResource}>
        {(ControllerResource) => {
            return <ControllerResource {...props}/>;
        }}
    </Bundle>
);

const UnifyManage = (props) => (
    <Bundle load={loadUnifyManage}>
        {(UnifyManage) => {
            return <UnifyManage {...props}/>;
        }}
    </Bundle>
);

const Person = (props) => (
    <Bundle load={loadPerson}>
        {(Person) => {
            return <Person {...props}/>;
        }}
    </Bundle>
);

export default class Main extends Component {

    constructor (props) {
        super(props);
        this.state = {
            component: <div>正在申请组件</div>,
        };
        this.uumsRoute(this.props);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props !== nextProps) {
            this.uumsRoute(nextProps);
        }
    }

    uumsRoute = (props) => {
        const {pathname} = props.location;
        switch (pathname) {
            case '/app':
                this.getUumsComponent('/app', <App {...props}/>);
                break;
            case '/org':
                this.getUumsComponent('/org', <Org {...props}/>);
                break;
            case '/group':
                this.getUumsComponent('/group', <Group {...props}/>);
                break;
            case '/role':
                this.getUumsComponent('/role', <Role {...props}/>);
                break;
            case '/position':
                this.getUumsComponent('/position', <Position {...props}/>);
                break;
            case '/orgRole':
                this.getUumsComponent('/orgRole', <OrgRole {...props}/>);
                break;
            case '/user':
                this.getUumsComponent('/user', <User {...props}/>);
                break;
            case '/person':
                this.getUumsComponent('/person', <Person {...props}/>);
                break;
            case '/menuResource':
                this.getUumsComponent('/menuResource', <MenuResource {...props}/>);
                break;
            case '/controllerResource':
                this.getUumsComponent('/controllerResource', <ControllerResource {...props}/>);
                break;
            case '/unifyManage':
                this.getUumsComponent('/unifyManage', <UnifyManage {...props}/>);
                break;
            default :
                this.setState({component: <E404 {...props}/>});
        }
    };

    getUumsComponent = (pathname, component) => {
        if (this.loggedIn()) {
            Request.requestToUumsByPost('/resource/auth/find', {}, (result) => {
                let flag = false;
                let menu = result.menu;
                let controller = result.controller.voList;
                let isControlled = result.isControlled.voList;
                window.localStorage.removeItem('controller');
                window.localStorage.removeItem('isControlled');
                window.localStorage.setItem('controller', JSON.stringify(controller));
                window.localStorage.setItem('isControlled', JSON.stringify(isControlled));
                let data = menu.voList;
                for (let i in data) {
                    if (data[i].url === pathname) {
                        flag = true;
                        break;
                    }
                }
                flag ? this.setState({component: component}) : this.setState({component: <E401D3/>});
            });
        } else {
            const {history} = this.props;
            history.push('/login', null);
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
