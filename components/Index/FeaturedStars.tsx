import React from 'react';
import styled from 'styled-components';
import { featuredStars } from './featuredStarsData';
import { getThemeGlowFilter } from '../Theme/exploreGlow';
import RingedPlanet from './RingedPlanet';
import { useTheme } from '../Theme/ThemeContext';

type StarStyle = React.CSSProperties & {
  '--x': string;
  '--y': string;
  '--mx': string;
  '--my': string;
};

const FeaturedStars: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Layer aria-label="Featured profile objects">
      {featuredStars.map((star) => {
        const style: StarStyle = {
          '--x': `${star.x}%`,
          '--y': `${star.y}%`,
          '--mx': `${star.mobileX}%`,
          '--my': `${star.mobileY}%`,
        };
        const isCentral = Boolean(star.central);

        return (
          <Star
            key={star.id}
            type="button"
            style={style}
            aria-label={`Reveal featured ${isCentral ? 'planet' : 'star'}: ${star.label}`}
            $central={isCentral}
          >
            <Point $central={isCentral} aria-hidden="true">
              {isCentral && <RingedPlanet color={theme.c3} size={54} glow={false} />}
            </Point>
            <Label>{star.label}</Label>
          </Star>
        );
      })}
    </Layer>
  );
};

export default FeaturedStars;

const Layer = styled.section`
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
`;

const Star = styled.button<{ $central: boolean }>`
  appearance: none;
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: ${({ $central }) => ($central ? '112px' : '96px')};
  height: ${({ $central }) => ($central ? '88px' : '72px')};
  padding: 0;
  border: 0;
  border-radius: 70%;
  background: transparent;
  transform: translate(-50%, -50%);
  cursor: help;
  pointer-events: auto;

  &:focus-visible {
    outline: 1px dashed ${({ theme }) => theme.c3};
    outline-offset: 4px;
  }

  @media (max-width: 699px) {
    left: var(--mx);
    top: var(--my);
    width: 84px;
    height: 62px;
  }
`;

const Point = styled.span<{ $central: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ $central }) => ($central ? '24px' : '5px')};
  height: ${({ $central }) => ($central ? '24px' : '5px')};
  border-radius: 50%;
  color: ${({ theme }) => theme.c3};
  background: ${({ $central, theme }) => (
    $central
      ? 'transparent'
      : theme.c3
  )};
  box-shadow: ${({ $central, theme }) => (
    $central
      ? `inset -5px -4px 7px rgba(0,0,0,.34), 0 0 16px ${theme.glow}`
      : `0 0 9px ${theme.c3}, 0 0 18px ${theme.glow}, 0 0 34px ${theme.glow}`
  )};
  filter: ${({ $central, theme }) => (
    getThemeGlowFilter(theme.glow, $central ? 12 : 10)
  )};
  transform: translate(-50%, -50%);
  transition: transform 150ms ease, box-shadow 150ms ease, filter 150ms ease;
  pointer-events: none;

  ${Star}:hover &,
  ${Star}:focus-visible & {
    transform: translate(-50%, -50%) scale(${({ $central }) => ($central ? 1 : 1.2)});
    box-shadow: ${({ $central, theme }) => (
      $central
        ? `inset -5px -4px 7px rgba(0,0,0,.34), 0 0 28px ${theme.glow}`
        : `0 0 13px ${theme.c3}, 0 0 28px ${theme.glow}, 0 0 52px ${theme.glow}`
    )};
    filter: ${({ $central, theme }) => (
      getThemeGlowFilter(theme.glow, $central ? 24 : 18)
    )};
  }

  @media (max-width: 699px) {
    width: ${({ $central }) => ($central ? '46px' : '5px')};
    height: ${({ $central }) => ($central ? '46px' : '5px')};
  }
`;

const Label = styled.span`
  position: absolute;
  left: 50%;
  top: calc(100% + 4px);
  width: max-content;
  max-width: min(240px, 72vw);
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 4px;
  background: ${({ theme }) => theme.c2};
  color: ${({ theme }) => theme.c4};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
  font-family: "DM Mono", monospace;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  white-space: normal;
  opacity: 0;
  transform: translate(-50%, -4px);
  transition: opacity 150ms ease, transform 150ms ease;
  pointer-events: none;

  ${Star}:hover &,
  ${Star}:focus-visible & {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (max-width: 699px) {
    max-width: 170px;
    padding: 5px 7px;
    font-size: 9px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
