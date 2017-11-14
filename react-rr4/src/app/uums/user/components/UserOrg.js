/**
 * Created by feichongzheng on 17/1/9.
 */
import React, {Component} from 'react';
import Request from '../../resource/request';
import Tree from 'antd/lib/tree';
import 'FayAntd/tree/style/index.js';
import Config from '../../config.json';
const TreeNode = Tree.TreeNode;
import PropTypes from 'prop-types';

class UserOrg extends Component {

    constructor (props) {
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            dataSource: [],
        };
        this.getData();
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys) => {
        Request.requestToUumsByPost('/org/addMenuForAuth', {orgId: this.props.dataId, menuIds: checkedKeys});
        this.setState({
            checkedKeys,
        });
    };

    onSelect = (selectedKeys) => {
        this.setState({ selectedKeys });
    };

    getData = () => {
        Request.requestToUumsByPost('/org/findMenuForAuth', {appId: Config.appId, orgId: this.props.dataId}, (result) => {
            this.setState({
                dataSource: result.menuList,
                checkedKeys: result.checkedList,
            });
        });
    };

    render () {
        const loop = (data) => data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (
                    <TreeNode key={item.nodeId} title={item.nodeName}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.nodeId} title={item.nodeName} />;
        });
        return (
            <Tree
                checkable
                checkStrictly
                onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}
            >
                {loop(this.state.dataSource)}
            </Tree>
        );
    }
}

UserOrg.propTypes = {
    dataId: PropTypes.string,
};

export default UserOrg;
