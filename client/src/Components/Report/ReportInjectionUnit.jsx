import React, {
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { getAPI } from '../../api/FetchData';
import {
  BarChartForInjectionUnit,
  PieChartForInjectionUnit,
} from '../Chart/Chart';
import { dataForInjectionUnit } from '../Chart/data';
import { TableDataForInjectionUnit } from '../Chart/TableData';

function ReportInjectionUnit() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state);
  useEffect(async () => {
    if (auth.access_token) {
      const res = await getAPI(
        `/report/report-ward?startDate=${startDate}&endDate=${endDate}`,
        auth.access_token
      );
      setData(res.data.data);
    }
  }, [startDate, endDate, auth.access_token]);
  return (
    <>
      <div className="col-12">
        <div className="row justify-content-between ml-1 mr-1">
          <div className="col-5 row"></div>
          <div className="col-3 row">
            <div className="form-group row align-items-center justify-content-center">
              <label htmlFor="exampleInputEmail1" className="col-5">
                Từ ngày :
              </label>
              <input
                type="date"
                className="form-control col-7"
                id="exampleInputEmail1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-3 row">
            <div className="form-group row align-items-center justify-content-center">
              <label htmlFor="exampleInputEmail1" className="col-5">
                Đến ngày :
              </label>
              <input
                type="date"
                className="form-control col-7"
                id="exampleInputEmail1"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <TableDataForInjectionUnit data={data} />
      <div className="row">
        <div className="col-6">
          <BarChartForInjectionUnit
            label="Biểu đồ thống kê tiêm chủng theo giới tính"
            data={dataForInjectionUnit}
            key_data={key_data}
          />
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <PieChartForInjectionUnit
                label=" Biểu đồ thống kê tỷ lệ người đã tiêm / người đăng ký"
                key_data="ty_le_da_tiem"
                data={dataForInjectionUnit}
              />
            </div>
            <div className="col-6">
              <PieChartForInjectionUnit
                label="Biểu đồ thống kê tỷ lệ người phản ứng / người đã tiêm"
                key_data="ty_le_phan_ung"
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
