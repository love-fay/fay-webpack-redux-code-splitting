/**
 * Created by feichongzheng on 17/6/9.
 */
import React, {Component} from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'FayAntd/row/style/index.js';
import 'FayAntd/col/style/index.js';
import {withRouter} from 'react-router-dom';
import {user} from '../../resource';

const Home = ({history}) => {
    if (user.isLogin()) {
        return (
            <Row style={{textAlign: 'center'}}>
                <Col span={5}> 首页 </Col>
                <Col span={14}>
                </Col>
            </Row>
        );
    } else {
        history.push('/login', null);
    }
};

export default withRouter(Home);
