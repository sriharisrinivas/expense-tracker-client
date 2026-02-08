import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import LoginSignUpForm from '../LoginSignUpForm/LoginSignUpForm';
import { Navigate } from 'react-router-dom';
import "./Login.css";

function Login() {

    return (
        <Container fluid className='login-page'>
            <Row>
                <div className='login-left-section'>

                {/* </Col>
                <Col sm="12" md="12" lg="4" className='login-signup-container card'> */}
                    <LoginSignUpForm />
                </div>
            </Row>

        </Container>
    );
}

export default Login;