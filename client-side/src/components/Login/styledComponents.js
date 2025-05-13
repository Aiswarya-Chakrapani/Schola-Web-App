import styled from 'styled-components'

export const MainLoginPage = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`

export const MoverBlock = styled.div`
    height: 96vh;
    top: 2vh;
    background-image: url(https://i.postimg.cc/x18p2Gg5/imagine-image-ad105713-fd91-44d7-8e50-40bfe8f26d86.png);
    background-size: cover;
    width: calc(50vw - 2vh);
    left: ${(props) => props.islogin ? '2vh' : '50vw'};
    position: absolute;
    transition: left 1.4s;
    z-index: 1;
    border-radius: 10px;
`

export const RegisterBlock = styled.div`
    height: 100vh;
    width: 50vw;
    padding: 2vh;
    display: flex;
    flex-direction: column;
`

export const LoginBlock = styled.div`
    height: 100vh;
    width: 50vw;
    border-color: green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2vh;
`

export const LoginPageMainH = styled.h1`
    font-size: 50px;
    font-family: "Mingzat", sans-serif;
    margin-bottom: 22px;
`

export const WebsiteLogoL = styled.img`
    height: 80px;
    align-self: flex-start;
    position: absolute;
    top: 0px;
    margin-top: 20px;
`

export const LoginInput = styled.input`
    height: 50px;
    width: 60%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-width: 1.5px;
    outline: none;
    border-style: solid;
    border-color: black;
    border-radius: 4px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 16px;
    font-family: "Roboto Mono", monospace;
`

export const LoginBtn = styled.button`
    height: 50px;
    background-color: black;
    width: 60%;
    margin-top: 38px;
    border-radius: 10px;
    border-style: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-family: "Mingzat", sans-serif;
    font-weight: 550;
    letter-spacing: 2px;
`

export const OrBlock = styled.div`
    height: 60px;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
`

export const OrHrLine = styled.hr`
    border-width: 1px;
    width: 100%;
    border-color: black;
`

export const OrText = styled.p`
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
`

export const CreateAccountText = styled.p`
    font-family: "Mingzat", sans-serif;
    cursor: context-menu;
`

export const CreateAccountSpanAccount = styled.span`
    color: #0394fc;
    cursor: pointer;
`

export const RegistrationSides = styled.div`
    height: 50px;
    width: 100%;
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const RegistrationSideHr = styled.hr`
    border-width: 3px;
    border-style: solid;
    width: 32.5%;
    border-radius: 15px;
    transition: 1s;
`

export const RegistrationPages = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
`

export const RegistrationPageBlock = styled.div`
    height: 100%;
    flex-grow: 1;
    min-width: 100%;
    transition: 1s;
    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
`

export const NaviButton = styled.button`
    height: 50px;
    width: 60px;
    font-size: 20px;
    cursor: pointer;
    color: white;
    background-color: black;
    border-style: none;
    border-radius: 6px;
    margin: 10px;
`

export const ButtonsBox = styled.div`
    display: flex;
    justify-content: ${(props) => props.single ? 'flex-end' : 'space-between'};
`

export const RegisterContentBox = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
`

export const RegisterBlockH = styled.h1`
    font-family: "Mingzat", sans-serif;
    font-size: 25px;
    margin-bottom: 20px;
`

export const InputLabel = styled.p`
    font-family: "Open Sans", sans-serif;
    font-size: 18px;
    margin-top: 6px;
    margin-bottom: 5px;
`

export const SelectInput = styled.select`
    height: 50px;
    width: 60%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-width: 1.5px;
    outline: none;
    border-style: solid;
    border-color: black;
    border-radius: 4px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 16px;
    font-family: "Roboto Mono", monospace;
`

export const RegisterButton = styled.button`
    height: 50px;
    width: 120px;
    border-style: none;
    background-color: black;
    color: white;
    font-family: "Open Sans", sans-serif;
    cursor: pointer;
    border-radius: 7px;
    font-size: 16px;
`

export const ErrorLine = styled.p`
    color: red;
    margin-top: 20px;
`