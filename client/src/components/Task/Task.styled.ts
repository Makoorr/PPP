import styled from 'styled-components';

export const TaskWrapper = styled.li`
    margin: 1em;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
    border-color: #000;
    list-style: none;
`;

export const TaskContent = styled.div`
    border-left: 3px solid #38c3d5;
    padding: 10px;
    cursor: pointer;
`;

export const TaskName = styled.h5`
    font-weight: 400;
    font-size: 2rem;
    margin: 0;
    padding: 0;
`;

export const TaskDescription = styled.h2`
    margin: 0.3em 0.5em;
    padding: 0.2em;
    line-height: 18px;
    font-size: 1.3rem;
    color: #848691;
    max-height: 38px;
    overflow: hidden;
`;
