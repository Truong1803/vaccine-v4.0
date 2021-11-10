import React from "react";

import { useSelector } from "react-redux";

import Loading from "./Loading.jsx";
import Loading1 from "./Loading1.jsx";
import Toast from "./Toast";

export const Alert = () => {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      {alert.loading && (alert.loading ? <Loading /> : <Loading1 />)}
      {alert.errors && (
        <Toast
          title='Thông báo lỗi hệ thống'
          body={alert.errors}
          bgColor='bg-danger'
        />
      )}
      {alert.success && (
        <Toast
          title='Thông báo hệ thống xử lý thành công'
          body={alert.success}
          bgColor='bg-success'
        />
      )}
    </div>
  );
};

export const showErrMsg = (msg) => {
  return <div className='errMsg'>{msg}</div>;
};

export const showSuccessMsg = (msg) => {
  return <div className='successMsg'>{msg}</div>;
};
