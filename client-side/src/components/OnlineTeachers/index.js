import { Component } from "react"
import Navbar from '../Navbar'

import {
    OnlineTeachersMainPage,
    OnlineTeachersPageBody,
} from './styledComponents.js'

class OnlineTeachersPortal extends Component {
    render () {
        return (
            <OnlineTeachersMainPage>
                <Navbar selectedMenu='teachers' />
                <OnlineTeachersPageBody>
                    
                </OnlineTeachersPageBody>
            </OnlineTeachersMainPage>
        )
    }
}

export default OnlineTeachersPortal