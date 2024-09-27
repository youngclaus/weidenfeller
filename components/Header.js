import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext.js';

const Header = () => {
  const { theme, switchTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleThemeToggle = () => {
    switchTheme(theme.mode === 'light' ? 'dark' : 'light');
  };

  return (
    <HeaderContainer>
      <VinylContainer>
        <Vinyl href="/" style={{ zIndex: 10 }} color={currentPath === '/' ? theme.c3 : theme.c2}>
          <VinylImage src="/Header/vinyl.png" alt="Home Vinyl" />
          <VinylText>home</VinylText>
        </Vinyl>
        {/*
        <Vinyl href="/about" style={{ zIndex: 9 }} color={currentPath === '/about' ? theme.c3 : theme.c2}>
          <VinylImage src="/Header/vinyl.png" alt="About Vinyl" />
          <VinylText>about</VinylText>
        </Vinyl>
        */}
        <Vinyl href="/projects" style={{ zIndex: 8 }} color={currentPath === '/projects' ? theme.c3 : theme.c2}>
          <VinylImage src="/Header/vinyl.png" alt="Projects Vinyl" />
          <VinylText>projects</VinylText>
        </Vinyl>
        {/*
        <Vinyl href="/music" style={{ zIndex: 7 }} color={currentPath === '/music' ? theme.c3 : theme.c2}>
          <VinylImage src="/Header/vinyl.png" alt="Music Vinyl" />
          <VinylText>music</VinylText>
        </Vinyl>
        */}
      </VinylContainer>
      

      <VinylMode onClick={handleThemeToggle} style={{ zIndex: 6}} color={theme.c2}>
          <VinylImage src="/Header/vinyl.png" alt="Music Vinyl" />
          <VinylText>{theme.mode === 'light' ? 'light' : theme.mode === 'dark' ? 'dark' : 'custom'}</VinylText>
      </VinylMode>
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
  padding-left: 10px;

  @media (max-width: 950px) {
    left: 50vw;
    transform: translateX(-63%);
    z-index: 100;
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
`;

const Vinyl = styled.a`
  width: 146px;
  height: 146px;
  position: relative;
  cursor: pointer;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  transition: transform 0.6s ease;
  margin-right: -45px;

  &:hover > ${VinylImage} {
    transform: rotate(280deg);
    transform-origin: center center;
    transition: transform 0.6s ease;
  }
`;

const VinylMode = styled.a`
  width: 146px;
  height: 146px;
  right: 25px;
  position: absolute;
  display: block;
  cursor: pointer;
  transition: transform 0.6s ease;
  background-color: ${({ color }) => color};
  
  border-radius: 50%;

  @media (max-width: 950px) {
    left: 50vw;
    top: 35px;
    transform: translateX(-50%);
  }

  &:hover > ${VinylImage} {
    transform: rotate(280deg);
    transform-origin: center center;
    transition: transform 0.6s ease;
  }
`