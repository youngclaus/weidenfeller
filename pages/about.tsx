import styled from 'styled-components';
import React from 'react';
import ImageContainer from '../components/About/ImageContainer';

const About: React.FC = () => {

    return (
        <Container>
            <ImageContainer />
        </Container>
    );
};

export default About;

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: transparent;
    user-select: none;
    -webkit-user-drag: none;
    z-index: 1;
`;
