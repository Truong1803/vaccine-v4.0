import React, {
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import { getAPI } from '../../api/FetchData';
import { BarChartForInjectionUnit } from '../Chart/Chart';
import { TableDataForHealthOrganization } from '../Chart/TableData';

function ReportHealthOrganization() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataForHealthOrganiZation, setDataForHealthOrganiZation] = useState(
    []
  );
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state);
  useEffect(async () => {
    if (auth.access_token) {
      const res = await getAPI(
        `/report/report-district?startDate=${startDate}&endDate=${endDate}`,
        auth.access_token
      );
      setData(res.data.data);
      let list = [];
      for (const item of res.data.data) {
        list.push({
          name: item?.healthOrganization?.name,
          ty_le_da_tiem: item.ratio_injection,
          ty_le_phan_ung: item.ratio_sideEffect,
          da_dang_ky: item.countInjection,
          da_tiem: item.countInjected,
          phan_ung: item.countSideEffect,
        });
      }
      setDataForHealthOrganiZation(list);
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
      <TableDataForHealthOrganization data={data} />
      <div className="row">
        <div className="col-6">
          <BarChartForInjectionUnit
            label="Biểu đồ thống kê tiêm chủng theo cơ sở tiêm"
            data={dataForHealthOrganiZation}
            key_data={key_data}
          />
        </div>
        <div className="col-6">
          {/* <div className='row'>
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ReportHealthOrganization;
