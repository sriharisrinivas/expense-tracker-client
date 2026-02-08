import React, { Profiler, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateChat from '../CreateChat/CreateChat';
import Profile from '../Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
// import { socket } from '../../helpers/socket-connections';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onChangePassword }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetailsReducer);

    const removeOnlineUser = () => {
        // socket.emit('remove-online-user', sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
    };

    const onLogout = () => {
        removeOnlineUser(userDetails);
        dispatch({
            type: REDUX_CONSTANTS.CLEAR_STATE
        });
        navigate("/");
    };

    const items = [
        {
            key: '1',
            type: 'group',
            label: 'Settings',
            children: [
                {
                    key: '1-1',
                    label: <div onClick={onChangePassword}><i className="fa-solid fa-key me-2"></i><span>Change Password</span></div>,
                },
                {
                    key: '1-2',
                    label: <div onClick={onLogout}><i className="fa-solid fa-power-off me-2"></i><span>Logout</span></div>,
                },
            ],
        },
        {
            key: '2',
            type: 'group',
            label: 'More',
            // disabled: true,
            children: [
                {
                    key: '2-1',
                    label: <div onClick={() => { setIsProfileModalOpen(true); }}><i className="fa-solid fa-user me-2"></i><span>Profile</span></div>,
                }
            ],
        }
    ];

    return (
        <>
            <ReusableModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}
                title="Search Chats" footer={null} width={500}
                children={<CreateChat handleCancel={() => setIsModalOpen(false)} />} />

            <ReusableModal isModalOpen={isProfileModalOpen} handleCancel={() => setIsProfileModalOpen(false)}
                title="Profile" footer={null} width={1000}
                children={<Profile />} />

            <Dropdown
                menu={{
                    items,
                }}
            >
                <div style={{ width: "30px", height: "30px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                    <Space>
                        <i className="fa-solid fa-ellipsis-vertical" style={{ color: '#fff', fontSize: "20px" }}></i>
                    </Space>
                </div>
            </Dropdown>
        </>
    );
};

export default Settings;