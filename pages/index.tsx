import styled from 'styled-components';
import React from 'react';
import Player from '../components/Player/Player';
import CommandLine from '../components/Index/Footer';
import { homeContent } from '../components/Player/playerContent';

const Index: React.FC = () => {
  return (
    <Container>
      <BackgroundContainer className="background-container">
        <img src="/Hero/code.png" alt="code" />
      </BackgroundContainer>
      <ContentContainer className="content-container">
        <PlayerContainer>
          <Player content={homeContent} visible={true} />
        </PlayerContainer> 
        <TitleContainer>
          <Title>chris</Title>
          <Title>youngclaus</Title>
        </TitleContainer>
      </ContentContainer>
      <CommandLine />
    </Container>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #222;
  z-index: 0;
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

const ContentContainer = styled.div`
  @media (max-width: 949px) {
    display: flex;
    position: fixed;
    width: 100dvw;
    height: 85dvh;
    bottom: 40px;
    justify-content: center;
    z-index: 5;
  }

  @media (min-width: 950px) {
    display: flex;
    position: fixed;
    width: 100dvw;
    height: 85dvh;
    bottom: 40px;
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
    width: 0px;
    height: 0px;
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
