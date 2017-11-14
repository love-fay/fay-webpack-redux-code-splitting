/**
 * Created by feichongzheng on 17/10/24.
 */
import React from 'react';
import Bundle from '../bundle/views/bundle';
import load from 'bundle-loader?lazy&name=[Nav]!./bundle';

export const NavTop = (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {NavTop} = target;
                cb(NavTop);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export const NavLeft = (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {NavLeft} = target;
                cb(NavLeft);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};