import styled from 'styled-components';

export const ButtonWrapper = styled.div<{ bgColor1?: string, bgColor2?: string, color?: string }>`
    & button {
        border-radius: 50px;
        color: white;
        border: none;
        font-family: 'Roboto', sans-serif;
        font-size: 18px !important;
        font-weight: 300 !important;
        padding: 10px 20px;
        cursor: pointer;
        width: 100%;
        margin: auto;
        transition: 0.6s ease-in-out;
        background: linear-gradient(
            ${(props) => props.bgColor1 || "red"} 20%, ${(props) => props.bgColor2 || "brown"}
            );

        &:hover {
            background: linear-gradient(
                ${(props) => props.bgColor1 || "red"}, ${(props) => props.bgColor2 || "brown"} 90%
            );
        }
    }
`;
