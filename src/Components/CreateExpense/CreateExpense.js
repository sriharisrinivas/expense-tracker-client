import { DatePicker, Input, InputNumber, Select, Space, Tabs, Button } from 'antd';
import { useContext, useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { ExpenseContext } from '../Home/home';
import './CreateExpense.css';
import axios from 'axios';
import { API_END_POINTS } from '../../config';
import { setExpensesAction } from '../../Redux/Action/ExpenseAction';
import { startLoaderAction, stopLoaderAction } from '../../Redux/Action/LoaderAction';
import moment from 'moment';
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

function CreateExpense({ handleCancel, editingExpense }) {

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
        } : initialFormState
    );
    const [activeTab, setActiveTab] = useState(editingExpense?.type || "expense");
    const [submitted, setSubmitted] = useState(false);
    const [catalogData, setCatalogData] = useState({});
    const dispatch = useDispatch();
    const loaderState = useSelector(state => state.loaderReducer);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_CATALOG + "?type=CATEGORY,ACCOUNT";
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
                // Handle catalog data as needed
                setCatalogData(response.data.catalog || {});
            } catch (error) {
                console.log(error);
            }
        };

        fetchCatalog();
    }, []);

    // Update form when editingExpense changes
    useEffect(() => {
        if (editingExpense) {
            setForm({
                amount: editingExpense.income || editingExpense.expense,
                description: editingExpense.description || "",
                category: editingExpense.category,
                account: editingExpense.account,
                note: editingExpense.note || "",
                date: moment(editingExpense.date),
                formattedDate: editingExpense.date
            });
            setActiveTab(editingExpense.type || "expense");
        } else {
            setForm(initialFormState);
            setActiveTab("expense");
        }
    }, [editingExpense]);

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
            console.log("first", activeTab, form);
            setSubmitted(true);
            dispatch(startLoaderAction());
            
            try {
                if (editingExpense) {
                    // Update expense
                    const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_EXPENSE;
                    await axios.put(url, { ...form, type: activeTab, expenseId: editingExpense.expenseId }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                        }
                    });
                } else {
                    // Create expense
                    const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_EXPENSE;
                    await axios.post(url, { ...form, type: activeTab }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                        }
                    });
                }
                
                // Fetch updated expenses after creating/updating
                const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
                const response = await axios.get(getUrl, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                });

                if (response.data) {
                    setForm(initialFormState);
                }
                
                dispatch(setExpensesAction(response.data));
                dispatch(stopLoaderAction());
            } catch (error) {
                console.log(error);
                dispatch(stopLoaderAction());
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
    }
    console.log("first, ", form)

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
                                options={catalogData.ACCOUNT || []}
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
                                options={catalogData.CATEGORY || []}
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