/**
 * Created by feichongzheng on 17/10/11.
 */
import React from 'react';
import {api, ADelete, AvailableSwitch, Privilege, AModal} from '../../resource';
import {view as Auth} from '../../resource/auth';
const {deleteRight, addMenuRight, addControllerResourceRight, resetPasswordRight, findPrivilegeRight} = api.user;
import {FilterType} from '../../constants';
const type = FilterType.USER;
import AResetPassword from './aResetPassword';

export default (refresh) => {
    return [{
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
            <AvailableSwitch dataId={record.id} isAvailable={record.isAvailable} type={type}/>
        ),
    }, {
        title: '操作',
        render: (text, record) => {
            return (
                <span>
                    {
                        (addMenuRight || addControllerResourceRight) &&
                        <span>
                            <AModal title="授予用户权限" text="授权" width="600px">
                                <Auth type={type} dataId={record.id}/>
                            </AModal>
                            {(findPrivilegeRight || resetPasswordRight || deleteRight) && <span className="ant-divider" />}
                        </span>
                    }
                    {
                        findPrivilegeRight &&
                        <span>
                            <AModal title="权限" text="查看权限" width="600px">
                                <Privilege id={record.id} type={type}/>
                            </AModal>
                            {(resetPasswordRight || deleteRight) && <span className="ant-divider" />}
                        </span>
                    }
                    {
                        resetPasswordRight &&
                        <span>
                            <AResetPassword dataName={record.username} refreshTable={this.getData} path={this.resetPasswordPath}/>
                            {deleteRight && <span className="ant-divider" />}
                        </span>
                    }
                    {
                        deleteRight &&
                        <ADelete dataId={record.id} type={type} cb={() => {refresh();}}/>
                    }
                </span>
            );
        },
    }];
}