import React from 'react';
import styled from 'styled-components';
import { useTheme } from './Theme/ThemeContext';
import VinylRecord from './VinylRecord';

type ComponentName = 'index' | 'projects' | 'about' | 'music';

interface HeaderProps {
  activeComponent: ComponentName;
  setActiveComponent: (component: ComponentName) => void;
}

const Header: React.FC<HeaderProps> = ({ activeComponent, setActiveComponent }) => {
  const { theme, switchTheme } = useTheme();

  const handleThemeToggle = () => {
    switchTheme(theme.mode === 'dark' ? 'light' : 'dark');
  };

  const themeActionLabel = theme.mode === 'dark'
    ? 'Switch to light theme'
    : 'Switch to dark theme';

  const renderNavigationVinyl = (
    component: ComponentName,
    label: string,
    zIndex: number,
  ) => {
    const isActive = activeComponent === component;

    return (
      <VinylButton
        type="button"
        $zIndex={zIndex}
        onClick={() => setActiveComponent(component)}
        aria-label={`Open ${label} page`}
        aria-current={isActive ? 'page' : undefined}
      >
        <VinylGraphic
          accentColor={isActive ? theme.c3 : theme.c1}
          active={isActive}
        />
        <VinylText>{label}</VinylText>
      </VinylButton>
    );
  };

  return (
    <HeaderContainer>
      <VinylContainer aria-label="Primary navigation">
        {renderNavigationVinyl('index', 'home', 10)}
        {renderNavigationVinyl('projects', 'projects', 8)}
        {renderNavigationVinyl('about', 'explore', 7)}
        {renderNavigationVinyl('music', 'music', 6)}

        <VinylButton
          type="button"
          $zIndex={1}
          onClick={handleThemeToggle}
          aria-label={themeActionLabel}
        >
          <VinylGraphic accentColor={theme.c1} />
          <VinylText>
            {theme.mode === 'light' ? 'light' : theme.mode === 'dark' ? 'dark' : 'custom'}
          </VinylText>
        </VinylButton>
      </VinylContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  z-index: 100;
  top: -105px;
  -webkit-user-drag: none;
`;

const VinylContainer = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 20px;
  z-index: 100;

  @media (max-width: 550px) {
    padding-left: 0;
    transform: translateY(-10%);
  }
`;

const VinylGraphic = styled(VinylRecord)`
  display: block;
  width: 150px;
  height: 150px;
  overflow: visible;
  transition: transform 0.75s cubic-bezier(0.2, 0.7, 0.2, 1);
  transform: rotate(-15deg);
  transform-origin: center;
  will-change: transform;

  @media (max-width: 550px) {
    width: 100px;
    height: 100px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

const VinylText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 38%;
  transform: translate(-50%, -50%);
  font-family: "DM Mono", monospace;
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  text-align: center;
  color: ${({ theme }) => theme.c4};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.55);
  pointer-events: none;
  transition: font-size 0.2s ease-in-out;

  @media (max-width: 550px) {
    font-size: 7px;
  }
`;

const VinylButton = styled.button<{ $zIndex: number }>`
  appearance: none;
  width: 146px;
  height: 146px;
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  flex: 0 0 auto;
  margin: 0 -45px 0 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transform: translateX(-23px);

  @media (max-width: 550px) {
    width: 96px;
    height: 96px;
    margin-right: -30px;
    padding-right: 5px;
    transform: translateY(50%);
  }

  &:hover > ${VinylGraphic},
  &:focus-visible > ${VinylGraphic} {
    transform: rotate(300deg);
  }

  &:hover > ${VinylText},
  &:focus-visible > ${VinylText} {
    font-size: 12px;

    @media (max-width: 550px) {
      font-size: 8px;
    }
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.c4};
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover > ${VinylGraphic},
    &:focus-visible > ${VinylGraphic} {
      transform: rotate(-15deg);
    }
  }
`;
