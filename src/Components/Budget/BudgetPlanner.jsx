import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Layout, Popconfirm, Row, Space, Table, Tag } from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrenySymbol } from '../../helpers/helpers';
import { setBudgetDateAction, clearBudgetDateAction, fetchBudgetsThunk, deleteBudgetThunk } from '../../Redux/Action/BudgetPlannerAction';
import ReusableModal from '../ReusableModal/ReusableModal';
import SetBudgetContent from './SetBudgetContent';

function BudgetPlanner() {

    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.budgetPlannerReducer.selectedDate);
    const budgetItems = useSelector(state => state.budgetPlannerReducer.budgetItems);
    console.log("budgetItems", budgetItems);
    const [isModalOpen, setIsModalOpen] = useState({ open: false, category: null });
    const catalogState = useSelector(state => state.catalogReducer.catalog);
    let categories = catalogState ? catalogState["CATEGORY"] : [];

    let notBudgetedCategories = categories.filter(category => {
        return !budgetItems.some(budget => budget.category === category.value);
    });

    // Fetch budgets on component mount with selected date
    useEffect(() => {
        const monthString = selectedDate.format('YYYY-MM');
        dispatch(fetchBudgetsThunk(monthString));
    }, [dispatch, selectedDate]);

    const onDateChange = (date) => {
        if (date) {
            dispatch(setBudgetDateAction(date));
            // Fetch budgets for selected month
            const monthString = date.format('YYYY-MM');
            dispatch(fetchBudgetsThunk(monthString));
        } else {
            dispatch(clearBudgetDateAction());
            dispatch(fetchBudgetsThunk());
        }
    };

    const onClickSetBudget = (category) => {
        setIsModalOpen({ open: true, category });
    };

    const handleDelete = (budgetId) => {
        dispatch(deleteBudgetThunk(budgetId, selectedDate));
    };

    const handleCancel = () => { setIsModalOpen({ open: false, category: null }); };

    return (
        <>
            {isModalOpen.open && (
                <ReusableModal isModalOpen={isModalOpen.open} handleCancel={handleCancel}
                    title={isModalOpen.category?.id ? "Edit Budget" : "Set Budget"}
                    footer={null}
                    width={230}
                    children={<SetBudgetContent handleCancel={handleCancel} budgetData={isModalOpen.category} />} />
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <span>Budget Month: </span>
                <DatePicker onChange={onDateChange} picker="month" value={selectedDate} />
            </div>


            {/* Saved Budgets */}
            {
                budgetItems.length > 0 && <>
                    <label style={{ margin: '10px' }}><b>Budgeted Categories for this Month.</b></label>
                    <Row>
                        {
                            budgetItems.map(budget => (
                                <Col key={budget.budgetId} xs={24} sm={12} md={8} lg={6} xl={4}>

                                    <Card
                                        size="small"
                                        title={budget.label}
                                        actions={[
                                            <EditOutlined key="edit" style={{ color: "blue" }} onClick={() => onClickSetBudget(budget)} />,
                                            <Popconfirm
                                                title="Delete Budget"
                                                description="Are you sure you want to delete this budget?"
                                                onConfirm={() => handleDelete(budget.budgetId)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined
                                                    key="delete"
                                                    style={{ cursor: 'pointer', fontSize: '16px', color: '#ff4d4f' }}
                                                    title="Delete"
                                                />
                                            </Popconfirm>
                                        ]}
                                    >
                                        <div className='m-1'>
                                            <p>
                                                Limit: &nbsp;
                                                <Tag>
                                                    {getCurrenySymbol(budget.limit || 0)}
                                                </Tag>
                                            </p>
                                            <p >
                                                Spent: &nbsp;
                                                <Tag color={budget.limit - budget.spent < 0 ? "red" : "green"}>
                                                    {getCurrenySymbol(budget.spent || 0)}
                                                </Tag>
                                            </p>
                                            <p>
                                                Remaining: &nbsp;
                                                <Tag color={budget.limit - budget.spent < 0 ? "red" : "green"}>
                                                    {getCurrenySymbol((budget.limit || 0) - (budget.spent || 0))}
                                                </Tag>
                                            </p>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </>
            }



            {/*Budget To Be Created*/}
            <label style={{ margin: '10px' }}><b>Not Budgeted for this month.</b></label>
            <Row>
                {
                    notBudgetedCategories.map(category => (
                        <Col key={category.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Card key={category.id} size="small" title={category.label} style={{ margin: '5px' }}>
                                <button onClick={() => onClickSetBudget(category)} className='btn btn-outline-success'>Set Budget</button>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export default BudgetPlanner;