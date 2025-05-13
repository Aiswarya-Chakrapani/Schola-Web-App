import {Component} from 'react'
import Navbar from '../Navbar'

import {
    ProfileMainPage,
    ProfilePageBody,
    ProfileTabsBlock,
    ProfileTab
} from './styledComponents.js'

class Profile extends Component {
    render () {
        return (
            <ProfileMainPage>
                <Navbar selectedMenu='profile' />
                <ProfilePageBody>
                    <ProfileTabsBlock>
                        <ProfileTab> Basic Information </ProfileTab>
                        <ProfileTab> Academic Information </ProfileTab>
                        <ProfileTab> Personal Information </ProfileTab>
                    </ProfileTabsBlock>
                </ProfilePageBody>
            </ProfileMainPage>
        )
    }
}

export default Profile