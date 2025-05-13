import styled from "styled-components"

export const TodoListMainPage = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 15px;
    display: flex;
    flex-direction: column;
`

export const TodoListPageBody = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`

export const TodoMainH = styled.h1`
    font-size: 50px;
    font-family: "Raleway", sans-serif;
    font-weight: 550;
`

export const TodoMainPageHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const AddTaskBtn = styled.button`
    height: 50px;
    border-style: none;
    cursor: pointer;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 5px;
    font-size: 16px;
    background-color: #e1eaf8;
    color: #065df6;
`

export const HrLineEdit = styled.hr`
    border-width: 1px;
    border-style: solid;
    margin-top: 20px;
`

export const TasksList = styled.button`
    border-style: none;
    cursor: pointer;
    height: 40px;
    display: flex;
    font-size: 20px;
    color: ${(props) => props.selectedTab ? '#065df6' : 'black'};
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
`

export const TasksListNumber = styled.p`
    background-color: ${(props) => props.selectedTab ? '#065df6' : 'black'};
    color: white;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 12px;
    margin-right: 12px;
`

export const TaskBtnList = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
    height: 50px;
`

export const TaskMidVerticalLine = styled.div`
    width: 1px;
    border-style: solid;
    height: 100%;
    border-color: black;
    margin-left: 15px;
    margin-right: 15px;
`

export const TasksListContainer = styled.ul`
    height: 100%;
    width: 100%;
    margin-top: 15px;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    padding-top: 10px;
`