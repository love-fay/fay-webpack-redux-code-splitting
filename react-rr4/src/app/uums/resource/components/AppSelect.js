/**
 * Created by feichongzheng on 17/1/18.
 */
import React, {Component} from 'react';
import SelectForIdAndName from './SelectForIdAndName';
import Request from '../../resource/request';
import PropTypes from 'prop-types';

class AppSelect extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
        this.getData();
    }

    getData () {
        Request.requestToUumsByPost('/app/auth/findAppForSelect', {}, (result) => {
            let data = result.voList;
            let value = (data.length === 0 || this.props.allowClear) ? this.props.value : data[0].id;
            this.setState({data: data, value: value});
            this.props.onChange(value);
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
