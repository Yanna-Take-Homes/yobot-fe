import React from "react";
import styled from "styled-components";
import {PrimaryHeader, WrapperDivCol, bgColor} from "../Styles/shared";
import RegisterForm from "../Components/RegisterForm";
import LoginForm from "../Components/LoginForm";
import {Button, Row} from "antd";
import {checkIfLoggedIn} from "../Utils";
import {useNavigate} from "react-router-dom";

const HomeWrapper = styled(WrapperDivCol)`{
    background-color: #fcfcfb;
    background-image: url("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bb9986e7-c53b-4b49-ab50-9c95a44b9be5/DALLE_2022-08-26_05.58.58.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220828T005047Z&X-Amz-Expires=86400&X-Amz-Signature=ba9369e9139f6eae194c5cc168a14aa4cec69bbbd4e6e6ec0cb7dbcc8615ffb2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22DALL%25C2%25B7E%25202022-08-26%252005.58.58.png%22&x-id=GetObject");
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 40% 90%;
    align-items: flex-end;
    justify-content: center;
}`

const Text = styled(WrapperDivCol)`{
    margin-top: 50px;
    margin-right: 5%;
    justify-content: center;
    align-items: center;
    background-color: ${bgColor};
    width: 45%;
    height: 85%;
    border-radius: 20px;
    border: none;
}`

const Btns = styled(Row)`{
    margin-top: 20px;
    margin-bottom: 40px;
}`

const PrimaryBtn = styled(Button)`{
    border: solid 2px #00f8c9;
    color: #00f8c9;
    font-weight: bold;
    margin-right: 15px;
}`

const SecondaryBtn = styled(Button)`{
    border: solid 1.5px #ff6e3c;
    color: #ff6e3c;
}`

const Home = () => {
    const username = checkIfLoggedIn();
    const navigate = useNavigate();
    const [action, setAction] = React.useState(null);

    return (
        <HomeWrapper>
            <Text>
                <PrimaryHeader>Welcome to YoBot{`, ${username}`}!</PrimaryHeader>
                <p>What would you like to do?</p>
                {
                    username ? <div>
                        <Btns justify={"space-around"}>
                            <PrimaryBtn size={"large"} type="default" onClick={()=>navigate("/chat")}>Start New Lesson</PrimaryBtn>
                            <SecondaryBtn size={"large"} type="default" onClick={()=>navigate("/past-chats")}>View Past Lessons</SecondaryBtn>
                        </Btns>
                        { action === "register" ? <RegisterForm /> : action === "login" ? <LoginForm /> : null}
                    </div> : <div>
                        <Btns justify={"space-around"}>
                            <PrimaryBtn size={"large"} type="default" onClick={()=>setAction("register")}>Register</PrimaryBtn>
                            <SecondaryBtn size={"large"} type="default" onClick={()=>setAction("login")}>Login</SecondaryBtn>
                        </Btns>
                        { action === "register" ? <RegisterForm /> : action === "login" ? <LoginForm /> : null}
                    </div>
                }
            </Text>
        </HomeWrapper>
    );
}

export default Home;

