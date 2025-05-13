import { Component } from "react"
import Navbar from '../Navbar'

import LeaderboardItem from '../LeaderboardItem'

import {
    LeaderBoardMainPage,
    LeaderHomePageBody,
    ListItem12,
} from './styledComponents.js'

class LeaderBoard extends Component {
    state = {
        LeaderBoardArr: [],
    }

    componentDidMount() {
        this.getLeaderboardApi()
    }


    getLeaderboardApi = async () => {
        const apiUrl = `http://localhost:3333/leaderboard`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log('Hello',data)
        this.setState({
            LeaderBoardArr: data,
        })
    }

    sortArrayByCountDescending(arr) {
        return arr.sort((a, b) => b.solved_count - a.solved_count);
    }

    multiplyCountBy100AndAddId(arr) {
        return arr.map((item, index) => {
            return {
                ...item, 
                solved_count: item.solved_count * 100, 
                id: index + 1 
            };
        });
    }

    render () {
        const {LeaderBoardArr} = this.state
        const leaderboardArrNew = this.sortArrayByCountDescending(LeaderBoardArr)
        const leaderboardPoints = this.multiplyCountBy100AndAddId(leaderboardArrNew)
        console.log(leaderboardPoints)
        return (
            <LeaderBoardMainPage>
                <Navbar selectedMenu='leaderboard' />
                <LeaderHomePageBody>
                    <ul style= {{
                        height: 'calc(100vh - 110px)',
                        borderStyle: 'solid',
                        borderColor: 'green',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ListItem12>
                            <p> Rank </p>
                            <p> Username </p>
                            <p> Score </p>
                        </ListItem12>
                        {
                            leaderboardPoints.map(each => (
                                <LeaderboardItem userObj={each} />
                            ))
                        }
                    </ul>
                </LeaderHomePageBody>
            </LeaderBoardMainPage>
        )
    }
}

export default LeaderBoard