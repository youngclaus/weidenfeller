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

  const card = cards[currentIndex];

  return (
    <ContentContainer>
      <CarouselContainer>
        <ImageBox>
          <Image src={card.image} alt={card.title} />
        </ImageBox>
        <TextBox>
          <Title>{card.title}</Title>
          <Description>{card.description}</Description>
        </TextBox>
      </CarouselContainer>
      <ArrowContainer>
        <Arrow onClick={handlePrev}>◀</Arrow>
        <CardNumber>
          {currentIndex + 1} / {cards.length}
        </CardNumber>
        <Arrow onClick={handleNext}>▶</Arrow>
      </ArrowContainer>
    </ContentContainer>
  );
};

export default Carousel;

const ContentContainer =  styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  width: 95%;
  height: 400px;
  background: ${({ theme }) => theme.c3};
  box-shadow: -5px 5px 3px ${({ theme }) => theme.c2};
  flex: 1 1 auto;
`;

const ImageBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.c3};
`;

const Image = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px ${({theme}) => theme.c2});
`;

const TextBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.c3};
  font-family: "DM Mono", monospace;
`;

const Title = styled.h3`
  width: 90%;
  color: ${({ theme }) => theme.c4};
  font-size: 3vw;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  box-shadow: -2px 2px 5px ${({ theme }) => theme.c2};
  padding: 5px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.c4};
  width: 80%;
  font-size: 2vw;
  padding: 5px;
  text-align: center;
  box-shadow: -3px 3px 5px ${({ theme }) => theme.c2};
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  gap: 2rem;
`;

const Arrow = styled.button`
  background-color: ${({ theme }) => theme.c3};
  box-shadow: -3px 3px 3px ${({ theme }) => theme.c2};
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.c2};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: transform 0.2s;

  &:hover {
    box-shadow: -6px 6px 3px ${({ theme }) => theme.c2};
  }
`;

const CardNumber = styled.span`
  font-size: 1.2rem;
  font-family: "DM Mono", monospace;
  color: ${({ theme }) => theme.c4};
  margin: 0 1.5rem;
  min-width: 60px;
  text-align: center;
`;
