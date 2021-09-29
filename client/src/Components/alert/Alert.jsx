import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";
import Loading from "./Loading.jsx";
import Loading1 from "./Loading1.jsx";
export const Alert = () => {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      {alert.loading && (alert.loading ? <Loading /> : <Loading1 />)}
      {alert.errors && (
        <Toast title="Errors" body={alert.errors} bgColor="bg-danger" />
      )}
      {alert.success && (
        <Toast title="Success" body={alert.success} bgColor="bg-success" />
      )}
    </div>
  );
};

export const showErrMsg = (msg) => {
  return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = (msg) => {
  return <div className="successMsg">{msg}</div>;
};
