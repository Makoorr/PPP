import React, { FC } from 'react';
import { Logo, NavbarContainer } from './Navbar.styled';
import { Link } from 'react-router-dom';

interface NavbarProps {
   background?: string;
}

const Navbar: FC<NavbarProps> = ({ background }) => {
   const isAuthenticated = localStorage.getItem('token') !== null;
   return (
      <NavbarContainer background={ background }>
         <Link to="/"><Logo src="/vite.svg" alt="Logo" /></Link>
         <ul>
            {
               isAuthenticated ? (
                  <>
                     <li>
                        <a href="/">Home</a>
                     </li>
                     <li>
                        <a href="/projects">Projects</a>
                     </li>
                     <li>
                        <a href="/logout">Logout</a>
                     </li>
                  </>
               ) : (
                  <>
                     <li>
                     <a href="/">Home</a>
                     </li>
                     <li>
                     <a href="/login">Login</a>
                     </li>
                     <li>
                     <a href="/register">Register</a>
                     </li>
                  </>
               )
            }
         </ul>
      </NavbarContainer>
   );
};

export default Navbar;