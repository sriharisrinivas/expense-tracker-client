import React, { useContext } from 'react';
import { Input, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredConversations } from '../../Redux/Action/ChatAction';
import './SideBar.css';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import ChatsList from '../ChatsList/ChatsList';
import GroupList from '../GroupList/GroupList';
import { ChatContext } from '../Home/home';

const { Sider } = Layout;

function SideBar() {

    const { expanded } = useContext(ChatContext);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetailsReducer);
    const chatState = useSelector(state => state.chatsReducer);

    return (
        <Sider
            defaultCollapsed={!expanded}
            collapsed={!expanded}
            trigger={null}
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
            }}
            width={290}
        >
            {/* Chat Header */}
            <>
                <div className='d-flex justify-content-around align-items-center'>
                    <AvatarComponent data={userDetails} size={40} />
                    <span className='me-2' style={{ color: 'white', fontWeight: 'bold' }}>{userDetails.firstName} {userDetails.lastName}</span>
                    <img src="/chat-3d.png" width={50} height={60} />
                </div>

                {/* <div className='p-2'>
                    <Input placeholder="Search Contact" onChange={onFilterChats} />
                </div> */}
            </>
{/* 
            <ChatsList />

            <GroupList /> */}

        </Sider>
    );
}

export default SideBar;