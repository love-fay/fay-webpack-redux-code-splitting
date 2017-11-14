/**
 * Created by feichongzheng on 16/12/15.
 */
import React, {Component} from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import 'FayAntd/menu/style/index.js';
import 'FayAntd/icon/style/index.js';
import 'FayAntd/spin/style/index.js';
const SubMenu = Menu.SubMenu;
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {resource} from '../../uums';
const {api} = resource;

let pathname;

class NavLeft extends Component {

    constructor (props) {
        super(props);
        const location = props.location;
        pathname = location.pathname;
        pathname = pathname.indexOf('/') === 0 ? pathname : '/' + pathname;
        this.state = {
            openKeys: null,
            html: null,
        };
    }

    componentWillMount(){
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData = () => {
        api.menuResource.findMenu({})
            .then((res) => res.json())
            .then((res) => {
                const result = res.data;
                const data = result.voList;
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
                if(this._isMounted){
                    this.setState({
                        openKeys: openKeys,
                        html: html,
                    });
                }
            })
            .catch( (err) => {
                throw err;
            });
    };

    recursiveTree (parent, pcMap, navKeyArray, navMap) {
        parent.children = Array.of();
        let map = {};
        let html = '';
        if (pcMap[parent.id] === undefined) {
            if (parent.icon === null) {
                html = <Menu.Item key={parent.url} className={'waves-effect'}>{parent.name}</Menu.Item>;
            } else {
                html = <Menu.Item key={parent.url} className={'waves-effect'}><Icon type={parent.icon} />{parent.name}</Menu.Item>;
            }
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
        const {history} = this.props;
        let key = e.key;
        if (key !== undefined) {
            history.push(key, null);
        }
    };

    render () {
        const {html, openKeys} = this.state;
        if (html === null) {
           return <div id='nav-left-menu' style={{ width: 150, textAlign: 'center', paddingTop: '100px' }}><Spin tip='菜单加载中...'/></div>;
        } else if (html.length === 0) {
            return <div id='nav-left-menu' style={{ width: 150 }}>您没有被授予任何菜单权限</div>;
        } else {
            return (
                <Menu onClick={this.handleClick}
                      style={{ width: 150 }}
                      defaultOpenKeys={openKeys}
                      selectedKeys={[pathname]}
                      mode="inline"
                      id="nav-left-menu">
                    {html}
                </Menu>
            );
        }
    }
}

NavLeft.propTypes = {
    location: PropTypes.any,
    history: PropTypes.object,
};


export default withRouter(NavLeft);
