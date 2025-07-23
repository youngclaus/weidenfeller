import styled from 'styled-components';
import React from 'react';
import { Card } from './cards';

interface ProjectCardProps {
  card: Card;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ card, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <Image src={card.image} alt={card.title} />
      <Content>
        <Title>{card.title}</Title>
        <Description>{card.description}</Description>
        <Tags>
          {card.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </Content>
    </CardContainer>
  );
};

export default ProjectCard;

const CardContainer = styled.div`
  background: ${({ theme }) => theme.c1};
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 1px 1px ${({ theme}) => theme.c2};
  color: ${({ theme }) => theme.c3};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-family: "DM Mono", monospace;
  font-size: 1rem;
  color: ${({ theme }) => theme.c4};
  line-height: 1.5;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.c3};
  color: ${({ theme }) => theme.c4};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`; 
