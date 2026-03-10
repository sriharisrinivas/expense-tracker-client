import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';
import AvatarComponent from '../AvatarComponent/AvatarComponent';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useContext } from 'react';
import { ExpenseContext } from '../Home/home';
const { Header, Sider, Content } = Layout;

function NewSideBar({ ...props }) {

    const handleClose = () => setExpanded(false);
    const { expanded, setExpanded, setSelectedMenu } = useContext(ExpenseContext);

    const userDetails = useSelector(state => state.userDetailsReducer);

    const onChangeMenu = (event) => {
        setSelectedMenu(event.key);
    };

    return (
        <>
            <Offcanvas show={expanded} onHide={handleClose} {...props}>
                <Offcanvas.Header>
                    <div className='d-flex justify-content-around align-items-center' style={{ width: "100vw" }}>
                        <AvatarComponent data={userDetails} size={40} />
                        <span className='me-2' style={{ color: 'white', fontWeight: 'bold' }}>{userDetails.firstName} {userDetails.lastName}</span>
                        <img style={{ cursor: "pointer" }} src="/cross-button.png" onClick={handleClose} width={20} height={20} />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>


                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={onChangeMenu}
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: 'expenses',
                                icon: <UserOutlined />,
                                label: 'Expenses',
                            },
                            // {
                            //     key: 'statistics',
                            //     icon: <VideoCameraOutlined />,
                            //     label: 'Statistics',
                            // },
                            {
                                key: 'budget',
                                icon: <UploadOutlined />,
                                label: 'Budget',
                            },
                        ]}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default NewSideBar;