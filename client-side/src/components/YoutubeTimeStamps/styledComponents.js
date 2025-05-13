import styled from "styled-components"

export const YoutubeTimeStampsMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const YoutubeTimeStampsPageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    padding: 8px;
`

export const YTFirstHalf = styled.div`
    height: 100%;
    width: 60%;
    border-style: solid;
    border-color: black;
    padding: 20px;
    margin-right: 4px;
`

export const YTSecondHalf = styled.div`
    height: 100%;
    width: 40%;
    border-style: solid;
    border-color: black;
    margin-left: 4px;
    padding: 12px;
`

export const YTUrlEntry = styled.div`
    height: 70px;
    padding: 10px;
    width: 100%;
    border-style: solid;
    border-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    border-width: 2px;
    margin-bottom: 20px;
`

export const YTUrlInput = styled.input`
    height: 100%;
    width: 100%;
    border-style: none;
    border-radius: 30px;
    outline: none;
    border-color: yellow;
    padding-left: 25px;
    font-family: "Fredoka", sans-serif;
    font-size: 18px;
`

export const YTGoBtn = styled.button`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: black;
    color: white;
    border-style: solid;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export const MarkedNotesH = styled.h1`
    font-size: 30px;
    font-family: "Fredoka", sans-serif;
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 13px;
`

export const TimestampButton = styled.button`
    height: 50px;
    width: 100px;
    background-color: black;
    color: white;
    border-style: solid;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 12px;
    margin-bottom: 12px;
`

export const TimestampList = styled.ul`
    height: calc(100vh - 400px);
    padding: 20px;
    overflow: scroll;
`

export const TimestampItem = styled.li`
    font-size: 22px;
    list-style-type: none;
    margin-top: 10px;
    font-family: "Ubuntu", sans-serif;
`