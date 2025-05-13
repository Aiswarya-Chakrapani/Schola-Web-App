import styled from "styled-components"

export const PDFMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
    z-index: 2;
`

export const PDFPageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    flex-direction: column;
`

export const PDFSelectionBlock = styled.div`
    height: 100px;
    width: 400px;
    border-style: solid;
    align-self: center;
    margin-top: 20px;
    border-radius: 100px;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
`

export const PDFMoveBlock = styled.div`
    height: 80px;
    width: 80px;
    transition: 0.5s;
    border-style: solid;
    border-radius: 50%;
    cursor: pointer;
    background-color: black;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    margin-left: ${(props) => props.method ? '295px' : '0px'};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PDFHeading = styled.h1`
    font-size: 60px;
    text-align: center;
    margin-top: 30px;
    font-family: "Oswald", sans-serif;
`

export const PDFInput = styled.input`
    cursor: pointer;
    color: white;
    font-size: 15px;
`

export const PDFInputBlock = styled.div`
    height: 80px;
    border-style: solid;
    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    background-color: black;
    width: 400px;
    margin-left: 40px;
`

export const PDFSubHeading = styled.h1`
    font-family: "Roboto Mono", monospace;
    font-size: 25px;
    margin-top: 20px;
    margin-left: 50px;
    margin-bottom: 15px;
`

export const PDFSubmitBtn = styled.button`
    height: 80px;
    width: 400px;
    border-style: solid;
    margin-left: 40px;
    margin-top: 20px;
    border-radius: 60px;
    cursor: pointer;
    background-color: black;
    color: white;
    font-size: 20px;
`

export const PDFOutputBlock = styled.div`
    padding: 30px;
    height: 80vh;
    width: 80vw;
    background-color: white;
    border-radius: 30px;
    position: fixed;
    z-index: 3;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    overflow: scroll;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

export const AnswerListItem = styled.li`
    font-size: 20px;
    font-family: "Roboto Mono", monospace;
    margin-top: 15px;
`