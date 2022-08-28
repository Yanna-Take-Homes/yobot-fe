import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {Button} from "antd";
import {checkIfLoggedIn} from "../Utils";
import {useNavigate} from "react-router-dom";
import {PrimaryHeader, WrapperDivCol} from "../Styles/shared";

const PastChatsWrapper = styled(WrapperDivCol)`{
  justify-content: center;
  align-items: center;
}`

const PastChats = () => {
    const [chats, setChats] = useState(null);
    const navigate = useNavigate();
    const username = checkIfLoggedIn();

    const getChats = async () => {
        const userId = localStorage.getItem("id") || null;
        const url = `/user-lessons/${userId}`;
        await axios.create({headers:{
                Authorization: localStorage.getItem("token"),
            }}).get(url).then(res => {
            setChats(res.data)
        });
    }

    useEffect(() => {
        if(!username) return navigate("/");
        getChats().catch(() => alert("sorry! that didn't work"));
        //eslint-disable-next-line
    },[]);

    return (
        <PastChatsWrapper>
            {username && <PrimaryHeader>Welcome Back, {username}</PrimaryHeader>}
            {chats && chats.length ? chats.map((chat,idx) => (<p key={idx}>{chat["lesson_name"]}</p>)): <p>You've not done any lessons yet!</p>}
            <Button type={"link"} href={"/chat"}>Start New Chat</Button>
        </PastChatsWrapper>
    );
}

export default PastChats;
