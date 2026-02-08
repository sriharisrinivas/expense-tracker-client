import React, { useState } from 'react';
import "./header.css";
import { Container, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from '../ChangePassword/ChangePassword';
import DarkModeToggle from "react-dark-mode-toggle";
import { darkModeAction, lightModeAction } from '../../Redux/Action/DarkModeAction';
import { updateSelectedNotes } from '../../Redux/Action/NotesAction';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
    const darkModeState = useSelector(state => state.darkModeReducer.isDarkMode);

    const userDetails = useSelector(state => state.userDetailsReducer);

    const onLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/");
    };

    const onChangePassword = () => {
        setShowChangePasswordPopup(true);
    };

    const onLeaveFocus = () => {
        dispatch(updateSelectedNotes({ id: "", title: "Select Notes", description: "" }));
    };

    const renderNavLinks = () => {
        return <>
            <Nav.Link className='header-elements' eventKey={3} as={Link} onClick={onLeaveFocus} to="/gridView">
                Grid View
            </Nav.Link>
            <Nav.Link className='header-elements' eventKey={4} as={Link} onClick={onLeaveFocus} to="/cashbook">
                Cashbook
            </Nav.Link>
            {/* <Nav.Link className='header-elements' eventKey={5} as={Link} onClick={onLeaveFocus} to="/chat">
                                    Chat
                                </Nav.Link> */}
            <Nav.Link className='header-elements' eventKey={6} as={Link} onClick={onLeaveFocus} to="/notes">
                Notes
            </Nav.Link>
            <Nav.Link className='header-elements' eventKey={7} as={Link} onClick={onLeaveFocus} to="/about">
                About
            </Nav.Link></>;
    };

    return (
        <div className='header-container'>
            {
                showChangePasswordPopup &&
                <ChangePassword show={showChangePasswordPopup} handleClose={() => { setShowChangePasswordPopup(false); }} />
            }
            <Navbar fixed='top' bg={darkModeState ? "dark" : "light"} data-bs-theme={darkModeState ? "dark" : "light"} collapseOnSelect expand="md" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} onClick={onLeaveFocus} to="/home   " className='app-header'>
                        {(userDetails.PROFILE_PIC == '' || userDetails.PROFILE_PIC == undefined) ?
                            <img src="/logo.png" width={40} height={40} /> :
                            <img src={`data:image/png;base64,${userDetails.PROFILE_PIC}`} width={35} height={40} />
                        }
                        <span className='ms-3'>TO-DO</span>
                    </Navbar.Brand>
                    <DarkModeToggle
                        onChange={() => {
                            if (darkModeState) {
                                dispatch(lightModeAction());
                            } else {
                                dispatch(darkModeAction());
                            }
                        }}
                        checked={darkModeState}
                        size={80}
                    />
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

                    <Navbar.Offcanvas
                        data-bs-theme={darkModeState ? "dark" : "light"}
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg}`}>
                                Todo App
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className='me-auto'></Nav>
                            <Nav className='me-auto'>
                                <Nav.Link className='card header-elements' eventKey={1} as={Link} onClick={onLeaveFocus} to="/home">
                                    Home
                                </Nav.Link>
                                <Nav.Link className='card header-elements' eventKey={2} as={Link} onClick={onLeaveFocus} to="/myTasks">
                                    My Tasks
                                </Nav.Link>

                                <NavDropdown title="More" id="basic-nav-dropdown">
                                    {renderNavLinks()}
                                </NavDropdown>
                            </Nav>
                            <Nav className='me-auto d-flex' style={{ gap: "10px" }}>
                                <button className='cp-btn btn btn-outline-primary' onClick={onChangePassword}>
                                    Change Password
                                    <i class="fa-solid fa-key ms-2"></i>
                                </button>
                                {/* <Nav.Link eventKey={6} href=""> */}
                                <button className='btn btn-warning logout-button' onClick={onLogout}>Logout</button>
                                {/* </Nav.Link> */}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default (Header);