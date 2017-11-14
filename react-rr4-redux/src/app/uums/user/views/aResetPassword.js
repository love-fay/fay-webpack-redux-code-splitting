/**
 * Created by feichongzheng on 17/1/16.
 */
import React, {Component} from 'react';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import 'FayAntd/popconfirm/style/index.js';
import 'FayAntd/message/style/index.js';
import {api} from '../../resource';
import PropTypes from 'prop-types';

class AResetPassword extends Component {

    constructor (props) {
        super(props);
    }

    confirm = () => {
        let username = this.props.dataName;
        api.user.resetPassword({username: username}).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    message.success('重置成功！');
                    cb();
                } else {
                    message.success('重置失败！');
                }
            })
            .catch( (err) => {
                throw err;
            });
    };

    render () {
        return (
            <Popconfirm title="是否将密码重置为123456?" onConfirm={this.confirm} okText="是" cancelText="否">
                <a href="#">重置密码</a>
            </Popconfirm>
        );
    }
}

AResetPassword.propTypes = {
    dataName: PropTypes.string,
    path: PropTypes.string,
    refreshTable: PropTypes.func,
};

export default AResetPassword;
