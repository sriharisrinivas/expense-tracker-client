import React, { useContext, useEffect } from 'react';
import { List } from 'antd';
import moment from 'moment';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import { Collapse } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateGroup from '../CreateGroup/CreateGroup';
import { updateSelectedChatDetails } from '../../Redux/Action/ChatAction';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
import { ChatContext } from '../Home/home';
import { socket } from '../../helpers/socket-connections';


function GroupList() {

    const { setExpanded } = useContext(ChatContext);

    const dispatch = useDispatch();

    const groupState = useSelector(state => state.groupChatReducer);
    const [openGroupList, setOpenGroupList] = React.useState(true);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const onSelectGroup = async (item) => {
        setExpanded(false);
        dispatch({
            type: REDUX_CONSTANTS.UPDATE_TYPE,
            payload: "Group"
        })

        dispatch({
            type: REDUX_CONSTANTS.UPDATE_SELECTED_GROUP_DETAILS,
            payload: item
        });
    };

    const getGroups = (grpUpdated = false, id) => { 
        socket.emit('get-groups', sessionStorage.getItem("token"), (response) => {
            response.forEach(element => element.profilePic = element.groupPic);
            let selectedDetails = response.find(ele => ele._id === id)
            dispatch({
                type: REDUX_CONSTANTS.UPDATE_GROUP_CHATS,
                payload: response
            });
            dispatch({
                type: REDUX_CONSTANTS.UPDATE_FILTERED_GROUP_CHATS,
                payload: response
            });

            if (grpUpdated) {
                dispatch({
                    type: REDUX_CONSTANTS.UPDATE_SELECTED_GROUP_DETAILS,
                    payload: selectedDetails
                })
            }
        });
     }

    useEffect(() => {
        getGroups(false);
    }, [])

    useEffect(() => {
        socket.on('group-created', (response) => {
            getGroups(false);
        });

        socket.on('group-updated', (id) => {
            getGroups(true, id);
        });

        socket.on('new-msg-created', (response) => {
            getGroups(false);
        })

        socket.on("online-users", (response) => {
            getGroups(false);
        });
    }, [socket])
    
    

    return (
        <div className='mt-2'>
            <ReusableModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}
                title="Create Group" footer={null} width={500}
                children={<CreateGroup handleCancel={() => setIsModalOpen(false)} />} />
            {/* // children={<CreateChat onSelectChat={onSelectChat} handleCancel={() => setIsModalOpen(false)} />}  */}

            <div className='ms-3 me-3 d-flex justify-content-between align-items-center' style={{ color: 'white' }} >
                <span onClick={() => setOpenGroupList(!openGroupList)} className='sidebar-header'>Groups</span>
                <button onClick={() => setIsModalOpen(true)} className='btn btn-outline-info'>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <Collapse in={openGroupList}>
                <div>
                    <List
                        size="small"
                        style={{ height: '30vh', overflow: 'auto' }}
                        dataSource={groupState.groupChats}
                        // dataSource={[...groupState.groupChats, ...groupState.groupChats, ...groupState.groupChats, ...groupState.groupChats]}
                        renderItem={(item) => <List.Item onClick={() => onSelectGroup(item)} className='chat-list-item'>

                            <div className='me-2'>
                                <AvatarComponent data={item} size={40} />
                            </div>

                            <div className='w-75'>
                                <div className='w-100'>
                                    <strong>{item?.groupName}</strong>
                                </div>
                                <div className='d-flex justify-content-between w-100'>
                                    {
                                        item.isTyping ? <span style={{ fontSize: '10px', color: 'green' }}>Typing...</span>  :
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

export default GroupList;