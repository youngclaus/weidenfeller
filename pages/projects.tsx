import React, { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Card, cards } from '../components/Projects/cards';
import { Theme } from '../components/Theme/themes';

type FilterKey = 'all' | 'ai' | 'web' | 'apis' | 'live';
type ProjectStatus = 'live' | 'wip' | 'archived';

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'web', label: 'Web' },
  { key: 'apis', label: 'APIs' },
  { key: 'live', label: 'Live' },
];

const featuredTitles = new Set([
  'Allergenics V2',
  'Banking Application',
  'March Madness Predictor',
  'youngcla.us',
]);

type Rgb = { r: number; g: number; b: number };

const namedColors: Record<string, Rgb> = {
  black: { r: 0, g: 0, b: 0 },
  gray: { r: 128, g: 128, b: 128 },
  grey: { r: 128, g: 128, b: 128 },
  orange: { r: 255, g: 165, b: 0 },
  white: { r: 255, g: 255, b: 255 },
};

const clampChannel = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const parseColor = (color: string): Rgb => {
  const normalized = color.trim().toLowerCase();
  const named = namedColors[normalized];
  if (named) return named;

  const hex = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const value = hex[1].length === 3
      ? hex[1].split('').map(character => character + character).join('')
      : hex[1];

    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  }

  const rgb = normalized.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
    };
  }

  return namedColors.gray;
};

const toCss = ({ r, g, b }: Rgb) => `rgb(${r}, ${g}, ${b})`;

const mix = (first: Rgb, second: Rgb, firstWeight: number): Rgb => ({
  r: clampChannel(first.r * firstWeight + second.r * (1 - firstWeight)),
  g: clampChannel(first.g * firstWeight + second.g * (1 - firstWeight)),
  b: clampChannel(first.b * firstWeight + second.b * (1 - firstWeight)),
});

const luminance = ({ r, g, b }: Rgb) => {
  const transform = (channel: number) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
};

const contrast = (first: Rgb, second: Rgb) => {
  const light = Math.max(luminance(first), luminance(second));
  const dark = Math.min(luminance(first), luminance(second));
  return (light + 0.05) / (dark + 0.05);
};

const bestContrast = (background: Rgb, candidates: Rgb[]) => (
  candidates.reduce((best, candidate) => (
    contrast(background, candidate) > contrast(background, best) ? candidate : best
  ), candidates[0])
);

const readableColor = (foreground: Rgb, background: Rgb, targetContrast = 3.2): Rgb => {
  if (contrast(foreground, background) >= targetContrast) return foreground;

  const anchor = luminance(background) > 0.5 ? namedColors.black : namedColors.white;

  for (let weight = 0.82; weight >= 0.25; weight -= 0.08) {
    const candidate = mix(foreground, anchor, weight);
    if (contrast(candidate, background) >= targetContrast) return candidate;
  }

  return bestContrast(background, [foreground, anchor]);
};

const projectPalette = (theme: Theme) => {
  const base = parseColor(theme.c1);
  const secondary = parseColor(theme.c2);
  const accent = parseColor(theme.c3);
  const themeText = parseColor(theme.c4);
  const black = namedColors.black;
  const white = namedColors.white;
  const baseIsLight = luminance(base) > 0.46;

  const bg = baseIsLight ? mix(base, white, 0.76) : mix(base, black, 0.7);
  const surface = baseIsLight ? mix(base, white, 0.3) : mix(base, black, 0.3);
  const surface2 = baseIsLight ? mix(base, white, 0.52) : mix(base, black, 0.5);
  const ink = bestContrast(surface, [themeText, secondary, black, white]);
  const muted = mix(ink, surface, 0.52);
  const faint = mix(ink, surface, 0.32);
  const line = mix(ink, surface, 0.16);
  const line2 = mix(ink, surface, 0.1);
  const readableAccent = readableColor(accent, surface);

  return {
    accent: toCss(readableAccent),
    accentInk: toCss(bestContrast(readableAccent, [black, white, base])),
    accentSoft: toCss(mix(readableAccent, surface, 0.14)),
    bg: toCss(bg),
    faint: toCss(faint),
    ink: toCss(ink),
    line: toCss(line),
    line2: toCss(line2),
    muted: toCss(muted),
    shadow: baseIsLight
      ? '0 1px 2px rgba(40, 34, 22, 0.04), 0 8px 24px -12px rgba(40, 34, 22, 0.12)'
      : '0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 30px -14px rgba(0, 0, 0, 0.6)',
    shadowLift: baseIsLight
      ? '0 2px 4px rgba(40, 34, 22, 0.05), 0 20px 40px -16px rgba(40, 34, 22, 0.22)'
      : '0 2px 4px rgba(0, 0, 0, 0.35), 0 26px 50px -18px rgba(0, 0, 0, 0.7)',
    surface: toCss(surface),
    surface2: toCss(surface2),
  };
};

