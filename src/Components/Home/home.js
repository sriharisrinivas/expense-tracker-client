import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeaderComponent from '../Header/HeaderComponent';
import "./home.css";
import { fetchUserProfileThunk } from '../../Redux/Action/UserAction';
import ContentContainer from '../ContentContainer/ContentContainer';
import { fetchExpensesThunk } from '../../Redux/Action/ExpenseThunks';
import { fetchCatalogThunk } from '../../Redux/Action/CatalogAction';
import NewSideBar from '../Offcanvas/offcanvas';
// import { socket } from '../../helpers/socket-connections';

export const ExpenseContext = React.createContext();

function Home() {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    const [selectedMenu, setSelectedMenu] = React.useState("dashboard");
    const initialMenuSetRef = React.useRef(false);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Set initial default menu based on screen size (only on first mount)
    useEffect(() => {
        if (!initialMenuSetRef.current) {
            setSelectedMenu(windowWidth < 576 ? "expenses" : "dashboard");
            initialMenuSetRef.current = true;
        }
    }, []);

    // Toggling Online/Offline status when tab is not active
    useEffect(() => {
        // Adding user to online user list when user logins
        // socket.emit('add-online-user', sessionStorage.getItem("token"));

        // Fetch user profile using thunk
        dispatch(fetchUserProfileThunk());
        dispatch(fetchCatalogThunk("CATEGORY,ACCOUNT"));
    }, [dispatch]);



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
                {/* <SideBar /> */}
                <NewSideBar />

                <Layout>
                    <HeaderComponent />
                    <ContentContainer />
                </Layout>
            </Layout>
        </ExpenseContext.Provider>

    );
}

export default Home;