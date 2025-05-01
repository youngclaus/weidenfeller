import styled from 'styled-components';
import React from 'react';
import Player from '../components/Player/Player';
import CommandLine from '../components/Index/Footer';
import { homeContent } from '../components/Player/playerContent';

const Index: React.FC = () => {
  return (
    <Container>
      <BackgroundContainer className="background-container">
        <Code>
          <img src="/Hero/code.png" alt="code" />
        </Code>
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
  background-color: ${({ theme }) => theme.c1};
  z-index: 0;
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

const ContentContainer = styled.div`
  @media (max-width: 949px) {
    position: relative;
    display: flex;
    width: 100vw;
    height: calc(100vh - 20px);
    align-items: center;
    justify-content: center;
    z-index: 5;
  }

  @media (min-width: 950px) {
    display: flex;
    width: 100vw;
    height: calc(100vh - 20px);
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
  color: ${({ theme }) => theme.c4};
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
