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
    <Container>
      <Title>My Work</Title>
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
  );
};

export default Projects;

const Container = styled.div`
  padding: 80px 40px 40px;
  background-color: ${({ theme }) => theme.c1};
  min-height: 100vh;
  color: ${({ theme }) => theme.c4};
`;

const Title = styled.h1`
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 3rem;
  text-shadow: 0 0 5px rgba(155, 155, 155, 0.5);
  text-align: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.c3};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;
`;
