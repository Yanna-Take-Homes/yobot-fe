import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

const PastChatsWrapper = styled.div`{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 92vh;
}`

const PastChats = () => {
    const username = localStorage.getItem("username") || null;
    const userId = localStorage.getItem("id") || null;
    const [chats, setChats] = useState(null);
    const navigate = useNavigate();

    const getChats = async () => {
        if(!username) return navigate("/");
        const url = `/user-lessons/${userId}`;
        await axios.get(url).then(res => {
            setChats(res.data)
        });
    }

    useEffect(() => {
        getChats().catch(() => alert("sorry! that didn't work"));
        //eslint-disable-next-line
    },[]);

    return (
        <PastChatsWrapper>
            {username && <h1>Welcome Back, {username}</h1>}
            {chats && chats.length ? chats.map((chat,idx) => (<h1 key={idx}>{chat["lesson_name"]}</h1>) ): <h1>You've not done any lessons yet!</h1>}
            <Button type={"primary"} href={"/chat"}>Start New Chat</Button>
        </PastChatsWrapper>
    );
}

export default PastChats;
