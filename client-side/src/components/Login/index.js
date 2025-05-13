import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Cookies from 'js-cookie'
import { 
    MainLoginPage,
    MoverBlock,
    RegisterBlock,
    LoginBlock,
    LoginPageMainH,
    WebsiteLogoL,
    LoginInput,
    LoginBtn,
    OrBlock,
    OrHrLine,
    OrText,
    CreateAccountText,
    CreateAccountSpanAccount,
    RegistrationSides,
    RegistrationSideHr,
    RegistrationPages,
    RegistrationPageBlock,
    NaviButton,
    RegisterContentBox,
    ButtonsBox,
    RegisterBlockH,
    InputLabel,
    SelectInput,
    RegisterButton,
    ErrorLine,
} from './styledComponents';
import './index.css'

class Login extends Component {
    state = {
        status: true,
        regSlide: 1,
        loginUsername: '',
        loginPassword: '',
        registerFirstName: '',
        registerLastName: '',
        registerUsername: '',
        registerPassword: '',
        registerSchoolName: '',
        registerGrader: '6th Grade',
        registerSchoolCity: '',
        registerSchoolState: '',
        registerDob: '',
        registerGender: 'Male',
        registerAge: '',
        registerBio: '',
        regErr: '',
        loginStatus: false,
    }

    onToggleLoginRegister = () => {
        this.setState(prevState => ({ status: !prevState.status }));
    }

    onChangeLoginUsername = event => {
        this.setState({
            loginUsername: event.target.value,
        })
    }

    onChangeLoginPassword = event => {
        this.setState({
            loginPassword: event.target.value,
        })
    }

    onChangeRegisterFirstName = event => {
        this.setState({
            registerFirstName: event.target.value,
        })
    }

    onChangeRegisterLastName = event => {
        this.setState({
            registerLastName: event.target.value,
        })
    }

    onChangeRegisterUsername = event => {
        this.setState({
            registerUsername: event.target.value,
        })
    }

    onChangeRegisterPassword = event => {
        this.setState({
            registerPassword: event.target.value,
        })
    }

    onChangeRegisterSchoolName = event => {
        this.setState({
            registerSchoolName: event.target.value,
        })
    }

    onChangeRegisterGrader = event => {
        this.setState({
            registerGrader: event.target.value,
        })
    }

    onChangeRegisterSchoolCity = event => {
        this.setState({
            registerSchoolCity: event.target.value,
        })
    }

    onChangeRegisterSchoolState = event => {
        this.setState({
            registerSchoolState: event.target.value,
        })
    }

    onChangeRegisterDob = event => {
        this.setState({
            registerDob: event.target.value,
        })
    }

    onChangeRegisterGender = event => {
        this.setState({
            registerGender: event.target.value,
        })
    }

    onChangeRegisterAge = event => {
        let age = event.target.value
        age = Number(age)
        this.setState({
            registerAge: age,
        })
    }

    onChangeRegisterBio = event => {
        this.setState({
            registerBio: event.target.value,
        })
    }

    nextSlide2 = () => {
        this.setState({
            regSlide: 2,
        })
    }

    prevSlide1 = () => {
        this.setState({
            regSlide: 1,
        })
    }

    nextSlide3 = () => {
        this.setState({
            regSlide: 3,
        })
    }

    onSubmitSuccess = jwtToken => {
        const {history} = this.props
        const {loginUsername} = this.state
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        Cookies.set('username', loginUsername, {expires: 30})
        history.replace('/')
        // return <Redirect to="/" />
    }

