import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Button, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {checkIfLoggedIn} from "../Utils";

const NavCtn = styled(Row)`{
  height: 8vh;
  box-shadow: 0 0 20px -7px rgba(0, 0, 0, 0.5);
  padding-right: 29px;
}`

const Links = styled(Row)`{
    width: 300px;
}`

const Nav = () => {
    const username =  checkIfLoggedIn();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <NavCtn justify={"space-between"} align={"middle"}>
            <Links align={"middle"} justify={"space-around"}>
                <Link to="/">Home</Link>
                <Link to="/chat">New Chat</Link>
                <Link to="/past-chats">Past Chats</Link>
            </Links>
            { username ? <Button type={"primary"} onClick={logout}>Logout</Button> : <Link to="/auth">Get Started</Link> }
        </NavCtn>
    );
}

export default Nav;