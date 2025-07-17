import styled from 'styled-components';
import { useTheme } from './Theme/ThemeContext';
import React from 'react';

interface HeaderProps {
  activeComponent: 'index' | 'projects' | 'about' | 'music';
  setActiveComponent: (component: 'index' | 'projects' | 'about' | 'music') => void;
}

const Header: React.FC<HeaderProps> = ({ activeComponent, setActiveComponent }) => {
  const { theme, switchTheme } = useTheme();

  const handleThemeToggle = () => {
    switchTheme(theme.mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <HeaderContainer>
      <VinylContainer>
        <Vinyl onClick={() => setActiveComponent('index')} style={{ zIndex: 10 }} color={activeComponent === 'index' ? theme.c3 : theme.c1}>
          <VinylImage src="/Header/vinyl.png" alt="Home Vinyl" />
          <VinylText>home</VinylText>
        </Vinyl>
        
        <Vinyl onClick={() => setActiveComponent('projects')} style={{ zIndex: 8 }} color={activeComponent === 'projects' ? theme.c3 : theme.c1}>
          <VinylImage src="/Header/vinyl.png" alt="Projects Vinyl" />
          <VinylText>projects</VinylText>
        </Vinyl>
        <Vinyl onClick={() => setActiveComponent('about')} style={{ zIndex: 7 }} color={activeComponent === 'about' ? theme.c3 : theme.c1}>
          <VinylImage src="/Header/vinyl.png" alt="About Vinyl" />
          <VinylText>explore</VinylText>
        </Vinyl>
        <Vinyl onClick={() => setActiveComponent('music')} style={{ zIndex: 6 }} color={activeComponent === 'music' ? theme.c3 : theme.c1}>
          <VinylImage src="/Header/vinyl.png" alt="Music Vinyl" />
          <VinylText>music</VinylText>
        </Vinyl>
        <Vinyl onClick={handleThemeToggle} style={{ zIndex: 1}} color={theme.c1}>
          <VinylImage src="/Header/vinyl.png" alt="Theme Vinyl" />
          <VinylText>{theme.mode === 'light' ? 'light' : theme.mode === 'dark' ? 'dark' : 'custom'}</VinylText>
        </Vinyl>
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

const VinylContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 20px;
  z-index: 100;

  @media (max-width: 550px) {
    padding-left: 0px;
    transform: translateY(-10%);
  }
`;

const VinylImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.6s ease;
  transform: rotate(-15deg);

  @media (max-width: 550px) {
    width: 100px;
    height: 100px;
  }
`;

const VinylText = styled.span`
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translate(-40%, 0%);
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.c4};
  transition: transform 0.6s ease;

  @media (max-width: 550px) {
    font-size: 9px;
    transform: translateX(-45%);
`;

const Vinyl = styled.div<{ color: string }>`
  width: 146px;
  height: 146px;
  position: relative;
  cursor: pointer;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  transition: transform 0.6s ease;
  margin-right: -45px;
  transform: translate(-23px);

  @media (max-width: 550px) {
    width: 96px;
    height: 96px;
    margin-right: -30px;
    transform: translate(0%, 50%);
    padding-right: 5px;
  }

  &:hover > ${VinylImage} {
    transform: rotate(280deg);
    transform-origin: center center;
    transition: transform 0.6s ease;
  }

  &:hover > ${VinylText} {
    font-size: 14px;
    transition: font-size 0.2s ease-in-out;

    @media (max-width: 550px) {
      font-size: 10px;
      transition: font-size 0.2s ease-in-out;
    }
  }
`;
