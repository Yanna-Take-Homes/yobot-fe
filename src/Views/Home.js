import React from "react";
import styled from "styled-components";
import {PrimaryHeader, WrapperDivCol, bgColor} from "../Styles/Shared";
import RegisterForm from "../Components/RegisterForm";
import LoginForm from "../Components/LoginForm";
import {Row} from "antd";
import {checkIfLoggedIn} from "../Utils";
import {useNavigate} from "react-router-dom";
import {DefaultAquaBtn, DefaultTomatoBtn} from "../Styles/Buttons";

const HomeWrapper = styled(WrapperDivCol)`{
    background-color: #fcfcfb;
    background-image: url("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bb9986e7-c53b-4b49-ab50-9c95a44b9be5/DALLE_2022-08-26_05.58.58.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220828%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220828T005047Z&X-Amz-Expires=86400&X-Amz-Signature=ba9369e9139f6eae194c5cc168a14aa4cec69bbbd4e6e6ec0cb7dbcc8615ffb2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22DALL%25C2%25B7E%25202022-08-26%252005.58.58.png%22&x-id=GetObject");
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 45% 100%;
    align-items: flex-end;
    justify-content: center;
}`

const Text = styled(WrapperDivCol)`{
    margin-top: 20px;
    margin-right: 5%;
    justify-content: center;
    align-items: center;
    background-color: ${bgColor};
    width: 45%;
    height: 85%;
    border-radius: 20px;
    border: none;
}`

const ActionButtons = styled(Row)`{
    margin-top: 20px;
    margin-bottom: 40px;
    button {
      margin-right: 15px;
    }
}`

const Home = () => {
    const username = checkIfLoggedIn();
    const navigate = useNavigate();
    const [action, setAction] = React.useState(null);

    const actionHandler = (btnName) => {
        if(!username) {
            if( btnName === "aquaBtn" )setAction("register");
            else if( btnName === "tomatoBtn" ) setAction("login");
        }
        else {
            if( btnName === "aquaBtn" ) navigate("/chat");
            else if( btnName === "tomatoBtn" ) navigate("/past-chats");
        }
    }

    return (
        <HomeWrapper>
            <Text>
                <PrimaryHeader>Welcome{username && `, ${username}`}!</PrimaryHeader>
                <p>What would you like to do?</p>
                <ActionButtons justify={"space-around"}>
                    <DefaultAquaBtn size={"large"} type="default" onClick={ () => actionHandler("aquaBtn") } >
                        {username ? "Start New Lesson" : "Register"}
                    </DefaultAquaBtn>
                    <DefaultTomatoBtn size={"large"} type="default" onClick={ () => actionHandler("tomatoBtn") } >
                        {username ? "View Past Lessons" : "Login"}
                    </DefaultTomatoBtn>
                </ActionButtons>
                { action === "register" ? <RegisterForm /> : action === "login" ? <LoginForm /> : null}
            </Text>
        </HomeWrapper>
    );
}

export default Home;

