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
import AppSaveForm from './AppSaveForm';
import ButtonSave from '../../resource/components/ButtonSave';
const FormItem = Form.Item;
import Storage from '../../resource/storage';
import PropTypes from 'prop-types';

class AppSearchForm extends Component {

    addPath = '/app/add';

    constructor (props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.table(values.name);
            }
        });
    };

    render () {
        const {getFieldDecorator} = this.props.form;
        let addButtonRight = Storage.right('/api' + this.addPath);

        return (
            <Form layout='inline' onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('name')(
                        <Input placeholder="名称"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="search" htmlType="submit" size="default">搜索</Button>
                </FormItem>
                {
                    addButtonRight &&
                    <FormItem>
                        <ButtonSave title="新增系统"><AppSaveForm path={this.addPath} refreshTable={this.props.refreshTable}/></ButtonSave>
                    </FormItem>
                }
            </Form>
        );
    }
}

AppSearchForm.propTypes = {
    table: PropTypes.func,
    refreshTable: PropTypes.func,
    form: PropTypes.object,
};

const AppSearch = Form.create()(AppSearchForm);

export default AppSearch;
