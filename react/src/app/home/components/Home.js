/**
 * Created by feichongzheng on 17/6/9.
 */
import React, {Component} from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default () => {
    return (
        <Row style={{textAlign: 'center'}}>
            <Col span={5}> </Col>
            <Col span={14}>
                <img src="assets/images/logo/logo-home.png" width="500px"/>
            </Col>
        </Row>

    );
};
