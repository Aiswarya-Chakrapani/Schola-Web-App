import styled from "styled-components"

export const TeacherListItem = styled.li`
    border-color: black;
    list-style-type: none;
    height: 300px;
    margin-top: 20px;
    width: 55%;
    padding: 20px;
    padding-bottom: 10px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

export const TeacherName = styled.h1`
    font-size: 30px;
    font-family: "Ubuntu", sans-serif;
    margin-bottom: 20px;
`

export const TeacherCardHeader = styled.div`
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const TeacherProfileImg = styled.img`
    height: 80px;
    width: 80px;
    border-radius: 50%;
`

export const TeachersDetailsSubCard = styled.div`
    width: 100%;
    display: flex;
`

export const TeachersSubDetailsP = styled.p`
    font-family: "Noto Sans JP", sans-serif;
    font-size: 18px;
    margin-bottom: 8px;
`

export const TeachersDetailsHalf = styled.div`
    width: 50%;
    height: 100%;
`

export const TeacherHrLine = styled.hr`
    border-style : solid;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const TeacherDetailsFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const TeacherGetBtn = styled.button`
    height: 40px;
    width: 100px;
    cursor: pointer;
    border-style: solid;
    border-color: black;
    background-color: black;
    border-radius: 10px;
    color: white;
`