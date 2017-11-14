/**
 * Created by feichongzheng on 17/1/9.
 */
import React from 'react';
import Card from 'antd/lib/card';
import 'FayAntd/card/style/index.js';
import style from './style.css';
import AppTable from './appTable';
import AppSearch from './appSearch';

export default () => {
    return (
        <Card>
            <AppSearch />
            <div className={style.appTable}>
                <AppTable />
            </div>
        </Card>
    );
}
