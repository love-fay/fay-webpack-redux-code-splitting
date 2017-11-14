/**
 * Created by feichongzheng on 17/8/25.
 */
import React, {Component} from 'react';
import Request from '../../resource/request';
import PropTypes from 'prop-types';
import uumsApiPathConfig from '../../uumsApiPathConfig.json';
import Tag from 'antd/lib/tag';
import Alert from 'antd/lib/alert';
import 'FayAntd/tag/style/index.js';
import 'FayAntd/alert/style/index.js';

class UserPrivilege extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
            message: '正在获取该用户被授予的权限列表',
            messageType: 'info',
        };
        this.getData(this.props.id);
    }

    getData = (id) => {
        Request.requestToUumsByPost(uumsApiPathConfig.user.auth.findAuthedResource, {dataId: id}, (result) => {
            if (result === undefined || result.length === 0) {
                this.setState({data: result, message: '该用户尚未授予任何权限'});
            } else {
                this.setState({data: result});
            }
        }, (errMessage) => {
            this.setState({data: null, message: errMessage, messageType: 'error'});
        });
    };

    render () {
        const data = this.state.data;
        if (data.length === 0) return <Alert message={this.state.message} type={this.state.messageType} showIcon/>;
        const loop = (data) => data.map((item, i) => {
            const arr = item.split(',');
            const detail = (d) => d.map((i) => {
                const [type, name] = i.split('_');
                if (type === 'APP') {
                    return <span><Tag color="#108ee9">系统</Tag>{name}</span>;
                } else if (type === 'MENU') {
                    return <span><Tag color="#87d068">菜单</Tag>{name}</span>;
                } else if (type === 'CONTROLLER') {
                    return <span><Tag color="#2db7f5">请求</Tag>{name}</span>;
                } else {
                    return '';
                }
            });
            return <div key={i}>{detail(arr)}</div>;
        });
        return (
            <div>
                {loop(data)}
            </div>
        );
    }
}

UserPrivilege.propTypes = {
    id: PropTypes.string,
};

export default UserPrivilege;
