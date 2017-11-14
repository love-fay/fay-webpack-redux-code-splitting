/**
 * Created by feichongzheng on 16/12/15.
 */

import React, {Component} from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import NavTop from '../../navigation/components/NavTop';
import NavLeft from '../../navigation/components/NavLeft';
import '../style/Layout12.css';

export default class Layout12 extends Component {

    constructor (props) {
        super(props);
    }

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
        return (
            <div>
                <div id='navTop'>
                    <NavTop history={this.props.history}
                            location={this.props.location}
                            ref={(ref) => this.navTop = ref}
                            changeNavLeftCurrent={this.changeNavLeftCurrent}/>
                </div>
                <div id="navLeft">
                    <NavLeft history={this.props.history}
                             location={this.props.location}
                             ref={(ref) => this.navLeft = ref}
                             changeNavTopCurrent={this.changeNavTopCurrent}/>
                </div>
                <Row>
                    <Col id="fayContent" style={{marginLeft: '170px'}}>
                            {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}
