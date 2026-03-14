import { DatePicker, Input, InputNumber, Select, Space, Tabs, Button, Descriptions } from 'antd';
import { useContext, useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { createExpenseThunk, updateExpenseThunk, fetchExpensesThunk } from '../../Redux/Action/ExpenseThunks';
import { ExpenseContext } from '../Home/home';
import './CreateExpense.css';
import moment from 'moment';
import dayjs from 'dayjs';
const { TextArea } = Input;


const items = [
    {
        key: 'expense',
        label: 'Expense',
        // children: <div>Hi</div>,
    },
    {
        key: 'income',
        label: 'Income',
        // children: 'Content of Tab Pane 2',
    },
    // {
    //     key: '3',
    //     label: 'Tab 3',
    //     children: 'Content of Tab Pane 3',
    // },
];

function CreateExpense({ handleCancel, editingExpense, prefilledData, filter = {}, viewMode = false }) {

    const { setExpanded } = useContext(ExpenseContext);
    const initialFormState = {
        amount: null,
        description: "",
        category: "",
        account: "",
        note: "",
        date: null
    };

    const [form, setForm] = useState(
        editingExpense ? {
            amount: editingExpense.amount,
            description: editingExpense.description || "",
            category: editingExpense.category,
            account: editingExpense.account,
            note: editingExpense.note || "",
            date: moment(editingExpense.date),
            formattedDate: editingExpense.date
        } : prefilledData ? {
            amount: prefilledData.amount || prefilledData.expense || null,
            description: prefilledData.description || "",
            category: prefilledData.category || "",
            account: prefilledData.account || "",
            note: prefilledData.note || "",
            date: prefilledData.date ? dayjs(prefilledData.date) : null,
            formattedDate: prefilledData.date || null
        } : initialFormState
    );
    const [activeTab, setActiveTab] = useState(editingExpense?.type || "expense");
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const loaderState = useSelector(state => state.loaderReducer);
    const catalogState = useSelector(state => state.catalogReducer?.catalog || {});

    // Update form when editingExpense or prefilledData changes
    useEffect(() => {
        if (editingExpense) {
            setForm({
                amount: editingExpense.income || editingExpense.expense,
                description: editingExpense.description || "",
                category: editingExpense.category,
                account: editingExpense.account,
                note: editingExpense.note || "",
                date: dayjs(editingExpense.date),
                formattedDate: editingExpense.date
            });
            setActiveTab(editingExpense.type || "expense");
        } else if (prefilledData) {
            setForm({
                amount: prefilledData.amount || prefilledData.expense || null,
                description: prefilledData.description || "",
                category: prefilledData.category || "",
                account: prefilledData.account || "",
                note: prefilledData.note || "",
                date: prefilledData.date ? dayjs(prefilledData.date) : null,
                formattedDate: prefilledData.date || null
            });
            setActiveTab(prefilledData.type || "expense");
        } else {
            setForm(initialFormState);
            setActiveTab("expense");
        }
    }, [editingExpense, prefilledData]);

    // Clear form when submission is complete (loader stops)
    useEffect(() => {
        if (submitted && !loaderState.loading) {
            setForm(initialFormState);
            setActiveTab("expense");
            setSubmitted(false);
            setExpanded(false);
            handleCancel();
        }
    }, [loaderState.loading, submitted]);

    const onSubmit = async () => {
        const validateForm = () => {
            if (!form.amount || !form.formattedDate || !form.category || !form.account) {
                dispatch(renderAlertMessageAction({
                    message: "Please fill all required fields.",
                    type: "error",
                    show: true
                }));
                return false;
            }
            return true;
        }

        if (validateForm()) {
            setSubmitted(true);
            
            if (editingExpense) {
                // Update expense
                dispatch(updateExpenseThunk({ 
                    ...form, 
                    type: activeTab, 
                    expenseId: editingExpense.expenseId 
                }));
            } else {
                // Create expense
                dispatch(createExpenseThunk({ 
                    ...form, 
                    type: activeTab 
                }));
            }
        }
    };

    const onTabChange = key => {
        setActiveTab(key);
    };

    const onChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onDateChange = (date, formattedDate) => {
        console.log(date, formattedDate);
        setForm(prev => ({ ...prev, formattedDate: formattedDate, date }))
    };

    const handleDDChange = (value, name) => {
        setForm(prev => ({ ...prev, [name]: value }))
    };
    

    if (viewMode) {
        const descriptionItems = [
            {
                label: activeTab === 'income' ? 'Income' : 'Expense',
                span: { xl: 12, xxl: 12 },
                children: form.amount,
            },
            {
                label: 'Account',
                span: { xl: 12, xxl: 12 },
                children: form.account,
            },
            {
                label: 'Description',
                span: { xl: 24, xxl: 24 },
                children: form.description || '-',
            },
            {
                label: 'Date',
                span: { xl: 12, xxl: 12 },
                children: form.formattedDate ? new Date(form.formattedDate).toLocaleDateString() : '-',
            },
            {
                label: 'Category',
                span: { xl: 12, xxl: 12 },
                children: form.category,
            },
            {
                label: 'Note',
                span: { xl: 24, xxl: 24 },
                children: form.note || '-',
            },
        ];

        return (
            <div>
                <Descriptions
                    title={activeTab === 'income' ? 'Income' : 'Expense'} Details
                    bordered
                    column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
                    items={descriptionItems}
                />
                <div className='d-flex justify-content-end mt-4'>
                    <Button onClick={handleCancel}>Close</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Space.Compact
                style={{
                    width: '100%',
                }}
            >
                <div className='w-100'>

                    <Tabs activeKey={activeTab} items={items} onChange={onTabChange} />

                    <Row>
                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>{activeTab === 'income' ? 'Income' : 'Expense'}</Form.Label> <br />
                            <InputNumber placeholder="Amount" onChange={(value) => handleDDChange(value, "amount")} value={form.amount} />
                        </Col>

                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Account</Form.Label><br />
                            <Select
                                style={{ width: 120 }}
                                onChange={(value) => handleDDChange(value, "account")}
                                value={form.account || undefined}
                                options={catalogState.ACCOUNT || []}
                            />
                        </Col>

                        <Col md={9} className='mt-3'>
                            <Form.Label>Description</Form.Label><br />
                            <Input placeholder='Description' onChange={onChange} name="description" value={form.description} />
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-between'>
                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Date</Form.Label><br />
                            <DatePicker onChange={onDateChange} value={form.date} />
                        </Col>

                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Category</Form.Label><br />
                            <Select
                                style={{ width: 120 }}
                                onChange={(value) => handleDDChange(value, "category")}
                                value={form.category || undefined}
                                options={catalogState.CATEGORY || []}
                            />
                        </Col>
                    </Row>


                    <Row className='mt-3'>
                        <Col>
                            <Form.Label>Note</Form.Label>
                            <TextArea rows={4} onChange={onChange} name="note" value={form.note} />
                        </Col>
                    </Row>

                    {/* <Row> */}
                    <div className='d-flex justify-content-end mt-4'>
                        <Button type="primary" onClick={onSubmit}>{editingExpense ? 'Update' : 'Submit'}</Button>
                    </div>
                    {/* </Row> */}
                </div>
                {/* <Button type="primary">Verify</Button> */}
            </Space.Compact>

            {/* <div className='d-flex w-100 justify-content-center'>
                <Button onClick={onSubmit} className='mt-3' type="primary">Submit</Button>
            </div> */}



            {/* <Input placeholder="Basic usage" /> */}
        </div>
    );
}

export default CreateExpense;