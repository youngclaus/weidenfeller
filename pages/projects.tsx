import styled, { keyframes } from 'styled-components';
import React, { useState } from 'react';
import { cards } from '../components/Projects/cards';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectModal from '../components/Projects/ProjectModal';
import { Card } from '../components/Projects/cards';

const Projects: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(cards.flatMap(card => card.tags)));

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };

  const filteredCards = selectedTag
    ? cards.filter(card => card.tags.includes(selectedTag))
    : cards;

  return (
    <>
      <Container>
        <Title>Projects</Title>
        <TagsContainer>
          <TagButton onClick={() => handleTagClick(null)} active={!selectedTag}>
            All
          </TagButton>
          {allTags.map(tag => (
            <TagButton
              key={tag}
              onClick={() => handleTagClick(tag)}
              active={selectedTag === tag}
            >
              {tag}
            </TagButton>
          ))}
        </TagsContainer>
        <ProjectsGrid>
          {filteredCards.map((card, index) => (
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

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 100%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
`;

const Container = styled.div`
  position: relative;
  padding: 40px 40px 40px;
  background: linear-gradient(
    to top right,
    ${({ theme }) => theme.c2} 0%,
    ${({ theme }) => theme.c3} 50%,
    ${({ theme }) => theme.c1} 100%
  );
  min-height: 100vh;
  color: ${({ theme }) => theme.c4};
  z-index: 10;
  background-size: 250% 250%;
  animation: ${gradientAnimation} 20s ease infinite;
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
  z-index: 10;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const TagButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.c3 : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.c1 : theme.c4)};
  border: 2px solid ${({ theme }) => theme.c3};
  border-radius: 20px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-family: "DM Mono", monospace;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.c3};
    color: ${({ theme }) => theme.c1};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;
  z-index: 10;
`;
