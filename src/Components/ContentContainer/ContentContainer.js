import React from 'react'
import { useContext } from 'react';
import Expenses from '../Expenses/Expenses';
import { ExpenseContext } from '../Home/home';
import { Button, Layout, Menu, theme } from 'antd';
import Statistics from '../Statistics/Statistics';
const { Header, Content, Footer, Sider } = Layout;

function ContentContainer(props) {

    const { selectedMenu } = useContext(ExpenseContext);
    return (
        <Content style={{ margin: '10px' }}>
            {selectedMenu === "expenses" && <Expenses />}
            {selectedMenu === "statistics" && <Statistics />}
            {/* {selectedMenu === "budget" && <div>Budget</div>} */}
        </Content>
    )
}

export default ContentContainer