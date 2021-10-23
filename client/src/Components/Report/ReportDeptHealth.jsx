import React from "react";
import {
  TableDataForDeptHealth,
  TableDataForHealthOrganization,
} from "../Chart/TableData";
import { dataForDeptHealth } from "../Chart/data";
import {
  BarChartForInjectionUnit,
  PieChartForInjectionUnit,
} from "../Chart/Chart";
function ReportDeptHealth() {
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  return (
    <>
      <TableDataForDeptHealth />
      <div className='row'>
        <div className='col-6'>
          <BarChartForInjectionUnit
            label='Biểu đồ thống kê tiêm chủng theo Quận/Huyện'
            data={dataForDeptHealth}
            key_data={key_data}
          />
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label=' Biểu đồ thống kê tỷ lệ người đã tiêm / người đăng ký'
                key_data='ty_le_da_tiem'
                data={dataForDeptHealth}
              />
            </div>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label='Biểu đồ thống kê tỷ lệ người phản ứng / người đã tiêm'
                key_data='ty_le_phan_ung'
                data={dataForDeptHealth}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportDeptHealth;
