/**
 * Created by feichongzheng on 17/9/12.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bundle extends Component {

    static propTypes = {
        load: PropTypes.any,
        children: PropTypes.any,
    };

    static contextTypes = {
        store: PropTypes.object
    };

    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null,
    };

    componentWillMount () {
        this._isMounted = true;
        this.load(this.props);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load (props) {
        this.setState({
            mod: null,
        });
        props.load(this.context.store, (mod) => {
            if (this._isMounted) {
                this.setState({
                    // handle both es imports and cjs
                    mod: mod['default'] ? mod['default'] : mod,
                });
            }
        });
    }

    render () {
        return this.state.mod ? this.props.children(this.state.mod) : <div></div>;
    }
}

export default Bundle;
