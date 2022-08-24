import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`{
    height: 100vh;
    width: 100%;
    border: 2px blue solid;
}`

const Home = () => {
    return ( <HomeWrapper>
        <div>
            <h1> Happy Hacking </h1>
        </div>
    </HomeWrapper> );
}

export default Home;