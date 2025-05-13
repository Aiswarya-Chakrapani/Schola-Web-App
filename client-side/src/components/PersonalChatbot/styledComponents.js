import styled from "styled-components"

export const ChatBotMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const ChatBotPageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ChatBlock = styled.div`
    height: 85%;
    width: 80%;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const ChatsBox = styled.ul`
    height: 100%;
    width: 100%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
`

export const ChatInputBox = styled.div`
    height: 70px;
    width: 100%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    margin-top: 15px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    padding-left: 30px;
`

export const ChatInput = styled.input`
    border-style: solid;
    width: 100%;
    height: 45px;
    outline: none;
    border-style: none;
    font-family: "Roboto Mono", monospace;
    font-size: 16px;
`