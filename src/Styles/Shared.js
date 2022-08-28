import styled from "styled-components";
import {Form} from "antd";

export const PrimaryHeader = styled.h2`{
  letter-spacing: 2px;
}`

export const WrapperDivCol = styled.div`{
  height: 80vh;
  display: flex;
  flex-direction: column;
}`


export const AuthFormCtn = styled(Form)`{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}`

export const FormItem = styled(Form.Item)`{
  width: 300px;
}`
export const bgColor = "whitesmoke";



