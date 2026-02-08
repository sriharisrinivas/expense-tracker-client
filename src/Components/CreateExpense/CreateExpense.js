import { DatePicker, Input, InputNumber, Select, Space, Tabs, Button } from 'antd';
import { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { renderAlertMessageAction } from '../../Redux/Action/AlertMessageAction';
import { ExpenseContext } from '../Home/home';
import './CreateExpense.css';
const { TextArea } = Input;


const items = [
    {
        key: '1',
        label: 'Expense',
        // children: <div>Hi</div>,
    },
    {
        key: '2',
        label: 'Income',
        // children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
];

function CreateExpense({ handleCancel }) {

    const { setExpanded } = useContext(ExpenseContext);
    const [form, setForm] = useState({});
    const [activeTab, setActiveTab] = useState("1");

    const dispatch = useDispatch();
    const chatState = useSelector(state => state.chatsReducer);


    const onSubmit = () => {

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

            console.log("first", activeTab, form)
            // item = ({ ...item, isNew: true });
            // setExpanded(false);

            // let dupCheck = false;

            // let findedConversation = chatState.conversations.find((conv) => conv.receiverDetails._id == item._id);
            // dupCheck = findedConversation ? true : false;

            // if (dupCheck) {
            //     dispatch(renderAlertMessageAction({
            //         message: "Conversation already exists.",
            //         type: "error",
            //         show: true
            //     }));
            // } else {
            //     dispatch(updateSelectedChatDetails(item));
            // }

            // dispatch({
            //     type: REDUX_CONSTANTS.UPDATE_TYPE,
            //     payload: "Individual"
            // })

            handleCancel();
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

                    <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />

                    <Row>
                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Amount</Form.Label> <br />
                            <InputNumber placeholder="Amount" onChange={(value) => handleDDChange(value, "amount")} value={form.amount} />
                        </Col>

                        <Col md={9} className='mt-3'>
                            <Form.Label>Description</Form.Label><br />
                            <Input placeholder='Description' onChange={onChange} name="description" value={form.description} />
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-between'>
                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Date</Form.Label><br />
                            <DatePicker onChange={onDateChange} />
                        </Col>

                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Category</Form.Label><br />
                            <Select
                                defaultValue="food"
                                style={{ width: 120 }}
                                onChange={(value) => handleDDChange(value, "category")}
                                options={[
                                    { value: 'food', label: 'Food' },
                                    { value: 'transport', label: 'Transport' },
                                    { value: 'culture', label: 'Culture' },
                                    { value: 'household', label: 'Household' },
                                    { value: 'clothing', label: 'Clothing' },
                                    { value: 'health', label: 'Health' },
                                    { value: 'education', label: 'Education' },
                                    { value: 'other', label: 'Other' },
                                ]}
                                value={form.category}
                            />
                        </Col>

                        <Col className='mt-3'>
                            <Form.Label><span className='field-required'>* </span>Account</Form.Label><br />
                            <Select
                                defaultValue="cash"
                                style={{ width: 120 }}
                                onChange={(value) => handleDDChange(value, "account")}
                                options={[
                                    { value: 'cash', label: 'Cash' },
                                    { value: 'bank', label: 'Bank' },
                                    { value: 'card', label: 'Card' }
                                ]}
                                value={form.account}
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
                        <Button type="primary" onClick={onSubmit}>Submit</Button>
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