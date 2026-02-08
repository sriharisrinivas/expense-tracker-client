import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import TaskItem from '../TaskItem/taskitem';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./TaskList.css";
import { fetchTodos } from '../../Redux/Action/TodosAction';
import { todosInitialState } from '../../Redux/Reducer/todosListReducer';

function TaskList() {

    const todosList = useSelector(state => state.todosListReducer.todosList);

    const dispatch = useDispatch();

    const refreshData = async () => {
        dispatch(fetchTodos(window.location.pathname == '/home' ? {
            isFetchAll: true,
        } : {
            ...todosInitialState.searchObj,
            toDate: new Date(new Date(new Date().setHours(23, 59, 59, 999)).setYear(new Date().getFullYear() + 1))
        }));
    };

    return (
        <>
            <Row className='mt-3'>
                <Col sm="12" className='d-flex justify-content-between'>
                    <Form.Text className='task-main-title'>{window.location.pathname == "/home" ? "All Tasks" : "My Tasks"}</Form.Text>
                    {window.location.pathname == "/home" && <i className='fa fa-refresh mt-2 text-primary text-end' onClick={refreshData}></i>}
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Pending</Form.Text>
                    <div className='pending-tasks-container legend-box'></div>
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Completed</Form.Text>
                    <div className='completed-tasks-container legend-box'></div>
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Deleted</Form.Text>
                    <div className='deleted-tasks-container legend-box'></div>
                </Col>

                <Col className='d-flex'>
                    <Form.Text className=''>Overdue / Expiring today</Form.Text>
                    <i class="fa-solid fa-circle-exclamation text-danger mt-2 ms-2" aria-hidden="true"></i>
                </Col>

            </Row>
            <Row className='task-card mt-2 mb-2'>
                <Col className="task-list-container">

                    <Row style={{ width: "100%" }}>
                        {todosList.map(item =>
                            // <Col sm={12} >
                            <TaskItem item={item} />
                            // </Col>
                        )}

                        {todosList.length == 0 &&
                            <div className='d-flex flex-column align-items-center'>
                                <Form.Text className='mb-1'>No Tasks</Form.Text>
                                <Link to="/home">
                                    <button className='btn btn-outline-success'>Create Task</button>
                                </Link>
                            </div>
                        }
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default TaskList;