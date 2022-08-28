import React from "react";
import styled from "styled-components";
import {Button, Row} from "antd";

const FooterCtn = styled(Row)`{
  height: 12vh;
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, .1);
  padding-right: 29px;
}`

const SecondaryBtn = styled(Button)`{
    border: solid 1.5px #1990ff;
    color: #1990ff;
    width: 500px;
    margin-left: 50px;
}`

const Footer = () => {
    return (
        <FooterCtn justify={"flex-start"} align={"middle"}>
            <SecondaryBtn size={"large"} type={"default"}>Get Support</SecondaryBtn>
        </FooterCtn>
    );
}

export default Footer;