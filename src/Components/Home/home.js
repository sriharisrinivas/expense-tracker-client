
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../Header/HeaderComponent';
import "./home.css";
import { fetchNewUsers } from '../../Redux/Action/ChatAction';
import SideBar from '../SideBar/SideBar';
import { getProfileAction } from '../../Redux/Action/UserAction';
// import { socket } from '../../helpers/socket-connections';
import FooterComponent from '../Footer/Footer';

export const ChatContext = React.createContext();

function Home() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(true);

    const chatState = useSelector(state => state.chatsReducer);

    useEffect(() => {
        // socket.on("online-users", (response) => {
        //     getConversations(false);
        // });

        // socket.on('conversation-updated', (data) => {
        //     getConversations(data.isNewConversation);
        // });

    }, []);

    // Toggling Online/Offline status when tab is not active
    useEffect(() => {
        // Adding user to online user list when user logins
        // socket.emit('add-online-user', sessionStorage.getItem("token"));

        dispatch(getProfileAction());
        dispatch(fetchNewUsers());
    }, []);


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // socket.emit('add-online-user', sessionStorage.getItem("token"));
                document.title = 'Chat App';
            } else {
                // socket.emit('remove-online-user', sessionStorage.getItem("token"));
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

                    {/* <FooterComponent /> */}
                </Layout>
            </Layout>
        </ChatContext.Provider>

    );
}

export default Home;