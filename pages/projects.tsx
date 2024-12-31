import styled from 'styled-components';
import React from 'react';
import Timeline from '../components/Projects/Timeline';

interface ProjectsProps {
    setActiveComponent: (component: 'index' | 'projects' | 'about' | 'music') => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveComponent }) => {
    return (
        <Container className="projects-container">
            <Timeline setActiveComponent={setActiveComponent} />
        </Container>
    )
}

export default Projects;

const Container = styled.div`
    display: flex;
    user-select: none;
    -webkit-user-drag: none;
`;
