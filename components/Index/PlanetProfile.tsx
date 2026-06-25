import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { PlanetVariant, profilePlanets } from './planets';

type PlanetStyle = React.CSSProperties & {
  '--desktop-x': string;
  '--desktop-y': string;
  '--mobile-x': string;
  '--mobile-y': string;
  '--planet-size': string;
  '--mobile-size': string;
  '--float-duration': string;
  '--float-delay': string;
};

const PlanetProfile: React.FC = () => (
  <PlanetLayer aria-label="Profile planets">
    {profilePlanets.map((planet) => {
      const style: PlanetStyle = {
        '--desktop-x': `${planet.x}%`,
        '--desktop-y': `${planet.y}%`,
        '--mobile-x': `${planet.mobileX}%`,
        '--mobile-y': `${planet.mobileY}%`,
        '--planet-size': `${planet.size}px`,
        '--mobile-size': `${planet.mobileSize}px`,
        '--float-duration': `${planet.orbitDuration}s`,
        '--float-delay': `${planet.floatDelay}s`,
      };

      return (
        <PlanetNode
          key={planet.id}
          style={style}
          tabIndex={0}
          aria-label={planet.label}
          $central={Boolean(planet.central)}
        >
          <Orbit $central={Boolean(planet.central)} aria-hidden="true" />
          <PlanetBody $variant={planet.variant} $central={Boolean(planet.central)}>
            <PlanetShine aria-hidden="true" />
            <PlanetTexture aria-hidden="true" />
            {planet.variant === 'ringed' && <PlanetRing aria-hidden="true" />}
            <PlanetLabel $central={Boolean(planet.central)}>
              {planet.label}
            </PlanetLabel>
          </PlanetBody>
        </PlanetNode>
      );
    })}
  </PlanetLayer>
);

export default PlanetProfile;

const drift = keyframes`
  0%, 100% { transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(-1deg); }
  30% { transform: translate(-50%, -50%) translate3d(5px, -8px, 0) rotate(1deg); }
  65% { transform: translate(-50%, -50%) translate3d(-4px, 5px, 0) rotate(0deg); }
`;

const orbitPulse = keyframes`
  0%, 100% { opacity: 0.22; transform: scale(0.96) rotate(-8deg); }
  50% { opacity: 0.48; transform: scale(1.04) rotate(8deg); }
`;

const PlanetLayer = styled.section`
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
`;

const PlanetNode = styled.article<{ $central: boolean }>`
  position: absolute;
  left: var(--desktop-x);
  top: var(--desktop-y);
  width: var(--planet-size);
  height: var(--planet-size);
  border-radius: 50%;
  outline: none;
  pointer-events: auto;
  animation: ${drift} var(--float-duration) ease-in-out var(--float-delay) infinite;
  transition: filter 180ms ease;

  &:hover,
  &:focus-visible {
    filter: brightness(1.12);
  }

  &:focus-visible {
    outline: 2px dashed ${({ theme }) => theme.c3};
    outline-offset: 10px;
  }

  @media (max-width: 699px) {
    left: var(--mobile-x);
    top: var(--mobile-y);
    width: var(--mobile-size);
    height: var(--mobile-size);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(-50%, -50%);
  }
`;

const Orbit = styled.span<{ $central: boolean }>`
  position: absolute;
  inset: ${({ $central }) => ($central ? '-28px' : '-13px')};
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 50%;
  opacity: ${({ $central }) => ($central ? 0.36 : 0.2)};
  transform: rotate(-12deg) scaleY(0.45);
  animation: ${orbitPulse} 8s ease-in-out infinite;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    width: ${({ $central }) => ($central ? '11px' : '7px')};
    height: ${({ $central }) => ($central ? '11px' : '7px')};
    right: 8%;
    top: 35%;
    border-radius: 50%;
    background: ${({ theme }) => theme.c4};
    box-shadow: 0 0 10px ${({ theme }) => theme.glow};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const variantStyles = (variant: PlanetVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background:
          radial-gradient(circle at 30% 24%, ${({ theme }) => theme.c4} 0 4%, transparent 5%),
          radial-gradient(circle at 36% 30%, ${({ theme }) => theme.c3} 0%, ${({ theme }) => theme.c2} 48%, #07080c 100%);
      `;
    case 'accent':
      return css`
        background:
          radial-gradient(circle at 28% 22%, rgba(255,255,255,.82), transparent 9%),
          radial-gradient(circle at 38% 32%, ${({ theme }) => theme.c3}, ${({ theme }) => theme.c2} 58%, #111 100%);
      `;
    case 'warm':
      return css`
        background:
          radial-gradient(circle at 30% 22%, #fff8a4, transparent 8%),
          repeating-linear-gradient(12deg, rgba(255,255,255,.08) 0 8px, rgba(70,24,0,.12) 8px 15px),
          radial-gradient(circle at 40% 35%, #ffd84a, #e77a18 58%, #4d1700 100%);
      `;
    case 'cool':
      return css`
        background:
          radial-gradient(circle at 31% 24%, rgba(255,255,255,.82), transparent 8%),
          radial-gradient(circle at 42% 36%, ${({ theme }) => theme.c4}, ${({ theme }) => theme.c2} 58%, #09121d 100%);
      `;
    case 'ringed':
      return css`
        background:
          radial-gradient(circle at 28% 24%, rgba(255,255,255,.76), transparent 8%),
          repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 7px, transparent 7px 13px),
          radial-gradient(circle at 40% 34%, ${({ theme }) => theme.c3}, ${({ theme }) => theme.c1} 62%, #16100c 100%);
      `;
    default:
      return css`background: ${({ theme }) => theme.c3};`;
  }
};

