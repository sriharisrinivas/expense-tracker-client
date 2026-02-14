import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Home from './Components/Home/home';
import { Bars } from 'react-loader-spinner';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AlertDismissible from './Components/Alert/AlertMessage';
import Layout from './Components/Layout/Layout';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Button, message, Space } from 'antd';
import { useEffect } from 'react';
import Login from './Components/Login/Login';

const PrivateRoute = ({ children, ...rest }) => {
  const jwtToken = sessionStorage.getItem('token');
  return jwtToken ? children : <Navigate to="/" />;
};

const UserAlrealyLoggedInRoute = ({ children, ...rest }) => {
  const jwtToken = sessionStorage.getItem('token');
  return !jwtToken ? children : <Navigate to="/home" />;
};

function App() {
  const alertMessaage = useSelector(state => state.AlertMessageReducer);
  const loaderState = useSelector(state => state.loaderReducer);
  console.log("loaderState", loaderState);
  const darkModeState = useSelector(state => state.darkModeReducer.isDarkMode);

  const [messageApi, contextHolder] = message.useMessage();

  const showMessageCallBack = () => {
    messageApi.open({
      type: alertMessaage.type,
      content: alertMessaage.message,
    });
  };

  useEffect(() => {
    if (alertMessaage.show) {
      showMessageCallBack()
    }
  }, [alertMessaage])

  return (
    <>
      <Theme appearance={darkModeState ? "dark" : "light"}>
        <BrowserRouter>
          {loaderState.loading == true &&
            <div style={{ position: "relative" }}>
              <Bars
                height="100vh"
                width="80"
                color="#f7931e"
                ariaLabel="bars-loading"
                wrapperStyle={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: 9999 }}
                wrapperClass=""
                visible={true}
              />
            </div>
          }

          {/* <Home /> */}
          {/* <Login /> */}
          <div className="alert-container">
              {contextHolder}
          </div>

          <Routes>
            <Route exact path="/"
              element={
                <UserAlrealyLoggedInRoute>
                  <Login />
                </UserAlrealyLoggedInRoute>
              }
            />
            <Route exact path="/home"
              element={
                <PrivateRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </PrivateRoute>
              }
            />
           
          </Routes>

        </BrowserRouter>
      </Theme>
    </>
  )
}

export default App;
