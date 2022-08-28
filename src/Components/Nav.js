import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Row} from "antd";
import {useNavigate} from "react-router-dom";
import {checkIfLoggedIn} from "../Utils";
import {bgColor} from "../Styles/Shared";
import {DefaultBlueBtn} from "../Styles/Buttons";

const NavCtn = styled(Row)`{
  height: 8vh;
  padding-right: 29px;
  background-color: ${bgColor};
}`

const Links = styled(Row)`{
  width: 300px;
  margin-left: 10px;
}`

const CursiveHeader = styled.h1`{
  font-family: 'Parisienne', cursive;
  font-size: 40px;
  letter-spacing: 5px;
  margin-left: 50px;
  font-weight: bold;
}`

const Nav = () => {
    const username = checkIfLoggedIn();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/?");
    }

    return (
        <NavCtn justify={"space-between"} align={"middle"}>
            <Row align={"middle"} justify={"space-around"}>
                <CursiveHeader>Yobot</CursiveHeader>
                <Links align={"middle"} justify={"space-around"}>
                    <Link to="/">Home</Link>
                    <Link to="/chat">New Chat</Link>
                    <Link to="/past-chats">Past Chats</Link>
                </Links>
            </Row>
             <DefaultBlueBtn size={"large"} type={"default"} onClick={logout}>{username ? "Logout" : "Get Started"}</DefaultBlueBtn>
        </NavCtn>
    );
}

export default Nav;