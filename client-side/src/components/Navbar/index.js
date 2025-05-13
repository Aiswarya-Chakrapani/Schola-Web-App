import { IoMdHome } from "react-icons/io";

import { ImCross } from "react-icons/im"

import { Link, withRouter } from 'react-router-dom';

import Cookies from 'js-cookie'

import './index.css'
import { 
    NavbarBlock,
    WebsiteLogo,
    MenuButton,
    MenuElementsBlock,
    MenuElementsBox,
    MenuH1,
    MenuElementsList,
    MenuListItem,
    MenuListItemText,
} from "./styledComponents"


import img1 from '../assets/LightModeWebsiteLogo.png'

const Navbar = props => {
    const {selectedMenu} = props
    const clickMenuButton = () => {
        let example = document.getElementById('menus')
        example.style.top = '0'
    }

    const clickMenuCrossButton = () => {
        let example = document.getElementById('menus')
        example.style.top = '-100vw'
    }

    // const handleLogout = () => {
    //     Cookies.remove('jwt_token');
    //     Cookies.remove('username');
    //     history.push('/login');
    // };

    return (
        <NavbarBlock>
            <IoMdHome className="light-dark-toggle-mode" />
            <WebsiteLogo src={img1} alt="Website Logo" />
            <MenuButton className="menu-button" onClick={clickMenuButton} > Menu </MenuButton>
            <div id="menus">
                <MenuElementsBlock>
                    <MenuElementsBox>
                        <MenuH1> MENU </MenuH1>
                        <MenuElementsList className="hide-scrollbar">
                            <MenuListItem> 
                                <Link to="/" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'home' === selectedMenu}>Home</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'home' === selectedMenu}>Home</MenuListItemText>
                                    </div> 
                                </Link>
                            </MenuListItem>
                            <MenuListItem>
                                <Link to="/ytstamps" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'youtube' === selectedMenu}>Youtube Timestamps</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'youtube' === selectedMenu}>Youtube Timestamps</MenuListItemText>
                                    </div> 
                                </Link> 
                            </MenuListItem>
                            <MenuListItem>
                                <Link to="/savednotes" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'snotes' === selectedMenu}>Saved Notes</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'snotes' === selectedMenu}>Saved Notes</MenuListItemText>
                                    </div> 
                                </Link> 
                            </MenuListItem>
                            <MenuListItem>
                                <Link to="/pdfdataextraction" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'pdf' === selectedMenu}>PDF Extraction</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'pdf' === selectedMenu}>PDF Extraction</MenuListItemText>
                                    </div>
                                </Link> 
                            </MenuListItem>
                            <MenuListItem>
                                <Link to="/todolist" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'todo' === selectedMenu}>Todo List</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'todo' === selectedMenu}>Todo List</MenuListItemText>
                                    </div> 
                                </Link> 
                            </MenuListItem>
                            <MenuListItem> 
                                <Link to="/chatbot" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'chat' === selectedMenu}>Chat Bot</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'chat' === selectedMenu}>Chat Bot</MenuListItemText>
                                    </div> 
                                </Link>
                            </MenuListItem>
                            <MenuListItem> 
                                <Link to="/doubts" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'doubts' === selectedMenu}>Doubts Board</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'doubts' === selectedMenu}>Doubts Board</MenuListItemText>
                                    </div> 
                                </Link>
                            </MenuListItem>
                            <MenuListItem> 
                                <Link to="/teachersportal" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'teachers' === selectedMenu}>Online Teachers Portal</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'teachers' === selectedMenu}>Online Teachers Portal</MenuListItemText>
                                    </div> 
                                </Link>
                            </MenuListItem>
                            <MenuListItem> 
                                <Link to="/technews" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'technews' === selectedMenu}>Tech News</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'technews' === selectedMenu}>Tech News</MenuListItemText>
                                    </div> 
                                </Link>
                            </MenuListItem>
                            <MenuListItem> 
                                <Link to="/leaderboard" style = {{textDecoration: 'none'}}>
                                    <div className="hover-ele">
                                        <MenuListItemText className="test-1" selectedMenu = {'leaderboard' === selectedMenu}>LeaderBoard</MenuListItemText>
                                        <MenuListItemText selectedMenu = {'leaderboard' === selectedMenu}>LeaderBoard</MenuListItemText>
                                    </div> 
                                </Link>
                            </MenuListItem>
                            <MenuListItem> 
                                <div className="hover-ele" style = {{textDecoration: 'none'}}>
                                    <MenuListItemText className="test-1" selectedMenu = {'logout' === selectedMenu}>Logout</MenuListItemText>
                                    <MenuListItemText selectedMenu = {'logout' === selectedMenu}>Logout</MenuListItemText>
                                </div> 
                            </MenuListItem>
                        </MenuElementsList>
                    </MenuElementsBox>
                    <ImCross onClick={clickMenuCrossButton} className="menu-cross-btn" />
                </MenuElementsBlock>
            </div>
        </NavbarBlock>
    )
}

export default withRouter(Navbar)