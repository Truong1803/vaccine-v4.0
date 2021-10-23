import React from "react";
import {
  BarChartForInjectionUnit,
  PieChartForInjectionUnit,
} from "../Chart/Chart";
import { TableDataForInjectionUnit } from "../Chart/TableData";
import { dataForInjectionUnit } from "../Chart/data";
function ReportInjectionUnit() {
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  return (
    <>
      <TableDataForInjectionUnit />
      <div className='row'>
        <div className='col-6'>
          <BarChartForInjectionUnit
            label='Biểu đồ thống kê tiêm chủng theo giới tính'
            data={dataForInjectionUnit}
            key_data={key_data}
          />
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label=' Biểu đồ thống kê tỷ lệ người đã tiêm / người đăng ký'
                key_data='ty_le_da_tiem'
                data={dataForInjectionUnit}
              />
            </div>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label='Biểu đồ thống kê tỷ lệ người phản ứng / người đã tiêm'
                key_data='ty_le_phan_ung'
                data={dataForInjectionUnit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportInjectionUnit;
