import styled from 'styled-components';
import React from 'react';
import ImageContainer from '../components/About/ImageContainer';

interface AboutProps {
    setActiveComponent: (component: 'index' | 'projects' | 'about' | 'music') => void;
}

const About: React.FC<AboutProps> = ({setActiveComponent}) => {

    return (
        <Container>
            <ImageContainer setActiveComponent={setActiveComponent}/>
        </Container>
    );
};

export default About;

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: ${({ theme }) => theme.c2};
    user-select: none;
    -webkit-user-drag: none;
    z-index: 1;
`;