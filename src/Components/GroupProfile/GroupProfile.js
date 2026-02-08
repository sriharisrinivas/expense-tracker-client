import { List } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import ProfilePictureUpload from '../ResetPassword/ProfilePictureUpload';

function GroupProfile() {

    const groupState = useSelector(state => state.groupChatReducer);

    return (
        <div>
            <ProfilePictureUpload type='group' />
            <p className='mt-3'>Group Name: <strong>{ groupState.selectedGroupDetails.groupName}</strong></p>

            <span className='mt-3'>Group Members</span>
            <List
                size="small"
                style={{ height: '42vh', overflow: 'auto' }}
                dataSource={groupState.selectedGroupDetails.members}
                // dataSource={[...chatState.filteredConversations, ...chatState.filteredConversations, ...chatState.filteredConversations, ...chatState.filteredConversations]}
                renderItem={(item) => <List.Item className='chat-list-item'>

                    <div className='me-2'>
                        {/* <Badge count={item.lastMsg.msgByUserId != userDetails._id ? item.unseenMsg: 0} showZero> */}
                        <AvatarComponent data={item} size={40} />
                        {/* </Badge> */}
                    </div>

                    <div className='w-75'>
                        <div className='w-100'>
                            <strong style={{ color: 'rgb(56 86 113)' }}>{item.firstName} {item.lastName}</strong>
                            <span>{item.isOnline && <i style={{ color: "green" }} className="fa-solid fa-circle online-status ms-2"></i>}</span>
                        </div>
                    </div>

                </List.Item>}
            />
        </div>
    );
}

export default GroupProfile;