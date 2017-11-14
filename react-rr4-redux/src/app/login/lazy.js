/**
 * Created by feichongzheng on 17/10/24.
 */
import React from 'react';
import Bundle from '../bundle/views/bundle';
import load from 'bundle-loader?lazy&name=[Login]!./bundle';

export default (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {view} = target;
                cb(view);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};