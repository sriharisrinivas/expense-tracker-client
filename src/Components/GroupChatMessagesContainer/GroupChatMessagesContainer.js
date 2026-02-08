import React, { useContext, useEffect } from 'react';
import { Layout, theme, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ChatContext } from '../Home/home';

const { Header, Content, Footer, Sider } = Layout;

function GroupChatMessagesContainer() {
    const messagesRef = React.createRef();

    const { expanded } = useContext(ChatContext);

    const groupState = useSelector(state => state.groupChatReducer);
    let updatedMessages = groupState.groupChats.find((chat) => chat._id === groupState.selectedGroupDetails._id)?.messages;
    const userDetails = useSelector(state => state.userDetailsReducer);

    const scrollToBottom = () => {
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        scrollToBottom();
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

                {Object.values(groupState.selectedGroupDetails).length > 0 ?
                    <div className='messages-container'>
                        <VirtualList
                            data={updatedMessages}
                        >
                            {(message) => (
                                <div key={message._id}
                                    className={`message-box ${message.msgByUserId === userDetails._id ? "sender-message-box" : "receiver-message-box"}`}>
                                    <div className='w-100 p-2'>

                                        {
                                            message.msgByUserId !== userDetails._id &&
                                            <p className='mb-1' style={{ fontSize: '10px', color: '#fa390d' }}>~{message.msgByUserName}</p>
                                        }
                                        <p style={{ fontSize: '12px' }}>{message.text}</p>
                                        <p style={{ textAlign: 'end', fontSize: '8px' }}>{moment(message.createdAt).format("DD-MM-YY HH:mm A")}</p>
                                    </div>
                                </div>
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

export default GroupChatMessagesContainer;