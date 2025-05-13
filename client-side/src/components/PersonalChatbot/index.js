import Cookies from 'js-cookie';
import { Component } from 'react';
import Navbar from '../Navbar';
import { FaArrowUp } from 'react-icons/fa';
import {
    ChatBotMainPage,
    ChatBotPageBody,
    ChatBlock,
    ChatsBox,
    ChatInputBox,
    ChatInput,
} from './styledComponents.js';
import ChatItem from '../ChatItem/index.js';

class ChatBot extends Component {
    state = {
        chatArr: [
            // {
            //     chat: 'Hello, I am Kelixina. How can I help you?',
            //     from: 'bot',
            // },
            // {
            //     chat: 'I am Aditya',
            //     from: 'human',
            // },
            // {
            //     chat: 'Nice to meet you',
            //     from: 'bot',
            // },
        ],
        chatText: '',
        isLoading: false, // For loading state during API call
    };

    // Handle input change
    onChangeChatInputText = (event) => {
        this.setState({
            chatText: event.target.value,
        });
    };

    // Handle chat submission
    onClickChatButton = async () => {
        const { chatText, chatArr } = this.state;

        // Prevent empty messages
        if (chatText.trim().length === 0) {
            return;
        }

        this.setState({ isLoading: true }); // Set loading state
        const jwtToken = Cookies.get('jwt_token');
        const sentObj = {
            userPrompt: chatText,
        };

        const apiUrl = `http://localhost:3333/chatbot/`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(sentObj),
        };

        try {
            // Make API request
            const response = await fetch(apiUrl, options);

            if (!response.ok) {
                throw new Error('Failed to fetch response from chatbot API');
            }

            const data = await response.json();
            console.log(data);

            // Append the human message
            const newObj = {
                chat: chatText,
                from: 'human',
            };

            // Append the bot's response
            const botResponse = {
                chat: data.chatbotResponse || 'Sorry, I didn’t understand that.',
                from: 'bot',
            };

            // Update state and clear the input
            this.setState((prevState) => ({
                chatArr: [...prevState.chatArr, newObj, botResponse],
                chatText: '',
                isLoading: false, // Reset loading state
            }));

            // Scroll to the bottom of the chatbox after updating state
            this.scrollToBottom();

        } catch (error) {
            console.error('Error during API call:', error.message);
            this.setState({ isLoading: false });
        }
    };

    // Function to scroll to bottom of chat box
    scrollToBottom = () => {
        this.chatsEnd.scrollIntoView({ behavior: 'smooth' });
    };

    // Render the chatbot UI
    render() {
        const { chatArr, chatText, isLoading } = this.state;

        return (
            <ChatBotMainPage>
                <Navbar selectedMenu="chat" />
                <ChatBotPageBody>
                    <ChatBlock>
                        <ChatsBox>
                            {chatArr.map((each, index) => (
                                <ChatItem key={index} chatObj={each} />
                            ))}
                            <div ref={(el) => { this.chatsEnd = el; }} />
                        </ChatsBox>
                        <ChatInputBox>
                            <ChatInput
                                type="text"
                                placeholder="Ask Something...."
                                onChange={this.onChangeChatInputText}
                                value={chatText}
                                disabled={isLoading}
                            />
                            <FaArrowUp
                                onClick={this.onClickChatButton}
                                style={{
                                    fontSize: '30px',
                                    borderStyle: 'solid',
                                    height: '50px',
                                    width: '50px',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            />
                        </ChatInputBox>
                    </ChatBlock>
                </ChatBotPageBody>
            </ChatBotMainPage>
        );
    }
}

export default ChatBot;
