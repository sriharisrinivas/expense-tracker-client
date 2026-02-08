import { Footer } from 'antd/es/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { socket } from '../../helpers/socket-connections';
import { Input, Space } from 'antd';
import { REDUX_CONSTANTS } from '../../Redux/reduxConstants';
import { fetchConversations, fetchFilteredConversations } from '../../Redux/Action/ChatAction';
import { ExpenseContext } from '../Home/home';

function FooterComponent() {

     const { expanded } = useContext(ExpenseContext);

     const dispatch = useDispatch();

     return (
          <Footer
               style={{ padding: '10px' }}
          >
               {
                    !expanded &&
                    <Space.Compact
                         style={{
                              width: '100%',
                              position: 'sticky',
                              bottom: 25,
                              zIndex: 1,
                         }}
                    >


                    </Space.Compact>
               }

          </Footer>
     );
}

export default (FooterComponent);