import React from 'react';
import styled from 'styled-components';
import ConstellationBackground from '../components/Index/ConstellationBackground';
import FeaturedStars from '../components/Index/FeaturedStars';
import ThemeMoon from '../components/Index/ThemeMoon';

interface IndexProps {
  contentVisible?: boolean;
}

const Index: React.FC<IndexProps> = ({ contentVisible = true }) => {
  return (
    <Container>
      <ConstellationBackground />
      <Content $visible={contentVisible}>
        <FeaturedStars />
        <ThemeMoon />
      </Content>
    </Container>
  );
};

export default Index;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  isolation: isolate;
  z-index: 0;
  user-select: none;
  -webkit-user-drag: none;
`;

const Content = styled.div<{ $visible: boolean }>`
  position: relative;
  z-index: 1;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 220ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 1ms;
  }
`;
