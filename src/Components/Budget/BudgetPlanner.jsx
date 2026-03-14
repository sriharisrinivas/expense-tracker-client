import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Layout, Popconfirm, Row, Space, Table, Tag } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrenySymbol } from '../../helpers/helpers';
import { setBudgetDateAction, clearBudgetDateAction } from '../../Redux/Action/BudgetPlannerAction';
import ReusableModal from '../ReusableModal/ReusableModal';
import SetBudgetContent from './SetBudgetContent';

const stylesCardFn = info => {
    if (info.props.variant === 'outlined') {
        return {
            root: {
                borderColor: '#696FC7',
                boxShadow: '0 2px 8px #A7AAE1',
                borderRadius: 8,
            },
            extra: {
                color: '#696FC7',
            },
            title: {
                fontSize: 16,
                fontWeight: 500,
                color: '#A7AAE1',
            },
        };
    }
};

function BudgetPlanner() {


    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.budgetPlannerReducer.selectedDate);
    const budgetItems = useSelector(state => state.budgetPlannerReducer.budgetItems);
    const [isModalOpen, setIsModalOpen] = useState({ open: false, category: null });
    const catalogState = useSelector(state => state.catalogReducer.catalog);
    let categories = catalogState ? catalogState["CATEGORY"] : [];

    const onDateChange = (date) => {
        if (date) {
            dispatch(setBudgetDateAction(date));
        } else {
            dispatch(clearBudgetDateAction());
        }
    };

    const onClickSetBudget = (category) => {
        setIsModalOpen({ open: true, category });
    };

    const handleDelete = () => { };

    const handleCancel = () => { setIsModalOpen({ open: false, category: null }); };

    return (
        <>
            {isModalOpen.open && (
                <ReusableModal isModalOpen={isModalOpen.open} handleCancel={handleCancel}
                    title={isModalOpen.category?.id ? "Edit Budget" : "Set Budget"}
                    footer={null}
                    width={180}
                    children={<SetBudgetContent handleCancel={handleCancel} budgetData={isModalOpen.category} />} />
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <span>Filter By: </span>
                <DatePicker onChange={onDateChange} picker="month" value={selectedDate} />
            </div>


            {/* Saved Budgets */}
            {
                budgetItems.length && <>
                    <label style={{ margin: '10px' }}><b>Budgeted Categories for this Month.</b></label>
                    <Row>
                        {
                            budgetItems.map(budget => (
                                <Col key={budget.budgetId} xs={24} sm={12} md={8} lg={6} xl={4}>

                                    <Card
                                        size="small"
                                        title={budget.category}
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
                    categories.map(category => (
                        <Col key={category.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Card key={category.id} size="small" title={category.value} style={{ margin: '5px' }}>
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