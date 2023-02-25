import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { authLogin } from '../store/actions';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const Login = (props) => {
    const navigate = useNavigate();
    if (props.access_token === null) {
        const onFinish = (values) => {
            props.authLogin(values.username, values.password);
            if (props.token !== null) {
                navigate("/");
            } else {
                Modal.error({
                    title: 'This is an error message',
                    content: props.error.response.data.detail,
                });
            }
        };
        return (
            <>
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                    maxWidth: 600,
                    position: 'absolute',
                    top: '30%',
                    left: '30%',
                    visibility: props.loading ? 'hidden' : ''
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    /* onFinishFailed={onFinishFailed} */
                    autoComplete="off"
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
    
                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
    
                    <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
    
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
                <Spin style={{display: 'flex', position: 'absolute', top: '50%', left: '50%'}} spinning={props.loading} indicator={antIcon} />
            </>
        )
    } else {
        return (
            <Navigate to="/" replace/>
        )
    }
};

function mapStateToProps(state) {
    return {
      access_token: state.access_token,
      error: state.error,
      loading: state.loading,
    };
};
    
function mapDispatchToProps(dispatch) {
    return {
      authLogin: (username, password) => dispatch(authLogin(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);