import React from 'react';

import { useSelector } from 'react-redux';

import ReportDeptHealth from '../../Components/Report/ReportDeptHealth';
import ReportHealthOrganization
  from '../../Components/Report/ReportHealthOrganization';
import ReportInjectionUnit from '../../Components/Report/ReportInjectionUnit';

function Report() {
  const { auth } = useSelector((state) => state);

  return auth?.user?.role === 3 ? (
    <ReportInjectionUnit />
  ) : auth?.user?.role === 4 ? (
    <ReportHealthOrganization />
  ) : auth?.user?.role === 5 ? (
    <ReportDeptHealth />
  ) : (
    <p>Không có báo cáo</p>
  );
}

export default Report;
