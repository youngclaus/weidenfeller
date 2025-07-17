import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import { cards } from './cards';

interface TimelineData {
  year: number;
  startIndex: number;
}

const Timeline: React.FC = () => {
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const generatedData: TimelineData[] = [];
    let currentYear: number | null = null;
    cards.forEach((card, index) => {
      if (card.year !== currentYear) {
        generatedData.push({ year: card.year, startIndex: index});
        currentYear = card.year;
      }
    });

    setTimelineData(generatedData);
    setCurrentIndex(0);
  }, []);

  const scrollToYear = (startIndex: number) => {
    setCurrentIndex(startIndex);
  };

  return (
    <TimelineContainer>
      <CarouselContainer>
        <Carousel cards={cards} currentIndex={currentIndex} setIndex={setCurrentIndex} />
      </CarouselContainer>
      <YearNavContainer>
        {timelineData.map((item, i) => (
          <React.Fragment key={item.year}>
            <YearNavItem
              active={
                currentIndex >= item.startIndex &&
                (i === timelineData.length - 1 || currentIndex < timelineData[i + 1].startIndex)
              }
              onClick={() => scrollToYear(item.startIndex)}
            >
              {item.year}
            </YearNavItem>
            {i < timelineData.length - 1 && <Separator>●</Separator>}
          </React.Fragment>
        ))}
      </YearNavContainer>
    </TimelineContainer>
  );
};

export default Timeline;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  max-width: 1600px;
  height: calc(100dvh - 60px);
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  overflow-x: hidden;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 80px);
  `;

const YearNavContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
  z-index: 100;
  background: ${({theme}) => theme.c1};
  padding: 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
  overflow-x: auto;;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const YearNavItem = styled.button<{ active: boolean }>`
  font-size: clamp(1rem, 2vw, 2rem);
  border: none;
  background: none;
  cursor: pointer;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  color: ${({ theme, active }) => (active ? theme.c3 : theme.c4)};
  transition: color 0.3s ease, transform 0.2s ease;
  padding: 5px 10px;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.c3};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Separator = styled.span`
  font-size: 10px;
  margin: 0 10px;
  color: ${({ theme }) => theme.c3};
  user-select: none;
`;
