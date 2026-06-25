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
        <Star key={star.id} style={style} tabIndex={0} aria-label={star.label} $central={Boolean(star.central)}>
          <Mark aria-hidden="true" />
          <Label $central={Boolean(star.central)}>{star.label}</Label>
        </Star>
      );
    })}
  </Layer>
);

export default FeaturedStars;

const drift = keyframes`
  0%, 100% { transform: translate(-50%, -50%); }
  45% { transform: translate(-50%, -50%) translate(3px, -5px); }
  75% { transform: translate(-50%, -50%) translate(-2px, 3px); }
`;

const Layer = styled.section`
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
`;

const Star = styled.article<{ $central: boolean }>`
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  pointer-events: auto;
  outline: none;
  animation: ${drift} var(--duration) ease-in-out var(--delay) infinite;

  &:focus-visible {
    outline: 1px dashed ${({ theme }) => theme.c3};
    outline-offset: ${({ $central }) => ($central ? '20px' : '12px')};
  }

  @media (max-width: 699px) {
    left: var(--mx);
    top: var(--my);
    width: var(--msize);
    height: var(--msize);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(-50%, -50%);
  }
`;

const Mark = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, #fff 0 10%, ${({ theme }) => theme.c4} 28%, ${({ theme }) => theme.c3} 52%, transparent 76%);
  box-shadow: 0 0 14px ${({ theme }) => theme.c4}, 0 0 34px ${({ theme }) => theme.glow};
  transition: transform 160ms ease, box-shadow 160ms ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    background: linear-gradient(transparent, ${({ theme }) => theme.c3}, ${({ theme }) => theme.c4}, ${({ theme }) => theme.c3}, transparent);
    opacity: 0.3;
    transform: translate(-50%, -50%);
  }

  &::before { width: 1px; height: 360%; }
  &::after { width: 240%; height: 1px; transform: translate(-50%, -50%) rotate(90deg); }

  ${Star}:hover &,
  ${Star}:focus-visible & {
    transform: scale(1.12);
    box-shadow: 0 0 18px ${({ theme }) => theme.c4}, 0 0 44px ${({ theme }) => theme.glow};
  }
`;

const Label = styled.span<{ $central: boolean }>`
  position: absolute;
  left: 50%;
  top: ${({ $central }) => ($central ? 'calc(100% + 26px)' : 'calc(100% + 16px)')};
  width: max-content;
  max-width: ${({ $central }) => ($central ? '280px' : '210px')};
  padding: ${({ $central }) => ($central ? '0' : '4px 7px')};
  border: ${({ $central, theme }) => ($central ? '0' : `1px solid ${theme.c3}`)};
  border-radius: 3px;
  background: ${({ $central, theme }) => ($central ? 'transparent' : theme.c2)};
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", monospace;
  font-size: ${({ $central }) => ($central ? 'clamp(18px, 2vw, 28px)' : '11px')};
  font-weight: ${({ $central }) => ($central ? 800 : 650)};
  line-height: 1.3;
  text-align: center;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.72);
  transform: translateX(-50%);

  @media (max-width: 699px) {
    top: ${({ $central }) => ($central ? 'calc(100% + 20px)' : 'calc(100% + 10px)')};
    max-width: ${({ $central }) => ($central ? '220px' : '124px')};
    font-size: ${({ $central }) => ($central ? '16px' : '8px')};
  }
`;
