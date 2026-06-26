import React from 'react';
import styled, { css, keyframes } from 'styled-components';

export type PageStage = 'index' | 'projects' | 'about' | 'music';
export type TransitionDirection = 'forward' | 'backward' | 'jump';
export type TransitionPhase = 'idle' | 'departing' | 'arriving';

interface Props {
  from: PageStage;
  to: PageStage;
  direction: TransitionDirection;
  phase: TransitionPhase;
}

const labels: Record<PageStage, string> = {
  index: 'orbit',
  projects: 'surface',
  about: 'interior',
  music: 'signal',
};

const PageZoomTransition: React.FC<Props> = ({ from, to, direction, phase }) => {
  if (phase === 'idle') return null;

  const projectTransition = from === 'index' && to === 'projects';
  const projectReturn = from === 'projects' && to === 'index';

  return (
    <Root $phase={phase} $direction={direction} $liquid={projectTransition || projectReturn} aria-hidden="true">
      <Space $show={from === 'index' || to === 'index'} $dim={projectTransition} />
      <Surface
        $show={from === 'projects' || to === 'projects'}
        $phase={phase}
        $returning={projectReturn}
      />
      <Interior $show={from === 'about' || to === 'about'}>
        <Door />
      </Interior>
      <Ring $delay={0} />
      <Ring $delay={90} />
      <Ring $delay={180} />
      <Caption>{direction === 'backward' ? labels[from] : labels[to]}</Caption>
    </Root>
  );
};

export default PageZoomTransition;

const forward = keyframes`
  from { opacity: 0; transform: scale(.7); }
  20% { opacity: 1; }
  to { opacity: 1; transform: scale(4.8); }
`;
const backward = keyframes`
  from { opacity: 1; transform: scale(4.8); }
  80% { opacity: 1; }
  to { opacity: 0; transform: scale(.7); }
`;
const jump = keyframes`
  0% { opacity: 0; transform: scale(.75); }
  42% { opacity: 1; transform: scale(2.15); }
  58% { opacity: 1; transform: scale(2.15); }
  100% { opacity: 0; transform: scale(5); }
`;
const stars = keyframes`
  from { transform: scale(1); opacity: .9; }
  to { transform: scale(2.8); opacity: 0; }
`;
const liquidIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.06);
    filter: blur(28px) saturate(1);
  }

  to {
    opacity: .96;
    transform: scale(1);
    filter: blur(18px) saturate(1.28);
  }
`;
const liquidOut = keyframes`
  from {
    opacity: .96;
    transform: scale(1);
    filter: blur(18px) saturate(1.28);
  }

  to {
    opacity: 0;
    transform: scale(1.08);
    filter: blur(32px) saturate(.95);
  }
`;
const liquidDrift = keyframes`
  0% { background-position: 0% 50%, 100% 40%, 50% 100%, 50% 50%; }
  50% { background-position: 90% 45%, 10% 62%, 55% 15%, 50% 50%; }
  100% { background-position: 0% 50%, 100% 40%, 50% 100%, 50% 50%; }
`;
const enterRoom = keyframes`
  from { transform: perspective(700px) translateZ(-420px) scale(.8); }
  to { transform: perspective(700px) translateZ(140px) scale(1.55); }
`;
const ring = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(.4); }
  28% { opacity: .55; }
  to { opacity: 0; transform: translate(-50%, -50%) scale(5); }
`;
const caption = keyframes`
  0%, 100% { opacity: 0; letter-spacing: .4em; }
  35%, 65% { opacity: .75; letter-spacing: .25em; }
`;

const animationFor = (phase: TransitionPhase, direction: TransitionDirection) => {
  if (direction === 'jump') return css`${jump} 820ms cubic-bezier(.65,0,.2,1) both`;
  if (phase === 'departing') {
    return direction === 'backward'
      ? css`${backward} 430ms cubic-bezier(.55,0,.25,1) both`
      : css`${forward} 430ms cubic-bezier(.55,0,.25,1) both`;
  }
  return direction === 'backward'
    ? css`${forward} 470ms cubic-bezier(.2,.7,.2,1) reverse both`
    : css`${backward} 470ms cubic-bezier(.2,.7,.2,1) reverse both`;
};

