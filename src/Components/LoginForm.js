import React from "react";
import axios from "axios";
import { Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from 'react-router-dom';
import {setUser} from "../Utils";
import {AuthFormCtn, FormItem} from "../Styles/Shared";

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
        <AuthFormCtn form={form} onFinish={loginUser}>
            <h2>Login</h2>
            <FormItem name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input type="text" placeholder="Username" />
            </FormItem>
            <FormItem name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password type="password" placeholder="Password" />
            </FormItem>
            <Button type="primary" htmlType="submit">Login</Button>
        </AuthFormCtn>
    );
}

export default LoginForm;