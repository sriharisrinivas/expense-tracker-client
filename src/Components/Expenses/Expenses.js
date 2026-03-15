import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col, DatePicker, Layout, Popconfirm, Row, Space, Table, Tag } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrenySymbol } from '../../helpers/helpers';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { deleteExpenseThunk, fetchExpensesThunk } from '../../Redux/Action/ExpenseThunks';
import CreateExpense from '../CreateExpense/CreateExpense';
import ReusableModal from '../ReusableModal/ReusableModal';
import './Expenses.css';
import { toggleVoiceInputAction } from '../../Redux/Action/VoiceInputAction';
import { FaRocketchat } from 'react-icons/fa';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';

function Expenses() {
    const [form, setForm] = React.useState({ date: null, formattedDate: null });

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [viewMode, setViewMode] = useState(false);
    const expensesState = useSelector(state => state.expensesReducer);
    const parsedExpense = useSelector(state => state.voiceInputReducer.parsedExpense);
    const dispatch = useDispatch();
    const expensesData = _.groupBy((expensesState.expenses || []), (expense) => new Date(expense.date + 'T00:00:00').toDateString());

    // Calculate total expenses and income
    const totalExpenses = (expensesState.expenses || []).reduce((sum, expense) => {
        return sum + (expense.expense || 0);
    }, 0);

    const totalIncome = (expensesState.expenses || []).reduce((sum, expense) => {
        return sum + (expense.income || 0);
    }, 0);

    // Watch for parsed expense and open modal with filled details
    React.useEffect(() => {
        if (parsedExpense) {
            setEditingExpense(null); // Keep it in create mode, not edit mode
            setIsModalOpen(true);
        }
    }, [parsedExpense]);

    const handleEdit = (record) => {
        setEditingExpense(record);
        setViewMode(false);
        setIsModalOpen(true);
    };

    const handleView = (record) => {
        setEditingExpense(record);
        setViewMode(true);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingExpense(null);
        dispatch({ type: REDUX_CONSTANTS.CLEAR_PARSED_EXPENSE }); // Clear parsed expense when modal is closed
        setViewMode(false);
    };

    const handleDelete = async (expenseId) => {
        dispatch(deleteExpenseThunk(expenseId, handleCancel));
    };

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => <span className='text-capitalize' style={{ color: '#555' }}>{text}</span>,
        },
        {
            title: "Amount",
            render: (_, record) => (
                <Tag color={record.income ? 'green' : 'red'} key={record._id}>
                    {getCurrenySymbol(record.income || record.expense)}
                </Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EyeOutlined
                        onClick={() => handleView(record)}
                        style={{ cursor: 'pointer', fontSize: '16px', color: '#52c41a' }}
                        title="View"
                    />
                    <EditOutlined
                        onClick={() => handleEdit(record)}
                        style={{ cursor: 'pointer', fontSize: '16px', color: '#1890ff' }}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Delete Expense"
                        description="Are you sure you want to delete this expense?"
                        onConfirm={() => handleDelete(record._id || record.expenseId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ cursor: 'pointer', fontSize: '16px', color: '#ff4d4f' }}
                            title="Delete"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onDateChange = (date, formattedDate) => {
        console.log(date, formattedDate);
        setForm(prev => ({ ...prev, formattedDate: formattedDate, date }));
    };

    React.useEffect(() => {
        dispatch(fetchExpensesThunk(form.date));
    }, [form.date, dispatch]);

    return (
        <div className=''>
            {isModalOpen && (
                <ReusableModal isModalOpen={isModalOpen} handleCancel={handleCancel}
                    title={viewMode ? "View Expense" : "Track Expense"} footer={null} width={500}
                    children={<CreateExpense handleCancel={handleCancel} editingExpense={editingExpense} prefilledData={parsedExpense} viewMode={viewMode} />} />
            )}

            <div className='m-3 d-flex justify-content-between' style={{ color: 'white' }} >
                <span className='sidebar-header'>Expense Tracking</span>
                <button onClick={() => {
                    setEditingExpense(null);
                    setIsModalOpen(true);
                }} className='btn btn-primary'>
                    <i className="fas fa-plus"></i> Expense
                </button>

            </div>
            <hr />


            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 15px' }}>
                <div>
                    <span>Filter By: </span>
                    <DatePicker onChange={onDateChange} picker="month" value={form.date} />
                </div>
                <div>
                    <button className='btn btn-outline-dark d-flex align-items-center gap-2' onClick={() => {
                        dispatch(toggleVoiceInputAction(true));
                    }}>
                        AI
                        <FaRocketchat />
                    </button>
                </div>
            </div>
            <hr />

            {/* LeaderBoard */}
            <Row>
                <Col span={8}>
                    <Card size="small" title="Total Expenses" style={{ margin: '5px' }}>
                        <Tag color="red">
                            {getCurrenySymbol(totalExpenses)}
                        </Tag>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <Tag color="green">
                            {getCurrenySymbol(totalIncome)}
                        </Tag>
                    </Card>
                </Col>

                 <Col span={8}>
                    <Card size="small" title="Net Amount" style={{ margin: '5px' }}>
                        <Tag color={totalIncome - totalExpenses >= 0 ? 'green' : 'red'}>
                            {getCurrenySymbol(totalIncome - totalExpenses)}
                        </Tag>
                    </Card>
                </Col>

                {/* <Col span={12}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <p>15000</p>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <p>15000</p>
                    </Card>
                </Col> */}
            </Row>



            <Row className='expenses-container'>
                <Col span={24}>
                    {Object.keys(expensesData).length === 0 ? (
                        <Card size="small" style={{ margin: '5px', textAlign: 'center' }}>
                            <p style={{ fontSize: '16px', color: '#999', marginTop: '20px', marginBottom: '20px' }}>
                                No expenses recorded yet. Click "Add Expense" to get started!
                            </p>
                        </Card>
                    ) : (
                        Object.keys(expensesData).map(date => (
                            <Card size="small" title={date} style={{ margin: '5px' }} key={date}>
                                <Table columns={columns} dataSource={expensesData[date]} pagination={false} scroll={{ x: 'max-content' }} />
                            </Card>
                        ))
                    )}
                </Col>
            </Row>


            {/* <Collapse in={openChatList}>
            </Collapse> */}
        </div>
    );
}

export default Expenses;