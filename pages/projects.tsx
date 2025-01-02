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
        <Code>
          <img src="/Hero/code.png" alt="code" />
        </Code>
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
  background-color: ${({ theme }) => theme.c1};
  user-select: none;
  -webkit-user-drag: none;
`;

const BackgroundContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Code = styled.div`
  opacity: 0.3;
  filter: blur(5px);
  position: absolute;
  width: 100vw;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
`;