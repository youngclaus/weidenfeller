import styled from 'styled-components';

const Header = ({ toggleTheme, currentTheme }) => {
  return (
    <HeaderContainer>
      <Nav>
        <NavItem href="#home">Home</NavItem>
        <NavItem href="#about">About</NavItem>
        <NavItem href="#projects">Projects</NavItem>
      </Nav>
      <ThemeToggleContainer>
          <ThemeToggleSwitch onClick={toggleTheme}>
              <ThemeToggleSlider theme={currentTheme.mode}>
                {currentTheme.mode === 'light' ? '🔆' : currentTheme.mode === 'dark' ? '🌙' : '🔆 🌙'}
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
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
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
    color: #ecdcc6;
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

