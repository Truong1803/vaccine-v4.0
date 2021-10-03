import React from "react";
import Complete from "./Complete";
import FormInfoUser from "./FormInfoUser";
import HistoryOfDisease from "./HistoryOfDisease";
import TabStep from "./TabStep";

function RegisterInjectionUser() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 row justify-content-center">
          <div className="  mt-4 mb-3">
            <h3>Phiếu đăng ký tiêm cá nhân</h3>
          </div>
        </div>
        <div className="col-6"></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-8">
          <TabStep />
        </div>
      </div>
      <FormInfoUser />
      {/* <HistoryOfDisease /> */}
      {/* <Complete /> */}
    </div>
  );
}

export default RegisterInjectionUser;
