import React, { useEffect } from "react";
import "./App.css";
import Content from "./Screens/Content/Content";
import Menu from "../src/Screens/Header/Menu";
import { BrowserRouter as Router } from "react-router-dom";
import { Alert } from "./Components/alert/Alert";
import { refreshToken } from "./redux/actions/authActions";
import { useDispatch } from "react-redux";
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
  );
}

export default App;
