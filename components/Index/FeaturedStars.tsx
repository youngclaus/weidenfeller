import React from 'react';
import styled from 'styled-components';
import { featuredStars } from './featuredStars';

type StarStyle = React.CSSProperties & {
  '--x': string;
  '--y': string;
  '--mx': string;
  '--my': string;
};

const FeaturedStars: React.FC = () => (
  <Layer aria-label="Featured profile stars">
    {featuredStars.map((star) => {
      const style: StarStyle = {
        '--x': `${star.x}%`,
        '--y': `${star.y}%`,
        '--mx': `${star.mobileX}%`,
        '--my': `${star.mobileY}%`,
      };

      return (
        <Star
          key={star.id}
          type="button"
          style={style}
          aria-label={`Reveal featured star: ${star.label}`}
          $central={Boolean(star.central)}
        >
          <Point $central={Boolean(star.central)} aria-hidden="true" />
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
  border-radius: 50%;
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
  width: ${({ $central }) => ($central ? '7px' : '5px')};
  height: ${({ $central }) => ($central ? '7px' : '5px')};
  border-radius: 50%;
  background: ${({ theme }) => theme.c4};
  box-shadow:
    0 0 ${({ $central }) => ($central ? '9px' : '7px')} ${({ theme }) => theme.c4},
    0 0 ${({ $central }) => ($central ? '19px' : '14px')} ${({ theme }) => theme.glow};
  transform: translate(-50%, -50%);
  transition: transform 150ms ease, box-shadow 150ms ease;
  pointer-events: none;

  ${Star}:hover &,
  ${Star}:focus-visible & {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow:
      0 0 ${({ $central }) => ($central ? '12px' : '10px')} ${({ theme }) => theme.c4},
      0 0 ${({ $central }) => ($central ? '25px' : '19px')} ${({ theme }) => theme.glow};
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
