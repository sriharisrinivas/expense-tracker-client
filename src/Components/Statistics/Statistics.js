import React from 'react';
import { useContext } from 'react';
import Expenses from '../Expenses/Expenses';
import { ExpenseContext } from '../Home/home';
import { Button, Layout, Menu, theme, DatePicker } from 'antd';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateExpense from '../CreateExpense/CreateExpense';
import dayjs from 'dayjs';
import { fetchExpensesThunk } from '../../Redux/Action/ExpenseThunks';
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
        dispatch(fetchExpensesThunk(form.date));
    }, [form.date, dispatch]);

    return (
        <>
            <DatePicker onChange={onDateChange} picker="month" value={form.date} />
            <Expenses />
        </>
    );
}

export default Statistics;