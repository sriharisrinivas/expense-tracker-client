import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { sendFeedbackThunk } from '../../Redux/Action/MiscellaneousAction';
import { useDispatch } from 'react-redux';

function Feedback({ show, handleClose }) {

    const [fields, setFields] = useState({
        comment: ''
    });

    let dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async () => {
        if (fields.comment == '') {
            setErrorMessage("Please enter your feedback");
            return;
        }

        dispatch(sendFeedbackThunk({ 
            email: sessionStorage.getItem("email"), 
            comment: fields.comment 
        }));

        // Close modal after 3 seconds
        setTimeout(() => {
            handleClose();
        }, 3000);
    };

    const handleChange = (e) => {
        setFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='task-main-title' style={{ fontSize: "16px" }}>PLEASE GIVE YOUR FEEDBACK.</p>
                    <textarea className='w-100 m-1 form-control' rows="4" cols="50" onChange={handleChange} value={fields.comment} name="comment" />
                    <Form.Text className='text-info' style={{ color: "red" }}>{errorMessage}</Form.Text><br />

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={onSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Feedback;