import React, { FC } from 'react';
import { CardWrapper } from './Card.styled';

interface CardProps {
   children: React.ReactNode;
   bgColor?: string;
   color?: string;
}

const Card: FC<CardProps> = ({ children, bgColor, color }) => (
 <CardWrapper bgColor={bgColor} color={color}>
    {children}
 </CardWrapper>
);

export default Card;