import styled from 'styled-components';
import React, { useState } from 'react';
import { cards } from '../components/Projects/cards';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectModal from '../components/Projects/ProjectModal';
import { Card } from '../components/Projects/cards';

const Projects: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <BackgroundLine />
      <Container>
        <BackgroundLine />
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
      </Container>
    </>
  );
};

export default Projects;

const Container = styled.div`
  position: relative;
  padding: 40px 40px 40px;
  background-color: ${({ theme }) => theme.c1};
  min-height: 100vh;
  color: ${({ theme }) => theme.c4};
  z-index: 10;
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

const BackgroundLine = styled.div`
  position: fixed;
  top: 40%;
  width: 200%;
  left: -25%;
  height: 600px;
  background-color: ${({ theme }) => theme.c3};
  border: 1px solid ${({ theme }) => theme.c2};
  transform: rotate(-20deg);
  z-index: -1;
`
