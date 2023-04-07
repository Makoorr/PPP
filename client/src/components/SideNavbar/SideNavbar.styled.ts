import styled from 'styled-components';

export const SideNavbarWrapper = styled.div`
    height: -webkit-fill-available;
    width: 20em;
    position: absolute;
    top: 0;
    left: 0;
    background: #00000010;
    overflow-x: hidden;
    padding-top: 6em;

    & ul,li,a {
    margin: 6px 32px 6px 32px;
    padding: 0 0.5em;
    text-decoration: none;
    font-size: 25px;
    color: #1f1f1f;
    display: block;
    border-radius: 0.5em;
    }

    & a:hover {
        background: #00000010;
        cursor: pointer;
    }
`;
