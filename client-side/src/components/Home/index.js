import React, { Component } from 'react';
import Navbar from '../Navbar'

import './index.css'

import {
    HomeMainPage,
    HomePageBody,
} from './styledComponents.js'


class Home extends Component {
    render () {
        return (
            
                <HomeMainPage>
                    <Navbar selectedMenu='home' />
                    <HomePageBody>
                        <p> HARD WORK BEATS TALENT WHEN TALENT DOES'NT WORK HARD. </p>
                        <div>
                        <div class="div1">
                        <h1>
                        <span class="font2">Learning</span>
                        <span class="font1">Knowledge</span>
                        <span class="font2">Education</span>
                        <span class="font1">Research</span>
                        <span class="font2">Focus</span>
                        <span class="font1">Concentration</span>
                        <span class="font2">Practice</span>
                        <span class="font1">Revision</span>
                            </h1>
                    </div>
                    <div class="div1">
                    <h1> <span class="font1">Memorization</span>
                        <span class="font2 ">Comprehension</span>
                        <span class="font2">Homework</span>
                        <span class="font1">Syllabus</span>
                        <span class="font2">Analysis</span>
                            </h1>
                    </div>
                    <div class="div1">
                        <h1>
                            <span class="font2">Assessment</span>
                        <span class="font1">Examination</span>
                        <span class="font2">Concentration</span>
                        <span class="font1">Understanding</span>
                        <span class="font2">Discipline</span>
                        <span class="font1">Curriculum</span>
                        <span class="font2">Dedication</span>
                        <span class="font1">Preparation</span>
                            </h1>
                    </div>
                            <h1 className="main-h-1"> SCHOLA </h1>
                        </div>
                    </HomePageBody>
                </HomeMainPage>
        )
    }
}

export default Home