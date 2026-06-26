import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Card, cards } from '../components/Projects/cards';

type Category = 'All' | 'Product' | 'AI + Data' | 'Full-stack' | 'Systems' | 'Hardware' | 'Academic';

const categories: Category[] = [
  'All',
  'Product',
  'AI + Data',
  'Full-stack',
  'Systems',
  'Hardware',
  'Academic',
];

const featuredTitles = new Set([
  'Allergenics V2',
  'Banking Application',
  'March Madness Predictor',
  'youngcla.us',
]);

const getCategory = (card: Card): Exclude<Category, 'All'> => {
  const text = [
    card.title,
    card.description,
    card.longDescription,
    ...card.tags,
    ...card.technologies,
  ].join(' ').toLowerCase();

  if (card.tags.includes('Hardware') || /arduino|solidworks|autocad|pspice|robot|drone/.test(text)) {
    return 'Hardware';
  }

  if (/machine learning|artificial intelligence|tensorflow|pytorch|scikit|matlab|data|predict/.test(text)) {
    return 'AI + Data';
  }

  if (card.tags.includes('Academic') || card.tags.includes('Degree')) {
    return 'Academic';
  }

  if (/next\.js|react|website|full-stack|frontend|backend|flask|fastapi/.test(text)) {
    return card.title.includes('Allergenics') ? 'Product' : 'Full-stack';
  }

  if (/c\+\+|network|binary tree|queue|stack|simulation|software/.test(text)) {
    return 'Systems';
  }

  return 'Product';
};

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedCard, setSelectedCard] = useState<Card>(cards[0]);

  const categorizedCards = useMemo(
    () => cards.map(card => ({ card, category: getCategory(card) })),
    [],
  );

  const filteredCards = useMemo(
    () => categorizedCards.filter(({ category }) => (
      selectedCategory === 'All' || category === selectedCategory
    )),
    [categorizedCards, selectedCategory],
  );

  const groupedCards = useMemo(() => {
    const groups = new Map<number, Array<{ card: Card; category: Exclude<Category, 'All'> }>>();

    filteredCards.forEach(item => {
      const existing = groups.get(item.card.year) ?? [];
      existing.push(item);
      groups.set(item.card.year, existing);
    });

    return Array.from(groups.entries()).sort(([yearA], [yearB]) => yearB - yearA);
  }, [filteredCards]);

  useEffect(() => {
    if (!filteredCards.some(({ card }) => card.title === selectedCard.title)) {
      const firstVisible = filteredCards[0]?.card;
      if (firstVisible) setSelectedCard(firstVisible);
    }
  }, [filteredCards, selectedCard.title]);

  const selectedIndex = cards.findIndex(card => card.title === selectedCard.title);
  const selectedCategoryName = getCategory(selectedCard);

  const selectAdjacentProject = (direction: -1 | 1) => {
    const currentIndex = filteredCards.findIndex(({ card }) => card.title === selectedCard.title);
    const nextIndex = (currentIndex + direction + filteredCards.length) % filteredCards.length;
    const nextCard = filteredCards[nextIndex]?.card;
    if (nextCard) setSelectedCard(nextCard);
  };

  return (
    <Page>
      <Ambient aria-hidden="true" />
      <PageHeader>
        <HeadingGroup>
          <Eyebrow>Selected work and archive</Eyebrow>
          <PageTitle>Project Ledger</PageTitle>
        </HeadingGroup>
        <RangeLabel>2019 — present</RangeLabel>
      </PageHeader>

      <Workspace>
        <Ledger aria-label="Project archive">
          {groupedCards.map(([year, yearCards]) => (
            <YearGroup key={year}>
              <YearRail>
                <Year>{year}</Year>
                <RailLine aria-hidden="true" />
              </YearRail>

              <ProjectList>
                {yearCards.map(({ card, category }) => {
                  const isSelected = selectedCard.title === card.title;
                  const isFeatured = featuredTitles.has(card.title);

                  return (
                    <ProjectRow
                      key={card.title}
                      type="button"
                      $selected={isSelected}
                      $featured={isFeatured}
                      onMouseEnter={() => setSelectedCard(card)}
                      onFocus={() => setSelectedCard(card)}
                      onClick={() => setSelectedCard(card)}
                      aria-pressed={isSelected}
                    >
                      <ProjectMarker aria-hidden="true" />
                      <ProjectCopy>
                        <ProjectName>{card.title}</ProjectName>
                        <ProjectSubtitle>{card.description}</ProjectSubtitle>
                      </ProjectCopy>
                      <ProjectCategory>{category}</ProjectCategory>
                    </ProjectRow>
                  );
                })}
              </ProjectList>
            </YearGroup>
          ))}
        </Ledger>

        <PreviewColumn>
          <PreviewHeader>
            <Counter>
              {String(selectedIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </Counter>
            <PreviewControls>
              <ArrowButton
                type="button"
                onClick={() => selectAdjacentProject(-1)}
                aria-label="Previous project"
              >
                ←
              </ArrowButton>
              <ArrowButton
                type="button"
                onClick={() => selectAdjacentProject(1)}
                aria-label="Next project"
              >
                →
              </ArrowButton>
            </PreviewControls>
          </PreviewHeader>

          <PreviewCard key={selectedCard.title}>
            <ImageFrame>
              <ProjectImage src={selectedCard.image} alt={`${selectedCard.title} preview`} />
              {featuredTitles.has(selectedCard.title) && <FeaturedBadge>Selected work</FeaturedBadge>}
            </ImageFrame>

            <PreviewBody>
              <PreviewIntro>
                <PreviewTitle>{selectedCard.title}</PreviewTitle>
                <PreviewCategory>{selectedCategoryName}</PreviewCategory>
                <PreviewDescription>{selectedCard.longDescription}</PreviewDescription>
              </PreviewIntro>

              <DetailsColumn>
                <Detail>
                  <DetailLabel>Role</DetailLabel>
                  <DetailValue>{selectedCard.role || 'Developer'}</DetailValue>
                </Detail>
                <Detail>
                  <DetailLabel>Duration</DetailLabel>
                  <DetailValue>{selectedCard.duration || String(selectedCard.year)}</DetailValue>
                </Detail>
              </DetailsColumn>

              <TechnologySection>
                <DetailLabel>Technologies</DetailLabel>
                <TechnologyList>
                  {selectedCard.technologies.length > 0 ? selectedCard.technologies.map(technology => (
                    <Technology key={technology}>{technology}</Technology>
                  )) : <Technology>Project archive</Technology>}
                </TechnologyList>
              </TechnologySection>

              <Links>
                {selectedCard.githubLink && (
                  <ProjectLink href={selectedCard.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub aria-hidden="true" /> GitHub
                  </ProjectLink>
                )}
                {selectedCard.website && (
                  <ProjectLink href={selectedCard.website} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt aria-hidden="true" /> Live site
                  </ProjectLink>
                )}
                {!selectedCard.githubLink && !selectedCard.website && (
                  <ArchiveStatus>Archive entry · {selectedCard.year}</ArchiveStatus>
                )}
              </Links>
            </PreviewBody>
          </PreviewCard>
        </PreviewColumn>
      </Workspace>

      <FilterBar aria-label="Project categories">
        {categories.map(category => (
          <FilterButton
            key={category}
            type="button"
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterBar>
    </Page>
  );
};

export default Projects;

const colorCrossfade = keyframes`
  0%, 100% {
    opacity: 0;
  }

  45%, 55% {
    opacity: 1;
  }
`;

const Page = styled.main`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  padding: 94px clamp(18px, 3vw, 52px) 82px;
  background: ${({ theme }) => theme.c1};
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", monospace;

  @media (max-width: 840px) {
    position: relative;
    min-height: 100dvh;
    padding: 92px 16px 86px;
    overflow: visible;
  }
`;

const Ambient = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  background:
    linear-gradient(135deg, ${({ theme }) => theme.c1} 0%, ${({ theme }) => theme.c2} 48%, ${({ theme }) => theme.c3} 100%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: -12%;
    background-size: 140% 140%;
    will-change: opacity;
  }

  &::before {
    background:
      radial-gradient(circle at 18% 22%, ${({ theme }) => theme.c3} 0%, transparent 38%),
      radial-gradient(circle at 84% 18%, ${({ theme }) => theme.c4} 0%, transparent 34%),
      linear-gradient(145deg, ${({ theme }) => theme.c2} 0%, ${({ theme }) => theme.c1} 58%, ${({ theme }) => theme.c3} 100%);
    animation: ${colorCrossfade} 16s ease-in-out infinite;
  }

  &::after {
    background:
      radial-gradient(circle at 24% 82%, ${({ theme }) => theme.c4} 0%, transparent 35%),
      radial-gradient(circle at 78% 72%, ${({ theme }) => theme.c3} 0%, transparent 40%),
      linear-gradient(215deg, ${({ theme }) => theme.c1} 0%, ${({ theme }) => theme.c3} 52%, ${({ theme }) => theme.c2} 100%);
    animation: ${colorCrossfade} 16s ease-in-out infinite reverse;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
      opacity: 0.45;
    }
  }
`;

const PageHeader = styled.header`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.c2};
`;

const HeadingGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: clamp(18px, 3vw, 48px);

  @media (max-width: 620px) {
    display: block;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.c3};
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.c4};
  font-size: clamp(1.35rem, 2.25vw, 2.3rem);
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const RangeLabel = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.c4};
  opacity: 0.58;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Workspace = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(340px, 0.82fr) minmax(480px, 1.35fr);
  gap: clamp(28px, 4vw, 72px);
  flex: 1;
  min-height: 0;
  padding-top: 22px;

  @media (max-width: 1040px) {
    grid-template-columns: minmax(300px, 0.9fr) minmax(410px, 1.1fr);
    gap: 28px;
  }

  @media (max-width: 840px) {
    display: block;
    padding-top: 12px;
  }
`;

const Ledger = styled.section`
  min-height: 0;
  overflow-y: auto;
  padding: 4px 16px 40px 0;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.c3} transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.c3};
  }

  @media (max-width: 840px) {
    overflow: visible;
    padding: 0;
  }
`;

const YearGroup = styled.section`
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 18px;
  margin-bottom: 20px;

  @media (max-width: 520px) {
    grid-template-columns: 58px 1fr;
    gap: 10px;
  }
`;

const YearRail = styled.div`
  position: relative;
  min-height: 100%;
`;

const Year = styled.h2`
  position: sticky;
  top: 0;
  margin: 0;
  color: ${({ theme }) => theme.c4};
  opacity: 0.3;
  font-size: clamp(1.65rem, 3vw, 2.7rem);
  font-weight: 300;
  line-height: 1;
`;

const RailLine = styled.span`
  position: absolute;
  top: 42px;
  right: 4px;
  bottom: -18px;
  width: 1px;
  background: ${({ theme }) => theme.c2};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.c4};
    transform: translate(-50%, -50%);
    opacity: 0.45;
  }
`;

const ProjectList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.c2};
`;

const ProjectRow = styled.button<{ $selected: boolean; $featured: boolean }>`
  appearance: none;
  position: relative;
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: ${({ $featured }) => ($featured ? '72px' : '62px')};
  padding: 10px 4px 10px 0;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.c2};
  background: ${({ $selected, theme }) => ($selected ? theme.c2 : 'transparent')};
  color: ${({ theme }) => theme.c4};
  text-align: left;
  cursor: pointer;
  transition: background 160ms ease, padding-left 160ms ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({ $selected, theme }) => ($selected ? theme.c3 : 'transparent')};
  }

  &:hover,
  &:focus-visible {
    padding-left: 8px;
    background: ${({ theme }) => theme.c2};
    outline: none;
  }

  @media (max-width: 520px) {
    grid-template-columns: 10px minmax(0, 1fr);
  }
