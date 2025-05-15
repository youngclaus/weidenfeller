import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StashComponent from './StashComponent';
import BlueprintComponent from './BlueprintComponent';
import PrintsComponent from './PrintsComponent';
import { getObjectsByState, markObjectAsCompleted, ObjectData } from './blueprints';
import { getUserBits, addUserBits, Bit } from './bits';

const InventoryManager: React.FC = () => {
  const [stash, setStash] = useState<Bit[]>([]);
  const [blueprints, setBlueprints] = useState<ObjectData[]>([]);
  const [prints, setPrints] = useState<ObjectData[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 800);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { blueprints: fetchedBlueprints, prints: fetchedPrints } = getObjectsByState();
    setBlueprints(fetchedBlueprints);
    setPrints(fetchedPrints);
  
    const bits = getUserBits();
    setStash(bits);
  }, []);

  const handleCompleteBlueprint = (blueprintName: string) => {
    markObjectAsCompleted(blueprintName);

    const { blueprints: updatedBlueprints, prints: updatedPrints } = getObjectsByState();
    setBlueprints(updatedBlueprints);
    setPrints(updatedPrints);
    setStash(getUserBits());
  };

  const handleScrollLeft = () => {
    setCurrentSeriesIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentSeriesIndex((prevIndex) => Math.min(prevIndex + 1, seriesList.length - 1));
  };

  const seriesList = Array.from(new Set([...blueprints, ...prints].map(obj => obj.series)));
  const currentSeries = seriesList.length > 0 ? seriesList[currentSeriesIndex] : '';
  const currentBlueprints = blueprints.filter(bp => bp.series === currentSeries);
  const currentPrints = prints.filter(print => print.series === currentSeries);

  return (
    <Container>
      <TitleContainer>
        <Title>Stash</Title>
        <Title>Blueprints</Title>
        <Title>Prints</Title>
      </TitleContainer>
      <ContentWrapper>
        <ScrollableContent>
          <StashSeparator>
            <StashComponent stash={stash} />
          </StashSeparator>
          <BlueprintSeparator>
            <BlueprintComponent completeBlueprint={handleCompleteBlueprint} blueprints={currentBlueprints} />
          </BlueprintSeparator>
          <PrintSeparator>
            <PrintsComponent prints={currentPrints} />
          </PrintSeparator>
        </ScrollableContent>
      </ContentWrapper>
      <SeriesNavigator>
        <ScrollButton onClick={handleScrollLeft}>◀</ScrollButton>
        <SeriesTitle>{currentSeries || 'No Series Available'}</SeriesTitle>
        <ScrollButton onClick={handleScrollRight}>▶</ScrollButton>
      </SeriesNavigator>
    </Container>
  );
};

export default InventoryManager;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 70vh;
  min-width: 250px;
  max-width: 1000px;
  margin: auto;
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0px 0px 10px -5px black;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({theme}) => theme.c1};
  color: ${({theme}) => theme.c4};
  text-align: center;
`;

const Title = styled.h3`
  flex: 1;
  margin: 0;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 91px);
  position: relative;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const SeriesNavigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  background-color: ${({theme}) => theme.c1};
  border-top: 1px solid ${({theme}) => theme.c2};
  position: absolute;
  bottom: 0;
  gap: 10px;
`;

const ScrollButton = styled.button`
  background-color: ${({theme}) => theme.c1};
  color: ${({theme}) => theme.c4};
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SeriesTitle = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  color: ${({theme}) => theme.c4};
`;

const StashSeparator = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: ${({theme}) => theme.c3};
`;

const BlueprintSeparator = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${({theme}) => theme.c2};
`;

const PrintSeparator = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background-color: ${({theme}) => theme.c3};
`;