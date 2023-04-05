import React, { FC } from 'react';
import { AddButtonWrapper } from './AddButton.styled';

interface AddButtonProps {
   children: React.ReactNode;
   svg?: React.ReactNode;
   onclick?: () => void;
}

const AddButton: FC<AddButtonProps> = ({ children, svg, onclick }) => (
 <AddButtonWrapper onClick={ onclick }>
    <span>{ svg }</span>
    <span>{ children }</span>
 </AddButtonWrapper>
);

export default AddButton;