import { useContext } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './SideBar.css';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import Expenses from '../Expenses/Expenses';
import { ExpenseContext } from '../Home/home';

const { Sider } = Layout;

function SideBar() {

    const { expanded } = useContext(ExpenseContext);

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
                    <Input placeholder="Search Contact"  />
                </div> */}
            </>
            <Expenses />
{/* 

            <GroupList /> */}

        </Sider>
    );
}

export default SideBar;