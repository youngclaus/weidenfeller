import styled from 'styled-components';
import React from 'react';
import { Card } from './cards';

interface CarouselProps {
  cards: Card[];
  currentIndex: number;
  setIndex: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ cards, currentIndex, setIndex }) => {
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    setIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    setIndex(newIndex);
  };

  return (
    <CarouselContainer>
      <Arrow onClick={handlePrev}>◀</Arrow>
      <CarouselWrapper>
        {cards.map((card, index) => {
          const position =
            index === currentIndex
              ? 'current'
              : index === (currentIndex - 1 + cards.length) % cards.length
              ? 'prev'
              : index === (currentIndex + 1) % cards.length
              ? 'next'
              : 'hidden';

          return (
            <CardItem key={index} position={position}>
              <ImageContainer>
                <Image src={card.image} alt={card.title} />
              </ImageContainer>
              {position === 'current' && (
                <TextContainer visible={position === 'current'}>
                  <Title>{card.title}</Title>
                  <Description>{card.description}</Description>
                </TextContainer>
              )}
            </CardItem>
          );
        })}
      </CarouselWrapper>
      <Arrow onClick={handleNext}>▶</Arrow>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1000px;
`;

const CardItem = styled.div<{ position: string }>`
  position: absolute;
  width: 50%;
  height: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: transform 0.5s ease, scale 0.5s ease, opacity 0.5s ease;

  ${({ position }) =>
    position === 'current' &&
    `
      transform: translate(0) scale(1);
      opacity: 1;
      z-index: 2;
  `}

  ${({ position }) =>
    position === 'prev' &&
    `
      transform: translate(-50%, -15%) scale(0.8);
      opacity: 0.2;
      z-index: 1;
  `}

  ${({ position }) =>
    position === 'next' &&
    `
      transform: translate(50%, -15%) scale(0.8);
      opacity: 0.2;
      z-index: 1;
  `}

  ${({ position }) =>
    position === 'hidden' &&
    `
      display: none;
  `}
`;

const ImageContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: static;
  top: 0;
  overflow: hidden;
  box-shadow: -10px 10px 0px ${({ theme }) => theme.c3};
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
  object-position: left;
`;

const TextContainer = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 30%;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "DM Mono", monospace;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.c4};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.c4};
  font-size: 1rem;
`;

const Arrow = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.c3};
  padding: 0 20px;

  &:hover {
    transform: scale(1.1);
  }
`;
