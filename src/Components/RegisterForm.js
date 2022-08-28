import React from "react";
import axios from "axios";
import { Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useNavigate } from 'react-router-dom';
import {setUser} from "../Utils";
import {AuthFormCtn, FormItem} from "../Styles/Shared";

const RegisterForm = () => {
    const [form] = useForm();
    const navigate = useNavigate();

    const registerUser = async (val) => {
        const url = "/auth/register";
        await axios.post(url, {...val, last_route_id:1})
        .then(res => {
            setUser(res);
            navigate('/chat');
        }).catch(() => {alert("sorry! that didn't work")});
    }

    return (
        <AuthFormCtn form={form} onFinish={registerUser}>
            <h1>Create Your Account!</h1>
            <FormItem name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input type="text" placeholder="Username" />
            </FormItem>
            <FormItem name="firstName" rules={[{ required: true, message: "Please input your First Name!" }]}>
                <Input type="text" placeholder="First Name" />
            </FormItem>
            <FormItem name="email" rules={
                [{ required: true, message: "Please input your email!" },
                { type: "email", message: "Please input a valid email!" }]
            }> <Input type="text" placeholder="Email" />
            </FormItem>
            <FormItem name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password type="password" placeholder="Password" />
            </FormItem>
            <Button type="primary" htmlType="submit">Register</Button>
        </AuthFormCtn>
    );
}

export default RegisterForm;