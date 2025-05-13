import styled from "styled-components"

export const ChatListItem = styled.li`
    list-style-type: none;
    display: flex;
    align-items: center;
    margin-top: 5px;
    align-self: ${(props) => props.from === 'bot' ? 'flex-start' : 'flex-end'};
    flex-direction: ${(props) => props.from === 'bot' ? 'row-reverse' : 'row'};
`

export const SampleBpx = styled.div`
    height: 45px;
    width: 45px;
    background-color: black;
    border-radius: 50%;
    margin: 10px;
    align-self: flex-start;
    flex-grow: 1;
`

export const ChatText = styled.p`
    font-family: "Roboto Mono", monospace;
    font-size: 20px;
    width: 100%;
`