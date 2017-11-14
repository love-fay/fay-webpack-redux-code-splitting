/**
 * Created by feichongzheng on 17/10/24.
 */
import React from 'react';
import Bundle from '../bundle/views/bundle';
import load from 'bundle-loader?lazy&name=[Error]!./bundle';

export const E401D3 = (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {E401D3} = target;
                cb(E401D3);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export const E404 = (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {E404} = target;
                cb(E404);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export const E504 = (props) => {
    return (
        <Bundle load={(store, cb) => {
            load((target) => {
                const {E504} = target;
                cb(E504);
            })
        }}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};