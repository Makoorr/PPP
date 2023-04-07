import React, { FC } from 'react';
import { ContentNavbarContainer, ContentNavbarHeader, ContentNavbarWrapper } from './ContentNavbar.styled';

interface ContentNavbarProps {
   header?: React.ReactNode;
   children?: React.ReactNode;
}

const ContentNavbar: FC<ContentNavbarProps> = ({ children, header }) => (
 <ContentNavbarWrapper>
   <ContentNavbarHeader>
      {header}
   </ContentNavbarHeader>
   <hr></hr>
   <ContentNavbarContainer>
      {children}
   </ContentNavbarContainer>
 </ContentNavbarWrapper>
);

export default ContentNavbar;