    onClickRegisterBtn = async () => {
        const {
            registerFirstName,
            registerLastName,
            registerUsername,
            registerPassword,
            registerSchoolName,
            registerGrader,
            registerSchoolCity,
            registerSchoolState,
            registerDob,
            registerGender,
            registerAge,
            registerBio
        } = this.state
        if(!registerFirstName || !registerLastName || !registerUsername || !registerSchoolName || !registerGrader || !registerSchoolCity || !registerSchoolState || !registerDob || !registerGender || !registerAge || !registerBio) {
            this.setState({
                regErr: '*Fill all the details'
            })
        } else {
            const userRegistrationDetails = {
                firstName: registerFirstName,
                lastName: registerLastName,
                username: registerUsername,
                password: registerPassword,
                schoolName: registerSchoolName,
                grade: registerGrader,
                schoolCity: registerSchoolCity,
                schoolState: registerSchoolState,
                dob: registerDob,
                gender: registerGender,
                age: registerAge,
                bio: registerBio,
            }
            try {
                const apiUrl = 'http://localhost:3333/register/'
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userRegistrationDetails),
                }
                const response = await fetch(apiUrl,options)
                if(response.ok === true) {
                    const data = await response.json()
                    this.onSubmitSuccess(data.jwtToken)
                } else {
                    const err = await response.text()
                    alert(err)
                }
            } catch (error) {
                alert('Registration failed: ' + error.message);
            }
        }
    }

    onClickLoginBtn = async () => {
        const {loginUsername, loginPassword} = this.state
        const userdetails = {
            username: loginUsername,
            password: loginPassword,
        }
        try {
            const apiUrl = 'http://localhost:3333/login/'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userdetails),
            }
            const response = await fetch(apiUrl,options)
            if(response.ok === true) {
                const data = await response.json()
                this.onSubmitSuccess(data.jwtToken)
            } else {
                const err = await response.text()
                alert(err)
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    }

    render() {
        const { status, regSlide, regErr} = this.state
        const jwtToken = Cookies.get('jwt_token')
        const username = Cookies.get('username')
        if (jwtToken !== undefined && username !== undefined) {
            return <Redirect to="/" />
        }
        return (
            <MainLoginPage>
                <MoverBlock islogin={status}>
                </MoverBlock>
                <RegisterBlock>
                    <WebsiteLogoL src='https://i.postimg.cc/fykT34Ts/Light-Mode-Website-Logo.png' alt="website logo" />
                    <RegistrationSides>
                        <RegistrationSideHr className={regSlide <= 3 ? 'tab-active' : 'tab-inactive'} />
                        <RegistrationSideHr className={regSlide === 2 || regSlide === 3 ? 'tab-active' : 'tab-inactive'} />
                        <RegistrationSideHr className={regSlide === 3 ? 'tab-active' : 'tab-inactive'} />
                    </RegistrationSides>
                    <RegistrationPages>
                    <RegistrationPageBlock id="regSlider" style={{ marginLeft: `${(regSlide - 1) * -100}%` }}>
                            <RegisterContentBox>
                                <RegisterBlockH> Basic Information </RegisterBlockH>
                                <InputLabel> First Name </InputLabel>
                                <LoginInput type="text" placeholder='First Name' onChange={this.onChangeRegisterFirstName} />
                                <InputLabel> Last Name </InputLabel>
                                <LoginInput type="text" placeholder='Last Name' onChange={this.onChangeRegisterLastName} />
                                <InputLabel> Username (For login) </InputLabel>
                                <LoginInput type="text" placeholder='Username' onChange={this.onChangeRegisterUsername} />
                                <InputLabel> Password </InputLabel>
                                <LoginInput type='password' placeholder='Password' onChange={this.onChangeRegisterPassword} />
                            </RegisterContentBox>
                            <ButtonsBox single={true}>
                                <NaviButton onClick={this.nextSlide2}> <FaArrowRight /> </NaviButton>
                            </ButtonsBox>
                        </RegistrationPageBlock>
                        <RegistrationPageBlock>
                            <RegisterContentBox>
                                <RegisterBlockH> Academic Information </RegisterBlockH>
                                <InputLabel> School / College / University Name </InputLabel>
                                <LoginInput type="text" placeholder='School Name' onChange={this.onChangeRegisterSchoolName} />
                                <InputLabel> Grade / Class </InputLabel>
                                <SelectInput id="grade" name="grade" onChange={this.onChangeRegisterGrader}>
                                    <option value="6th Grade">6th Grade</option>
                                    <option value="7th Grade">7th Grade</option>
                                    <option value="8th Grade">8th Grade</option>
                                    <option value="9th Grade">9th Grade</option>
                                    <option value="10th Grade">10th Grade</option>
                                    <option value="11th Grade">11th Grade</option>
                                    <option value="12th Grade">12th Grade</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="Graduated">Graduated</option>
                                </SelectInput>
                                <InputLabel> School / College / University City </InputLabel>
                                <LoginInput type="text" placeholder='City' onChange={this.onChangeRegisterSchoolCity} />
                                <InputLabel> School / College / University State </InputLabel>
                                <LoginInput type="text" placeholder='State' onChange={this.onChangeRegisterSchoolState} />
                            </RegisterContentBox>
                            <ButtonsBox>
                                <NaviButton onClick={this.prevSlide1}>
                                    <FaArrowLeft />
                                </NaviButton>
                                <NaviButton onClick={this.nextSlide3}> 
                                    <FaArrowRight /> 
                                </NaviButton>
                            </ButtonsBox>
                        </RegistrationPageBlock>
                        <RegistrationPageBlock>
                            <RegisterContentBox>
                                <RegisterBlockH> Personal Information </RegisterBlockH>
                                <InputLabel> Date of Birth </InputLabel>
                                <LoginInput type="date" onChange={this.onChangeRegisterDob} />
                                <InputLabel> Gender </InputLabel>
                                <SelectInput id="gender" name="gender" onChange={this.onChangeRegisterGender}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </SelectInput>
                                <InputLabel> Age </InputLabel>
                                <LoginInput type="number" placeholder='Age' onChange={this.onChangeRegisterAge} />
                                <InputLabel> Bio </InputLabel>
                                <LoginInput type="text" placeholder='Write about yourself...' onChange={this.onChangeRegisterBio} />
                                {regErr.length !== 0 && (<ErrorLine> {regErr} </ErrorLine>)}
                            </RegisterContentBox>
                            <ButtonsBox>
                                <NaviButton onClick={this.nextSlide2}>
                                    <FaArrowLeft />
                                </NaviButton>
                                <RegisterButton onClick={this.onClickRegisterBtn}> Register </RegisterButton>
                            </ButtonsBox>
                        </RegistrationPageBlock>
                    </RegistrationPages>
                </RegisterBlock>
                <LoginBlock>
                    <WebsiteLogoL src='https://i.postimg.cc/fykT34Ts/Light-Mode-Website-Logo.png' alt="website logo" />
                    <LoginPageMainH> Welcome Back! </LoginPageMainH>
                    <LoginInput placeholder="Username" type="text" onChange={this.onChangeLoginUsername} />
                    <LoginInput placeholder="Password" type="password" onChange={this.onChangeLoginPassword} />
                    <LoginBtn onClick={this.onClickLoginBtn}> Login </LoginBtn>
                    <OrBlock>
                        <OrHrLine />
                        <OrText> Or </OrText>
                        <OrHrLine />
                    </OrBlock>
                    <CreateAccountText> Don't have an Account?<CreateAccountSpanAccount onClick={this.onToggleLoginRegister}>Create Account</CreateAccountSpanAccount></CreateAccountText>
                </LoginBlock>
            </MainLoginPage>
        );
    }
}

export default Login;
