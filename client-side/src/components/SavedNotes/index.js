import { Component } from "react"
import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import {
    SavedNotesMainPage,
    SavedNotesPageBody,
} from './styledComponents.js'
import SavedNoteBlock from '../SavedNoteBlock'
import { ThreeCircles } from 'react-loader-spinner'

class SavedNotes extends Component {
    state = {
        timeArr: [],
        isLoading: true, // To manage the loading state
    }

    componentDidMount() {
        this.getTimeStampsNews()
    }

    getTimeStampsNews = async () => {
        const username = Cookies.get('username')
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `http://localhost:3333/timestamps/${username}/`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
        }
        const data = await fetch(apiUrl, options)
        const response = await data.json()
        this.setState({
            timeArr: response,
            isLoading: false, // Set loading to false once data is fetched
        })
    }

    render() {
        const { timeArr, isLoading } = this.state

        return (
            <SavedNotesMainPage>
                <Navbar selectedMenu='snotes' />
                <SavedNotesPageBody>
                    {isLoading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                        }}>
                            <ThreeCircles
                                height="100"
                                width="100"
                                color="black"
                                wrapperStyle={{}}
                                visible={true}
                                ariaLabel="three-circles-rotating"
                            />
                        </div>
                    ) : (
                        <ul style={{
                            height: 'calc(100vh - 110px)',
                            borderStyle: 'solid',
                            borderColor: 'green',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {
                                timeArr.map(each => (
                                    <SavedNoteBlock userObj={each} key={each.id} />
                                ))
                            }
                        </ul>
                    )}
                </SavedNotesPageBody>
            </SavedNotesMainPage>
        )
    }
}

export default SavedNotes
