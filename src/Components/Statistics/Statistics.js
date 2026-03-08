import React from 'react';
import { useContext } from 'react';
import Expenses from '../Expenses/Expenses';
import { ExpenseContext } from '../Home/home';
import { Button, Layout, Menu, theme, DatePicker } from 'antd';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateExpense from '../CreateExpense/CreateExpense';
import { API_END_POINTS } from '../../config';
import axios from 'axios';
import dayjs from 'dayjs';
import { setExpensesAction } from '../../Redux/Action/ExpenseAction';
import { useDispatch } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;

function Statistics(props) {
    const [form, setForm] = React.useState({ date: null, formattedDate: null });
    const dispatch = useDispatch();

    console.log({ form });

    const onDateChange = (date, formattedDate) => {
        console.log(date, formattedDate);
        setForm(prev => ({ ...prev, formattedDate: formattedDate, date }));
    };

    React.useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
                const response = await axios.post(url, { filterByMonth: form.date }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                });
                dispatch(setExpensesAction(response.data));
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();
    }, [form.date]);

    return (
        <>
            <DatePicker onChange={onDateChange} picker="month" value={form.date} />
            <Expenses />
        </>
    );
}

export default Statistics;