/**
 * Created by feichongzheng on 17/10/11.
 */
import React from 'react';
import AppUpdateForm from './appUpdateForm';
import {FilterType} from '../../constants';
import {api, ADelete, AModal} from '../../resource';
const {updateRight, deleteRight} = api.app;

export default (refresh) => {
    return [{
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
            return (
                <span>
                    {
                        updateRight &&
                        <AModal title="修改系统" text="修改">
                            <AppUpdateForm data={record} cb={() => {
                                refresh();
                            }}/>
                        </AModal>
                    }
                    {
                        updateRight && deleteRight && <span className="ant-divider" />
                    }
                    {
                        deleteRight &&
                        <ADelete dataId={record.id} type={FilterType.APP} cb={() => {refresh();}}/>
                    }
                </span>
            );
        },
    }];
}