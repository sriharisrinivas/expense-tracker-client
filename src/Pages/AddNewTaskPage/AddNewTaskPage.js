
import React from 'react';
import "./addNewTaskPage.css";
import { Col, Row } from 'react-bootstrap';
import AddTaskComponent from '../../Components/AddTaskComponent/AddTaskComponent';


function AddNewTaskPage() {

    return (
        <Row className="main-content-container">
            <Col className='content-container pt-3'>
                <AddTaskComponent />
            </Col>
        </Row>

    );
}

export default AddNewTaskPage;