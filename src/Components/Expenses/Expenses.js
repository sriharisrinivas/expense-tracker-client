import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ExpenseContext } from '../Home/home';
import ReusableModal from '../ReusableModal/ReusableModal';
import CreateExpense from '../CreateExpense/CreateExpense';
import { Button, Layout, Card, theme, Row, Col, Table, Space } from 'antd';
const { Content, Footer, Sider } = Layout;

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    // render: text => <a>{text}</a>,
  },
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: 'Income',
    dataIndex: 'income',
    key: 'income',
  },
  {
    title: 'Expense',
    dataIndex: 'expense',
    key: 'expense',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
      </Space>
    ),
  },
];
// const data = [
//     {
//         key: '1',
//         category: 'Food',
//         account: 'Credit Card',
//         income: '',
//         expense: '$20',
//         date: '19 Feb 2024',
//     },
//     {
//         key: '2',
//         category: 'Salary',
//         account: 'Bank Account',
//         income: '$2000',
//         expense: '',
//         date: '19 Feb 2024',
//     },
//     {
//         key: '3',
//         category: 'Entertainment',
//         account: 'Cash',
//         income: '',
//         expense: '$50',
//         date: '20 Feb 2024',
//     },
// ];

const expensesData = {
  '19 Feb 2024': [
    {
      key: '1',
      category: 'Food',
      account: 'Credit Card',
      income: '',
      expense: '$20',
      date: '19 Feb 2024'
    },
    {
      key: '2',
      category: 'Salary',
      account: 'Bank Account',
      income: '$2000',
      expense: '',
      date: '19 Feb 2024'
    }
  ],
  '20 Feb 2024': [
    {
      key: '3',
      category: 'Entertainment',
      account: 'Cash',
      income: '',
      expense: '$50',
      date: '20 Feb 2024'
    }
  ]
}

function Expenses() {
    const { setExpanded } = useContext(ExpenseContext);

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // const chatState = useSelector(state => state.chatsReducer);
    const [openChatList, setOpenChatList] = React.useState(true);

    const onSelectChat = (item) => {
        // setExpanded(false);

        // dispatch(updateSelectedChatDetails(item));

        // // This is for finding type of chat, whether individual or group
        // dispatch({
        //     type: REDUX_CONSTANTS.UPDATE_TYPE,
        //     payload: "Individual"
        // })
    }

    return (
        <div className=''>
            <ReusableModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)}
                title="Track Expense" footer={null} width={500}
                children={<CreateExpense handleCancel={() => setIsModalOpen(false)} />} />

            <div className='m-3 d-flex justify-content-between' style={{ color: 'white' }} >
                <span className='sidebar-header'>Expense Tracking</span>
                <button onClick={() => setIsModalOpen(true)} className='btn btn-primary'>
                    <i className="fas fa-plus"></i> Add Expense
                </button>

            </div>

            {/* LeaderBoard */}
            <Row>
                <Col span={12}>
                    <Card size="small" title="Total Expenses" style={{ margin: '5px' }}>
                        <p>10000</p>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <p>15000</p>
                    </Card>
                </Col>

                {/* <Col span={12}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <p>15000</p>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card size="small" title="Total Income" style={{ margin: '5px' }}>
                        <p>15000</p>
                    </Card>
                </Col> */}
            </Row>

            <Row>
                <Col span={24}>
                    {
                        Object.keys(expensesData).map(date => (
                            <Card size="small" title={date} style={{ margin: '5px' }} key={date}>
                                <Table columns={columns} dataSource={expensesData[date]} pagination={false} scroll={{ x: 'max-content' }}/>
                            </Card>
                        ))
                    }
                    {/* <Card size="small" title="19 Feb 2024" style={{ margin: '5px' }}>
                        <Table columns={columns} dataSource={data}  scroll={{ x: 'max-content' }}/>
                    </Card> */}
                </Col>
            </Row>

            
            {/* <Collapse in={openChatList}>
            </Collapse> */}
        </div>
    );
}

export default Expenses;