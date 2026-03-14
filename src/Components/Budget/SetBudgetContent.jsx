import { Button, Col, Form, InputNumber, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchAlertWithAutoClose } from '../../Redux/helpers/reduxHelpers';
import { createBudgetThunk, updateBudgetThunk } from '../../Redux/Action/BudgetPlannerAction';

function SetBudgetContent({ handleCancel, budgetData }) {

    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.budgetPlannerReducer.selectedDate);

    // Determine if we're in edit or add mode
    const isEditMode = budgetData?.budgetId;

    const [form, setForm] = React.useState({
        limit: isEditMode ? budgetData.limit : null,
        category: isEditMode ? budgetData.category : budgetData?.value,
        date: isEditMode ? budgetData.date : selectedDate.toISOString()
    });

    useEffect(() => {
        if (isEditMode) {
            setForm({
                limit: budgetData.limit,
                category: budgetData.category,
                date: budgetData.date
            });
        } else {
            setForm({
                limit: null,
                category: budgetData?.value,
                date: selectedDate.toISOString()
            });
        }
    }, [budgetData, isEditMode, selectedDate]);

    const handleDDChange = (value, name) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {
        if (!form.limit) {
            dispatchAlertWithAutoClose(dispatch, "Please enter a valid limit.", "error");
            return;
        }

        if (isEditMode) {
            dispatch(updateBudgetThunk({
                budgetId: budgetData.budgetId,
                limit: form.limit,
                category: form.category,
                date: form.date
            }));
            handleCancel();
        } else {
            dispatch(createBudgetThunk({
                limit: form.limit,
                category: form.category,
                date: form.date
            }, handleCancel));
        }
    };

    return (
        <div>
            <Row>
                <Col className='mt-3'>
                    <span className='field-required'>* </span>Limit <br />
                    <InputNumber
                        placeholder="Amount"
                        onChange={(value) => handleDDChange(value, "limit")}
                        value={form.limit}
                    />
                </Col>
            </Row>
            <div className='mt-4'>
                <Button type="primary" onClick={onSubmit}>
                    {isEditMode ? "Update" : "Submit"}
                </Button>
            </div>
        </div>
    );
}

export default SetBudgetContent;