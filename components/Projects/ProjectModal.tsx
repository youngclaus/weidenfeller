import styled from 'styled-components';
import React, { useState } from 'react';
import { Card } from './cards';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

interface ProjectModalProps {
  card: Card;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ card, onClose }) => {
  const [isImagePoppedOut, setIsImagePoppedOut] = useState(false);

  const handleImagePopOut = () => setIsImagePoppedOut(true);
  const handleCloseImagePopOut = () => setIsImagePoppedOut(false);

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <MagnifyButton onClick={handleImagePopOut}>
            <FaSearch />
          </MagnifyButton>
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
      {isImagePoppedOut && (
          <ImagePopOutOverlay onClick={handleCloseImagePopOut}>
            <PoppedImage src={card.image} alt={card.title} />
          </ImagePopOutOverlay>
        )}
    </>
  );
};

export default ProjectModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 50px 10px 10px 10px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "DM Mono", monospace;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.c1};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.c3};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.c4};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 3rem;
  color: ${({ theme }) => theme.c2};
  text-shadow: 2px 1px 0px ${({ theme }) => theme.c3};
  cursor: pointer;
  z-index: 100;
`;

const MagnifyButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.c2};
  filter: drop-shadow(2px 1px 0px ${({ theme }) => theme.c3});
  cursor: pointer;
  z-index: 100;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #000;
  border-top-left-radius: 15px;
  border-top-right-radius: 0px;
`;

const ImagePopOutOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
`;

const PoppedImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

const Content = styled.div`
  padding: 30px;
  color: ${({ theme }) => theme.c4};
  width: 100%;
  box-sizing: border-box;
  word-break: break-word;
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
  color: ${({ theme }) => theme.c4};
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
