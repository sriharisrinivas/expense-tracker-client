import React, { useContext, useState } from 'react';
import { Input, List, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilteredSearchedChatsAction, updateSelectedChatDetails } from '../../Redux/Action/ChatAction';
import './CreateChat.css';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
import { ChatContext } from '../Home/home';
const { Search } = Input;

function CreateChat({ handleCancel }) {

    const {setExpanded } = useContext(ChatContext);

    const dispatch = useDispatch();
    const [receiverMail, setReceiverMail] = useState('');
    const chatState = useSelector(state => state.chatsReducer);

    const handleFilterUsers = (e) => {
        let filteredUsers = chatState.searchedChats.filter((user) => {
            return user["email"].toLowerCase().includes(e.target.value.toLowerCase())
                || user["firstName"].toLowerCase().includes(e.target.value.toLowerCase())
                || user["lastName"].toLowerCase().includes(e.target.value.toLowerCase());
        });

        setReceiverMail(e.target.value);
        dispatch(updateFilteredSearchedChatsAction(filteredUsers));
    };


    const onSubmit = (item) => {
        item = ({ ...item, isNew: true });
        setExpanded(false);

        let dupCheck = false;

        let findedConversation = chatState.conversations.find((conv) => conv.receiverDetails._id == item._id);
        dupCheck = findedConversation ? true : false;

        if (dupCheck) {
            dispatch(renderAlertMessageAction({
                message: "Conversation already exists.",
                type: "error",
                show: true
            }));
        } else {
            dispatch(updateSelectedChatDetails(item));
        }

        dispatch({
            type: REDUX_CONSTANTS.UPDATE_TYPE,
            payload: "Individual"
        })

        handleCancel();
    };


    return (
        <div>
            {/* <Input placeholder="Enter email" /> */}
            {/* <Search placeholder="Enter email" onSearch={onSearch} enterButton /> */}
            <Space.Compact
                style={{
                    width: '100%',
                }}
            >
                <div className='w-100'>

                    <Input className='mb-2' placeholder="Enter Receiver's email" value={receiverMail} onChange={(e) => handleFilterUsers(e)} />
                    <br />
                    <List
                        size="small"
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={chatState.filteredSearchedChats}
                        renderItem={(item) => <List.Item onClick={() => onSubmit(item)} className='user-list-item'>{item.firstName} {item.lastName} ({item.email})</List.Item>}
                    />
                </div>
                {/* <Button type="primary">Verify</Button> */}
            </Space.Compact>

            {/* <div className='d-flex w-100 justify-content-center'>
                <Button onClick={onSubmit} className='mt-3' type="primary">Submit</Button>
            </div> */}



            {/* <Input placeholder="Basic usage" /> */}
        </div>
    );
}

export default CreateChat;