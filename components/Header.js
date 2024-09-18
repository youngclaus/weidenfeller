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
        <Vinyl href="/" style={{ zIndex: 10 }}>
          <VinylImage src="/Header/vinyl.png" alt="Home Vinyl" color={currentPath === '/' ? theme.c3 : theme.c2}/>
          <VinylText>home</VinylText>
        </Vinyl>
        <Vinyl href="/about" style={{ zIndex: 9 }}>
          <VinylImage src="/Header/vinyl.png" alt="About Vinyl" color={currentPath === '/about' ? theme.c3 : theme.c2}/>
          <VinylText>about</VinylText>
        </Vinyl>
        <Vinyl href="/projects" style={{ zIndex: 8 }}>
          <VinylImage src="/Header/vinyl.png" alt="Projects Vinyl" color={currentPath === '/projects' ? theme.c3 : theme.c2}/>
          <VinylText>projects</VinylText>
        </Vinyl>
        <Vinyl href="/music" style={{ zIndex: 7 }}>
          <VinylImage src="/Header/vinyl.png" alt="Music Vinyl" color={currentPath === '/music' ? theme.c3 : theme.c2}/>
          <VinylText>music</VinylText>
        </Vinyl>
      </VinylContainer>

      <VinylMode onClick={handleThemeToggle} style={{ zIndex: 6}}>
          <VinylImage src="/Header/vinyl.png" alt="Music Vinyl" color={theme.c2}/>
          <VinylText>{theme.mode === 'light' ? 'light' : theme.mode === 'dark' ? 'dark' : 'custom'}</VinylText>
      </VinylMode>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  position: fixed;
  width: 100vw;
  z-index: 100;
  top: -105px;
`;

const VinylContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const VinylImage = styled.img`
  width: 150px;
  height: 150px;
  background-color: ${({ color }) => color};
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
  transform: translate(-45%, -50%);
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.c4};
  transition: transform 0.6s ease;
`;

const Vinyl = styled.a`
  width: 150px;
  height: 150px;
  position: relative;
  display: block;
  cursor: pointer;
  transition: transform 0.6s ease;
  margin-right: -55px;

  &:hover > ${VinylImage} {
    transform: rotate(280deg);
    transform-origin: center center;
    transition: transform 0.6s ease;
  }

  @supports (-webkit-touch-callout: none) {
    width: 10vw;
    height: auto;
    position: relative;
    display: block;
    cursor: pointer;
    transition: transform 0.6s ease;
    margin-right: -55px;
  }
`;

const VinylMode = styled.a`
  width: 150px;
  height: 150px;
  right: 25px;
  position: absolute;
  display: block;
  cursor: pointer;
  transition: transform 0.6s ease;

  @media (max-width: 550px) {
    left: 50vw;
    top: 40px;
    transform: translateX(-50%);
  }

  &:hover > ${VinylImage} {
    transform: rotate(280deg);
    transform-origin: center center;
    transition: transform 0.6s ease;
  }
`