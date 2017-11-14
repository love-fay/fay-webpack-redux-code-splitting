/**
 * Created by feichongzheng on 17/1/18.
 */
import React, {Component} from 'react';
import SelectForIdAndName from './SelectForIdAndName';
import Request from '../request';
import message from 'antd/lib/message';
import 'FayAntd/message/style/index.js';
import PropTypes from 'prop-types';

class OrgSelect extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData();
    }

    getData () {
        Request.requestToUumsByPost('/org/findForSelect', {}, (result) => {
            this.setState({data: result.voList});
        }, () => {
            message.error('获取机构列表失败');
        });
    }

    render () {
        return (
            <SelectForIdAndName
                size={this.props.size}
                allowClear={this.props.allowClear}
                value={this.props.value}
                placeholder={this.props.placeholder}
                data={this.state.data}
                onChange={this.props.onChange}/>
        );
    }
}

OrgSelect.propTypes = {
    size: PropTypes.string,
    allowClear: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

export default OrgSelect;
