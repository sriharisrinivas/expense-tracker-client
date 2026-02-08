import React, { useState } from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { API_END_POINTS } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeRenderAlertMsgAction, renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import ResetPassword from '../ResetPassword/ResetPassword';
// import ProfilePictureUpload from '../ResetPassword/ProfilePictureUpload';
// import { useHistory } from 'react-router-dom';

const initialLoginFields = {
    email: '',
    password: ''
};

const initialSignUpFields = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 1,
    profilePic: '',
    // mobile: ''
};

function LoginSignUpForm(props) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [formType, setFormType] = useState("login");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginFields, setLoginFields] = useState(initialLoginFields);
    const [signUpFields, setSignUpFields] = useState(initialSignUpFields);
    const [showResetPasswordPopup, setShowChangePasswordPopup] = useState(false);
    const darkModeState = useSelector(state => state.darkModeReducer.isDarkMode);


    const handleChange = (e) => {
        if (formType == "login") {
            setLoginFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
        } else {
            setSignUpFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
        }
    };

    const removeAlertMessage = () => {
        setTimeout(() => {
            dispatch(removeRenderAlertMsgAction());
        }, 2000);
    };

    const registerUser = async () => {
        if (signUpFields.email == '' || signUpFields.password == '' || signUpFields.email == '') {
            setErrorMessage("Please Enter Mandatory Fields.");
            return;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(signUpFields)
        };
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_USER;
        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        let parsedResponse = await response.json();
        dispatch(stopLoaderAction());

        if (response.status == 200) {
            setErrorMessage("");
            dispatch(renderAlertMessageAction({
                message: "Registration Successful. Please Login.",
                type: "success"
            }));
            setFormType("login");
            setSignUpFields(initialSignUpFields);
        } else {
            setErrorMessage(parsedResponse.message);
        }
    };

    const loginUser = async () => {

        if (loginFields.email == '' || loginFields.password == '') {
            setErrorMessage("Please Enter Mandatory Fields.");
            return;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(loginFields)
        };
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.LOGIN;
        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        let parsedResponse = await response.json();
        dispatch(stopLoaderAction());
        if (response.status == 200) {
            setErrorMessage("");
            dispatch(renderAlertMessageAction({
                message: "Login SuccessFul.",
                type: "success",
                show: true
            }));
            sessionStorage.setItem("token", parsedResponse.jwtToken);
            navigate("/home");
            setLoginFields(initialLoginFields);
        } else {
            setErrorMessage(parsedResponse.message);
        }
    };

    const onSubmit = (e) => {
        setErrorMessage("");
        e.preventDefault();
        if (formType == "login") {
            loginUser();
        } else {
            registerUser();
        }
    };


    return (
        <Container className='login-form' style={{ background: darkModeState ? "black" : "white" }}>

            {
                showResetPasswordPopup &&
                <ResetPassword show={showResetPasswordPopup} handleClose={() => { setShowChangePasswordPopup(false); setLoginFields(initialLoginFields); }} />
            }

            {
                formType == "login" &&
                <>
                    <p className='login-main-title text-center m-0' style={{ fontSize: "12px" }}>Accounts are fully secure. Feel free to register with your email.</p>
                    <br />
                </>
            }


            <Form.Text className='login-main-title'>{formType == "login" ? "Login" : "Sign Up"}</Form.Text>

            <Form.Group className='mt-3'>
                <Form.Label><span className='field-required'>* </span>Email</Form.Label>

                <InputGroup>
                    <InputGroup.Text id="basic-addon1"><i className='fa-solid fa-envelope'></i></InputGroup.Text>
                    {formType == "login" ?
                        <Form.Control className="todo-field" size="lg" type="text" name={"email"} value={loginFields.email} onChange={handleChange} placeholder='Enter Email' /> :
                        <Form.Control className="todo-field" size="lg" type="text" name={"email"} value={signUpFields.email} onChange={handleChange} placeholder='Enter Email' />
                    }
                </InputGroup>
            </Form.Group>

            {formType == "signup" &&
                <>
                    <Row>
                        <Col sm="6" md="6">
                            <Form.Group className='mt-3'>
                                <Form.Label><span className='field-required'>* </span>First Name</Form.Label>
                                <Form.Control placeholder='Enter First Name' className="todo-field" name={"firstName"} value={signUpFields.firstName} onChange={handleChange} size='lg' />
                            </Form.Group>
                        </Col>

                        <Col sm="6" md="6">
                            <Form.Group className='mt-3'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder='Enter Last Name' className="todo-field" name={"lastName"} value={signUpFields.lastName} onChange={handleChange} size='lg' />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className='mt-3'>
                        <Form.Label>Gender</Form.Label>
                        <Row>
                            <Col>
                                <Form.Check type="radio" label="Male" name={"gender"} value={1} checked={signUpFields.gender == 1} onChange={handleChange} size='lg' />
                            </Col>
                            <Col>
                                <Form.Check type="radio" label="Female" name={"gender"} value={2} checked={signUpFields.gender == 2} onChange={handleChange} size='lg' />
                            </Col>
                        </Row>
                    </Form.Group>
                </>

            }

            <Form.Group className='mt-3'>
                <Form.Label><span className='field-required'>* </span>Password</Form.Label>
               
                <InputGroup>
                    <InputGroup.Text id="basic-addon2"><i className='fa-solid fa-lock'></i></InputGroup.Text>
                    {formType == "login" ?
                    <Form.Control className="todo-field" size="lg" type="password" name={"password"} value={loginFields.password} onChange={handleChange} placeholder='Enter Password...' /> :
                    <Form.Control className="todo-field" size="lg" type="password" name={"password"} value={signUpFields.password} onChange={handleChange} placeholder='Enter Password...' />
                }
                </InputGroup>
            </Form.Group>

            <Form.Text className='field-required' style={{ color: "red" }}>{errorMessage}</Form.Text>

            {formType == "login" &&
                <>
                    <br />
                    <Form.Text className='link-primary' onClick={() => { setShowChangePasswordPopup(true); }}>Forget Password</Form.Text>

                </>
            }

            <Row>
                {formType == "login" ?
                    <button className='btn btn-primary mt-4 mb-2' onClick={onSubmit} >Login</button> :
                    <button className='btn btn-primary mt-4 mb-2' onClick={onSubmit} >Create User</button>
                }
            </Row>

            <Row>
                {formType == "login" ?
                    <button onClick={() => { setFormType("signup"); setErrorMessage(""); }} className='btn btn-outline-warning mt-3 mb-2'>Sign Up</button> :
                    <button onClick={() => { setFormType("login"); setErrorMessage(""); }} className='btn btn-outline-warning mt-3 mb-2'>Back To Login</button>
                }
            </Row>
        </Container>
    );
}

export default LoginSignUpForm;