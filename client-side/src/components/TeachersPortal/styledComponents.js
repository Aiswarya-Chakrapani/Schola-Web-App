import styled from "styled-components"

export const TeacherPortalMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const TeacherPortalPageBody = styled.div`
    height: calc(100vh - 100px);
    width: 100%;
    border-style: solid;
    border-width: 2px;
    overflow: scroll;
`

export const TeacherArrayList = styled.ul`
    flex-grow: 1;
    height: calc(100vh - 250px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    align-items: center;
    justify-content: flex-start;
    height: auto;
`