import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Row, Input} from "antd";
import {useNavigate} from "react-router-dom";
import {checkIfLoggedIn} from "../Utils";
import {bgColor, PrimaryHeader, WrapperDivCol} from "../Styles/Shared";
import {DefaultBlueBtn} from "../Styles/Buttons";
import yobot from "../Assets/yobot.jpg";

const ChatWrapper = styled(WrapperDivCol)`{
    background-image: url(${yobot});
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 35% 100%;
    align-items: center;
    justify-content: space-around;
    background-color: #fcfcfb;
}`

const ChatCtn = styled(WrapperDivCol)`{
    border-left: 2px solid ${bgColor};
    width: 60%;
    height: 95%;
    align-self: flex-end;
    padding-left: 50px;
    padding-right: 50px;
    overflow: auto;
    scroll-behavior: smooth;
  
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 20px;
    }
    
    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .2);
    }
}`

const BotText = styled.p`{
}`;

const UserText = styled(DefaultBlueBtn)`{
  margin-left: 15px;
   span {
    pointer-events: none;
  }
}`;

const ChatRow = styled.div`{
  border-bottom: 1px solid ${bgColor};
}`;

const BotReplies = styled.div`{
  margin-top: 30px;
}`;

const UserReplies = styled(Row)`{
  margin-bottom: 20px;
  margin-left:50%;
}`;


const Chat = () => {
    const navigate = useNavigate();
    const username = checkIfLoggedIn();

    const [lessonArr, setLessonArr] = useState(null);
    const [lessonName, setLessonName] = useState(null);
    const [augmentedArr, setAugmentedArr] = useState([]);

    const getRoutes = async () => {
        const routeId = localStorage.getItem("last_route");
        const url = `/routes/for-lesson/${routeId}`;

        await axios.create({headers:{ Authorization: localStorage.getItem("token")}}).get(url).then(res => {
            const data = res.data;
            setLessonName(data[0]["lesson_name"]);
            const augArr = data.map(route => {
                return {
                    id: route["id"],
                    userOptions: route["replies"].split("|"),
                    botOptions: route["text"].split("|"),
                    routes: route["routes"].split("|"),
                }
            })
            setLessonArr(augArr);
            setAugmentedArr([augArr[0]]);
        }).catch(err => {alert(err)});
    }

    const showNextReplies = (route,userOpt,e) => {
        e.preventDefault();
        e.target.disabled = true;
        let nextRouteIdx;
        if(!userOpt.length) nextRouteIdx = Number(route.routes[0]);
        else {
            const clickedReplyIdx = route.userOptions.indexOf(userOpt);
            nextRouteIdx = Number(route.routes[clickedReplyIdx]);
        }
        const nextRoute = lessonArr[nextRouteIdx-1];
        const newAugArr = augmentedArr.concat(nextRoute);
        setAugmentedArr(newAugArr);
    }

    useEffect(() => {
        if(!username) return navigate("/");
        getRoutes().catch(() => alert("sorry! that didn't work"));
        //eslint-disable-next-line
    }, []);

    return (
        <ChatWrapper>
            <ChatCtn>
                { lessonName && <PrimaryHeader>Let's talk about {lessonName}</PrimaryHeader> }
                { augmentedArr && augmentedArr.map( (route, idx) =>
                    <ChatRow key={`chat_row_${idx}`} justify={"space-between"}>
                        <BotReplies>
                            { route && route.botOptions.map((botOpt,idx) => <BotText key={idx}>{ botOpt }</BotText> )}
                        </BotReplies>
                        <UserReplies>
                            { route && route.userOptions[0]===""
                            ? <Input placeholder={"type a reply, then press enter"} onPressEnter={(e)=>showNextReplies(route,"",e )} />
                            : route && route.userOptions.map((userOpt,idx) =>
                                    <UserText key={idx} onClick={(e)=>showNextReplies(route, userOpt, e )}>
                                        {  userOpt }
                                    </UserText>
                                )
                            }
                        </UserReplies>
                    </ChatRow>
                )}
            </ChatCtn>
        </ChatWrapper>
    );
}

export default Chat;
