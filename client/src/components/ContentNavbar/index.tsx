import React, { FC } from 'react';
import { ContentNavbarWrapper } from './ContentNavbar.styled';

interface ContentNavbarProps {
   header?: React.ReactNode;
   children?: React.ReactNode;
}

const ContentNavbar: FC<ContentNavbarProps> = ({ children, header }) => (
 <ContentNavbarWrapper>
   <div>
      {header}
   </div>
   <hr style={{ marginTop: 0 }}></hr>
   <div>
      {children}
   </div>
 </ContentNavbarWrapper>
);

export default ContentNavbar;