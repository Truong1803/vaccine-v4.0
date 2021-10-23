import React from "react";
import ReportDeptHealth from "../../Components/Report/ReportDeptHealth";
import ReportHealthOrganization from "../../Components/Report/ReportHealthOrganization";
import ReportInjectionUnit from "../../Components/Report/ReportInjectionUnit";
function Report() {
  let check = 3;
  return check === 3 ? (
    <ReportInjectionUnit />
  ) : check === 4 ? (
    <ReportHealthOrganization />
  ) : check === 5 ? (
    <ReportDeptHealth />
  ) : (
    <p>Không có báo cáo</p>
  );
}

export default Report;
