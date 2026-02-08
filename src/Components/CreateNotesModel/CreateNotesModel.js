import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import { useDispatch } from 'react-redux';
import { API_END_POINTS, CONSTANTS } from '../../config';
import { createNotes, updateNotes } from '../../Redux/Action/NotesAction';

function CreateNotesModel({ show, handleClose, type, details }) {

    const [fields, setFields] = useState({
        title: ''
    });

    let dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async () => {
        if (fields.title == '') {
            setErrorMessage("Please enter title");
            return;
        }

        if (type == 1) {
            dispatch(createNotes(fields));
        } else {
            let updatedFields = { ... fields, id: details._id };
            dispatch(updateNotes(updatedFields));
        }

        handleClose();
    };

    const handleChange = (e) => {
        setFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (details) {
            setFields(pre => ({ ...pre, title: details.title }));
        }
    }, [type]);


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {type == 2 ? "Update Notes" : "Create Notes"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control className='w-100 m-1 form-control' onChange={handleChange} value={fields.title} name="title" />
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

export default CreateNotesModel;