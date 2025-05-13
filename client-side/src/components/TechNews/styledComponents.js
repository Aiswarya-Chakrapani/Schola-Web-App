import styled from "styled-components"

export const TechNewsMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const TechNewsPageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    flex-direction: column;
`

export const TechNewsList = styled.ul`
    flex-grow: 1;
    height: calc(100vh - 250px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    align-items: center;
`