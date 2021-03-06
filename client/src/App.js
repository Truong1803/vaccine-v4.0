import './App.css';

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from '../src/Screens/Header/Menu';
import { Alert } from './Components/alert/Alert';
import { refreshToken } from './redux/actions/authActions';
import Content from './Screens/Content/Content';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const firstLogin = localStorage.getItem("logged");
    if (firstLogin) {
      const refresh_token = async () => {
        dispatch(refreshToken());
        setTimeout(() => {
          refresh_token();
        }, 10 * 60 * 1000);
      };
      refresh_token();
    }
    // dispatch(refreshToken());
  }, [dispatch]);
  return (
    <Router>
      <div className="wrapper">
        <Alert />
        <Menu />
        <Content />
        {/* <Footer /> */}
      </div>
    </Router>
    // <ShowModal />
  );
}

export default App;
