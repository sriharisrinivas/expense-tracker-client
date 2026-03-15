import React from 'react';
import Expenses from '../Expenses/Expenses';
import BudgetPlanner from '../Budget/BudgetPlanner';
import { Col, Row } from 'react-bootstrap';

function Dashboard() {
    return (
        <Row>
            <Col sm={12} md={8} >
                <Expenses />

            </Col>
            <Col sm={12} md={4}>
                <BudgetPlanner />
            </Col>
        </Row>
    );
}

export default Dashboard;