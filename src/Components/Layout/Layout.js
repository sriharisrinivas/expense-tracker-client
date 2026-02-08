import React, { useState } from 'react';
import Header from '../Header/HeaderComponent';
import SideBar from '../SideBar/SideBar';
import "./Layout.css";
import { Container } from 'react-bootstrap';
import Feedback from '../Feedback/Feedback';

function Layout({ children }) {

    const [showChatModal, setShowChatModal] = useState(false);

    return (
        <div className='layout-container'>

            {showChatModal && <Feedback show={showChatModal} handleClose={() => setShowChatModal(false)} />}

            {/* <Header /> */}

            <div className='d-flex sidebar-and-content-container'>
                {/* <SideBar /> */}
                <div style={{ height: "calc(100vh - 0px)", width: "100%" }}>
                    {children}
                </div>
            </div>

            {/* <div className={`${window.location.pathname.includes("/chat") ? "d-none" : ""}`} style={{ position: "relative"}} title='Feedback'>
                <i className="fa-solid fa-comments chat-icon-container" onClick={() => setShowChatModal(true)}></i>
            </div> */}

            {/* <div className='footer-main-container' style={{ background: darkModeState ? "black" : "white" }}>
                <Footer />
            </div> */}
        </div>
    );
}

export default Layout;