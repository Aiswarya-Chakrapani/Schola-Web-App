import styled from "styled-components"

export const ProfileMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const ProfilePageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
`

export const ProfileTabsBlock = styled.div`
    height: 100%;
    width: 24%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
`

export const ProfileTab = styled.p`
    height: 70px;
    border-style: solid;
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: black;
    border-radius: 10px;
    cursor: pointer;
`