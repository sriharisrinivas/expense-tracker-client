
import { Layout, theme } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../Header/HeaderComponent';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import "./home.css";
import { fetchConversations, fetchFilteredConversations, fetchNewUsers, updateSelectedChatDetails } from '../../Redux/Action/ChatAction';
import SideBar from '../SideBar/SideBar';
import { getProfileAction } from '../../Redux/Action/UserAction';
import { socket } from '../../helpers/socket-connections';
import FooterComponent from '../Footer/Footer';
import GroupChatMessagesContainer from '../GroupChatMessagesContainer/GroupChatMessagesContainer';

export const ChatContext = React.createContext();

function Home() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(true);

    const chatState = useSelector(state => state.chatsReducer);

    const getConversations = (isNewChat = false) => {
        socket.emit('get-conversations', sessionStorage.getItem("token"), (response) => {
            // Assuming conversations are coming in desc order
            if (isNewChat) {
                dispatch(updateSelectedChatDetails(response[0]));
            }
            dispatch(fetchConversations(response));
            dispatch(fetchFilteredConversations(response));
        });
    };

    useEffect(() => {
        socket.on("online-users", (response) => {
            getConversations(false);
        });

        socket.on('conversation-updated', (data) => {
            getConversations(data.isNewConversation);
        });

    }, [socket]);

    // Toggling Online/Offline status when tab is not active
    useEffect(() => {
        // Adding user to online user list when user logins
        socket.emit('add-online-user', sessionStorage.getItem("token"));

        dispatch(getProfileAction());
        dispatch(fetchNewUsers());
    }, []);


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                socket.emit('add-online-user', sessionStorage.getItem("token"));
                document.title = 'Chat App';
            } else {
                socket.emit('remove-online-user', sessionStorage.getItem("token"));
                document.title = 'Hey, come back!';
            }
        };

        // Add event listener when component mounts
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <ChatContext.Provider value={{ expanded, setExpanded }}>
            <Layout>
                <SideBar />
                <Layout>
                    <HeaderComponent />
                    {
                        chatState.type == "Individual" ? <MessagesContainer /> :
                            <GroupChatMessagesContainer />
                    }

                    <FooterComponent />
                </Layout>
            </Layout>
        </ChatContext.Provider>

    );
}

export default Home;