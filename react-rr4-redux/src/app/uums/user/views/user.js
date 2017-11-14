/**
 * Created by feichongzheng on 17/1/9.
 */
import React from 'react';
import Card from 'antd/lib/card';
import 'FayAntd/card/style/index.js';
import style from './style.css';
import UserTable from './userTable';
import UserSearch from './userSearch';

export default () => {
    return (
        <Card>
            <UserSearch />
            <div className={style.userTable}>
                <UserTable />
            </div>
        </Card>
    );
}
