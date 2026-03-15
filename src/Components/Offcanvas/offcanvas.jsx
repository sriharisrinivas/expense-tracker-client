import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux';
import AvatarComponent from '../AvatarComponent/AvatarComponent';

import {
    DashboardFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useContext } from 'react';
import { ExpenseContext } from '../Home/home';
import { FaCross, FaWindowClose } from 'react-icons/fa';
const { Header, Sider, Content } = Layout;

function NewSideBar({ ...props }) {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClose = () => setExpanded(false);
    const { expanded, setExpanded, setSelectedMenu } = useContext(ExpenseContext);

    const userDetails = useSelector(state => state.userDetailsReducer);

    const onChangeMenu = (event) => {
        setSelectedMenu(event.key);
        handleClose();
    };

    const menuItems = [
        ...(windowWidth >= 576 ? [{
            key: 'dashboard',
            icon: <DashboardFilled />,
            label: 'Dashboard',
        }] : []),
        {
            key: 'expenses',
            icon: <UserOutlined />,
            label: 'Expenses',
        },
        {
            key: 'budget-planner',
            icon: <UploadOutlined />,
            label: 'Budget Planner',
        }
    ];

    return (
        <>
            <Offcanvas show={expanded} onHide={handleClose} {...props}>
                <Offcanvas.Header>
                    <div className='d-flex justify-content-around align-items-center' style={{ width: "100vw" }}>
                        <AvatarComponent data={userDetails} size={40} />
                        <span className='me-2' style={{ color: 'white', fontWeight: 'bold' }}>{userDetails.firstName} {userDetails.lastName}</span>
                        <FaWindowClose style={{ color: 'white', cursor: 'pointer' }} onClick={handleClose} width={180} />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>


                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={onChangeMenu}
                        defaultSelectedKeys={['1']}
                        items={menuItems}
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default NewSideBar;