import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Button, Row, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {checkIfLoggedIn} from "../Utils";

const ChatWrapper = styled(Row)`{
    margin-top: 8px;
    height: 90vh;
    background-image: url("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8adff1c4-ab1b-4927-b7cf-68304bd1975b/yobot.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220826%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220826T120152Z&X-Amz-Expires=86400&X-Amz-Signature=11ea18946aa6a4e0d4793a82411e405f4bd8f14a2cbaaad172cf117a6cfd1de2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22yobot.jpg%22&x-id=GetObject");
    background-repeat: no-repeat;
    background-position: left;
    background-size: 25% 45%;
}`

const ChatCtn = styled.div`{
    border-left: 1px solid lightgray;
    width: 45%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}`

const ChatOption = styled(Button)`{;
  display: flex;
  justify-content: flex-end;
}`

const Blurb = styled(ChatOption)`{;
  width: min-content;
}`

const Chat = () => {
    const navigate = useNavigate();
    const username = checkIfLoggedIn();

    const [lessonArr, setLessonArr] = useState(null);
    const [route, setRoute] = useState(null);
    const [lessonName, setLessonName] = useState(null);

    const getRoute = async () => {
        const routeId = localStorage.getItem("last_route");
        const url = `/routes/for-lesson/${routeId}`;
        await axios.get(url).then(res => {
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
        <div>
            { lessonName && <h1>Lesson: {lessonName}</h1> }
            <ChatWrapper align={"middle"} justify={"space-around"}>
                <ChatCtn>
                    { route && route.botBlurbs.map((blurb, i) => <ChatOption type={"dashed"} key={i}>{blurb}</ChatOption>) }
                </ChatCtn>
                <ChatCtn>
                    { route && route.userOptions[0].length>0 && route.userOptions.map((blurb, idx) => <Blurb onClick={()=>nextReply(idx)} key={idx}>{blurb}</Blurb>) }
                    { route && !route.userOptions[0].length>0 && <Input/>}
                    { route && !route.userOptions[0].length>0 && <Button  onClick={()=>nextReply(0)}>Reply</Button>}
                </ChatCtn>
            </ChatWrapper>
        </div>
    );
}

export default Chat;
