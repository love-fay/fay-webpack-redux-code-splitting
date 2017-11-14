/**
 * Created by feichongzheng on 17/10/24.
 */
import React from 'react';
import Bundle from '../../bundle/views/bundle';
import load from 'bundle-loader?lazy&name=[App]!./bundle';
import {injectAsyncStore} from '../../Store';

export default (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {reducer, view, sagas} = target;
                injectAsyncStore(store, reducer, sagas);
                cb(view);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};