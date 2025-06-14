import styled from 'styled-components';
import React from 'react';
import Timeline from '../components/Projects/Timeline';

interface ProjectsProps {
  setActiveComponent: (component: 'index' | 'projects' | 'about' | 'music') => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveComponent }) => {
  return (
    <Container>
      <BackgroundContainer className="background-container">
        <img src="/Hero/code.png" alt="code" />
      </BackgroundContainer>
      <Timeline />
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #222;
  user-select: none;
  -webkit-user-drag: none;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/Hero/code.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  filter: blur(5px);
`;
