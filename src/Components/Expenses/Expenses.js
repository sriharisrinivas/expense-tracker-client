import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ChatContext } from '../Home/home';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateChat from '../CreateExpense/CreateExpense';

function Expenses() {
    const { setExpanded } = useContext(ChatContext);

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // const chatState = useSelector(state => state.chatsReducer);
    const [openChatList, setOpenChatList] = React.useState(true);

    const onSelectChat = (item) => {
        // setExpanded(false);

        // dispatch(updateSelectedChatDetails(item));

        // // This is for finding type of chat, whether individual or group
        // dispatch({
        //     type: REDUX_CONSTANTS.UPDATE_TYPE,
        //     payload: "Individual"
        // })
    }

    return (
        <div>
            <ReusableModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}
                title="Track Expense" footer={null} width={500}
                children={<CreateChat handleCancel={() => setIsModalOpen(false)} />} />

            <div className='ms-3 me-3 d-flex justify-content-between align-items-center' style={{ color: 'white' }} >
                <span onClick={() => setOpenChatList(!openChatList)} className='sidebar-header'>Expense Tracking</span>
                <button onClick={() => setIsModalOpen(true)} className='btn btn-outline-info'>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            {/* <Collapse in={openChatList}>
            </Collapse> */}
        </div>
    );
}

export default Expenses;