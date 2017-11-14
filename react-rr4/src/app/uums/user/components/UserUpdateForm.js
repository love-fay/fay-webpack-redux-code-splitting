/**
 * Created by feichongzheng on 17/1/12.
 */
import React, {Component} from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';
import 'FayAntd/button/style/index.js';
import 'FayAntd/form/style/index.js';
import 'FayAntd/input/style/index.js';
import 'FayAntd/alert/style/index.js';
const FormItem = Form.Item;
import Request from '../../resource/request';
import PropTypes from 'prop-types';

class UpdateForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            passwordDirty: false,
            message: '',
            messageType: '',
            showMessage: 'none',
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                Request.requestToUumsByPost(this.props.path, values, (result) => {
                    this.setState({showMessage: 'block', message: '重置成功', messageType: 'success', loading: false});
                    this.props.refreshTable();
                    this.props.setModal(false);
                }, (errMessage) => {
                    this.setState({showMessage: 'block', message: errMessage, messageType: 'error', loading: false});
                });
            } else {
                this.setState({ loading: false});
            }
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6,
            },
        };
        const data = this.props.data;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: '请输入用户名!',
                        }],
                        initialValue: data.username,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="密码">
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }],
                        initialValue: data.password,
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Alert style={{display: this.state.showMessage}} message={this.state.message} type={this.state.messageType} showIcon/>
                    <Button type="primary" loading={this.state.loading} htmlType="submit" size="default">重置密码</Button>
                </FormItem>
            </Form>
        );
    }
}

UpdateForm.propTypes = {
    data: PropTypes.object,
    path: PropTypes.string,
    form: PropTypes.object,
    refreshTable: PropTypes.func,
    setModal: PropTypes.func,
};

const UserUpdateForm = Form.create()(UpdateForm);

export default UserUpdateForm;