const getPrimaryUrl = (card: Card) => card.website || card.githubLink || '';

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

const getProjectCategories = (card: Card): FilterKey[] => {
  const text = [
    card.title,
    card.description,
    card.longDescription,
    ...card.tags,
    ...card.technologies,
  ].join(' ').toLowerCase();

  const categories: FilterKey[] = [];
  if (/ai|machine learning|tensorflow|pytorch|scikit|openai|matlab|predict|data/.test(text)) categories.push('ai');
  if (/website|react|next|frontend|backend|full-stack|flask|fastapi|tailwind|styled-components/.test(text)) categories.push('web');
  if (/api|spotify|yelp|openai|fastapi|swagger/.test(text)) categories.push('apis');
  if (getStatus(card) === 'live') categories.push('live');
  return categories;
};

const matchesFilter = (card: Card, filter: FilterKey) => (
  filter === 'all' || getProjectCategories(card).includes(filter)
);

const getCountForFilter = (filter: FilterKey) => (
  cards.filter(card => matchesFilter(card, filter)).length
);

const getYearRange = () => {
  const years = cards.map(card => card.year);
  return `${Math.min(...years)}-${Math.max(...years)}`;
};

const getTagPreview = (card: Card) => (
  (card.technologies.length > 0 ? card.technologies : card.tags).slice(0, 3)
);

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>('all');
  const [featuredCard, setFeaturedCard] = useState<Card>(
    cards.find(card => featuredTitles.has(card.title)) ?? cards[0],
  );

  const visibleCards = useMemo(
    () => cards.filter(card => matchesFilter(card, selectedFilter)),
    [selectedFilter],
  );

  useEffect(() => {
    if (!visibleCards.some(card => card.title === featuredCard.title)) {
      setFeaturedCard(
        visibleCards.find(card => featuredTitles.has(card.title)) ?? visibleCards[0] ?? cards[0],
      );
    }
  }, [featuredCard.title, visibleCards]);

  const gridCards = visibleCards.filter(card => card.title !== featuredCard.title);
  const liveCount = cards.filter(card => getStatus(card) === 'live').length;
  const featuredStatus = getStatus(featuredCard);
  const featuredUrl = getPrimaryUrl(featuredCard);

  return (
    <Page>
      <Shell>
        <Hero>
          <HeroCopy>
            <Title>Projects</Title>
          </HeroCopy>
        </Hero>

        <StickyControls>
          <Stats aria-label="Project stats">
            <Stat><strong>{cards.length}</strong> projects</Stat>
            <Stat><strong>{liveCount}</strong> live</Stat>
            <Stat>{getYearRange()}</Stat>
          </Stats>

          <FilterBar aria-label="Project filters">
            {filters.map(filter => {
              const isActive = selectedFilter === filter.key;
              return (
                <FilterButton
                  key={filter.key}
                  type="button"
                  $active={isActive}
                  onClick={() => setSelectedFilter(filter.key)}
                >
                  {filter.label}
                  <FilterCount>{getCountForFilter(filter.key)}</FilterCount>
                </FilterButton>
              );
            })}
          </FilterBar>
        </StickyControls>

        <FeaturedProject
          href={featuredUrl || undefined}
          as={featuredUrl ? 'a' : 'section'}
          target={featuredUrl ? '_blank' : undefined}
          rel={featuredUrl ? 'noopener noreferrer' : undefined}
        >
          <FeaturedImageWrap>
            <ProjectImage src={featuredCard.image} alt={`${featuredCard.title} preview`} />
            <FeaturedBadge>Featured</FeaturedBadge>
          </FeaturedImageWrap>

          <FeaturedBody>
            <StatusLine>
              <StatusDot $status={featuredStatus} aria-hidden="true" />
              <StatusText $status={featuredStatus}>{getStatusLabel(featuredStatus)}</StatusText>
              <YearText>{featuredCard.year}</YearText>
            </StatusLine>

            <FeaturedTitle>{featuredCard.title}</FeaturedTitle>
            <FeaturedDescription>{featuredCard.longDescription}</FeaturedDescription>

            <TagList>
              {getTagPreview(featuredCard).map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>

            <ActionRow>
              {featuredCard.website && (
                <PrimaryAction>
                  Live demo
                  <FaExternalLinkAlt aria-hidden="true" />
                </PrimaryAction>
              )}
              {featuredCard.githubLink && (
                <SecondaryAction>
                  GitHub
                  <FaGithub aria-hidden="true" />
                </SecondaryAction>
              )}
              {!featuredCard.website && !featuredCard.githubLink && (
                <SecondaryAction>Archive entry</SecondaryAction>
              )}
            </ActionRow>
          </FeaturedBody>
        </FeaturedProject>

        <Grid aria-label="Project grid">
          {gridCards.map(card => {
            const status = getStatus(card);
            const url = getPrimaryUrl(card);

            return (
              <ProjectTile
                key={card.title}
                as={url ? 'a' : 'button'}
                href={url || undefined}
                target={url ? '_blank' : undefined}
                rel={url ? 'noopener noreferrer' : undefined}
                type={url ? undefined : 'button'}
                onClick={() => setFeaturedCard(card)}
              >
                <TileImageWrap>
                  <ProjectImage src={card.image} alt={`${card.title} preview`} />
                  <TileStatus>
                    <StatusDot $status={status} aria-hidden="true" />
                    {getStatusLabel(status)}
                  </TileStatus>
                </TileImageWrap>

                <TileBody>
                  <TileHeader>
                    <TileTitle>{card.title}</TileTitle>
                    <YearText>{card.year}</YearText>
                  </TileHeader>
                  <TileDescription>{card.description}</TileDescription>
                  <TileFooter>
                    <InlineTags>
                      {getTagPreview(card).slice(0, 2).map(tag => (
                        <InlineTag key={tag}>{tag}</InlineTag>
                      ))}
                    </InlineTags>
                    <TileArrow aria-hidden="true">↗</TileArrow>
                  </TileFooter>
                </TileBody>
              </ProjectTile>
            );
          })}
        </Grid>
      </Shell>
    </Page>
  );
};

