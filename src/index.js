import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from "./Views/Chat";
import PastChats from "./Views/PastChats";
import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";
import Nav from "./Components/Nav";
import Home from "./Views/Home";
import Footer from "./Components/Footer";

// const devUrl = "http://localhost:4000";
const prodUrl = "https://yanna-yobot.herokuapp.com/api";

axios.defaults.baseURL = prodUrl;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <BrowserRouter>
        <Nav/>
        <Routes>
            <Route exact path={"/"} element={<Home/>} />
            <Route exact path={"/chat"} element={<Chat/>} />
            <Route exact path={"/past-chats"} element={<PastChats/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
)