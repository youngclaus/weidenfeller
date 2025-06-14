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
  height: 90%;
  flex: 1 1 auto;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 10%;
  }
`;

const ImageBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;

  @media (max-width: 700px) {
    width: 100%;
    height: 50%;
    order: 2;
  }
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
  background: none;
  font-family: "DM Mono", monospace;

  @media (max-width: 700px) {
    width: 100%;
    height: 25%;
    order: 1;
  }
`;

const Title = styled.h3`
  width: 90%;
  color: #ccc;
  font-size: clamp(1.8rem, 3vw, 4rem);
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 3px 3px 3px ${({ theme }) => theme.c3};
  padding: 5px;

  @media (max-width: 700px) {
    font-size: clamp(1.5rem, 2vw, 3rem);
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  color: #bbb;
  width: 80%;
  font-size: clamp(0.5rem, 2vw, 2rem);
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0px 5px 5px 5px ${({ theme }) => theme.c3};

  @media (max-width: 700px) {
    font-size: clamp(1rem, 2vw, 2.5rem);
    width: 90%;
    order: 3;
  }
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
