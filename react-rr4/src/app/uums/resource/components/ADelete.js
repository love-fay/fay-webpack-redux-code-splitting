/**
 * Created by feichongzheng on 17/1/16.
 */
import React, {Component} from 'react';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import 'FayAntd/popconfirm/style/index.js';
import 'FayAntd/message/style/index.js';
import Request from '../../resource/request';
import PropTypes from 'prop-types';

class ADelete extends Component {

    constructor (props) {
        super(props);
    }

    confirm = () => {
        let ids = this.props.dataId.split(';');
        message.success('删除成功！');
        Request.requestToUumsByPost(this.props.path, {ids: ids}, (result) => {
            this.props.refreshTable();
        });
    };

    render () {
        return (
            <Popconfirm title="您确认删除?" onConfirm={this.confirm} okText="确认" cancelText="取消">
                <a href="#">删除</a>
            </Popconfirm>
        );
    }
}

ADelete.propTypes = {
    dataId: PropTypes.string,
    path: PropTypes.string,
    refreshTable: PropTypes.func,
};

export default ADelete;
