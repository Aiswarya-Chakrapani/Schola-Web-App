import {
    ListItem11
} from './styledComponents.js'

const LeaderboardItem = props => {
    const {userObj} = props
    const {id,solved_count,user_name} = userObj
    return (
        <ListItem11>
            <p> {id} </p>
            <p> {user_name} </p>
            <p> {solved_count} </p>
        </ListItem11>
    )
}

export default LeaderboardItem