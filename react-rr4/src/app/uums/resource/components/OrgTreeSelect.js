/**
 * Created by feichongzheng on 17/1/18.
 */
import React, {Component} from 'react';
import Request from '../request';
import message from 'antd/lib/message';
import 'FayAntd/message/style/index.js';
import PropTypes from 'prop-types';
import TreeSelect from 'antd/lib/tree-select';
import 'FayAntd/tree-select/style/index.js';

class OrgTreeSelect extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData();
    }

    getData () {
        Request.requestToUumsByPost('/org/findForTreeSelect', {}, (result) => {
            this.setState({data: result});
        }, function () {
            message.error('获取机构列表失败');
        });
    }

    render () {
        return (
            <TreeSelect
                size={this.props.size}
                treeData={this.state.data}
                placeholder={this.props.placeholder}
                allowClear={this.props.allowClear}
                value={this.props.value}
                onChange={this.props.onChange}
                showSearch={this.props.showSearch}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeDefaultExpandAll
                treeNodeFilterProp="label"
            />
        );
    }
}

OrgTreeSelect.propTypes = {
    size: PropTypes.string,
    allowClear: PropTypes.bool,
    showSearch: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

export default OrgTreeSelect;
