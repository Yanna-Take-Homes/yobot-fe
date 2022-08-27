import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 92vh;
}`

const Home = () => {
    return (
        <HomeWrapper>
            <h1>YoBot Home</h1>
        </HomeWrapper>
    );
}

export default Home;

