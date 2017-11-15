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

class Home extends Component{

    componentWillMount(){
        if (!user.isLogin()) {
            this.props.history.push('/login', null);
        }
    }

    render(){
        if (user.isLogin()) {
            return (
                <Row style={{textAlign: 'center'}}>
                    <Col span={5}> 首页 </Col>
                    <Col span={14}>
                    </Col>
                </Row>
            );
        } else {
            return <div>需要登录</div>;
        }
    }
}

export default withRouter(Home);
