import styled from 'styled-components';

export const CardWrapper = styled.div<{ bgColor?: string, color?: string }>`
    display: flex;
    flex-direction: column;
    width: fit-content;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    background-color: ${(props) => props.bgColor || "#fff"};
    color: ${(props) => props.color || "#000"};
    gap: 0.5em;
`;