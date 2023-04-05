import React, { FC } from 'react';
import { ButtonWrapper } from './Button.styled';

interface ButtonProps {
   children: React.ReactNode;
   bgColor1?: string;
   bgColor2?: string;
   color?: string;
   type?: "submit" | 'button';
   width?: string;
}

const Button: FC<ButtonProps> = ({ children, bgColor1, bgColor2, color, type, width }) => (
 <ButtonWrapper bgColor1={bgColor1} bgColor2={bgColor2} width={width}>
      <button color={color} type={type}>
         {children}
      </button>
 </ButtonWrapper>
);

export default Button;
