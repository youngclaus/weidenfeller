import styled, { keyframes, css } from 'styled-components';
import { useState } from 'react';
import { useTheme } from '../components/ThemeContext.js';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [showContact, setShowContact] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);


  const handleContactClick = () => {
    if (showContact) {
      setIsFlipping(true);
      setTimeout(() => {
        setShowContact(false);
        setIsFlipping(false);
      }, 500); // Duration of the flipOut animation
    } else {
      setShowContact(true);
    }
  };

  return (
    <HeaderContainer>
      <Nav>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <ContactNavItem onClick={handleContactClick}>Contact</ContactNavItem>
        {showContact && (
        <ContactInfo isFlipping={isFlipping}>
          <span>chrisyoungclaus19@gmail.com</span>
          <span>201-615-9109</span>
        </ContactInfo>
      )}
      </Nav>
      
      <ThemeToggleContainer>
          <ThemeToggleSwitch onClick={toggleTheme}>
              <ThemeToggleSlider theme={theme.mode}>
                {theme.mode === 'light' ? '🔆' : theme.mode === 'dark' ? '🌙' : '🔆 🌙'}
              </ThemeToggleSlider>
          </ThemeToggleSwitch>
      </ThemeToggleContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  width: 100vw;
  height: 60px;
  background-color: ${({ theme }) => theme.headerBg};
  color: ${({ theme }) => theme.headerText};
  position: fixed;
  font-family: "Edu AU VIC WA NT Hand", cursive;
  font-weight: 450;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 50px;
`;

const NavItem = styled.a`
  display: flex;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  &:hover {
    transform: scale(1.2);
    font-weight: bold;
  }
`;

const ContactNavItem = styled(NavItem)`
  @media (max-width: 800px) {
    display: none; /* Hide the Contact button when the screen is too small */
  }
`;

const flipIn = keyframes`
  from {
    transform: rotateX(90deg); /* Start with a 90-degree flip */
    opacity: 0; /* Start with opacity 0 */
  }
  to {
    transform: rotateX(0deg); /* End with no rotation */
    opacity: 1; /* End with full opacity */
  }
`;

const flipOut = keyframes`
  from {
    transform: rotateX(0deg); /* Start with no rotation */
    opacity: 1; /* Start with full opacity */
  }
  to {
    transform: rotateX(90deg); /* End with a 90-degree flip */
    opacity: 0; /* End with opacity 0 */
  }
`

const ContactInfo = styled.div`
  display: flex;
  position: inherit;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
  flex-direction: column;
  white-space: nowrap;
  font-size: 1vw;
  ${({ isFlipping }) =>
    isFlipping
      ? css`
          animation: ${flipOut} 0.5s ease-out;
        `
      : css`
          animation: ${flipIn} 0.5s ease-out;
        `}

  @media (max-width: 800px) {
    display: none; /* Hide the contact info when the screen is too small */
  }
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  margin-right: 80px;
  background-color: ${({ theme }) => theme.buttonBg};
  border-radius: 50px;
  cursor: pointer;
`;

const ThemeToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ theme }) => (theme === 'light' ? '4px' : theme === 'dark' ? '30px' : '17px')};
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.buttonBg};
  transition: left 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  white-space: nowrap;
`;

