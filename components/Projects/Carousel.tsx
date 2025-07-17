import styled from 'styled-components';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
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
          <DetailsContainer>
            {card.role && (
              <DetailItem>
                <strong>Role:</strong> {card.role}
              </DetailItem>
            )}
            {card.duration && (
              <DetailItem>
                <strong>Duration:</strong> {card.duration}
              </DetailItem>
            )}
            {card.technologies && (
              <DetailItem>
                <strong>Stack:</strong> {card.technologies}
              </DetailItem>
            )}
            <LinksContainer>
              {card.githubLink && (
                <LinkButton href={card.githubLink} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} color="#333" />
                </LinkButton>
              )}
            </LinksContainer>

          </DetailsContainer>
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
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
`

const CarouselContainer = styled.div`
  display: flex;
  width: 95%;
  max-width: 1200px;
  height: 85%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    width: 90%;
  }

`;

const ImageBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    width: 100%;
    height: 50%;
    min-height: 250px;
    padding: 20px 0 20px 0;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 0 15px ${({theme}) => theme.c2});
`;

const TextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "DM Mono", monospace;
  background: ${({theme}) => theme.c3};
  opacity: 0.9;
  text-align: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.c4};
  margin-bottom: 1rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  font-weight: 500;
  color: ${({theme}) => theme.c2};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 90%;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-itmes: flex-start;
  width: 90%;
  margin-top: 1rem;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: left;

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;

const DetailItem = styled.p`
  font-size: clamp(0.9rem, 1.6vw, 1.1rem);
  color: #e0e0e0;
  margin: 5px 0;
  strong {
    color: ${({ theme }) => theme.c4};
    margin-right: 5px;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.c3}; 
  color: #1a1a2e; 
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${({ theme }) => theme.c2};
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
