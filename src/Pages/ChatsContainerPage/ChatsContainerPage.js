import React from 'react';
import "./ChatsContainerPage.css";
import { Col, Container, Form, Row } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

let chats = [
    {
        id: 1,
        name: "Anusha Anusha Anusha Anusha Anusha Anusha Anusha",
        lastMsgDate: new Date(),
        lastMessage: "Hi Ra",
    },
    {
        id: 2,
        name: "Hema",
        lastMsgDate: new Date(),
        lastMessage: "Hello Hari",
    },
    {
        id: 3,
        name: "Rithish",
        lastMsgDate: new Date(),
        lastMessage: "Hello",
    },
   
];

function ChatsContainerPage() {
    return (
        <Row className="main-content-container">
            <Col className='content-container pt-3'>
                <Form type="submit">
                    {/* Chat Header */}
                    <div className='chat-header'>
                        <Form.Text>Whatsapp Clone</Form.Text>
                        <div className='chat-profile-container'>
                            S
                        </div>
                    </div>

                    <Form.Text>Chats</Form.Text>

                    {/* Chats */}
                    <ul className='chat-list-container'>
                        {chats.map(chat => (
                            <Link to={`/chat/${chat.id}`}>
                                <li className='chat-list-item'>
                                    <img className='chat-profile-container' src="/photo.jpg" width={40} height={40} />

                                    <div className='chat-list-item-inner-container'>
                                        <div className='d-flex justify-content-between'>
                                            <p className='chat-name'>{chat.name}</p>
                                            <p className='chat-time'>{moment(chat.lastMsgDate).format("HH:mm")}</p>
                                        </div>
                                        <div>
                                            <p className='chat-name'>{chat.lastMessage}</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>

                </Form>
            </Col>
        </Row>

    );
}

export default ChatsContainerPage;