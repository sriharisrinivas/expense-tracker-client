import React from 'react'
import { useContext } from 'react';
import Expenses from '../Expenses/Expenses';
import { ExpenseContext } from '../Home/home';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function ContentContainer(props) {

    const { selectedMenu } = useContext(ExpenseContext);
    return (
        <Content style={{ margin: '10px' }}>
            <Expenses />
        </Content>
    )
}

export default ContentContainer