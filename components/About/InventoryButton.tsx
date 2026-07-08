import React from 'react';
import styled from 'styled-components';

interface InventoryButtonProps {
  onClick: () => void;
  isInventoryOpen: boolean;
}

const InventoryButton: React.FC<InventoryButtonProps> = ({ onClick, isInventoryOpen }) => {
  return (
    <Nav expanded={true} collapsed={false}>
      {/* <HamburgerButton onClick={toggleMenu}>
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
      </HamburgerButton> */}
      <Menu>
        <MenuItem>
          <MenuLink as="button" type="button" onClick={() => isInventoryOpen && onClick()}>
            Room
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink as="button" type="button" onClick={() => !isInventoryOpen && onClick()}>Create</MenuLink>
        </MenuItem>
      </Menu>
    </Nav>
  );
};

export default InventoryButton;

const Nav = styled.div<{ expanded: boolean; collapsed: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ expanded, collapsed }) => (expanded ? '300px' : collapsed ? '80px' : '80px')};
  height: 80px;
  background-color: ${({theme}) => theme.c2};
  border-radius: 50px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: width 0.5s ease-in-out;
`;

// const HamburgerButton = styled.div`
//   width: 40px;
//   height: 40px;
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   z-index: 101;
// `;

// const Span = styled.span`
//   position: absolute;
//   width: 30px;
//   height: 4px;
//   border-radius: 50px;
//   transition: all 0.5s ease-in-out;
// `;

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
  appearance: none;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  text-decoration: none;
  color: ${({theme}) => theme.c1};
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 500;
  
  font-size: 20px;
  transition: color 0.5s;

  &:hover {
    color: ${({theme}) => theme.c3};
  }
`;
