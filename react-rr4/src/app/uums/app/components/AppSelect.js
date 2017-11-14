/**
 * Created by feichongzheng on 17/1/18.
 */
import React, {Component} from 'react';
import SelectForIdAndName from '../../resource/components/SelectForIdAndName';
import Request from '../../resource/request';
import message from 'antd/lib/message';
import 'FayAntd/message/style/index.js';
import PropTypes from 'prop-types';

class AppSelect extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount () {
        Request.requestToUumsByPost('/common/findAppForSelect', {}, (result) => {
            this.setState({data: result.voList});
        }, (errMessage) => {
            message.error('获取所属系统列表失败');
        });
    }

    render () {
        return (
            <SelectForIdAndName value={this.props.value} placeholder="请选择所属系统" data={this.state.data} onChange={this.props.onChange}/>
        );
    }
}

AppSelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default AppSelect;
