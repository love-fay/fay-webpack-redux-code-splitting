/**
 * Created by feichongzheng on 17/1/11.
 */
import React, {Component} from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import 'FayAntd/form/style/index.js';
import 'FayAntd/input/style/index.js';
import 'FayAntd/button/style/index.js';
import UserSaveForm from './UserSaveForm';
import ButtonSave from '../../resource/components/ButtonSave';
const FormItem = Form.Item;
import Storage from '../../resource/storage';
import PropTypes from 'prop-types';
import OrgTreeSelect from '../../resource/components/OrgTreeSelect';
import GroupSelect from '../../resource/components/GroupSelect';
import PositionSelect from '../../resource/components/PositionSelect';
import uumsApiPathConfig from '../../uumsApiPathConfig.json';

class UserSearchForm extends Component {

    addPath = uumsApiPathConfig.user.add;

    constructor (props) {
        super(props);
        this.state = {
            orgId: undefined,
            groupId: undefined,
            positionId: undefined,
            roleId: undefined,
        };
    }

    search = (params) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (params) {
                    values.orgId = params.orgId;
                    values.groupId = params.groupId;
                    values.positionId = params.positionId;
                    values.roleId = params.roleId;
                } else if (values.roleId) {
                    values.roleId = values.roleId.length === 2 ? values.roleId[1] : undefined;
                }
                this.props.table(values);
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.search();
    };

    onChangeOrg = (value) => {
        this.setState({
            orgId: value,
        });
        const params = {orgId: value, roleId: this.state.roleId};
        this.search(params);
    };

    onChangeGroup = (value) => {
        this.setState({
            groupId: value,
        });
        const params = {orgId: this.state.orgId, groupId: value, roleId: this.state.roleId};
        this.search(params);
    };

    onChangePosition = (value) => {
        this.setState({
            positionId: value,
        });
        const params = {orgId: this.state.orgId, groupId: this.state.groupId, positionId: value, roleId: this.state.roleId};
        this.search(params);
    };

    onChangeRole = (value, selectedOptions) => {
        if (value.length === 2) {
            this.setState({
                roleId: value[1],
            });
            const params = {
                orgId: this.state.orgId,
                groupId: this.state.groupId,
                positionId: this.state.positionId,
                roleId: value[1],
            };
            this.search(params);
        } else if (value.length === 0) {
            this.setState({
                roleId: undefined,
            });
            const params = {
                orgId: this.state.orgId,
                groupId: this.state.groupId,
                positionId: this.state.positionId,
                roleId: undefined,
            };
            this.search(params);
        }
    };

    render () {
        const {getFieldDecorator} = this.props.form;
        let addButtonRight = Storage.right('/api' + this.addPath);
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormItem>
                    <div style={{width: '200px'}}>
                        {getFieldDecorator('orgId')(
                            <OrgTreeSelect showSearch size="large" allowClear placeholder="请选择机构" onChange={this.onChangeOrg}/>
                        )}
                    </div>
                </FormItem>
                <FormItem>
                    <div style={{width: '200px'}}>
                        {getFieldDecorator('groupId')(
                            <GroupSelect orgId={this.state.orgId} size="large" allowClear placeholder="请选择部门" onChange={this.onChangeGroup}/>
                        )}
                    </div>
                </FormItem>
                <FormItem>
                    <div style={{width: '200px'}}>
                        {getFieldDecorator('positionId')(
                            <PositionSelect orgId={this.state.orgId} groupId={this.state.groupId} size="large" allowClear placeholder="请选择职位" onChange={this.onChangePosition}/>
                        )}
                    </div>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('nickname')(
                        <Input placeholder="昵称"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('username')(
                        <Input placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="search" htmlType="submit" size="default">搜索</Button>
                </FormItem>
                {
                    addButtonRight &&
                    <FormItem>
                        <ButtonSave title="新增用户"><UserSaveForm path={this.addPath} refreshTable={this.props.refreshTable}/></ButtonSave>
                    </FormItem>
                }
            </Form>
        );
    }
}

UserSearchForm.propTypes = {
    table: PropTypes.func,
    refreshTable: PropTypes.func,
    form: PropTypes.object,
};

const UserSearch = Form.create()(UserSearchForm);

export default UserSearch;
