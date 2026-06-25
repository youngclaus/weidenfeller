import React from 'react';
import styled, { keyframes } from 'styled-components';
import { featuredStars } from './featuredStars';

type StarStyle = React.CSSProperties & {
  '--x': string;
  '--y': string;
  '--mx': string;
  '--my': string;
  '--size': string;
  '--msize': string;
  '--duration': string;
  '--delay': string;
};

const FeaturedStars: React.FC = () => (
  <Layer aria-label="Featured profile stars">
    {featuredStars.map((star) => {
      const style: StarStyle = {
        '--x': `${star.x}%`,
        '--y': `${star.y}%`,
        '--mx': `${star.mobileX}%`,
        '--my': `${star.mobileY}%`,
        '--size': `${star.size}px`,
        '--msize': `${star.mobileSize}px`,
        '--duration': `${star.driftDuration}s`,
        '--delay': `${star.driftDelay}s`,
      };

      return (
        <Star
          key={star.id}
          type="button"
          style={style}
          aria-label={`Reveal featured star: ${star.label}`}
          $central={Boolean(star.central)}
        >
          <Mark $central={Boolean(star.central)} aria-hidden="true" />
          <Label $central={Boolean(star.central)}>{star.label}</Label>
        </Star>
      );
    })}
  </Layer>
);

export default FeaturedStars;

const drift = keyframes`
  0%, 100% { transform: translate(-50%, -50%); }
  45% { transform: translate(-50%, -50%) translate(2px, -3px); }
  75% { transform: translate(-50%, -50%) translate(-2px, 2px); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.82; }
  50% { opacity: 1; }
`;

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
  width: ${({ $central }) => ($central ? '92px' : '72px')};
  height: ${({ $central }) => ($central ? '92px' : '72px')};
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: help;
  pointer-events: auto;
  animation: ${drift} var(--duration) ease-in-out var(--delay) infinite;

  &:focus-visible {
    outline: 1px dashed ${({ theme }) => theme.c3};
    outline-offset: 3px;
  }

  @media (max-width: 699px) {
    left: var(--mx);
    top: var(--my);
    width: ${({ $central }) => ($central ? '76px' : '62px')};
    height: ${({ $central }) => ($central ? '76px' : '62px')};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(-50%, -50%);
  }
`;

const Mark = styled.span<{ $central: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: ${({ theme }) => theme.c3};
  box-shadow:
    0 0 ${({ $central }) => ($central ? '9px' : '7px')} ${({ theme }) => theme.c3},
    0 0 ${({ $central }) => ($central ? '22px' : '17px')} ${({ theme }) => theme.glow};
  transform: translate(-50%, -50%);
  animation: ${twinkle} 3.8s ease-in-out infinite;
  transition: background 150ms ease, box-shadow 150ms ease, transform 150ms ease;

  ${Star}:hover &,
  ${Star}:focus & {
    background: ${({ theme }) => theme.c4};
    box-shadow:
      0 0 ${({ $central }) => ($central ? '13px' : '10px')} ${({ theme }) => theme.c4},
      0 0 ${({ $central }) => ($central ? '30px' : '24px')} ${({ theme }) => theme.glow};
    transform: translate(-50%, -50%) scale(1.18);
  }

  @media (max-width: 699px) {
    width: var(--msize);
    height: var(--msize);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Label = styled.span<{ $central: boolean }>`
  position: absolute;
  left: 50%;
  top: calc(50% + ${({ $central }) => ($central ? '18px' : '15px')});
  width: max-content;
  max-width: min(240px, 72vw);
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 4px;
  background: ${({ theme }) => theme.c2};
  color: ${({ theme }) => theme.c4};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
  font-family: "DM Mono", monospace;
  font-size: ${({ $central }) => ($central ? '13px' : '12px')};
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  white-space: normal;
  opacity: 0;
  transform: translate(-50%, -4px);
  transition: opacity 150ms ease, transform 150ms ease;
  pointer-events: none;

  ${Star}:hover &,
  ${Star}:focus & {
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
