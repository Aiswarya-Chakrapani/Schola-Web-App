import { Component } from "react"
import Navbar from '../Navbar'

import {
    DoubtsMainPage,
    DoubtsPageBody,
    DoubtsBlockBox,
} from './styledComponents.js'

import './index.css'

class DoubtsPageNew extends Component {
    state = {
        doubtsArr: [],
    }

    componentDidMount () {
        this.getAllDoubtsApi()
    }

    getAllDoubtsApi = async () => {
        const apiUrl = `http://localhost:3333/doubts`
        const response = await fetch(apiUrl)
        const data = await response.json()
        this.setState({
            doubtsArr: data,
        })
    }

    render () {
        const {doubtsArr} = this.state
        console.log(doubtsArr)
        return (
            <DoubtsMainPage>
                <Navbar selectedMenu='teachers' />
                <DoubtsPageBody>
                    <marquee style={{
                        borderStyle: 'solid',
                    }}>
                        <div style={{
                            display: 'flex',
                            height: '100px',
                            alignItems: 'center',
                        }}>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                            <h1 className = "doubts-h-text"> Doubts </h1>
                        </div>
                    </marquee>
                    <DoubtsBlockBox>
                        
                    </DoubtsBlockBox>    

                </DoubtsPageBody>
            </DoubtsMainPage>
        )
    }
}

export default DoubtsPageNew