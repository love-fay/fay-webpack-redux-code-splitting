/**
 * Created by feichongzheng on 17/1/9.
 */
import React, {Component} from 'react';
import Card from 'antd/lib/card';
import 'FayAntd/card/style/index.js';
import AppSearch from './AppSearch';
import style from '../style/app.css';
import AppTable from './AppTable';

class App extends Component {

    constructor (props) {
        super(props);
    }

    getTable = (name) => {
        this.appTable.params.name = name;
        this.appTable.params.number = 0;
        this.appTable.getData();
    };

    refreshTable = () => {
        this.appTable.getData();
    };

    render () {
        return (
            <Card>
                <div className={style.appSearch}><AppSearch table={this.getTable} refreshTable={this.refreshTable}/></div>
                <div className={style.appTable}>
                    <AppTable ref={(ref) => this.appTable = ref} />
                </div>
            </Card>
        );
    }
}

export default App;
