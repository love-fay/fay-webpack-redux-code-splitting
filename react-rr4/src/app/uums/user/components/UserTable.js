/**
 * Created by feichongzheng on 17/1/9.
 */
import React, {Component} from 'react';
import Table from 'antd/lib/table';
import 'FayAntd/table/style/index.js';
import Request from '../../resource/request';
import AModal from '../../resource/components/AModal';
import AvailableSwitch from '../../resource/components/AvailableSwitch';
import Auth from '../../resource/auth/components/Auth';
import Storage from '../../resource/storage';
import AResetPassword from './AResetPassword';
import uumsApiPathConfig from '../../uumsApiPathConfig.json';
import UserPrivilege from './UserPrivilege';
import ADelete from '../../resource/components/ADelete';

class UserTable extends Component {

    addMenuPath = uumsApiPathConfig.user.auth.addMenu;

    addControllerResourcePath = uumsApiPathConfig.user.auth.addControllerResource;

    resetPasswordPath = uumsApiPathConfig.user.resetPassword;

    findPrivilege = uumsApiPathConfig.user.auth.findAuthedResource;

    deletePath = uumsApiPathConfig.user.remove;

    columns = [{
        title: '昵称',
        dataIndex: 'nickname',
    }, {
        title: '用户名',
        dataIndex: 'username',
    }, {
        title: '真实姓名',
        dataIndex: 'name',
    }, {
        title: '人员标识',
        dataIndex: 'sn',
    }, {
        title: '创建时间',
        dataIndex: 'createDate',
    }, {
        title: '是否可用',
        render: (text, record) => (
            <AvailableSwitch dataId={record.id} isAvailable={record.isAvailable} path="/user/updAvailable"/>
        ),
    }, {
        title: '操作',
        render: (text, record) => {
            let addMenuRight = Storage.right('/api' + this.addMenuPath);
            let addControllerResourceRight = Storage.right('/api' + this.addControllerResourcePath);
            let resetPasswordRight = Storage.right('/api' + this.resetPasswordPath);
            let findPrivilegeRight = Storage.right('/api' + this.findPrivilege);
            let deleteRight = Storage.right('/api' + this.deletePath);
            return (
                <span>
                    {
                        (addMenuRight || addControllerResourceRight) &&
                        <span>
                            <AModal title="授予用户权限" text="授权" width="600px">
                                <Auth addMenuRight={addMenuRight} addControllerResourceRight={addControllerResourceRight}
                                      addMenuPath={this.addMenuPath} addControllerResourcePath={this.addControllerResourcePath}
                                      type="user" dataId={record.id}/>
                            </AModal>
                            <span className="ant-divider" />
                        </span>
                    }
                    {
                        findPrivilegeRight &&
                        <span>
                            <AModal title="权限" text="查看权限" width="600px">
                                <UserPrivilege id={record.id}/>
                            </AModal>
                            <span className="ant-divider" />
                        </span>
                    }
                    {
                        resetPasswordRight &&
                        <span>
                            <AResetPassword dataName={record.username} refreshTable={this.getData} path={this.resetPasswordPath}/>
                            <span className="ant-divider" />
                        </span>
                    }
                    {
                        deleteRight &&
                        <ADelete dataId={record.id} refreshTable={this.getData} path={this.deletePath}/>
                    }
                </span>
            );
        },
    }];

    params = {
        orgId: undefined,
        groupId: undefined,
        positionId: undefined,
        nickname: undefined,
        username: undefined,
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
        Request.requestToUumsByPost('/user/findForPage', this.params, (result) => {
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
    };

    render () {
        return (
            <Table rowKey={(record) => record.id}
                   {...this.tableState}
                   columns={this.columns}
                   dataSource={this.state.dataSource}
                   pagination={this.state.pagination} />
        );
    }
}

export default UserTable;
