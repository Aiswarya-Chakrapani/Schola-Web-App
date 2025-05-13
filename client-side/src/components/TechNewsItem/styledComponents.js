import styled from "styled-components"

export const TechNewsListItem = styled.li`
    border-style: solid;
    list-style-type: none;
    width: 60vw;
    display: flex;
    padding: 15px;
    border-radius: 23px;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 300px;
`

export const TechNewsImg = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 15px;
    height: 100%;
`

export const AuthorText = styled.p`
    color: #2d2e2e;
    font-family: "Roboto Mono", monospace;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 12px;
`

export const TechContentBox = styled.div`
    height: 100%;
    width: 100%;
    padding-left: 15px;
`

export const TechNewsTitle = styled.h1`
    font-family: "Noto Sans", sans-serif;
    font-size: 24px;
`

export const TechNewsDescription = styled.p`
    margin-top: 12px;
    font-size: 18px;
    font-family: "Karla", sans-serif;
`

export const TechNewsLinkBtn = styled.button`
    height: 50px;
    width: 130px;
    border-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: black;
    border-radius: 12px;
    cursor: pointer;
`

export const FooterBlock = styled.div`
    width: 100%;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const PublishedAtText = styled.p`
    font-size: 18px;
    font-family: "Roboto Mono", system-ui;
`