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
        <FormCtn form={form} onFinish={registerUser}>
            <h1>Create Your Account!</h1>
            <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input type="text" placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item name="firstName" rules={[{ required: true, message: "Please input your First Name!" }]}>
                <Input type="text" placeholder="First Name" />
            </Form.Item>
            <Form.Item name="email" rules={
                [{ required: true, message: "Please input your email!" },
                { type: "email", message: "Please input a valid email!" }]
            }> <Input type="text" placeholder="Email" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
        </FormCtn>
    );
}

export default RegisterForm;