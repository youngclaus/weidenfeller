import React from 'react';
import styled, { keyframes } from 'styled-components';

export type PageStage = 'index' | 'projects' | 'about' | 'music';
export type TransitionDirection = 'forward' | 'backward' | 'jump';
export type TransitionPhase = 'idle' | 'departing' | 'arriving';

interface Props {
  from: PageStage;
  to: PageStage;
  direction: TransitionDirection;
  phase: TransitionPhase;
}

const PageZoomTransition: React.FC<Props> = ({ from, to, phase }) => {
  if (phase === 'idle') return null;

  const touchesProjects = from === 'projects' || to === 'projects';
  const touchesIndex = from === 'index' || to === 'index';

  return (
    <Root $phase={phase} $liquid={touchesProjects} aria-hidden="true">
      <Space $show={touchesIndex} />
      <Surface $show={touchesProjects} />
      <SoftWash />
    </Root>
  );
};

export default PageZoomTransition;

const stars = keyframes`
  from { opacity: .35; transform: scale(1); }
  to { opacity: .08; transform: scale(1.08); }
`;
const overlayIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: .68;
  }
`;
const overlayOut = keyframes`
  from {
    opacity: .68;
  }

  to {
    opacity: 0;
  }
`;
const liquidDrift = keyframes`
  0% { transform: translate3d(-2%, -1%, 0) scale(1.04); }
  50% { transform: translate3d(2%, 1%, 0) scale(1.08); }
  100% { transform: translate3d(-2%, -1%, 0) scale(1.04); }
`;

const Root = styled.div<{ $phase: TransitionPhase; $liquid: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
  pointer-events: all;
  background: ${({ $liquid, theme }) => (
    $liquid
      ? '#000'
      : `linear-gradient(180deg, ${theme.c2}, ${theme.c1})`
  )};
  animation: ${({ $phase }) => ($phase === 'departing' ? overlayIn : overlayOut)}
    ${({ $phase }) => ($phase === 'departing' ? '180ms' : '360ms')}
    cubic-bezier(.2, .75, .2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 120ms;
  }
`;

const Space = styled.div<{ $show: boolean }>`
  position: absolute;
  inset: -20%;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  background:
    radial-gradient(circle at 12% 18%, ${({ theme }) => theme.c4} 0 1px, transparent 2px),
    radial-gradient(circle at 72% 23%, ${({ theme }) => theme.c3} 0 1px, transparent 2px),
    radial-gradient(circle at 43% 68%, ${({ theme }) => theme.c4} 0 1px, transparent 2px),
    radial-gradient(circle at 87% 81%, ${({ theme }) => theme.c3} 0 1px, transparent 2px);
  background-size: 260px 220px, 340px 280px, 300px 260px, 390px 330px;
  animation: ${stars} 900ms ease both;
`;

const Surface = styled.div<{ $show: boolean }>`
  position: absolute;
  inset: -18%;
  opacity: ${({ $show }) => ($show ? .72 : 0)};
  background:
    radial-gradient(ellipse at 18% 28%, ${({ theme }) => theme.c3} 0 13%, transparent 35%),
    radial-gradient(ellipse at 78% 32%, ${({ theme }) => theme.c2} 0 12%, transparent 34%),
    radial-gradient(ellipse at 48% 78%, ${({ theme }) => theme.c4} 0 10%, transparent 32%),
    radial-gradient(circle at 50% 50%, ${({ theme }) => theme.c1} 0 18%, #000 78%);
  filter: saturate(1.16);
  mix-blend-mode: screen;
  animation: ${liquidDrift} 5600ms ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SoftWash = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .22)),
    radial-gradient(circle at 50% 42%, ${({ theme }) => theme.glow}, transparent 58%);
  opacity: .34;
  mix-blend-mode: screen;
`;