`;

const ProjectMarker = styled.span`
  width: 6px;
  height: 6px;
  border: 1px solid ${({ theme }) => theme.c4};
  border-radius: 50%;
  background: transparent;

  ${ProjectRow}[aria-pressed='true'] & {
    border-color: ${({ theme }) => theme.c3};
    background: ${({ theme }) => theme.c3};
    box-shadow: 0 0 12px ${({ theme }) => theme.glow};
  }
`;

const ProjectCopy = styled.span`
  display: block;
  min-width: 0;
`;

const ProjectName = styled.span`
  display: block;
  margin-bottom: 4px;
  overflow: hidden;
  color: inherit;
  font-size: clamp(0.82rem, 1vw, 1rem);
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${ProjectRow}[aria-pressed='true'] & {
    color: ${({ theme }) => theme.c3};
  }
`;

const ProjectSubtitle = styled.span`
  display: -webkit-box;
  overflow: hidden;
  color: ${({ theme }) => theme.c4};
  opacity: 0.56;
  font-size: 0.67rem;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const ProjectCategory = styled.span`
  color: ${({ theme }) => theme.c4};
  opacity: 0.52;
  font-size: 0.64rem;
  white-space: nowrap;

  @media (max-width: 520px) {
    display: none;
  }
`;

const PreviewColumn = styled.aside`
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 840px) {
    position: sticky;
    bottom: 74px;
    z-index: 4;
    margin-top: 28px;
  }
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 36px;
  gap: 20px;
`;

