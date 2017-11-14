/**
 * Created by feichongzheng on 16/12/15.
 */

import React, {Component} from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'FayAntd/row/style/index.js';
import 'FayAntd/col/style/index.js';

import NavTop from '../../navigation/components/NavTop';
import NavLeft from '../../navigation/components/NavLeft';
import '../style/Layout12.css';
import PropTypes from 'prop-types';

class Layout12 extends Component {

    changeNavTopCurrent = (path) => {
        this.navTop.setState({
            current: path,
        });
    };

    changeNavLeftCurrent = (path) => {
        this.navLeft.setState({
            current: path,
        });
    };

    render () {
        const {history, location} = this.props;
        return (
            <div>
                <div id='navTop'>
                    <NavTop history={history}
                            location={location}
                            ref={(ref) => this.navTop = ref}
                            changeNavLeftCurrent={this.changeNavLeftCurrent}/>
                </div>
                <div id="navLeft">
                    <NavLeft history={history}
                             location={location}
                             ref={(ref) => this.navLeft = ref}
                             changeNavTopCurrent={this.changeNavTopCurrent}/>
                </div>
                <Row>
                    <Col id="fayContent">
                            {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}

Layout12.propTypes = {
    history: PropTypes.object,
    location: PropTypes.any,
    children: PropTypes.any,
};

export default Layout12;
