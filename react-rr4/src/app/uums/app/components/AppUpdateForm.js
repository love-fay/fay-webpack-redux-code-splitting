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
                values.id = this.props.data.id;
                Request.requestToUumsByPost(this.props.path, values, (result) => {
                    this.setState({showMessage: 'block', message: '保存成功', messageType: 'success', loading: false});
                    this.props.refreshTable();
                    this.props.setModal(false);
                }, (errMessage) => {
                    this.setState({showMessage: 'block', message: '保存失败', messageType: 'error', loading: false});
                });
            } else {
                this.setState({ loading: false});
            }
        });
    };

    handleReset = () => {
        this.setState({showMessage: 'none', message: '', messageType: ''});
        this.props.form.resetFields();
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
                <div>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入名称!',
                            }],
                            initialValue: data.name,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="标识符">
                        {getFieldDecorator('sn', {
                            rules: [{
                                required: true, message: '请输入标识符!',
                            }],
                            initialValue: data.sn,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="域名">
                        {getFieldDecorator('url', {
                            rules: [{
                                required: true, message: '请输入域名!',
                            }],
                            initialValue: data.url,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="描述">
                        {getFieldDecorator('description', {
                            initialValue: data.description,
                        })(
                            <Input type="textarea"/>
                        )}
                    </FormItem>
                </div>
                <FormItem {...tailFormItemLayout}>
                    <Alert style={{display: this.state.showMessage}} message={this.state.message} type={this.state.messageType} showIcon/>
                    <Button type="primary" loading={this.state.loading} htmlType="submit" size="default">保存</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset} size="default">
                        重置
                    </Button>
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

const AppUpdateForm = Form.create()(UpdateForm);

export default AppUpdateForm;
