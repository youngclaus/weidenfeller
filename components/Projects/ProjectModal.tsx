import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt, FaGithub, FaSearch, FaTimes } from 'react-icons/fa';
import { Card } from './cards';

type ProjectStatus = 'live' | 'wip' | 'archived';

interface ProjectModalProps {
  card: Card;
  onClose: () => void;
}

const getStatus = (card: Card): ProjectStatus => {
  if (card.website) return 'live';
  if (/ongoing|current|w\.i\.p|maintained/i.test(`${card.title} ${card.description} ${card.duration ?? ''}`)) {
    return 'wip';
  }

  return 'archived';
};

const getStatusLabel = (status: ProjectStatus) => {
  if (status === 'live') return 'Live';
  if (status === 'wip') return 'In progress';
  return 'Archived';
};

const ProjectModal: React.FC<ProjectModalProps> = ({ card, onClose }) => {
  const [isImagePoppedOut, setIsImagePoppedOut] = useState(false);
  const status = useMemo(() => getStatus(card), [card]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleImagePopOut = () => setIsImagePoppedOut(true);
  const handleCloseImagePopOut = () => setIsImagePoppedOut(false);

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalShell
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(event) => event.stopPropagation()}
        >
          <MediaPanel>
            <Image src={card.image} alt={card.title} />
            <MediaShade />
            <MediaButton type="button" onClick={handleImagePopOut} aria-label="Open larger image">
              <FaSearch aria-hidden="true" />
            </MediaButton>
          </MediaPanel>

          <ContentPanel>
            <Header>
              <StatusLine>
                <StatusDot $status={status} aria-hidden="true" />
                <StatusText $status={status}>{getStatusLabel(status)}</StatusText>
                <YearText>{card.year}</YearText>
              </StatusLine>
              <CloseButton type="button" onClick={onClose} aria-label="Close project details">
                <FaTimes aria-hidden="true" />
              </CloseButton>
            </Header>

            <Title id="project-modal-title">{card.title}</Title>

            {(card.role || card.duration) && (
              <FactRow>
                {card.role && (
                  <Fact>
                    <FactLabel>Role</FactLabel>
                    <FactValue>{card.role}</FactValue>
                  </Fact>
                )}
                {card.duration && (
                  <Fact>
                    <FactLabel>Duration</FactLabel>
                    <FactValue>{card.duration}</FactValue>
                  </Fact>
                )}
              </FactRow>
            )}

            <ScrollableContent>
              <Description>{card.longDescription}</Description>

              <MetaSection>
                <MetaLabel>Tags</MetaLabel>
                <Tags>
                  {card.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
              </MetaSection>

              {card.technologies.length > 0 && (
                <MetaSection>
                  <MetaLabel>Technologies</MetaLabel>
                  <Tags>
                    {card.technologies.map(tech => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </Tags>
                </MetaSection>
              )}
            </ScrollableContent>

            <Footer>
              {card.website && (
                <PrimaryLink href={card.website} target="_blank" rel="noopener noreferrer">
                  Live site
                  <FaExternalLinkAlt aria-hidden="true" />
                </PrimaryLink>
              )}
              {card.githubLink && (
                <SecondaryLink href={card.githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub
                  <FaGithub aria-hidden="true" />
                </SecondaryLink>
              )}
              {!card.website && !card.githubLink && (
                <ArchiveLabel>Archive entry</ArchiveLabel>
              )}
            </Footer>
          </ContentPanel>
        </ModalShell>
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
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(18px, 3vw, 34px);
  background:
    radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.08), transparent 34%),
    rgba(0, 0, 0, 0.76);
  backdrop-filter: blur(10px);
  font-family: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
`;

const ModalShell = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(380px, 1.05fr);
  width: min(1120px, 94vw);
  max-height: min(780px, 88vh);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 18px;
  background: rgba(12, 13, 18, 0.94);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.72);
  color: ${({ theme }) => theme.c4};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    width: min(620px, 94vw);
    max-height: 90vh;
  }
`;

const MediaPanel = styled.div`
  position: relative;
  min-height: 520px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.68);

  @media (max-width: 860px) {
    min-height: 260px;
    aspect-ratio: 16 / 10;
  }
`;

const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const MediaShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.1), transparent 42%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.28), transparent 46%);
  pointer-events: none;
`;

const MediaButton = styled.button`
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.58);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: border-color 180ms ease, transform 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.c3};
    outline: none;
    transform: translateY(-1px);
  }
`;

const ContentPanel = styled.div`
  display: flex;
  min-height: 0;
  flex-direction: column;
  padding: clamp(26px, 4vw, 42px);
`;

const Header = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
`;

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 38px;
`;

const StatusDot = styled.span<{ $status: ProjectStatus }>`
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: ${({ $status, theme }) => {
    if ($status === 'live') return '#67d391';
    if ($status === 'wip') return '#f0a93a';
    return theme.c4;
  }};
`;

const StatusText = styled.span<{ $status: ProjectStatus }>`
  color: ${({ $status, theme }) => {
    if ($status === 'live') return '#67d391';
    if ($status === 'wip') return '#f0a93a';
    return theme.c4;
  }};
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 12px;
  font-weight: 700;
`;

const YearText = styled.span`
  color: rgba(255, 255, 255, 0.56);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 12px;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.c4};
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.c3};
    color: ${({ theme }) => theme.c3};
    outline: none;
    transform: translateY(-1px);
  }
`;

const Title = styled.h2`
  flex: 0 0 auto;
  margin: 10px 0 0;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.15rem, 4vw, 3.65rem);
  font-weight: 400;
  line-height: 0.98;
`;

const FactRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const Fact = styled.div`
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
`;

const FactLabel = styled.span`
  display: block;
  color: rgba(255, 255, 255, 0.52);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
`;

const FactValue = styled.span`
  display: block;
  margin-top: 5px;
  color: ${({ theme }) => theme.c4};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
`;

const ScrollableContent = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  margin-top: 22px;
  padding-right: 10px;
  scrollbar-color: rgba(255, 255, 255, 0.42) transparent;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.36);
  }
`;

const Description = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.74);
  font-size: 15.5px;
  line-height: 1.65;
`;

const MetaSection = styled.section`
  margin-top: 24px;
`;

const MetaLabel = styled.span`
  display: block;
  margin-bottom: 9px;
  color: rgba(255, 255, 255, 0.52);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Tag = styled.span`
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.055);
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 11px;
  line-height: 1.2;
`;

const Footer = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 17px;
  border-radius: 10px;
  background: ${({ theme }) => theme.c3};
  color: ${({ theme }) => theme.c1};
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 17px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  color: ${({ theme }) => theme.c4};
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`;

const ArchiveLabel = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 11px 17px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  color: ${({ theme }) => theme.c4};
  font-size: 13px;
  font-weight: 800;
`;

const ImagePopOutOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.88);
  cursor: pointer;
`;

const PoppedImage = styled.img`
  max-width: 94vw;
  max-height: 92vh;
  object-fit: contain;
`;
