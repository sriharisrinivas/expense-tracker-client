import { Button, Card, Col, Layout, Row, Space, Table, theme, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CreateExpense from '../CreateExpense/CreateExpense';
import { ExpenseContext } from '../Home/home';
import ReusableModal from '../ReusableModal/ReusableModal';
import { API_END_POINTS } from '../../config';
import { setExpensesAction } from '../../Redux/Action/ExpenseAction';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { getCurrenySymbol } from '../../helpers/helpers';
const { Content, Footer, Sider } = Layout;

function Expenses() {
    const { setExpanded } = useContext(ExpenseContext);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const expensesState = useSelector(state => state.expensesReducer);
    console.log("Expenses State: ", expensesState);
    const expensesData = _.groupBy((expensesState.expenses || []), (expense) => new Date(expense.date).toDateString());

    // Calculate total expenses and income
    const totalExpenses = (expensesState.expenses || []).reduce((sum, expense) => {
        return sum + (expense.expense || 0);
    }, 0);

    const totalIncome = (expensesState.expenses || []).reduce((sum, expense) => {
        return sum + (expense.income || 0);
    }, 0);

    const handleEdit = (record) => {
        setEditingExpense(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingExpense(null);
    };

    const handleDelete = async (expenseId) => {
        dispatch(startLoaderAction());
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.DELETE_EXPENSE;
            await axios.delete(url, {
                data: { expenseId },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            // Fetch updated expenses after deletion
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
            const response = await axios.get(getUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            dispatch(renderAlertMessageAction({
                message: "Expense deleted successfully.",
                type: "success"
            }));
            dispatch(setExpensesAction(response.data));
            dispatch(stopLoaderAction());
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatch(renderAlertMessageAction({
                message: "Failed to delete expense.",
                type: "error"
            }));
        }
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
        },
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Income',
            dataIndex: 'income',
            key: 'income',
            render: (income) => getCurrenySymbol(income)
        },
        {
            title: 'Expense',
            dataIndex: 'expense',
            key: 'expense',
            render: (expense) => getCurrenySymbol(expense)
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
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

    const dispatch = useDispatch();

    return (
        <div className=''>
            {isModalOpen && (
                <ReusableModal isModalOpen={isModalOpen} handleCancel={handleCancel}
                    title="Track Expense" footer={null} width={500}
                    children={<CreateExpense handleCancel={handleCancel} editingExpense={editingExpense} />} />
            )}

            <div className='m-3 d-flex justify-content-between' style={{ color: 'white' }} >
                <span className='sidebar-header'>Expense Tracking</span>
                <button onClick={() => {
                    setEditingExpense(null);
                    setIsModalOpen(true);
                }} className='btn btn-primary'>
                    <i className="fas fa-plus"></i> Add Expense
                </button>

            </div>

            {/* LeaderBoard */}
            <Row>
                <Col span={12}>
                    <Card size="small" title="Total Expenses" style={{ margin: '5px' }}>
                        <p>{getCurrenySymbol(totalExpenses)}</p>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <p>{getCurrenySymbol(totalIncome)}</p>
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

            <Row>
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
                                <Table columns={columns} dataSource={expensesData[date]} pagination={false} scroll={{ x: 'max-content' }}/>
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