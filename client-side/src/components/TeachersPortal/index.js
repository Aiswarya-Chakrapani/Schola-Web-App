import { Component } from "react"
import Navbar from '../Navbar'
import Cookies from 'js-cookie'

import TeacherCard from '../TeacherCard'

import {
    TeacherPortalMainPage,
    TeacherPortalPageBody,
    TeacherArrayList,
} from './styledComponents.js'

class TeacherPortal extends Component {
    state = {
        teachersArr : [],
    }

    componentDidMount() {
        this.getAllTeacher()
    }

    getAllTeacher = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `http://localhost:3333/teachers`
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(apiUrl,options)
        const data = await response.json()
        this.setState({
            teachersArr: data.recordsets[0],
        })
    } 
    
    render () {
        const {teachersArr} = this.state
        return (
            <TeacherPortalMainPage>
                <Navbar selectedMenu='home' />
                <TeacherPortalPageBody>
                    <TeacherArrayList>
                        { 
                            teachersArr.map(each => (
                                <TeacherCard teacherObj={each} key={each.teacher_id} />
                            ))
                        }
                    </TeacherArrayList>
                </TeacherPortalPageBody>
            </TeacherPortalMainPage>
        )
    }
}

export default TeacherPortal