import styled from 'styled-components';
import React from 'react';
import { Card } from './cards';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectModalProps {
  card: Card;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ card, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Image src={card.image} alt={card.title} />
        <Content>
          <Title>{card.title}</Title>
          <Year>{card.year}</Year>
          <Description>{card.longDescription}</Description>
          <Details>
            <DetailItem><strong>Role:</strong> {card.role}</DetailItem>
            <DetailItem><strong>Duration:</strong> {card.duration}</DetailItem>
          </Details>
          <Technologies>
            <strong>Technologies:</strong>
            <Tags>
              {card.technologies.map(tech => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </Tags>
          </Technologies>
          <Links>
            {card.githubLink && (
              <Link href={card.githubLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> GitHub
              </Link>
            )}
            {card.website && (
              <Link href={card.website} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt /> Live Site
              </Link>
            )}
          </Links>
        </Content>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProjectModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Mono", monospace;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.c1};
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.c2};
  cursor: pointer;
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  @media (min-width: 768px) {
    width: 40%;
    height: auto;
    border-top-right-radius: 0;
    border-bottom-left-radius: 15px;
  }
`;

const Content = styled.div`
  padding: 30px;
  color: ${({ theme }) => theme.c4};
  width: 100%;

  @media (min-width: 768px) {
    width: 60%;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.c3};
`;

const Year = styled.p`
  font-weight: bold;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.c4};
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailItem = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
  strong {
    font-weight: 700;
  }
`;

const Technologies = styled.div`
  margin-bottom: 20px;
  strong {
    font-weight: 700;
    display: block;
    margin-bottom: 10px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.c3};
  color: ${({ theme }) => theme.c1};
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Link = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.c3};
  color: ${({ theme }) => theme.c1};
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.c4};
  }
`; 