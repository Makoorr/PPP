import React, { FC } from 'react';
import { SideNavbarWrapper } from './SideNavbar.styled';

interface SideNavbarProps {
   children : React.ReactNode;
}

const SideNavbar: FC<SideNavbarProps> = ({ children }) => {
   return (
      <SideNavbarWrapper>
         { children }
      </SideNavbarWrapper>
   );
}

export default SideNavbar;