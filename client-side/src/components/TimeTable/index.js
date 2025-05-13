import { Component } from "react"
import Navbar from '../Navbar'

import './index.css'

import {
    TimeTableMainPage,
    TimeTablePageBody,
} from './styledComponents.js'

class TimeTable extends Component {
    render () {
        return (
            <TimeTableMainPage>
                <Navbar selectedMenu='timetable' />
                <TimeTablePageBody>
                <div class="circle-container">
                <div className="small-circle" style={{ transform: 'rotate(0deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(15deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(30deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(45deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(60deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(75deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(90deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(105deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(120deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(135deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(150deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(165deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(180deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(195deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(210deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(225deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(240deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(255deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(270deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(285deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(300deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(315deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(330deg) translate(0, -180px)' }}></div>
            <div className="small-circle" style={{ transform: 'rotate(345deg) translate(0, -180px)' }}></div>
        </div>
                </TimeTablePageBody>
            </TimeTableMainPage>
        )
    }
}

export default TimeTable