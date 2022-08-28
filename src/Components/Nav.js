import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Button, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {checkIfLoggedIn} from "../Utils";
import {bgColor} from "../Styles/shared";

const NavCtn = styled(Row)`{
  height: 8vh;
  padding-right: 29px;
  background-color: ${bgColor};
}`

const Links = styled(Row)`{
    width: 300px;
}`

const DefaultBtn = styled(Button)`{
  border: solid 1.5px #1990ff;
  color: #1990ff;
}`

const Nav = () => {
    const username = checkIfLoggedIn();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/chat");
    }

    return (
        <NavCtn justify={"space-between"} align={"middle"}>
            <Links align={"middle"} justify={"space-around"}>
                <Link to="/">Home</Link>
                <Link to="/chat">New Chat</Link>
                <Link to="/past-chats">Past Chats</Link>
            </Links>
             <DefaultBtn size={"large"} type={"default"} onClick={logout}>{username ? "Logout" : "Get Started"}</DefaultBtn>
        </NavCtn>
    );
}

export default Nav;