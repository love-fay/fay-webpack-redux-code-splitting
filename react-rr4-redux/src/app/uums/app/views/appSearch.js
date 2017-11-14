/**
 * Created by feichongzheng on 17/1/11.
 */
import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import 'FayAntd/form/style/index.js';
import 'FayAntd/input/style/index.js';
import 'FayAntd/button/style/index.js';
import AppSaveForm from './appSaveForm';
const FormItem = Form.Item;
import PropTypes from 'prop-types';
import {api, ButtonSave} from '../../resource';
import {findAppForPage} from '../actions';
import {connect} from 'react-redux';

const {saveRight} = api.app;

const SearchForm = ({handleSubmit, form}) => {
    const {getFieldDecorator} = form;
    return (
        <Form layout='inline' onSubmit={handleSubmit}>
            <FormItem>
                {getFieldDecorator('name')(
                    <Input placeholder="名称"/>
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" icon="search" htmlType="submit" size="default">搜索</Button>
            </FormItem>
            {
                saveRight &&
                <FormItem>
                    <ButtonSave title="新增系统"><AppSaveForm /></ButtonSave>
                </FormItem>
            }
        </Form>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        ownProps.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    name: values.name,
                    number: 0,
                    size: 20,
                };
                dispatch(findAppForPage(params));
            }
        });
    };

    return {
        handleSubmit: handleSubmit
    }
};

SearchForm.propTypes = {
    form: PropTypes.object,
};

export default Form.create()(connect(null, mapDispatchToProps)(SearchForm));
