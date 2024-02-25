import { Button, Form, Input } from 'antd';
import React from 'react';

const Auth = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className="flex h-[100vh] w-[100vw] items-center justify-center">
            <div className="w-[400px] rounded-xl border border-slate-200 p-6 shadow-lg">
                <h1 className="mb-5 text-center text-2xl font-bold uppercase">
                    Sign In
                </h1>
                <Form onFinish={onFinish} layout="vertical" autoComplete="off">
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Auth;
