import React from 'react';
import styled from 'styled-components';
import { featuredStars } from './featuredStarsData';
import { getThemeGlowFilter } from '../Theme/exploreGlow';

type StarStyle = React.CSSProperties & {
  '--x': string;
  '--y': string;
  '--mx': string;
  '--my': string;
};

const FeaturedStars: React.FC = () => (
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
          <Point $central={isCentral} aria-hidden="true" />
          <Label>{star.label}</Label>
        </Star>
      );
    })}
  </Layer>
);

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
  background: ${({ $central, theme }) => (
    $central
      ? `radial-gradient(circle at 31% 28%, rgba(255,255,255,.18) 0 7%, transparent 8%), radial-gradient(circle at 66% 36%, rgba(0,0,0,.14) 0 8%, transparent 9%), radial-gradient(circle at 42% 68%, rgba(0,0,0,.12) 0 10%, transparent 11%), ${theme.c3}`
      : theme.c4
  )};
  box-shadow: ${({ $central, theme }) => (
    $central
      ? 'inset -5px -4px 7px rgba(0,0,0,.34)'
      : `0 0 7px ${theme.c4}, 0 0 14px ${theme.glow}`
  )};
  filter: ${({ $central, theme }) => (
    $central ? getThemeGlowFilter(theme.glow, 8) : 'none'
  )};
  transform: translate(-50%, -50%);
  transition: transform 150ms ease, box-shadow 150ms ease, filter 150ms ease;
  pointer-events: none;

  ${Star}:hover &,
  ${Star}:focus-visible & {
    transform: translate(-50%, -50%) scale(${({ $central }) => ($central ? 1 : 1.2)});
    box-shadow: ${({ $central, theme }) => (
      $central
        ? 'inset -5px -4px 7px rgba(0,0,0,.34)'
        : `0 0 10px ${theme.c4}, 0 0 19px ${theme.glow}`
    )};
    filter: ${({ $central, theme }) => (
      $central ? getThemeGlowFilter(theme.glow, 20) : 'none'
    )};
  }

  @media (max-width: 699px) {
    width: ${({ $central }) => ($central ? '20px' : '5px')};
    height: ${({ $central }) => ($central ? '20px' : '5px')};
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
