/**
 * Created by feichongzheng on 17/1/9.
 */
import React, {Component} from 'react';
import Table from 'antd/lib/table';
import 'FayAntd/table/style/index.js';
import Request from '../../resource/request';
import AppUpdateForm from './AppUpdateForm';
import ADelete from '../../resource/components/ADelete';
import AModal from '../../resource/components/AModal';
import Storage from '../../resource/storage';
import uumsApiPathConfig from '../../uumsApiPathConfig.json';

class AppTable extends Component {

    updatePath = uumsApiPathConfig.app.update;

    deletePath = uumsApiPathConfig.app.remove;

    columns = [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '标识符',
        dataIndex: 'sn',
    }, {
        title: '域名',
        dataIndex: 'url',
    }, {
        title: '操作',
        render: (text, record) => {
            let updateRight = Storage.right('/api' + this.updatePath);
            let deleteRight = Storage.right('/api' + this.deletePath);
            return (
                <span>
                    {
                        updateRight &&
                            <span>
                                <AModal title="修改系统" text="修改">
                                    <AppUpdateForm path={this.updatePath} refreshTable={this.getData} data={record}/>
                                </AModal>
                                <span className="ant-divider" />
                            </span>
                    }
                    {
                        deleteRight &&
                        <ADelete dataId={record.id} refreshTable={this.getData} path="/app/delete"/>
                    }
            </span>
            );
        },
    }];

    params = {
        name: undefined,
        number: 0,
        size: 20,
    };

    tableState = {
        bordered: false,
        loading: true,
        pagination: true,
        size: 'middle',
        scroll: undefined,
    };

    constructor (props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {pageSize: this.params.size, current: 1},
        };
        this.getData();
    }

    getData = () => {
        Request.requestToUumsByPost('/app/findForPage', this.params, (result) => {
            this.tableState.loading = false;
            this.setState({
                dataSource: result.pageData,
                pagination: {
                    current: this.params.number + 1,
                    showQuickJumper: true,
                    total: result.totalRows,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '40'],
                    onShowSizeChange: (current, pageSize) => {
                        this.tableState.loading = true;
                        this.params.number = current - 1;
                        this.params.size = pageSize;
                        this.getData();
                    },
                    onChange: (current) => {
                        this.tableState.loading = true;
                        this.params.number = current - 1;
                        this.getData();
                    },
                },
            });
        });
    }

    render () {
        return (
            <Table rowKey={(record) => record.id}
                   expandedRowRender={(record) => <p>{record.description}</p>}
                   {...this.tableState}
                   columns={this.columns}
                   dataSource={this.state.dataSource}
                   pagination={this.state.pagination} />
        );
    }
}

export default AppTable;