const PlanetBody = styled.div<{ $variant: PlanetVariant; $central: boolean }>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  overflow: visible;
  box-shadow:
    inset -18px -16px 32px rgba(0, 0, 0, 0.42),
    inset 9px 8px 22px rgba(255, 255, 255, 0.12),
    0 0 ${({ $central }) => ($central ? '45px' : '24px')} ${({ theme }) => theme.glow};
  ${({ $variant }) => variantStyles($variant)};
  transition: transform 180ms ease, box-shadow 180ms ease;

  ${PlanetNode}:hover &,
  ${PlanetNode}:focus-visible & {
    transform: scale(1.06);
    box-shadow:
      inset -18px -16px 32px rgba(0, 0, 0, 0.38),
      inset 9px 8px 22px rgba(255, 255, 255, 0.16),
      0 0 ${({ $central }) => ($central ? '62px' : '38px')} ${({ theme }) => theme.glow};
  }
`;

const PlanetShine = styled.span`
  position: absolute;
  inset: 8% 45% 48% 10%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,.46), rgba(255,255,255,0));
  filter: blur(2px);
  pointer-events: none;
`;

const PlanetTexture = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0.34;
  background-image:
    radial-gradient(circle at 24% 62%, rgba(0,0,0,.28) 0 4%, transparent 5%),
    radial-gradient(circle at 67% 28%, rgba(255,255,255,.17) 0 5%, transparent 6%),
    radial-gradient(circle at 70% 70%, rgba(0,0,0,.24) 0 7%, transparent 8%);
  pointer-events: none;
`;

const PlanetRing = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 142%;
  height: 42%;
  border: 7px solid ${({ theme }) => theme.c3};
  border-right-color: ${({ theme }) => theme.c4};
  border-radius: 50%;
  opacity: 0.64;
  transform: translate(-50%, -50%) rotate(-17deg);
  box-shadow: 0 0 12px rgba(0,0,0,.24);
  pointer-events: none;
`;

const PlanetLabel = styled.span<{ $central: boolean }>`
  position: absolute;
  left: 50%;
  top: ${({ $central }) => ($central ? '50%' : 'calc(100% + 14px)')};
  z-index: 3;
  width: ${({ $central }) => ($central ? '78%' : 'max-content')};
  max-width: ${({ $central }) => ($central ? '78%' : '190px')};
  padding: ${({ $central }) => ($central ? '0' : '5px 8px')};
  border: ${({ $central, theme }) => ($central ? '0' : `1px solid ${theme.c3}`)};
  border-radius: 999px;
  background: ${({ $central, theme }) => ($central ? 'transparent' : theme.c2)};
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", monospace;
  font-size: ${({ $central }) => ($central ? 'clamp(16px, 1.8vw, 25px)' : '11px')};
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
  text-shadow: 0 1px 5px rgba(0,0,0,.72);
  white-space: normal;
  transform: translate(-50%, ${({ $central }) => ($central ? '-50%' : '0')});
  box-shadow: ${({ $central }) => ($central ? 'none' : '0 5px 16px rgba(0,0,0,.28)')};

  @media (max-width: 699px) {
    top: ${({ $central }) => ($central ? '50%' : 'calc(100% + 8px)')};
    max-width: ${({ $central }) => ($central ? '82%' : '120px')};
    font-size: ${({ $central }) => ($central ? '15px' : '8px')};
  }
`;
