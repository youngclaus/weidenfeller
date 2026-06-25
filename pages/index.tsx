import styled from 'styled-components';
import React from 'react';
import Player from '../components/Player/Player';
import ConstellationBackground from '../components/Index/ConstellationBackground';
import { homeContent } from '../components/Player/playerContent';

const Index: React.FC = () => {
  return (
    <Container>
      <ConstellationBackground />
      <ContentContainer className="content-container">
        <PlayerContainer>
          <PlayerInteraction>
            <Player content={homeContent} visible={true} />
          </PlayerInteraction>
        </PlayerContainer>
        <TitleContainer>
          <Title>chris</Title>
          <Title>youngclaus</Title>
        </TitleContainer>
      </ContentContainer>
    </Container>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
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

const ContentContainer = styled.div`
  pointer-events: none;

  @media (max-width: 949px) {
    display: flex;
    position: fixed;
    width: 100dvw;
    height: 100dvh;
    bottom: 0;
    justify-content: center;
    z-index: 5;
  }

  @media (min-width: 950px) {
    display: flex;
    position: fixed;
    width: 100dvw;
    height: 85dvh;
    top: 50%;
    transform: translateY(-50%);
    align-items: center;
    z-index: 5;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const TitleContainer = styled.div`
  @media (max-width: 949px) {
    display: none;
    width: 0;
    height: 0;
  }

  @media (min-width: 950px) {
    width: 60%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
`;

const Title = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.c3};
  font-family: "DM Mono", monospace;
  font-weight: bold;
  opacity: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: clamp(1rem, 8vw, 9rem);
`;

const PlayerContainer = styled.div`
  pointer-events: none;

  @media (max-width: 949px) {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    left: 50%;
    top: 50%;
    align-items: center;
    transform: translate(-50%, -50%);
    padding: 0;
  }

  @media (min-width: 950px) {
    display: flex;
    width: 40%;
    height: 100%;
    justify-content: right;
    padding-right: 20px;
    align-items: center;
    z-index: 10;
  }
`;

const PlayerInteraction = styled.div`
  pointer-events: auto;
`;
