import React, { FC } from 'react';
import { CardWrapper } from './Card.styled';

interface CardProps {
   children: React.ReactNode;
}

const Card: FC<CardProps> = ({ children }) => (
 <CardWrapper>
    {children}
 </CardWrapper>
);

export default Card;