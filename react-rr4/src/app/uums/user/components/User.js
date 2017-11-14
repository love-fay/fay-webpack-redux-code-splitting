/**
 * Created by feichongzheng on 17/1/9.
 */
import React, {Component} from 'react';
import Card from 'antd/lib/card';
import 'FayAntd/card/style/index.js';
import UserSearch from './UserSearch';
import style from '../style/user.css';
import UserTable from './UserTable';

class User extends Component {

    constructor (props) {
        super(props);
    }

    getTable = (params) => {
        this.userTable.params = params;
        this.userTable.params.number = 0;
        this.userTable.params.size = 10;
        this.userTable.getData();
    };

    refreshTable = () => {
        this.userTable.getData();
    };

    render () {
        return (
            <Card>
                <div className={style.userSearch}><UserSearch table={this.getTable} refreshTable={this.refreshTable}/></div>

                <div className={style.userTable}>
                    <UserTable ref={(ref) => this.userTable = ref} />
                </div>
            </Card>
        );
    }
}

export default User;
