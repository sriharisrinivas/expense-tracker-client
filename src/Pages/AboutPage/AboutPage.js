
import React from 'react';
import "./aboutPage.css";
import { Col, Container, Form, Row, Tab, Tabs } from 'react-bootstrap';
import TodoTab from '../../Components/Tabs/TodoTab';
import CashbookTab from '../../Components/Tabs/CashbookTab';
import AboutTab from '../../Components/Tabs/AboutTab';
import NotesTab from '../../Components/Tabs/NotesTab';

function AboutPage() {

    return (
        <Container>
            <Row className="main-content-container">
                <Col className='content-container pt-4'>
                    <Tabs
                        defaultActiveKey="todo"
                        id="justify-tab-example"
                        className="mb-3"
                        
                    >
                        <Tab eventKey="todo" title="Todo">
                            <TodoTab />
                        </Tab>
                        <Tab eventKey="cashbook" title="Cashbook">
                            <CashbookTab />
                        </Tab>
                        <Tab eventKey="notes" title="Notes">
                            <NotesTab />
                        </Tab>
                        <Tab eventKey="about" title="About">
                            <AboutTab />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>

    );
}

export default AboutPage;