import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 10em;
  height: 4em;
  background-color: #f2f2f250;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const NavLinks = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  margin-top: 0.5rem;
`;

export const NavItem = styled.li`
  padding: 1rem;
  transition: 0.6s ease-in-out;
  &:hover{
    scale: 1.1;
  }
`;

export const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  &:hover {
    color: brown;
  }
`;
