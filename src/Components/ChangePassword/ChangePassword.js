import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { changePasswordThunk } from '../../Redux/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';

function ChangePassword({ show, handleClose }) {

    const dispatch = useDispatch();
    const loaderState = useSelector(state => state.loaderReducer);

    const [fields, setFields] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async () => {

        if (fields.oldPassword == '' || fields.newPassword == '') {
            setErrorMessage("Please Enter Fields");
            return;
        } else if (fields.oldPassword == fields.newPassword) {
            setErrorMessage("Old Password and New password cannot be same.");
            return;
        } else if (fields.newPassword !== fields.confirmPassword) {
            setErrorMessage("Please Make sure they were matched")
            return;
        }

        dispatch(changePasswordThunk(fields));

        // Close modal after successful change
        if (!loaderState.loading) {
            setTimeout(() => {
                handleClose();
            }, 1000);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className='mt-3'>
                        <Form.Label><span className='field-required'>* </span>Old Password</Form.Label>
                        <Form.Control className="todo-field" size="lg" type="password" name={"oldPassword"} value={fields.oldPassword} onChange={handleChange} placeholder='Enter Old Password...' />
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label><span className='field-required'>* </span>New Password</Form.Label>
                        <Form.Control className="todo-field" size="lg" type="password" name={"newPassword"} value={fields.newPassword} onChange={handleChange} placeholder='Enter New Password...' />
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label><span className='field-required'>* </span>Confirm Password</Form.Label>
                        <Form.Control className="todo-field" size="lg" type="password" name={"confirmPassword"} value={fields.confirmPassword} onChange={handleChange} placeholder='Enter New Password...' />
                    </Form.Group>

                    <Form.Text className='field-required'>{errorMessage}</Form.Text>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ChangePassword;