import React from "react";
import { TableDataForHealthOrganization } from "../Chart/TableData";
import { dataForHealthOrganiZation } from "../Chart/data";
import {
  BarChartForInjectionUnit,
  PieChartForInjectionUnit,
} from "../Chart/Chart";
function ReportHealthOrganization() {
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  return (
    <>
      <TableDataForHealthOrganization />
      <div className='row'>
        <div className='col-6'>
          <BarChartForInjectionUnit
            label='Biểu đồ thống kê tiêm chủng theo cơ sở tiêm'
            data={dataForHealthOrganiZation}
            key_data={key_data}
          />
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label=' Biểu đồ thống kê tỷ lệ người đã tiêm / người đăng ký'
                key_data='ty_le_da_tiem'
                data={dataForHealthOrganiZation}
              />
            </div>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label='Biểu đồ thống kê tỷ lệ người phản ứng / người đã tiêm'
                key_data='ty_le_phan_ung'
                data={dataForHealthOrganiZation}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportHealthOrganization;
