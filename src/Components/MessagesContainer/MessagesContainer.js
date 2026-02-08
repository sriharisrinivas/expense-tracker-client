import React, { useContext, useEffect } from 'react';
import { Layout, theme, List } from 'antd';
import "./MessagesContainer.css";
import VirtualList from 'rc-virtual-list';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ChatContext } from '../Home/home';

const { Header, Content, Footer, Sider } = Layout;

function MessagesContainer() {

    const { expanded } = useContext(ChatContext);

    const messagesRef = React.createRef();

    const chatState = useSelector(state => state.chatsReducer);
    let updatedMessages = chatState.conversations.find((chat) => chat._id === chatState.selectedChatDetails._id)?.messages;
    const userDetails = useSelector(state => state.userDetailsReducer);

    const scrollToBottom = () => {
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        scrollToBottom();

        // if (updatedMessages && updatedMessages.filter((msg) => msg.seen == false).length > 0) {
        //     let unseenMsgIds = updatedMessages?.filter((msg) => !msg.seen && msg.msgByUserId != userDetails._id).map((msg) => msg._id);
        //     dispatch(startLoaderAction());
        //     socket.emit('update-seen-messages', {
        //         userId: userDetails._id, 
        //         unseenMsgIds:unseenMsgIds,
        //         receiverId: chatState.selectedChatDetails.receiverDetails._id
        //     });
        // }

    }, [updatedMessages, expanded]);

    const renderMessagesContainer = () => (
        <Content
            style={{
                margin: '24px 16px'
            }}
        >
            <div
                style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >

                {Object.values(chatState.selectedChatDetails).length > 0 ?
                    <div className='messages-container'>
                        <VirtualList
                            data={updatedMessages}
                        >
                            {(message) => (
                                <>
                                    <div key={message.sendermail}
                                        className={`message-box ${message.msgByUserId === userDetails._id ? "sender-message-box" : "receiver-message-box"}`}>
                                        {/* {
                                            message.msgByUserId === userDetails._id &&
                                            <div className='d-flex justify-content-end'>
                                                <i className="fa fa-chevron-circle-up" aria-hidden="true"></i>
                                            </div>
                                        } */}
                                        <div className='w-100 p-2'>
                                            <p style={{ textAlign: 'end', fontSize: '8px' }}>{moment(message.createdAt).format("DD-MM-YY HH:mm A")}</p>
                                            <p style={{ fontSize: '12px' }}>{message.text}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </VirtualList>
                        <div ref={messagesRef}></div>
                    </div> :
                    <div className='d-flex flex-column justify-content-center align-items-center messages-container'>
                        <p>Hi <strong className='sidebar-header'>{userDetails.firstName} {userDetails.lastName}</strong></p>
                        <span>Welcome to <strong>Chat App</strong></span>
                        <p className='text-center'>Start a new conversation by clicking on a contact or by adding a new user by clicking "+" button.</p>
                    </div>
                }


            </div>


        </Content>
    );


    return (
        <>
            {!expanded && renderMessagesContainer()}

            <div className='d-none d-sm-block'>
                {expanded && renderMessagesContainer()}
            </div>
        </>
    );
}

export default MessagesContainer;