export default Projects;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.main`
  --project-bg: ${({ theme }) => projectPalette(theme).bg};
  --project-surface: ${({ theme }) => projectPalette(theme).surface};
  --project-surface-2: ${({ theme }) => projectPalette(theme).surface2};
  --project-ink: ${({ theme }) => projectPalette(theme).ink};
  --project-muted: ${({ theme }) => projectPalette(theme).muted};
  --project-faint: ${({ theme }) => projectPalette(theme).faint};
  --project-line: ${({ theme }) => projectPalette(theme).line};
  --project-line-2: ${({ theme }) => projectPalette(theme).line2};
  --project-accent: ${({ theme }) => projectPalette(theme).accent};
  --project-accent-ink: ${({ theme }) => projectPalette(theme).accentInk};
  --project-accent-soft: ${({ theme }) => projectPalette(theme).accentSoft};
  --project-shadow: ${({ theme }) => projectPalette(theme).shadow};
  --project-shadow-lift: ${({ theme }) => projectPalette(theme).shadowLift};

  position: fixed;
  inset: 0;
  z-index: 10;
  overflow-y: auto;
  background:
    radial-gradient(circle at 16% 8%, var(--project-accent-soft), transparent 32%),
    var(--project-bg);
  color: var(--project-ink);
  font-family: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  transition: background 350ms ease, color 350ms ease;

  @media (max-width: 840px) {
    position: relative;
    min-height: 100dvh;
    max-height: 100dvh;
  }
`;

const Shell = styled.div`
  width: min(1080px, calc(100% - 48px));
  margin: 0 auto;
  padding: 82px 0 80px;

  @media (max-width: 720px) {
    width: min(100% - 32px, 1080px);
    padding: 92px 0 56px;
  }
`;

const Hero = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  padding: 56px 0 24px;
  animation: ${fadeUp} 260ms ease both;

  @media (max-width: 740px) {
    display: block;
    padding-top: 42px;
  }
`;

const HeroCopy = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--project-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(4.25rem, 9vw, 5.25rem);
  font-weight: 400;
  line-height: 0.92;
  letter-spacing: -0.04em;
`;

const StickyControls = styled.div`
  position: sticky;
  top: 94px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  margin: 0 0 30px;
  padding: 14px 0 16px;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: -24px;
    bottom: 0;
    width: min(640px, calc(100% + 48px));
    border-radius: 22px 0 0 22px;
    background:
      linear-gradient(90deg, transparent 0%, var(--project-bg) 30%, var(--project-bg) 100%);
    opacity: 0.94;
    box-shadow: -24px 0 40px rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(12px);
  }

  @media (max-width: 740px) {
    top: 96px;
    align-items: flex-end;
    margin-bottom: 24px;

    &::before {
      right: -16px;
      left: -16px;
      bottom: -24px;
      width: auto;
      border-radius: 0;
      background: linear-gradient(180deg, var(--project-bg) 0%, var(--project-bg) 88%, transparent 100%);
    }
  }
`;

const Stats = styled.aside`
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  color: var(--project-faint);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 13px;
  line-height: 1.7;
  text-align: right;
  pointer-events: auto;

  @media (max-width: 740px) {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 24px;
    text-align: right;
  }
`;

const Stat = styled.div`
  strong {
    color: var(--project-ink);
    font-weight: 700;
  }
`;

