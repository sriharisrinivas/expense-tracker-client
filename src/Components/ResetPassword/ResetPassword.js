import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { generateOtpThunk, verifyOtpThunk, resetPasswordThunk } from '../../Redux/Action/AuthAction';
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

        dispatch(generateOtpThunk(fields.email));
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

        const result = await new Promise((resolve) => {
            dispatch((innerDispatch) => {
                return verifyOtpThunk({ email: fields.email, otp: fields.otp })(innerDispatch).then(resolve);
            });
        });

        if (result.success) {
            setTimeout(() => {
                setOtpVerified(true);
            }, 1000);
        }
    };


    const onUpdatePassword = async () => {  

        if (fields.password == '') {
            setErrorMessage("Please Enter Password");
            return;
        }

        const result = await new Promise((resolve) => {
            dispatch((innerDispatch) => {
                return resetPasswordThunk(fields)(innerDispatch).then(resolve);
            });
        });

        if (result.success) {
            setTimeout(() => {
                handleClose();
            }, 2000);
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