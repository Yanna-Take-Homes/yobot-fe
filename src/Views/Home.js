import React from "react";
import styled from "styled-components";
import {PrimaryHeader, WrapperDivCol, bgColor} from "../Styles/Shared";
import RegisterForm from "../Components/RegisterForm";
import LoginForm from "../Components/LoginForm";
import {Row} from "antd";
import {checkIfLoggedIn} from "../Utils";
import {useNavigate} from "react-router-dom";
import {DefaultAquaBtn, DefaultTomatoBtn} from "../Styles/Buttons";
import dalle from "../Assets/dalle.png";

const HomeWrapper = styled(WrapperDivCol)`{
    background-color: #fcfcfb;
    background-image: url(${dalle});
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