const Root = styled.div<{ $phase: TransitionPhase; $direction: TransitionDirection; $liquid: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
  pointer-events: all;
  background: ${({ $liquid, theme }) => ($liquid ? '#000' : theme.c1)};

  &::after {
    content: '';
    position: absolute;
    inset: -20%;
    border-radius: 50%;
    background: radial-gradient(circle, transparent 0 18%, ${({ theme }) => theme.glow} 34%, ${({ theme }) => theme.c3} 49%, ${({ theme }) => theme.c2} 72%, ${({ theme }) => theme.c1} 100%);
    mix-blend-mode: screen;
    opacity: ${({ $liquid }) => ($liquid ? 0 : 1)};
    animation: ${({ $phase, $direction }) => animationFor($phase, $direction)};
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation-duration: 120ms; }
  }
`;

const Space = styled.div<{ $show: boolean; $dim: boolean }>`
  position: absolute;
  inset: -20%;
  opacity: ${({ $show, $dim }) => ($show ? ($dim ? .52 : 1) : 0)};
  background:
    radial-gradient(circle at 12% 18%, ${({ theme }) => theme.c4} 0 1px, transparent 2px),
    radial-gradient(circle at 72% 23%, ${({ theme }) => theme.c3} 0 1px, transparent 2px),
    radial-gradient(circle at 43% 68%, ${({ theme }) => theme.c4} 0 1px, transparent 2px),
    radial-gradient(circle at 87% 81%, ${({ theme }) => theme.c3} 0 1px, transparent 2px);
  background-size: 260px 220px, 340px 280px, 300px 260px, 390px 330px;
  animation: ${stars} 900ms ease-in both;
`;

const Surface = styled.div<{ $show: boolean; $phase: TransitionPhase; $returning: boolean }>`
  position: absolute;
  inset: -12%;
  opacity: ${({ $show }) => ($show ? .96 : 0)};
  background:
    radial-gradient(ellipse at 18% 28%, ${({ theme }) => theme.c3} 0 14%, transparent 34%),
    radial-gradient(ellipse at 78% 36%, ${({ theme }) => theme.c2} 0 12%, transparent 31%),
    radial-gradient(ellipse at 46% 78%, ${({ theme }) => theme.c4} 0 13%, transparent 33%),
    radial-gradient(circle at 50% 50%, ${({ theme }) => theme.c1} 0 22%, #000 76%);
  background-size: 120% 120%, 115% 115%, 130% 130%, 100% 100%;
  mix-blend-mode: screen;
  animation:
    ${({ $phase, $returning }) => (
      $returning || $phase === 'arriving'
        ? css`${liquidOut} 470ms cubic-bezier(.2,.7,.2,1) both`
        : css`${liquidIn} 430ms cubic-bezier(.55,0,.25,1) both`
    )},
    ${liquidDrift} 5200ms ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 120ms, 1ms;
  }
`;

const Interior = styled.div<{ $show: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $show }) => ($show ? .9 : 0)};
  transform-style: preserve-3d;
  animation: ${enterRoom} 900ms cubic-bezier(.55,0,.2,1) both;
`;

const Door = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(42vw, 520px);
  height: min(62vh, 620px);
  border: 3px solid ${({ theme }) => theme.c3};
  background: linear-gradient(180deg, ${({ theme }) => theme.c2}, ${({ theme }) => theme.c1});
  box-shadow: 0 0 24px ${({ theme }) => theme.glow}, inset 0 0 40px ${({ theme }) => theme.glow};
  transform: translate(-50%, -50%);
`;

const Ring = styled.span<{ $delay: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18vmin;
  height: 18vmin;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 50%;
  box-shadow: 0 0 20px ${({ theme }) => theme.glow};
  animation: ${ring} 760ms cubic-bezier(.55,0,.2,1) both;
  animation-delay: ${({ $delay }) => `${$delay}ms`};
`;

const Caption = styled.span`
  position: absolute;
  left: 50%;
  bottom: 10%;
  z-index: 2;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", monospace;
  font-size: .66rem;
  text-transform: uppercase;
  white-space: nowrap;
  animation: ${caption} 820ms ease both;
`;
