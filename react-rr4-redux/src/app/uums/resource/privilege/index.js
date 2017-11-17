/**
 * Created by feichongzheng on 17/10/9.
 */
import React from 'react';
import Bundle from '../../../bundle/views/bundle';
import load from 'bundle-loader?lazy&name=[Privilege]!./lazy';
import reducer from './reducer';
import sagas from './sagas';

const view = (props) => {
    return (
        <Bundle load={load}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export {view, reducer, sagas};