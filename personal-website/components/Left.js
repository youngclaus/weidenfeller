import styled from 'styled-components';
import { useState } from 'react';

const Left = ({ toggleTheme, currentTheme }) => {
    return (
        <Container>
            <Name>Chris Youngclaus</Name>
            
            <p>I have many skills</p>
        </Container>
        
    );
};

export default Left;

const Container = styled.div`
    display: flex;
    position: inherit;
    flex-direction: column;
    justify-content: left;
    padding-left: 40px;
    width: 50%;
    height: 100vh;
`;

const Name = styled.div`
    margin-bottom: 10px;
    font-family: "Nunito", sans-serif;
    font-size: 80px;
`;

