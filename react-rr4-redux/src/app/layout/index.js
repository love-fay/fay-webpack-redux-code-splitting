/**
 * Created by feichongzheng on 17/10/13.
 */
import React from 'react';
import Bundle from '../bundle/views/bundle';
import load from 'bundle-loader?lazy&name=[Layout12]!./lazy';

const Layout12 = (props) => {
    return (
        <Bundle load={load}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export {Layout12};