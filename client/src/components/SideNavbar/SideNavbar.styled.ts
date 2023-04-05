import styled from 'styled-components';

export const SideNavbarWrapper = styled.div`
    height: 100%;
    width: 15em;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    background: #00000010;
    overflow-x: hidden;
    margin-top: 4em;
    padding-top: 1em;

    & a {
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #1f1f1f;
    display: block;
    }

    & a:hover {
        color: rgb(39 55 159);
    }
`;
