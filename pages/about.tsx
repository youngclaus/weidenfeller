import styled from 'styled-components';
import { useState } from 'react';
import ImageContainer from '../components/About/ImageContainer';


const About: React.FC = () => {

    return (
        <Container>
            <ImageContainer/>
        </Container>
    );
};

export default About;

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: ${({ theme }) => theme.c1};
    user-select: none;
    -webkit-user-drag: none;
    z-index: 1;
`;