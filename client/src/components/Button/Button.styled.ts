import styled from 'styled-components';

export const ButtonWrapper = styled.div<{ bgColor1?: string, bgColor2?: string, color?: string, width?: string }>`
    & button {
        border-radius: 50px;
        color: white;
        border: none;
        font-family: 'Poppins', sans-serif;
        font-size: 18px !important;
        font-weight: 300 !important;
        padding: 10px 20px;
        cursor: pointer;
        width: $({width}) || 100%;
        margin: auto;
        transition: 0.6s ease-in-out;
        background: linear-gradient(
            ${(props) => props.bgColor1 || "blue"} 20%, ${(props) => props.bgColor2 || "darkblue"}
            );

        &:hover {
            background: linear-gradient(
                ${(props) => props.bgColor1 || "blue"}, ${(props) => props.bgColor2 || "darkblue"} 90%
            );
        }
    }
`;
