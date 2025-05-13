import styled from "styled-components"

export const NavbarBlock = styled.div`
    height: 80px;
    max-width: 100%;
    border-style: solid;
    postion: fixed;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-width: 2px;
`

export const WebsiteLogo = styled.img`
    height: 55px;
    cursor: pointer;
`

export const MenuButton = styled.button`
    height: 100%;
    width: 120px;
    border-style: none;
    border-left: solid;
    background-color: white;
    border-width: 2px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.6s;
`

export const MenuElementsBlock = styled.div`
    height: 100%;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    display: flex;
    background-color: white;
    z-index: 10;
`

export const MenuElementsBox = styled.div`
    height: 100%;
    width: 100%;
    padding-top: 18px;
    padding-left: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
`

export const MenuH1 = styled.h1`
    font-size: 80px;
    font-family: "Reddit Sans Condensed", sans-serif;
    margin-bottom: 20px;
`

export const MenuElementsList = styled.ul`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
`

export const MenuListItem = styled.li`
    border-color: green;
    list-style-type: none;
`

export const MenuListItemText = styled.p`
    font-size: 60px;
    font-weight: 600;
    font-style: normal;
    color: ${(props) => props.selectedMenu ? 'black' : 'white'};
    font-family: "Reddit Sans Condensed", sans-serif;
  -webkit-text-stroke: 2px black;
    margin: 10px;
    cursor: pointer;
    transition: 0.6s;
`