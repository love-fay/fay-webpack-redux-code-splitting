/**
 * Created by feichongzheng on 17/1/22.
 */
import React, {Component} from 'react';
import Switch from 'antd/lib/switch';
import 'FayAntd/switch/style/index.js';
import Request from '../../resource/request';
import PropTypes from 'prop-types';

class AvailableSwitch extends Component {

    constructor (props) {
        super(props);
        this.state = {
            checked: this.props.isAvailable === 1,
            isAvailable: this.props.isAvailable,
        };
    }

    onChange = () => {
        let isAvailable = this.state.isAvailable === 1 ? 2 : 1;
        this.setState({
            checked: isAvailable === 1,
            isAvailable: isAvailable,
        });
        Request.requestToUumsByPost(this.props.path, {id: this.props.dataId, isAvailable: isAvailable});
    };

    componentWillReceiveProps (nextProps) {
        this.setState({
            checked: nextProps.isAvailable === 1,
            isAvailable: nextProps.isAvailable,
        });
    }

    render () {
        return (
            <Switch checked={this.state.checked} checkedChildren={'可用'} unCheckedChildren={'不可用'} onChange={this.onChange} />
        );
    }
}

AvailableSwitch.propTypes = {
    isAvailable: PropTypes.number,
    path: PropTypes.string,
    dataId: PropTypes.string,
};

export default AvailableSwitch;
