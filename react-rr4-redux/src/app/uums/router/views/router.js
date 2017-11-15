/**
 * Created by feichongzheng on 16/12/18.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {user} from '../../../resource';
import { withRouter } from 'react-router-dom';
import {view as App} from '../../app';
import {view as User} from '../../user';
import {UumsRouterPaths} from '../../constants';
import { E404 } from '../../../error';

class UumsRouter extends Component{

    componentWillMount(){
        const {goToLogin} = this.props;
        if (!user.isLogin()) {
            goToLogin();
        }
    }

    render(){
        const {getChildrenMatchUrl} = this.props;
        if (user.isLogin()) {
            return <div>{getChildrenMatchUrl()}</div>;
        } else {
            return <div>需要登录</div>;
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    const goToLogin = () => {
        const {location, history} = ownProps;
        const {pathname} = location;
        user.goToLogin(history, pathname);
    };

    const getChildrenMatchUrl = () => {
        const {pathname} = ownProps.location;
        switch (pathname){
            case UumsRouterPaths.APP:
                return <App {...ownProps}/>;
            case UumsRouterPaths.USER:
                return <User {...ownProps}/>;
            default:
                return <E404 {...ownProps}/>;
        }
    };

    return {
        goToLogin: goToLogin,
        getChildrenMatchUrl: getChildrenMatchUrl
    }
};

export default withRouter(connect(null, mapDispatchToProps)(UumsRouter));
