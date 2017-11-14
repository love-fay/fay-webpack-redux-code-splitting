/**
 * Created by feichongzheng on 17/1/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {api, SelectForIdAndName} from '../../resource';
import message from 'antd/lib/message';
import 'FayAntd/message/style/index.js';

class AppSelect extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData();
    }

    getData () {
        api.app.findAppForSelect({})
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    const data = res.data.voList;
                    const value = (data.length === 0 || this.props.allowClear) ? this.props.value : data[0].id;
                    this.setState({data: data, value: value});
                    !this.props.allowClear && this.props.onChange(value);
                } else {
                    message.error('获取应用系统列表失败');
                }
            })
            .catch( (err) => {
                throw err;
            });
    }

    onChange = (value) => {
        this.setState({value: value});
        this.props.onChange(value);
    };

    render () {
        return (
            <SelectForIdAndName size={this.props.size} allowClear={this.props.allowClear} value={this.state.value} placeholder="请选择应用系统" data={this.state.data} onChange={this.onChange}/>
        );
    }
}

AppSelect.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    allowClear: PropTypes.bool,
    size: PropTypes.string,
    onChange: PropTypes.func,
};

export default AppSelect;
