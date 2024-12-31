import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../Theme/ThemeContext';

interface InventoryButtonProps {
  onClick: () => void;
  isInventoryOpen: boolean;
  setActiveComponent: (component: 'index' | 'projects' | 'about' | 'music') => void;
}

const InventoryButton: React.FC<InventoryButtonProps> = ({ onClick, isInventoryOpen, setActiveComponent }) => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Collapse navbar when inventory is open
  useEffect(() => {
    if (isInventoryOpen) {
      setMenuOpen(false); // Force close the menu when inventory opens
    }
  }, [isInventoryOpen]);

  const toggleMenu = () => {
    if (isInventoryOpen) {
      onClick();
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  return (
    <Nav expanded={menuOpen && !isInventoryOpen} collapsed={isInventoryOpen}>
      <HamburgerButton onClick={toggleMenu}>
        <Span
          style={{
            backgroundColor: theme.c3,
            transform: menuOpen || isInventoryOpen ? 'rotate(45deg)' : 'translateY(-6px)',
          }}
        />
        <Span
          style={{
            backgroundColor: theme.c3,
            transform: menuOpen || isInventoryOpen ? 'rotate(-45deg)' : 'translateY(6px)',
          }}
        />
      </HamburgerButton>
      {!isInventoryOpen && menuOpen && (
        <Menu>
          <MenuItem>
            <MenuLink onClick={onClick}>Create</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink onClick={() => setActiveComponent('music')}>Earn</MenuLink>
          </MenuItem>
        </Menu>
      )}
    </Nav>
  );
};

export default InventoryButton;

const Nav = styled.div<{ expanded: boolean; collapsed: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  transform: translate(-50%);
  align-items: center;
  width: ${({ expanded, collapsed }) => (expanded ? '300px' : collapsed ? '80px' : '80px')};
  height: 80px;
  background-color: ${({theme}) => theme.c1};
  border-radius: 50px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: width 0.5s ease-in-out;
`;

const HamburgerButton = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 101;
`;

const Span = styled.span`
  position: absolute;
  width: 30px;
  height: 4px;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  z-index: 100;
`;

const MenuItem = styled.div`
  list-style: none;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.c4};
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 500;
  
  font-size: 20px;
  transition: color 0.5s;

  &:hover {
    color: ${({theme}) => theme.c3};
  }
`;
