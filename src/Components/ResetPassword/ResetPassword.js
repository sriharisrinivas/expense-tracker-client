import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_END_POINTS } from '../../config';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import { useDispatch } from 'react-redux';

function ResetPassword({ show, handleClose }) {

    const dispatch = useDispatch();

    const [fields, setFields] = useState({
        email: '',
        otp: '',
        password: ''
    });

    const [otpVerified, setOtpVerified] = useState(false);

    const handleChange = (e) => {
        setErrorMessage("");
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [errorMessage, setErrorMessage] = useState("");

    const onGenerateOtp = async () => {

        if (fields.email == '') {
            setErrorMessage("Please Enter Email Address");
            return;
        }

        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GENERATE_OTP;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ email: fields.email })
        };

        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        if (response.status == 200) {
            setErrorMessage("Email Sent Successfully. Please Check Your Email.");
        } else {
            response = await response.json();
            setErrorMessage(response.message);
        }
    };


    const onVerifyOtp = async () => {
        if (fields.email == '') {
            setErrorMessage("Please Enter Email Address");
            return;
        }

        if (fields.otp == '') {
            setErrorMessage("Please Enter OTP");
            return;
        }

        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.VERIFY_OTP;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ email: fields.email, otp: fields.otp })
        };

        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        if (response.status == 200) {
            setErrorMessage("OTP Verified. Redirecting to New Password Page.");
            setTimeout(() => {
                setOtpVerified(true);
            }, 3000)
        } else {
            response = await response.json();
            setErrorMessage(response.message);
        }
    };


    const onUpdatePassword = async () => {  

        if (fields.password == '') {
            setErrorMessage("Please Enter Password");
            return;
        }

        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.RESET_PASSWORD;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(fields)
        };

        dispatch(startLoaderAction());
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        if (response.status == 200) {
            setErrorMessage("Password Updated Successfully. Redirecting to login page in few seconds.");
            setTimeout(() => {
                handleClose();
            }, 3000)
        } else {
            response = await response.json();
        }

        
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        !otpVerified &&
                        <>

                            <Form.Group className='mt-3'>
                                <Form.Label><span className='field-required'>* </span>Email</Form.Label>
                                <Form.Control className="todo-field" size="lg" type="email" name={"email"} value={fields.email} onChange={handleChange} placeholder='Enter Email' />
                            </Form.Group>

                            <Button className='mt-3' variant="success" onClick={onGenerateOtp} type='submit'>Generate OTP</Button>

                            <Form.Group className='mt-3'>
                                <Form.Label><span className='field-required'>* </span>OTP</Form.Label>
                                <Form.Control className="todo-field" size="lg" type="number" name={"otp"} value={fields.otp} onChange={handleChange} placeholder='Enter OTP' />
                            </Form.Group>

                            <Button className='mt-3' variant="primary" onClick={onVerifyOtp}>
                                Verify
                            </Button>
                        </>
                    }

                    {
                        otpVerified &&
                        <>
                            <Form.Group className='mt-3'>
                                <Form.Label><span className='field-required'>* </span>New Password</Form.Label>
                                <Form.Control className="todo-field" size="lg" type="password" name={"password"} value={fields.password} onChange={handleChange} placeholder='Enter Passwprd...' />
                            </Form.Group>

                            <Button className='mt-3' variant="primary" onClick={onUpdatePassword}>
                                Update Password.
                            </Button>
                        </>
                    }

                    { errorMessage && <p className='text-info'>{errorMessage}</p> }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ResetPassword;