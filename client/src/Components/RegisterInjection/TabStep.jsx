import React from "react";

function TabStep({ status }) {
  return (
    <div className=" box-step row justify-content-between">
      <div className={`step p-2 ${status === 1 && "active"} col-4 rounded`}>
        <p className="textStep">Bước 1</p>
        <h4 className="textStep">Thông tin cá nhân</h4>
      </div>
      <div className={`step p-2 ${status === 2 && "active"} col-4`}>
        <p className="textStep">Bước 2</p>
        <h4 className="textStep">Tiền sử bệnh</h4>
      </div>
      <div className={`step p-2 ${status === 3 && "active"} col-4`}>
        <p className="textStep">Bước 3</p>
        <h4 className="textStep">Hoàn thành</h4>
      </div>
    </div>
  );
}

export default TabStep;
