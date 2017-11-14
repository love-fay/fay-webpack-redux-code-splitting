/**
 * Created by feichongzheng on 16/12/15.
 */
import React, {Component} from 'react';
import cookie from 'react-cookie';
import Menu from 'antd/lib/menu';
import style from '../style/navTop.css';

class NavTop extends Component {

    constructor (props) {
        super(props);
        const location = this.props.location;
        let pathname = location.pathname;
        pathname = pathname.indexOf('/') === 0 ? pathname : '/' + pathname;
        this.state = {
            current: pathname,
            user: this.getUser(),
        };
    }

    getUser = () => {
        let user = cookie.load('current-user');
        if (typeof (user) === 'object') {
            return user;
        } else {
            return null;
        }
    };

    handleClick = (e) => {
        let key = e.key;
        if (key !== undefined) {
            if (key.indexOf('/prevent') !== 0) {
                this.setState({
                    current: key,
                });
                this.props.changeNavLeftCurrent(key);
                const history = this.props.history;
                history.pushState(null, key);
            }
        }
    };

    changePath = (e, path) => {
        e.stopPropagation();
        const history = this.props.history;
        this.setState({
            current: path,
        });
        history.pushState(null, path + '?returnPath=' + window.location.pathname);
    };

    logout (e) {
        e.stopPropagation();
        cookie.remove('current-user');
        const pathname = window.location.pathname;
        const history = this.props.history;
        history.pushState(null, '/login?returnPath=' + pathname);
        this.setState({
            user: null,
            current: '/123',
        });
    }

    render () {
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                  className={style.menu}
                  id="nav-top-menu"
            >
                <Menu.Item key="/">
                    <div className={style.log}>
                        <img width="30px" src="assets/images/logo/80x80.png" className={style.logImg} />
                        FAY基础支撑平台
                    </div>
                </Menu.Item>
                {this.state.user &&
                    (<Menu.Item key="/prevent1" style={{float: 'right', marginRight: '50px'}}>
                        <div className={style.register} onClick={(e) => {this.logout(e);}}>退出</div>
                    </Menu.Item>)}
                {this.state.user ? (<Menu.Item
                        key="/prevent2" style={{float: 'right'}}>
                        <div className={style.userInfo}>{this.state.user.nickname}</div>
                    </Menu.Item>) : (<Menu.Item
                        key="/prevent2" style={{float: 'right', marginRight: '50px'}}>
                        <div className={style.login} onClick={(e) => {this.changePath(e, '/login');}}>登录</div></Menu.Item>)}

            </Menu>
        );
    }
}

export default NavTop;