const Counter = styled.span`
  color: ${({ theme }) => theme.c4};
  opacity: 0.64;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
`;

const PreviewControls = styled.div`
  display: flex;
  gap: 8px;
`;

const ArrowButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid ${({ theme }) => theme.c2};
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.c4};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.c3};
    color: ${({ theme }) => theme.c3};
    outline: none;
  }
`;

const PreviewCard = styled.article`
  display: grid;
  grid-template-rows: minmax(210px, 48%) 1fr;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.c2};
  border-radius: 12px;
  background: ${({ theme }) => theme.c2};
  box-shadow: 0 0 22px ${({ theme }) => theme.glow};
  animation: preview-in 220ms ease both;

  @keyframes preview-in {
    from { opacity: 0.55; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 840px) {
    grid-template-rows: 180px auto;
    max-height: min(68dvh, 620px);
    overflow-y: auto;
    box-shadow: 0 0 18px ${({ theme }) => theme.glow};
  }
`;

const ImageFrame = styled.div`
  position: relative;
  min-height: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.c1};
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.86) contrast(1.02);
`;

const FeaturedBadge = styled.span`
  position: absolute;
  left: 18px;
  top: 18px;
  padding: 7px 9px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 3px;
  background: ${({ theme }) => theme.c1};
  color: ${({ theme }) => theme.c3};
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const PreviewBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(150px, 0.34fr);
  grid-template-areas:
    'intro details'
    'tech links';
  gap: 22px 30px;
  min-height: 0;
  overflow-y: auto;
  padding: clamp(22px, 3vw, 38px);

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'intro' 'details' 'tech' 'links';
    gap: 18px;
  }
