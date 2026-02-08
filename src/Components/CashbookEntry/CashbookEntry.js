import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import { createEntry, getAllEntries, updateEntry } from '../../Redux/Action/CashbookAction';
import { modes } from '../../config';

const initialFields = {
    description: '',
    amount: '',
    transactionType: '',
    date: new Date(),
    cbmId: ''
};

function CashbookEntry({ show, handleClose, configData, selectedRowDetails }) {

    const dispatch = useDispatch();

    const [fields, setFields] = useState(initialFields);

    const handleChange = (e) => {
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async () => {

        if (fields.description == '' || fields.amount == '') {
            setErrorMessage("Please Enter Fields");
            return;
        }

        let payload = { ...fields };
        payload.transactionType = configData.transactionType;
        payload.cbmId = configData.selectedCashbook;

        if (configData.mode == modes.SAVE) {
            dispatch(createEntry(payload));
        } else {
            if (payload.cbmId) {
                delete payload.cbmId
            }
            payload.cbsmId = selectedRowDetails["_id"]
            dispatch(updateEntry(payload));
        }
        setFields(initialFields);
        handleClose();

    };

    useEffect(() => {
        if (selectedRowDetails) {
            setFields(pre => ({
                ...pre,
                description: selectedRowDetails["description"],
                amount: selectedRowDetails["amount"],
                date: new Date(selectedRowDetails["date"]),
            }));
        }
    }, [selectedRowDetails]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{configData.mode == modes.SAVE ? "Create Entry" : "Update Entry"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className='mt-3'>
                        <Form.Label><span className='field-required'>* </span>Amount</Form.Label>
                        <Form.Control className="todo-field" size="lg" type="number" name={"amount"} value={fields.amount} onChange={handleChange} placeholder='Enter Amount...' />
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Form.Label><span className='field-required'>* </span>Description</Form.Label>
                        <textarea className='w-100 m-1 form-control' rows="4" cols="50" name={"description"} value={fields.description} onChange={handleChange} placeholder='Enter Remarks...' />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label> <br />
                        <DatePicker
                            showIcon
                            showTimeSelect
                            toggleCalendarOnIconClick
                            maxDate={new Date()}
                            dateFormat={"dd/MM/YYYY HH:mm"}
                            selected={fields.date}
                            onChange={(date) => setFields(prev => ({ ...prev, date: date }))}
                        />
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

export default CashbookEntry;