import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from "./Views/Auth";
import Chat from "./Views/Chat";
import PastChats from "./Views/PastChats";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Components/Nav";
import axios from "axios";

axios.defaults.baseURL = 'https://yanna-yobot.herokuapp.com/api/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token") || null;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <BrowserRouter>
        <Nav/>
        <Routes>
            <Route exact path={"/"} element={<Auth/>} />
            <Route exact path={"/chat"} element={<Chat/>} />
            <Route exact path={"/past-chats"} element={<PastChats/>} />
        </Routes>
    </BrowserRouter>
)