import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StashComponent from './StashComponent';
import BlueprintComponent from './BlueprintComponent';
import PrintsComponent from './PrintsComponent';
import { getObjectsByState, markObjectAsCompleted, ObjectData } from './blueprints';
import { getUserBits, Bit } from './bits';

const InventoryManager: React.FC = () => {
  const [stash, setStash] = useState<Bit[]>([]);
  const [blueprints, setBlueprints] = useState<ObjectData[]>([]);
  const [prints, setPrints] = useState<ObjectData[]>([]);
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState<number>(0);

  useEffect(() => {
    const { blueprints: fetchedBlueprints, prints: fetchedPrints } = getObjectsByState();
    setBlueprints(fetchedBlueprints);
    setPrints(fetchedPrints);
    setStash(getUserBits());
  }, []);

  const handleCompleteBlueprint = (blueprintName: string) => {
    markObjectAsCompleted(blueprintName);

    const { blueprints: updatedBlueprints, prints: updatedPrints } = getObjectsByState();
    setBlueprints(updatedBlueprints);
    setPrints(updatedPrints);
    setStash(getUserBits());
  };

  const seriesList = Array.from(new Set([...blueprints, ...prints].map((object) => object.series)));
  const boundedSeriesIndex = seriesList.length === 0
    ? 0
    : Math.min(currentSeriesIndex, seriesList.length - 1);
  const currentSeries = seriesList[boundedSeriesIndex] ?? '';
  const currentBlueprints = blueprints.filter((blueprint) => blueprint.series === currentSeries);
  const currentPrints = prints.filter((print) => print.series === currentSeries);

  const handleScrollLeft = () => {
    setCurrentSeriesIndex((previousIndex) => Math.max(previousIndex - 1, 0));
  };

  const handleScrollRight = () => {
    setCurrentSeriesIndex((previousIndex) => (
      seriesList.length === 0
        ? 0
        : Math.min(previousIndex + 1, seriesList.length - 1)
    ));
  };

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
  width: 100%;
  height: 100%;
  min-width: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: rgba(12, 13, 18, 0.92);
  box-shadow: none;
  backdrop-filter: none;
  overflow: hidden;
  font-family: "DM Mono", monospace;
  font-weight: bold;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025)),
    rgba(0, 0, 0, 0.34);
  color: ${({theme}) => theme.c4};
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  flex-shrink: 0;
`;

const Title = styled.h3`
  flex: 1;
  margin: 0;
  padding: 14px 10px;
  color: ${({ theme }) => theme.c4};
  font-size: clamp(12px, 1.2vw, 15px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  margin-bottom: 50px;
`;

const SeriesNavigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
    rgba(0, 0, 0, 0.34);
  position: absolute;
  bottom: 0;
  gap: 10px;
  flex-shrink: 0;
`;

const ScrollButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  color: ${({theme}) => theme.c4};
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.c3};
    color: ${({ theme }) => theme.c3};
    transform: translateY(-1px);
  }
`;

const SeriesTitle = styled.div`
  font-weight: bold;
  min-width: min(44vw, 280px);
  font-size: clamp(13px, 1.35vw, 18px);
  color: ${({theme}) => theme.c4};
  text-align: center;
  text-transform: lowercase;
`;

const StashSeparator = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.035);
  overflow: hidden;
  min-width: 0;
`;

const BlueprintSeparator = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.055);
  overflow: hidden;
  min-width: 0;
`;

const PrintSeparator = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.035);
  overflow: hidden;
  min-width: 0;
`;
