import React, { useState } from "react";
import Complete from "./Complete";
import FormInfoUser from "./FormInfoUser";
import HistoryOfDisease from "./HistoryOfDisease";
import TabStep from "./TabStep";
const initialState = {
  userId: "",
  healthOrganizationId: "",
  dose: "",
  injectionDate: "",
  vaccineId: "",
  diseaseId: [],
};
function RegisterInjectionUser() {
  const [data, setData] = useState(initialState);
  const [status, setStatus] = useState(1);
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
          <TabStep status={status} />
        </div>
      </div>
      {status === 1 && (
        <FormInfoUser
          data={data}
          setData={setData}
          setStatus={setStatus}
          status={status}
        />
      )}
      {status === 2 && <HistoryOfDisease data={data} />}
      {status === 3 && <Complete />}
    </div>
  );
}

export default RegisterInjectionUser;