`;

const PreviewIntro = styled.div`
  grid-area: intro;
`;

const PreviewTitle = styled.h2`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.c4};
  font-size: clamp(1.35rem, 2.1vw, 2.45rem);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PreviewCategory = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.c3};
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

const PreviewDescription = styled.p`
  max-width: 70ch;
  margin: 0;
  color: ${({ theme }) => theme.c4};
  opacity: 0.72;
  font-size: 0.78rem;
  line-height: 1.72;
`;

const DetailsColumn = styled.div`
  grid-area: details;
  display: grid;
  align-content: start;
  gap: 22px;
  padding-left: 24px;
  border-left: 1px solid ${({ theme }) => theme.c3};

  @media (max-width: 1120px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 16px 0 0;
    border-top: 1px solid ${({ theme }) => theme.c3};
    border-left: 0;
  }
`;

const Detail = styled.div``;

const DetailLabel = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.c3};
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const DetailValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.c4};
  opacity: 0.76;
  font-size: 0.72rem;
  line-height: 1.5;
`;

const TechnologySection = styled.section`
  grid-area: tech;
  align-self: end;
`;

const TechnologyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const Technology = styled.span`
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 3px;
  color: ${({ theme }) => theme.c4};
  font-size: 0.58rem;
`;

const Links = styled.div`
  grid-area: links;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.c1};
  padding-top: 18px;

  @media (max-width: 1120px) {
    justify-content: flex-start;
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 4px;
  color: ${({ theme }) => theme.c4};
  font-size: 0.64rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: box-shadow 160ms ease, color 160ms ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.c3};
    box-shadow: 0 0 16px ${({ theme }) => theme.glow};
    outline: none;
  }
`;

const ArchiveStatus = styled.span`
  color: ${({ theme }) => theme.c4};
  opacity: 0.48;
  font-size: 0.62rem;
  text-transform: uppercase;
`;

const FilterBar = styled.nav`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 12;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 3vw, 42px);
  height: 62px;
  overflow-x: auto;
  padding: 0 20px;
  border-top: 1px solid ${({ theme }) => theme.c2};
  background: ${({ theme }) => theme.c1};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 840px) {
    position: fixed;
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  appearance: none;
  position: relative;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $active, theme }) => ($active ? theme.c3 : theme.c4)};
  opacity: ${({ $active }) => ($active ? 1 : 0.62)};
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: ${({ $active, theme }) => ($active ? theme.c3 : 'transparent')};
    box-shadow: ${({ $active, theme }) => ($active ? `0 0 10px ${theme.glow}` : 'none')};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.c3};
    opacity: 1;
    outline: none;
  }
`;
