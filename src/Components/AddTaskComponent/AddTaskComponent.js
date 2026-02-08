import React, { useEffect, useState } from 'react';
import { Col, Collapse, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { API_END_POINTS } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../Redux/Action/TodosAction';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import "./AddTaskComponent.css";

const initialFields = {
    task: "",
    description: "",
    status: "New",
    severity: "Low",
    severityCode: 1,
    category: "Personal",
    taskCreatedDate: '',
    dueDate: new Date()
};

function AddTaskComponent({ selectedRowDetails, callBack }) {

    const [fields, setFields] = useState(initialFields);

    let searchObj = useSelector(state => state.todosListReducer.searchObj)

    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);

    const [advancedOptions, setAdvancedOptions] = useState(false);

    const handleChange = (e) => {
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmitTask = async () => {
        let url = !selectedRowDetails ?
            (process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_TODO) :
            (process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_TODO);

        let payload = { ...fields };
        payload.taskCreatedDate = new Date();
        payload.severityCode = fields.severity == "Low" ? 1 : fields.severity == "Medium" ? 2 : 3;
        payload.dueDate = payload.dueDate != "" ? new Date(new Date(payload.dueDate).setHours(0, 0, 0, 0)) : new Date(new Date().setHours(0, 0, 0, 0 ));

        let options = {
            method: selectedRowDetails ? "PUT" : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };
        dispatch(startLoaderAction());
        await fetch(url, options);
        dispatch(stopLoaderAction());

        setFields(initialFields);
        dispatch(fetchTodos(window.location.pathname == '/home' ? {
            isFetchAll: true,
        } : {
            ...searchObj,
            search: '',
        }));

        if (selectedRowDetails) {
            callBack();
        }
    };

    useEffect(() => {
        if (selectedRowDetails) {
            setAdvancedOptions(true);
            setFields(pre => ({
                ...pre,
                task: selectedRowDetails["task"],
                description: selectedRowDetails["description"] ? selectedRowDetails["description"] : "",
                status: selectedRowDetails["status"],
                severity: selectedRowDetails["severity"],
                category: selectedRowDetails["category"],
                // taskCreatedDate: '',
                dueDate: new Date(selectedRowDetails["dueDate"]),
                _id: selectedRowDetails["_id"]
            }));
        }
    }, [selectedRowDetails]);

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <Form.Text onClick={() => { setOpen(!open); }} className='task-main-title'>Create a Task</Form.Text>
                {open ?
                    <i class="fa-solid fa-caret-up" onClick={() => { setOpen(false); }}></i> :
                    <i class="fa-solid fa-caret-down" onClick={() => { setOpen(true); }}></i>}
            </div>
            <Collapse in={open}>
                <Row>
                    <Col className='task-card' style={{ padding: "20px" }}>

                        <Form.Group>
                            <Form.Label><span className='field-required'>* </span>Task</Form.Label>
                            {/* <Form.Label>Task Description</Form.Label> */}

                            <Form.Control className="todo-field" size="lg" type="text" name={"task"} value={fields.task} onChange={handleChange} placeholder='Enter a Task' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='me-3' onClick={() => { setAdvancedOptions(!advancedOptions); }}>{!advancedOptions ? "More" : "Less"} fields</Form.Label>
                            {advancedOptions ?
                                <i class="fa-solid fa-caret-up" onClick={() => { setAdvancedOptions(false); }}></i> :
                                <i class="fa-solid fa-caret-down" onClick={() => { setAdvancedOptions(true); }}></i>
                            }

                        </Form.Group>

                        {/* Advanced Options Toggle Container */}
                        <Collapse in={advancedOptions}>
                            <div className='adv-options-container'>
                                <Form.Group>
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control className="todo-field" size="lg" type="text" name={"description"} value={fields.description} onChange={handleChange} placeholder='Enter the Description' />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Severity</Form.Label>
                                            <Form.Select className="todo-field" name={"severity"} value={fields.severity} onChange={handleChange} size='lg'>
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Category</Form.Label>

                                            <Form.Select className="todo-field" name={"category"} value={fields.category} onChange={handleChange} size='lg'>
                                                <option>Personal</option>
                                                <option>Work</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group>
                                    <Form.Label>Task to be done date</Form.Label> <br />
                                    <DatePicker
                                        showIcon
                                        dateFormat={"dd/MM/YYYY"}
                                        toggleCalendarOnIconClick
                                        minDate={new Date()}
                                        selected={fields.dueDate}
                                        onChange={(date) => setFields(prev => ({ ...prev, dueDate: date }))}
                                    />
                                </Form.Group>
                            </div>
                        </Collapse>
                        <div>
                            <button className='btn btn-outline-success' disabled={fields.task == ''} onClick={onSubmitTask} >Submit</button>
                        </div>
                    </Col>
                </Row>
            </Collapse>
        </>
    );
}

export default AddTaskComponent;