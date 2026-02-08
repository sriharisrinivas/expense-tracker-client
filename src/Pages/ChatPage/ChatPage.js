import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import "./ChatPage.css";
import moment from 'moment';
import {Link} from "react-router-dom"

let messages = [
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Hi Anusha",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Whaat r u doing",
        date: new Date(),
        sendermail: "sriharisrinivas995@gmail.com"
    },
    {
        id: 1,
        name: "Anusha",
        text: "Eating hari",
        date: new Date(),
        sendermail: "anusha@gmail.com"
    },
];

let initialFields = { message: "" };

function ChatPage() {
    const messagesEndRef = useRef(null);

    const [fields, setFields] = useState(initialFields);
    const onMessageSent = (e) => {
        e.preventDefault();
        console.log("Message Sent", fields.message);
    };

    const handleChange = (e) => {
        setFields(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Row className="main-content-container">
            <Col className='content-container'>
                {/* <Container> */}
                <div className='cm-header'>
                    <Link to="/chat"><i className='fa fa-arrow-left'></i></Link>
                    <div className='chat-profile-container'>
                        S
                    </div>
                    <Form.Text>Anusha</Form.Text>
                </div>

                <form className='mt-5' type="submit" onSubmit={onMessageSent}>

                    {messages.map(message => (
                        <div className={`d-flex ${message.sendermail === "sriharisrinivas995@gmail.com" ? "justify-content-end" : "justify-content-start"}`}>
                            {/* <div> */}
                            <div className={`message-box ${message.sendermail === "sriharisrinivas995@gmail.com" ? "sender-message-box" : "receiver-message-box"}`}>
                                <p>{message.text}</p>
                                <p>{moment(message.date).format("HH:mm")}</p>
                            </div>
                            {/* </div> */}
                        </div>
                    ))}

                    <div ref={messagesEndRef} />

                    <div className='form-submit-container me-4'>
                        <Form.Control type="text" name="message" value={fields.message} onChange={handleChange} placeholder="Enter Message" />
                        <i className='fa fa-paper-plane' type="button"></i>
                    </div>
                </form>
                {/* </Container> */}
            </Col>
        </Row>
    );
}

export default ChatPage;