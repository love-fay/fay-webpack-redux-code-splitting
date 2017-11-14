/**
 * Created by feichongzheng on 16/12/15.
 */
import React, {Component} from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import 'FayAntd/menu/style/index.js';
import 'FayAntd/icon/style/index.js';
const SubMenu = Menu.SubMenu;
import Request from '../../uums/resource/request';
import PropTypes from 'prop-types';
import uumsApiPathConfig from '../../uums/uumsApiPathConfig.json';

let pathname;

class NavLeft extends Component {

    constructor (props) {
        super(props);
        const location = this.props.location;
        pathname = location.pathname;
        pathname = pathname.indexOf('/') === 0 ? pathname : '/' + pathname;

        this.state = {
            current: pathname,
            openKeys: null,
            html: [],
        };
        this.getData();
    }

    getData = () => {
        Request.requestToUumsByPost(uumsApiPathConfig.menuResource.auth.findMenu, {}, (result) => {
            let data = result.voList;
            let pcMap = {};
            let menus = Array.of();
            for (let i in data) {
                if (data.hasOwnProperty(i)) {
                    let menu = data[i];
                    let parentId = menu.parentId;
                    if (parentId === null) {
                        let top = pcMap.top;
                        top = top === undefined ? Array.of() : top;
                        top.push(menu);
                        pcMap.top = top;
                    } else {
                        let children = pcMap[parentId];
                        children = children === undefined ? Array.of() : children;
                        children.push(menu);
                        pcMap[parentId] = children;
                    }
                }
            }
            let navKeyMap = {};
            navKeyMap.firstKeyMap = 0;
            let pcMapTop = pcMap.top;
            for (let i in pcMapTop) {
                if (pcMapTop.hasOwnProperty(i)) {
                    let menu = pcMapTop[i];
                    let tree = this.recursiveTree(menu, pcMap, Array.of(), navKeyMap);
                    menus.push(tree.html);
                }
            }
            let html = menus.map(
                (data, index) => data
            );
            this.navMap = navKeyMap;
            let openKeys = navKeyMap[pathname];
            openKeys = openKeys === undefined ? navKeyMap.firstKeyMap : openKeys;
            html.length === 0 ? this.props.changeContentStyle('0') : this.props.changeContentStyle('170px');
            this.setState({
                openKeys: openKeys,
                html: html,
            });
        });
    };

    recursiveTree (parent, pcMap, navKeyArray, navMap) {
        parent.children = Array.of();
        let map = {};
        let html = '';
        if (pcMap[parent.id] === undefined) {
            html = <Menu.Item key={parent.url} className={'waves-effect'}>{parent.name}</Menu.Item>;
            let a = [].concat(navKeyArray);
            if (navMap.firstKeyMap === 0) {navMap.firstKeyMap = a;}
            navMap[parent.url] = a;
        } else {
            navKeyArray.push(parent.id);
            let pcMapParent = pcMap[parent.id];
            for (let i in pcMapParent) {
                if (pcMapParent.hasOwnProperty(i)) {
                    let child = pcMapParent[i];
                    map = this.recursiveTree(child, pcMap, navKeyArray, navMap);
                    let m = map.html;
                    parent.children.push(m);
                }
            }
            let childrenHtml = parent.children.map(
                (data, index) => data
            );
            if (parent.icon === null) {
                html = <SubMenu key={parent.id} title={<span>{parent.name}</span>}>{childrenHtml}</SubMenu>;
            } else {
                html = <SubMenu key={parent.id} title={<span><Icon type={parent.icon} /><span>{parent.name}</span></span>}>{childrenHtml}</SubMenu>;
            }
        }
        map.html = html;
        return map;
    }


    handleClick = (e) => {
        const history = this.props.history;
        let key = e.key;
        if (key !== undefined) {
            this.setState({
                current: key,
            });
            this.props.changeNavTopCurrent(key);
            history.push(key, null);
        }
    };

    render () {
        let html;
        if (this.state.html.length === 0) {
            html = <div>{this.state.html}</div>;
        } else {
            html = <Menu onClick={this.handleClick}
                     style={{ width: 150 }}
                     defaultOpenKeys={this.state.openKeys}
                     selectedKeys={[this.state.current]}
                     mode="inline"
                     id="nav-left-menu">
                     {this.state.html}
            </Menu>;
        }
        return (
            <div>{html}</div>
        );
    }
}

NavLeft.propTypes = {
    location: PropTypes.any,
    history: PropTypes.object,
    changeNavTopCurrent: PropTypes.func,
    changeContentStyle: PropTypes.func,
};


export default NavLeft;
