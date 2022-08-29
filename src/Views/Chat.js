import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Button, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {checkIfLoggedIn} from "../Utils";
import {bgColor, PrimaryHeader, WrapperDivCol} from "../Styles/Shared";
import {DefaultBlueBtn} from "../Styles/Buttons";
import yobot from "./yobot.png";

const ChatWrapper = styled(WrapperDivCol)`{
    background-image: url(${yobot});
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 45% 100%;
    align-items: center;
    justify-content: space-around;
    background-color: #fcfcfb;
}`

const ChatCtn = styled(WrapperDivCol)`{
    border-left: 2px solid ${bgColor};
    width: 50%;
    align-self: flex-end;
    padding: 30px;
}`

const Blurb = styled(DefaultBlueBtn)`{}`;

const Chat = () => {
    const navigate = useNavigate();
    const username = checkIfLoggedIn();

    const [lessonArr, setLessonArr] = useState(null);
    const [route, setRoute] = useState(null);
    const [lessonName, setLessonName] = useState(null);

    const getRoute = async () => {
        const routeId = localStorage.getItem("last_route");
        const url = `/routes/for-lesson/${routeId}`;
        await axios.create({headers:{
                Authorization: localStorage.getItem("token"),
            }}).get(url).then(res => {
            const data = res.data;
            setRoute({
                userOptions: data[0]["replies"].split("|"),
                botBlurbs: data[0]["text"].split("|")
            });
            setLessonName(data[0]["lesson_name"]);
            setLessonArr(data.slice(1));
        });
    }

    const nextReply = (idx) => {
        let nextRoute;
        (idx!==0) && lessonArr.shift();
        nextRoute = lessonArr.shift();
        const userOptions = nextRoute["replies"].split("|");
        const botBlurbs = nextRoute["text"].split("|");
        setRoute({
            userOptions: userOptions,
            botBlurbs: botBlurbs
        });
    }

    useEffect(() => {
        if(!username) return navigate("/");
        getRoute().catch(() => alert("sorry! that didn't work"));
        //eslint-disable-next-line
    }, []);

    return (
        <ChatWrapper>
            <ChatCtn>
                <div>
                    { lessonName && <PrimaryHeader>Let's talk about {lessonName}</PrimaryHeader> }
                    { route && route.botBlurbs.map((blurb, i) => <p key={i}>{blurb}</p>) }
                </div>
                <div>
                    { route && route.userOptions[0].length>0 && route.userOptions.map((blurb, idx) => <Blurb onClick={()=>nextReply(idx)} key={idx}>{blurb}</Blurb>) }
                    { route && !route.userOptions[0].length>0 && <Input/>}
                    { route && !route.userOptions[0].length>0 && <Button onClick={()=>nextReply(0)}>Reply</Button>}
                </div>
            </ChatCtn>
        </ChatWrapper>
    );
}

export default Chat;
