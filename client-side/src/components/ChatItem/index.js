import { CgProfile } from "react-icons/cg"
import { GoDependabot } from "react-icons/go"

import {
    ChatListItem,
    ChatText,
} from './styledComponents.js'

const ChatItem = props => {
    const {chatObj} = props
    const {chat, from} = chatObj
    return (
        <ChatListItem from={from}>
            <ChatText>{chat}</ChatText>
            {from === 'bot' ? <GoDependabot style={{fontSize: '60px',marginRight: '12px'}} /> : <CgProfile style={{fontSize: '60px',marginLeft:'12px'}}/>}
        </ChatListItem>
    )
}

export default ChatItem