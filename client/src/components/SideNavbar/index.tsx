import React, { FC } from 'react';
import { SideNavbarWrapper } from './SideNavbar.styled';

interface SideNavbarProps {
   id : number;
}

const SideNavbar: FC<SideNavbarProps> = ({ id }) => {
   // get projects from user with his id
   return ( 
      <SideNavbarWrapper>
         <li>SideNavbar</li>
      </SideNavbarWrapper>
   );
}

export default SideNavbar;