const FilterBar = styled.nav`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  max-width: min(620px, 100%);
  pointer-events: auto;

  @media (max-width: 620px) {
    justify-content: flex-end;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 15px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--project-ink)' : 'var(--project-line)')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? 'var(--project-ink)' : 'var(--project-surface)')};
  color: ${({ $active }) => ($active ? 'var(--project-bg)' : 'var(--project-muted)')};
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease, background 180ms ease;

  &:hover,
  &:focus-visible {
    border-color: var(--project-accent);
    color: ${({ $active }) => ($active ? 'var(--project-bg)' : 'var(--project-ink)')};
    outline: none;
  }
`;

const FilterCount = styled.span`
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 11px;
  opacity: 0.66;
`;

const FeaturedProject = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, 1fr);
  overflow: hidden;
  margin-bottom: 22px;
  border: 1px solid var(--project-line);
  border-radius: 18px;
  background: var(--project-surface);
  color: inherit;
  text-decoration: none;
  box-shadow: var(--project-shadow);
  animation: ${fadeUp} 320ms ease both;
  transition: box-shadow 250ms ease, transform 250ms ease, border-color 250ms ease;

  &:hover,
  &:focus-visible {
    border-color: var(--project-accent);
    box-shadow: var(--project-shadow-lift);
    transform: translateY(-2px);
    outline: none;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImageWrap = styled.div`
  position: relative;
  min-height: 340px;
  background: var(--project-surface-2);

  @media (max-width: 620px) {
    min-height: 240px;
  }
`;

const ProjectImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(20, 16, 10, 0.78);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
`;

const FeaturedBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: clamp(30px, 4vw, 42px) clamp(26px, 4vw, 40px);
`;

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

const StatusDot = styled.span<{ $status: ProjectStatus }>`
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: ${({ $status }) => {
    if ($status === 'live') return '#3f9d63';
    if ($status === 'wip') return '#cf8a1c';
    return 'var(--project-faint)';
  }};
`;

const StatusText = styled.span<{ $status: ProjectStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ $status }) => {
    if ($status === 'live') return '#3f9d63';
    if ($status === 'wip') return '#a46813';
    return 'var(--project-faint)';
  }};
  font-size: 12px;
  font-weight: 700;
`;

const YearText = styled.span`
  color: var(--project-faint);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 12px;
`;

const FeaturedTitle = styled.h2`
  margin: 6px 0 0;
  color: var(--project-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.5rem, 5vw, 2.875rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.025em;
`;

const FeaturedDescription = styled.p`
  margin: 16px 0 0;
  color: var(--project-muted);
  font-size: 16px;
  line-height: 1.55;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 22px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border: 1px solid var(--project-line-2);
  border-radius: 6px;
  background: var(--project-surface-2);
  color: var(--project-muted);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 11px;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  padding-top: 28px;
`;

const PrimaryAction = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 18px;
  border-radius: 10px;
  background: var(--project-accent);
  color: var(--project-accent-ink);
  font-size: 13px;
  font-weight: 700;
`;

const SecondaryAction = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 18px;
  border: 1px solid var(--project-line);
  border-radius: 10px;
  color: var(--project-ink);
  font-size: 13px;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  padding-bottom: 80px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectTile = styled.a`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  padding: 0;
  border: 1px solid var(--project-line);
  border-radius: 14px;
  background: var(--project-surface);
  color: inherit;
  font: inherit;
  text-align: left;
  text-decoration: none;
  box-shadow: var(--project-shadow);
  cursor: pointer;
  animation: ${fadeUp} 360ms ease both;
  transition: box-shadow 250ms ease, transform 250ms ease, border-color 250ms ease;

  &:hover,
  &:focus-visible {
    border-color: var(--project-accent);
    box-shadow: var(--project-shadow-lift);
    transform: translateY(-3px);
    outline: none;
  }
`;

const TileImageWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--project-surface-2);
`;

const TileStatus = styled.span`
  position: absolute;
  top: 11px;
  right: 11px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(20, 16, 10, 0.72);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.03em;
  backdrop-filter: blur(6px);
`;

const TileBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 17px 17px 19px;
`;

const TileHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

const TileTitle = styled.h3`
  margin: 0;
  color: var(--project-ink);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const TileDescription = styled.p`
  margin: 7px 0 0;
  color: var(--project-muted);
  font-size: 13.5px;
  line-height: 1.5;
`;

const TileFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--project-line-2);
`;

const InlineTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const InlineTag = styled.span`
  color: var(--project-muted);
  font-family: "DM Mono", "JetBrains Mono", monospace;
  font-size: 10.5px;
`;

const TileArrow = styled.span`
  margin-left: auto;
  color: var(--project-faint);
  font-size: 14px;
`;
