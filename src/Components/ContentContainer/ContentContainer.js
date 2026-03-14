import React from 'react'
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Expenses from '../Expenses/Expenses';
import { ExpenseContext } from '../Home/home';
import { Layout } from 'antd';
import Statistics from '../Statistics/Statistics';
import ReusableModal from '../ReusableModal/ReusableModal';
import { toggleVoiceInputAction } from '../../Redux/Action/VoiceInputAction';
import ChatAssistContent from '../ChatAssistContent/ChatAssistContent';
import BudgetPlanner from '../Budget/BudgetPlanner';

const { Content } = Layout;

function ContentContainer() {

    const { selectedMenu } = useContext(ExpenseContext);
    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.voiceInputReducer.isOpen);

    const handleCancel = () => {
        dispatch(toggleVoiceInputAction(false));
    };

    return (
        <Content style={{ margin: '10px' }}>
             {isModalOpen && (
                <ReusableModal isModalOpen={isModalOpen} handleCancel={handleCancel}
                    title="Chat Assistant" footer={null} width={500}
                    children={<ChatAssistContent handleCancel={handleCancel} />} />
            )}
            {selectedMenu === "expenses" && <Expenses />}
            {selectedMenu === "statistics" && <Statistics />}
            {selectedMenu === "budget-planner" && <BudgetPlanner />}
        </Content>
    )
}

export default ContentContainer