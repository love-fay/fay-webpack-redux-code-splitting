/**
 * Created by feichongzheng on 17/1/18.
 */
import React, {Component} from 'react';
import SelectForIdAndName from './SelectForIdAndName';
import Request from '../request';
import message from 'antd/lib/message';
import 'FayAntd/message/style/index.js';
import PropTypes from 'prop-types';
import uumsApiPathConfig from '../../uumsApiPathConfig.json';

class PositionSelect extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData(this.props.orgId, this.props.groupId);
    }

    getData (orgId, groupId) {
        Request.requestToUumsByPost(uumsApiPathConfig.position.findForSelect, {orgId: orgId, groupId: groupId}, (result) => {
            this.setState({data: result.voList});
        }, () => {
            message.error('获取职位列表失败');
        });
    }

    componentWillReceiveProps (nextProps) {
        this.getData(nextProps.orgId, nextProps.groupId);
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

PositionSelect.propTypes = {
    size: PropTypes.string,
    allowClear: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    orgId: PropTypes.string,
    groupId: PropTypes.string,
    onChange: PropTypes.func,
};

export default PositionSelect;
