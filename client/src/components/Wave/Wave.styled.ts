import styled from 'styled-components';

export const WaveWrapper = styled.div`
    position:relative;
    text-align:center;
    background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
    color:white;
    margin-bottom: 1em;
`;

export const Header = styled.div`
    width: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    width: 100%;
`;

export const Left = styled.div`
    padding: 0 0 0 10em;
    text-align: left;

    & button {
        text-align: center;
    }
`;

export const Right = styled.div`
`;