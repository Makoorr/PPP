import React, { FC } from 'react';
import { ButtonWrapper } from './Button.styled';

interface ButtonProps {
   children: React.ReactNode;
   bgColor1?: string;
   bgColor2?: string;
   color?: string;
   type?: "submit" | 'button';
}

const Button: FC<ButtonProps> = ({ children, bgColor1, bgColor2, color, type }) => (
 <ButtonWrapper bgColor1={bgColor1} bgColor2={bgColor2}>
      <button color={color} type={type}>
         {children}
      </button>
 </ButtonWrapper>
);

export default Button;
