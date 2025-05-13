import styled from "styled-components"

export const DoubtsPanelMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const DoubtsPanelPageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    justify-content: space-between;
`

export const DoubtsPageSubPart1 = styled.div`
    height: 100%;
    width: 49.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const DoubtsPageSubPart2 = styled.div`
    height: 100%;
    width: 49.5%;
    border-style: solid;
    border-color: 2px;
`

export const DoubtsPageFirstHalfParts = styled.div`
    height: 49%;
    width: 100%;
    border-style: solid;
    border-color: black;
    border-width: 2px;
    padding: 14px;
    display: flex;
    flex-direction: column;
`

export const DoubtsPanelH1 = styled.h1`
    font-family: "Ubuntu", sans-serif;
    font-size: 22px;
    margin-bottom: 8px;
`

export const DoubtsPanelp = styled.p`
    font-family: "Ubuntu", sans-serif;
    font-size: 19px;
    margin-bottom: 12px;
`

export const DoubtSubmitBtn = styled.button`
    height: 60px;
    width: 100px;
    border-style: solid;
    background-color: black;
    color: white;
    margin-top: 14px;
    cursor: pointer;
    border-radius: 5px;
`