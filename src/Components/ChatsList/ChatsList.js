import React, { useContext } from 'react';
import { List } from 'antd';
import moment from 'moment';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import { Collapse } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedChatDetails } from '../../Redux/Action/ChatAction';
import { ChatContext } from '../Home/home';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateChat from '../CreateChat/CreateChat';

function ChatsList() {
    const { setExpanded } = useContext(ChatContext);

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const chatState = useSelector(state => state.chatsReducer);
    const [openChatList, setOpenChatList] = React.useState(true);

    const onSelectChat = (item) => {
        setExpanded(false);

        dispatch(updateSelectedChatDetails(item));

        // This is for finding type of chat, whether individual or group
        dispatch({
            type: REDUX_CONSTANTS.UPDATE_TYPE,
            payload: "Individual"
        })
     }

    return (
        <div>
            <ReusableModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}
                title="Search Chats" footer={null} width={500}
                children={<CreateChat handleCancel={() => setIsModalOpen(false)} />} />

            <div className='ms-3 me-3 d-flex justify-content-between align-items-center' style={{ color: 'white' }} >
                <span onClick={() => setOpenChatList(!openChatList)} className='sidebar-header'>Chats</span>
                <button onClick={() => setIsModalOpen(true)} className='btn btn-outline-info'>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <Collapse in={openChatList}>
                <div>
                    {
                        chatState.selectedChatDetails?.isNew && <List
                            size="small"
                            dataSource={[chatState.selectedChatDetails]}
                            renderItem={(item) => <List.Item onClick={() => onSelectChat(item)} className='chat-list-item'>
                                <AvatarComponent data={item} size={40} />
                                &nbsp;&nbsp;&nbsp;
                                {item.firstName} {item.lastName} (New)
                            </List.Item>}
                        />
                    }

                    <List
                        size="small"
                        style={{ height: '42vh', overflow: 'auto' }}
                        dataSource={chatState.filteredConversations}
                        // dataSource={[...chatState.filteredConversations, ...chatState.filteredConversations, ...chatState.filteredConversations, ...chatState.filteredConversations]}
                        renderItem={(item) => <List.Item onClick={() => onSelectChat(item)} className='chat-list-item'>

                            <div className='me-2'>
                                {/* <Badge count={item.lastMsg.msgByUserId != userDetails._id ? item.unseenMsg: 0} showZero> */}
                                <AvatarComponent data={item?.["receiverDetails"]} size={40} />
                                {/* </Badge> */}
                            </div>

                            <div className='w-75'>
                                {/* &nbsp;&nbsp;&nbsp; */}
                                <div className='w-100'>
                                    <strong>{item?.receiverDetails?.firstName} {item?.receiverDetails?.lastName}</strong>
                                    <span>{item.isOnline && <i style={{ color: "green" }} className="fa-solid fa-circle online-status ms-2"></i>}</span>
                                </div>
                                <div className='d-flex justify-content-between w-100'>
                                    {
                                        item.isTyping ? <span style={{ fontSize: '10px', color: 'green' }}>Typing...</span> :
                                            <>
                                                <span className='sidebar-msg-text' style={{ fontSize: '12px' }}>{item.lastMsg?.text}</span>
                                                <span style={{ fontSize: '10px', minWidth: '45px' }}>{moment(item.lastMsg?.createdAt).format("HH:mm A")}</span>
                                            </>
                                    }


                                </div>
                            </div>

                        </List.Item>}
                    />
                </div>
            </Collapse>
        </div>
    );
}

export default ChatsList;