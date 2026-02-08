import React, { useContext, useState } from 'react';
import "./header.css";
import { useSelector } from 'react-redux';
import ChangePassword from '../ChangePassword/ChangePassword';
import { Layout } from 'antd';
import Settings from '../Settings/Settings';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateChat from '../CreateChat/CreateChat';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import axios from 'axios';
import { socket } from '../../helpers/socket-connections';
import { ChatContext } from '../Home/home';
import GroupProfile from '../GroupProfile/GroupProfile';

const { Header } = Layout;

function HeaderComponent() {

    const {expanded, setExpanded} = useContext(ChatContext);
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
    const [showGroupProfile, setShowGroupProfile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const chatState = useSelector(state => state.chatsReducer);
    const groupState = useSelector(state => state.groupChatReducer);

    const onChangePassword = () => {
        setShowChangePasswordPopup(true);
    };

    const removeOnlineUser = () => {
        socket.emit('remove-online-user', sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
    };

    const onClickClearDB = async () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/clearDB");
    };

    return (
        <>
            {
                showChangePasswordPopup &&
                <ChangePassword show={showChangePasswordPopup} handleClose={() => { setShowChangePasswordPopup(false); }} />
            }
            <ReusableModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}
                title="Search Chats" footer={null} width={500}
                children={<CreateChat handleCancel={() => setIsModalOpen(false)} />} />

                
            <ReusableModal isModalOpen={showGroupProfile} handleCancel={() => setShowGroupProfile(false)}
                title="About Group" footer={null} width={500}
                children={<GroupProfile handleCancel={() => setShowGroupProfile(false)} />} />

            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    borderLeft: '1px solid #ccc',
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    // justifyContent: 'end',
                    alignItems: 'center',
                    padding: '0 15px',
                    color: 'white'
                }}
                className='header-component'
            >
                <i onClick={() => setExpanded(!expanded)} className="fa-solid fa-bars me-2 header-toggle" style={{ color: '#fff', fontSize: "20px" }}></i>

                {/* This component is for Chat Header */}
                {!expanded && chatState?.type == 'Individual' ?
                    <>
                        <div className='d-flex align-items-center w-100'>
                            {Object.values(chatState.selectedChatDetails).length > 0 &&
                                <>
                                    <AvatarComponent data={chatState.selectedChatDetails.isNew ? chatState.selectedChatDetails : chatState.selectedChatDetails?.["receiverDetails"]} size={40} />

                                    {
                                        chatState.selectedChatDetails.isNew ? <span className='contact-name ms-2'>{chatState.selectedChatDetails?.["firstName"]} {chatState.selectedChatDetails?.["lastName"]}</span> :
                                            <>
                                                <strong className='contact-name ms-2'>
                                                    {chatState.selectedChatDetails["receiverDetails"]["firstName"]} {chatState.selectedChatDetails["receiverDetails"]["lastName"]}
                                                    {/* {chatState.selectedChatDetails.isOnline && <span style={{ fontSize: '8px', color: 'green' }} className=''> Online</span>} */}
                                                </strong>
                                            </>
                                    }

                                </>}
                        </div>

                    </> : 
                    <div></div>
                }

                {/* This component is for Group Header */}
                {!expanded && chatState.type == 'Group' ?
                    <>
                        <div className='d-flex align-items-center w-100'>
                            {Object.values(groupState.selectedGroupDetails).length > 0 &&
                                <>
                                    <AvatarComponent data={groupState.selectedGroupDetails} size={40} />

                                    <strong className='contact-name ms-2' onClick={() => setShowGroupProfile(true)}>
                                        {groupState.selectedGroupDetails.groupName}
                                    </strong>


                                </>}
                        </div>

                    </>: 
                    <div></div>
                }
                {/* <button className='btn btn-outline-info d-flex align-items-center me-4' onClick={onClickClearDB}><i className="fa-solid fa-plus me-2"></i>Clear DB</button> */}
                <Settings onChangePassword={onChangePassword} />
            </Header>
        </>

    );
}

export default HeaderComponent;