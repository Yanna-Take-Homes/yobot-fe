import React from "react";
import styled from "styled-components";
import {Row} from "antd";
import {DefaultBlueBtn} from "../Styles/Buttons";

const FooterCtn = styled(Row)`{
  height: 12vh;
  box-shadow: 0 0 20px -5px rgba(0, 0, 0, .1);
  padding-right: 29px;
}`

const GetSupportBtn = styled(DefaultBlueBtn)`{
    width: 500px;
    margin-left: 50px;
}`

const Footer = () => {
    return (
        <FooterCtn justify={"flex-start"} align={"middle"}>
            <GetSupportBtn size={"large"} type={"default"}>Get Support</GetSupportBtn>
        </FooterCtn>
    );
}

export default Footer;