
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeaderComponent from '../Header/HeaderComponent';
import "./home.css";
import SideBar from '../SideBar/SideBar';
import { getProfileAction } from '../../Redux/Action/UserAction';
import ContentContainer from '../ContentContainer/ContentContainer';
// import { socket } from '../../helpers/socket-connections';

export const ExpenseContext = React.createContext();

function Home() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(true);
    const [selectedMenu, setSelectedMenu] = React.useState("expenses");

    // Toggling Online/Offline status when tab is not active
    useEffect(() => {
        // Adding user to online user list when user logins
        // socket.emit('add-online-user', sessionStorage.getItem("token"));

        dispatch(getProfileAction());
    }, []);


    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // socket.emit('add-online-user', sessionStorage.getItem("token"));
                document.title = 'Expense App';
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
        <ExpenseContext.Provider value={{ expanded, setExpanded , selectedMenu, setSelectedMenu}}>
            <Layout>
                <SideBar />

                <Layout>
                    <HeaderComponent />
                    <ContentContainer />
                </Layout>
            </Layout>
        </ExpenseContext.Provider>

    );
}

export default Home;