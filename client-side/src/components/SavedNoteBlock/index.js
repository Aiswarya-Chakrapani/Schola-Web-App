import {
    ListItem13
} from './styledComponents.js'

const SavedNoteBlock = props => {
    const {userObj} = props
    const {YT_link,YT_timestamps,YT_notes} = userObj

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Ensures two-digit seconds
    }

    return (
        <ListItem13>
            <p> {YT_link} </p>
            <p> {formatTime(YT_timestamps)} </p>
            <p style={{width: '200px'}} > {YT_notes} </p>
        </ListItem13>
    )
}

export default SavedNoteBlock