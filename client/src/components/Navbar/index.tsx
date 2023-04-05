import React, { FC } from 'react';
import { Logo, NavbarContainer } from './Navbar.styled';

interface NavbarProps {
   children: React.ReactNode;
   background?: string;
}

const Navbar: FC<NavbarProps> = ({ children, background }) => (
   <NavbarContainer background={ background }>
      <Logo src="/vite.svg" alt="Logo" />
      <ul>
         { children }
      </ul>
  </NavbarContainer>
);

export default Navbar;
