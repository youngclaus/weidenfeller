import styled from 'styled-components';
import React, { useState } from 'react';
import Carousel from './Carousel';
import { cards } from './cards';

interface TimelineData {
  year: number;
  startIndex: number;
}

// 2 4 2 3 5
const Timeline: React.FC = () => {
  const timelineData: TimelineData[] = [
    { year: 2025, startIndex: 0},
    { year: 2024, startIndex: 2 },
    { year: 2023, startIndex: 4 },
    { year: 2022, startIndex: 7 },
    { year: 2021, startIndex: 11 },
    { year: 2020, startIndex: 13 },
    { year: 2019, startIndex: 16 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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
  width: 100dvw;
  max-width: 1600px;
  height: calc(100dvh - 60px);
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  overflow-x: auto;
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
`;

const YearNavItem = styled.button<{ active: boolean }>`
  font-size: clamp(1rem, 2vw, 2rem);
  border: none;
  background: none;
  cursor: pointer;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  color: ${({ theme, active }) => (active ? theme.c3 : theme.c4)};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.c3};
  }
`;

const Separator = styled.span`
  font-size: 10px;
  margin: 0 10px;
  color: ${({ theme }) => theme.c3};
`;
