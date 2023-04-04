import React, { FC } from 'react';
import { Logo, NavbarContainer, NavItem, NavLinks, NavLink } from './Navbar.styled';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => (
   <NavbarContainer>
      <Logo src="/vite.svg" alt="Logo" />
      <NavLinks>
         <NavItem>
            <NavLink href="/">Home</NavLink>
         </NavItem>
         <NavItem>
            <NavLink href="/login">Login</NavLink>
         </NavItem>
         <NavItem>
            <NavLink href="/register">Register</NavLink>
         </NavItem>
      </NavLinks>
  </NavbarContainer>
);

export default Navbar;
