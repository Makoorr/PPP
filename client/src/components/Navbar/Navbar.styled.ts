import styled from 'styled-components';

export const NavbarContainer = styled.nav<{ background?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 10em;
  height: 4em;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1em;
  ${({ background }) => background && `
    background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);;
  `}
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
  color: #fff;
  text-decoration: none;
  &:hover {
    color: rgb(39 55 159);
  }
`;
