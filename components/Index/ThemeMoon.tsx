import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../Theme/ThemeContext';
import { getThemeGlowFilter } from '../Theme/exploreGlow';

const ThemeMoon: React.FC = () => {
  const { theme, switchTheme } = useTheme();
  const currentMode = theme.mode === 'light'
    ? 'light theme'
    : theme.mode === 'dark'
      ? 'dark theme'
      : 'custom theme';
  const nextTheme = theme.mode === 'dark' ? 'light' : 'dark';

  return (
    <MoonButton
      type="button"
      onClick={() => switchTheme(nextTheme)}
      aria-label={`${currentMode}. Switch to ${nextTheme} theme`}
    >
      <Moon aria-hidden="true" />
      <MoonLabel>{currentMode}</MoonLabel>
    </MoonButton>
  );
};

export default ThemeMoon;

const MoonButton = styled.button`
  appearance: none;
  position: absolute;
  right: clamp(22px, 4vw, 44px);
  top: clamp(22px, 4vw, 44px);
  z-index: 4;
  width: 72px;
  height: 72px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;

  &:focus-visible {
    outline: 1px dashed ${({ theme }) => theme.c3};
    outline-offset: 2px;
  }

  @media (max-width: 699px) {
    right: 16px;
    top: 82px;
    width: 62px;
    height: 62px;
  }
`;

const Moon = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 34%, rgba(255, 255, 255, 0.18) 0 8%, transparent 9%),
    radial-gradient(circle at 66% 30%, rgba(0, 0, 0, 0.13) 0 7%, transparent 8%),
    radial-gradient(circle at 42% 68%, rgba(0, 0, 0, 0.12) 0 10%, transparent 11%),
    ${({ theme }) => theme.c3};
  box-shadow: inset -5px -4px 7px rgba(0, 0, 0, 0.32);
  filter: ${({ theme }) => getThemeGlowFilter(theme.glow, 8)};
  -webkit-mask-image: radial-gradient(circle at 72% 42%, transparent 0 44%, #000 46%);
  mask-image: radial-gradient(circle at 72% 42%, transparent 0 44%, #000 46%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  transform: translate(-50%, -50%);
  transition: filter 150ms ease;
  pointer-events: none;

  ${MoonButton}:hover &,
  ${MoonButton}:focus-visible & {
    filter: ${({ theme }) => getThemeGlowFilter(theme.glow, 20)};
  }

  @media (max-width: 699px) {
    width: 20px;
    height: 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const MoonLabel = styled.span`
  position: absolute;
  right: 50%;
  top: calc(100% + 2px);
  width: max-content;
  max-width: 160px;
  padding: 5px 7px;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 4px;
  background: ${({ theme }) => theme.c2};
  color: ${({ theme }) => theme.c4};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
  font-family: "DM Mono", monospace;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  opacity: 0;
  transform: translate(12px, -4px);
  transition: opacity 150ms ease, transform 150ms ease;
  pointer-events: none;

  ${MoonButton}:hover &,
  ${MoonButton}:focus-visible & {
    opacity: 1;
    transform: translate(12px, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
