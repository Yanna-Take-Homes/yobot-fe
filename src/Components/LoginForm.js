import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Input, Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from 'react-router-dom';
import {setUser} from "../Utils";

const FormCtn = styled(Form)`{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}`

const LoginForm = () => {
    const [form] = useForm();
    const navigate = useNavigate();

    const loginUser = async (val) => {
        const url = "/auth/login";
        await axios.post(url, {...val})
        .then(res => {
            setUser(res);
            navigate('/past-chats');
        }).catch(() => {alert("sorry! that didn't work")});
    }

    return (
        <FormCtn form={form} onFinish={loginUser}>
            <h1>Sign In!</h1>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input type="text" placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input type="password" placeholder="Password" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Login</Button>
        </FormCtn>
    );
}

export default LoginForm;