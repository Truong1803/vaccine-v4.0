import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

import { getAPI } from "../../api/FetchData";
import { ALERT } from "../../redux/containt";
import { BarChartForInjectionUnit } from "../Chart/Chart";
import { TableDataForDeptHealth } from "../Chart/TableData";

function ReportDeptHealth() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataForDeptHealth, setDataForDeptHealth] = useState([]);
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.access_token) {
      dispatch({ type: ALERT, payload: { loading: true } });
      const getData = async () => {
        const res = await getAPI(
          `/report/report-province?startDate=${startDate}&endDate=${endDate}`,
          auth.access_token
        );
        setData(res.data);
        let list = [];
        for (const item of res.data) {
          list.push({
            name: item?.healthOrganization?.name,
            ty_le_da_tiem: item.ratio_injection,
            ty_le_phan_ung: item.ratio_sideEffect,
            da_dang_ky: item.countInjection,
            da_tiem: item.countInjected,
            phan_ung: item.countSideEffect,
          });
        }
        setDataForDeptHealth(list);
        dispatch({ type: ALERT, payload: { loading: false } });
      };
      getData();
    }
  }, [startDate, endDate, auth.access_token, dispatch]);
  const tableRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  return (
    <>
      <div className=''>
        <div className='col-12'>
          <h1 className=' mb-5 text-center'>Báo cáo thống kê chung</h1>
        </div>
        <div className='row  ml-1 mr-1 mt-3'>
          <div className='col-4 row justify-content-center'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Từ ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className='col-4 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Đến ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className='col-1'></div>
          <div className='col-3 w-50 row'>
            <div className='row'>
              {/* <div className="col"></div> */}
              <div className='col'>
                <button className='btn btn-primary ' onClick={handlePrint}>
                  Export to pdf
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={tableRef}>
        <TableDataForDeptHealth data={data} />
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
                {/* <PieChartForInjectionUnit
                label=" Biểu đồ thống kê tỷ lệ người đã tiêm / người đăng ký"
                key_data="ty_le_da_tiem"
                data={dataForDeptHealth}
              /> */}
              </div>
              <div className='col-6'>
                {/* <PieChartForInjectionUnit
                label="Biểu đồ thống kê tỷ lệ người phản ứng / người đã tiêm"
                key_data="ty_le_phan_ung"
                data={dataForDeptHealth}
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportDeptHealth;
