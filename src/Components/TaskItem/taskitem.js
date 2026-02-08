import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import AddTaskComponent from '../AddTaskComponent/AddTaskComponent';
import { API_END_POINTS, CONSTANTS, STATUSES } from '../../config';
import { fetchTodos } from '../../Redux/Action/TodosAction';
import { useDispatch, useSelector } from 'react-redux';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import "./TaskItem.css";

function TaskItem({ item }) {

    const dispatch = useDispatch();

    const [selectedRowDetails, setSelectedRowDetails] = useState(undefined);

    let searchObj = useSelector(state => state.todosListReducer.searchObj);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const onUpdateTask = async (item, isDelete = false) => {
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_TODO;

        let payload = {
            task: item["task"],
            description: item["description"] ? item["description"] : "",
            status: item["status"] == STATUSES.COMPLETED ? STATUSES.NEW : STATUSES.COMPLETED,
            severity: item["severity"],
            category: item["category"],
            dueDate: new Date(item["dueDate"]),
            _id: item["_id"]
        };
        if (isDelete) {
            payload.status = STATUSES.DELETED;
        }

        let options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };

        dispatch(startLoaderAction());
        await fetch(url, options);
        dispatch(stopLoaderAction());
        dispatch(fetchTodos(searchObj));

    };

    const onToggleStatus = (item) => {
        onUpdateTask(item);
    };

    const onDeleteTask = (item) => {
        onUpdateTask(item, true);
    };

    const callBack = () => {
        handleClose();
        setSelectedRowDetails(undefined);
    };

    const onEditTask = (item) => {
        setSelectedRowDetails(item);
        setShow(true);
    };

    return (
        // <Row className='card mt-2 mb-2'>
        < >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTaskComponent selectedRowDetails={selectedRowDetails} callBack={callBack} />
                </Modal.Body>
            </Modal>


            {/* <Row className={`task-item-container ${item.STATUS == 2 || item.STATUS == 3 ? "dynamic-task-item-container" : ''}`}> */}
            <Row className={`task-item-container ${item.status == STATUSES.NEW ? "pending-tasks-container" :
                item.status == STATUSES.COMPLETED ? "completed-tasks-container dynamic-task-item-container" :
                    'deleted-tasks-container dynamic-task-item-container'}`} style={{ position: "relative" }}>
                <Col className='d-flex align-items-center task-name-container'>
                    <Form.Check disabled={item["status"] == STATUSES.DELETED} checked={item["status"] == STATUSES.COMPLETED} onChange={() => onToggleStatus(item)} />
                    <div>
                        <p className='p-0 m-0 ms-3 task-dueDate' style={{ color: item.overdue ? "red" : "inherit", fontWeight: 700 }}>{item.overdue ? <i class="fa-solid fa-circle-exclamation"></i> : ""} {moment(item["dueDate"]).format("DD-MM-YYYY")}</p>
                        <p className='p-0 m-0 ms-3' style={{ pointerEvents: item["status"] == STATUSES.DELETED ? "none" : "auto"  }} onClick={() => onToggleStatus(item)}>{item["task"]}</p>
                    </div>
                </Col>

                <Col className='task-header-and-value-wrapper'>
                    <Form.Text className='task-heading'>Severity: </Form.Text>
                    <Form.Text className='task-value'>{item["severity"]}</Form.Text>
                </Col>

                {/* <Col className='task-header-and-value-wrapper'>
                    <Form.Text className='task-heading'>Status: </Form.Text>
                    <Form.Text className='task-value'>{item["status"]}</Form.Text>
                </Col> */}

                <Col className='task-header-and-value-wrapper'>
                    <Form.Text className='task-heading'>Category: </Form.Text>
                    <Form.Text className='task-value'>{item["category"]}</Form.Text>
                </Col>

                {/* <Col className='task-header-and-value-wrapper'>
                    {item["TASK_DATE"] && <Form.Text className='task-heading'>Task Date: </Form.Text>}

                    {
                        item["TASK_DATE"] ?
                            <Form.Text>{moment(item["TASK_DATE"]).format("DD-MM-YYYY")}</Form.Text> :
                            <Form.Text>&nbsp;</Form.Text>
                    }
                </Col> */}

                <div className='d-flex align-items-center justify-content-end todo-icons-container'>
                    {/* {
                        item.rowSelected ?
                            <button className='task-edit-btn btn btn-primary mb-1' onClick={() => { onUpdate(item); }}>Update</button> :
                            <button className='task-edit-btn btn btn-primary mb-1' onClick={() => { onEditTask(item); }}>Edit</button>
                    } */}
                    {/* <button disabled={item["STATUS"] != 1} className='task-edit-btn btn btn-primary' onClick={() => { onEditTask(item); }}>Edit</button> */}

                    {item["status"] != STATUSES.DELETED &&
                        <div className='ms-2 mt-1'>
                            <i disabled={item["status"] != STATUSES.NEW} className='fa fa-edit mt-1' onClick={() => { onEditTask(item); }}></i>
                        </div>
                    }

                    {item["status"] == STATUSES.NEW &&
                        <div className='ms-2 mt-1'>
                            <i className='fa fa-trash mt-1' onClick={() => { onDeleteTask(item); }}></i>
                        </div>
                    }

                </div>
                {/* {
                    item["STATUS"] == 1 &&
                    <Col sm="12">
                        <Form.Text>Due on {moment(item["TASK_DATE"]).format("DD/MM/YYYY")}</Form.Text>
                    </Col>
                } */}
            </Row>
        </>

        // </Row>
    );
}

export default TaskItem;