import React from 'react';
import styled from 'styled-components';
import ConstellationBackground from '../components/Index/ConstellationBackground';
import FeaturedStars from '../components/Index/FeaturedStars';

const Index: React.FC = () => {
  return (
    <Container>
      <ConstellationBackground />
      <FeaturedStars />
    </Container>
  );
};

export default Index;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.c1};
  isolation: isolate;
  z-index: 0;
  user-select: none;
  -webkit-user-drag: none;
`;
