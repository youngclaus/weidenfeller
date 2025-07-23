import styled from 'styled-components';
import React, { useState } from 'react';
import { cards } from '../components/Projects/cards';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectModal from '../components/Projects/ProjectModal';
import { Card } from '../components/Projects/cards';
import LavaLamp from '../components/Projects/LavaLamp';

const Projects: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <ProjectsPageContainer>
      <LavaLamp />
      <ContentWrapper>
        <Title>Projects</Title>
        <ProjectsGrid>
          {cards.map((card, index) => (
            <ProjectCard
              key={index}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </ProjectsGrid>
        {selectedCard && (
          <ProjectModal card={selectedCard} onClose={handleCloseModal} />
        )}
      </ContentWrapper>
    </ProjectsPageContainer>
  );
};

export default Projects;

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px 30px 30px;
  background: linear-gradient(60deg, ${({ theme }) => theme.c3}, ${({ theme }) => theme.c2}, ${({theme}) => theme.c3});
  color: ${({ theme }) => theme.c1};
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 4rem;
  padding: 5px;
  text-shadow: 4px 4px 1px ${({ theme }) => theme.c2};
  text-align: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.c3};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;
`;