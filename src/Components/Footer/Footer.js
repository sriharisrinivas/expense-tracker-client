import { Footer } from 'antd/es/layout/layout';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
// import { socket } from '../../helpers/socket-connections';
import { Space } from 'antd';
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
                         hi

                    </Space.Compact>
               }

          </Footer>
     );
}

export default (FooterComponent);