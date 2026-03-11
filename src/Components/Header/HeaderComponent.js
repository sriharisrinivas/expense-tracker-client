import { useContext, useState } from 'react';
import "./header.css";
import ChangePassword from '../ChangePassword/ChangePassword';
import { Layout } from 'antd';
import Settings from '../Settings/Settings';
import { useDispatch } from 'react-redux';
import { clearDatabaseThunk } from '../../Redux/Action/MiscellaneousAction';
// import { socket } from '../../helpers/socket-connections';
import { ExpenseContext } from '../Home/home';
import { FaRocketchat } from 'react-icons/fa';
import { toggleVoiceInputAction } from '../../Redux/Action/VoiceInputAction';
const { Header } = Layout;

function HeaderComponent() {

    const dispatch = useDispatch();
    const {expanded, setExpanded} = useContext(ExpenseContext);
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

    const onChangePassword = () => {
        setShowChangePasswordPopup(true);
    };

    const removeOnlineUser = () => {
        // socket.emit('remove-online-user', sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
    };

    const onClickClearDB = async () => {
        dispatch(clearDatabaseThunk());
    };

    return (
        <>
            {
                showChangePasswordPopup &&
                <ChangePassword show={showChangePasswordPopup} handleClose={() => { setShowChangePasswordPopup(false); }} />
            }

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

                <button className='btn btn-outline-light d-flex align-items-center gap-2' onClick={() => {
                    dispatch(toggleVoiceInputAction(true));
                }}>
                    Chat Assistant
                    <FaRocketchat />
                </button>
                {/* <button className='btn btn-outline-info d-flex align-items-center me-4' onClick={onClickClearDB}><i className="fa-solid fa-plus me-2"></i>Clear DB</button> */}
                <Settings onChangePassword={onChangePassword} />
            </Header>
        </>

    );
}

export default HeaderComponent;