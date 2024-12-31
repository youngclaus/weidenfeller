import styled from 'styled-components';
import React from 'react';
import Timeline from '../components/Projects/Timeline';

const Projects: React.FC = () => {
    return (
        <Container className="projects-container">
            <Timeline />
        </Container>
    )
}

export default Projects;

const Container = styled.div`
    display: flex;
    user-select: none;
    -webkit-user-drag: none;
`;
