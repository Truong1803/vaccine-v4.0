import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

import { getAPI } from "../../api/FetchData";
import { ALERT } from "../../redux/containt";
import {
  BarChartForInjectionUnit,
  PieChartForInjectionUnit,
} from "../Chart/Chart";
import { TableDataForInjectionUnit } from "../Chart/TableData";

function ReportInjectionUnit() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataForInjectionUnit, setDataForInjectionUnit] = useState([]);
  let key_data = ["da_dang_ky", "da_tiem", "phan_ung"];
  const [data, setData] = useState([]);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.access_token) {
      const getData = async () => {
        dispatch({ type: ALERT, payload: { loading: true } });
        const res = await getAPI(
          `/report/report-ward?startDate=${startDate}&endDate=${endDate}`,
          auth.access_token
        );
        setData(res.data.data);
        let list = [];
        const { Nam, Nu } = res.data.data;
        list.push({
          name: "Nam",
          ty_le_da_tiem:
            Nam.num_user_injectionNam === 0
              ? 0
              : parseFloat(
                  (
                    (Nam.countInjectedNam / Nam.num_user_injectionNam) *
                    100
                  ).toFixed(2)
                ),
          ty_le_phan_ung:
            Nam.countInjectedNam === 0
              ? 0
              : parseFloat(
                  (
                    (Nam.countSideEffectNam / Nam.countInjectedNam) *
                    100
                  ).toFixed(2)
                ),
          da_dang_ky: Nam.num_user_injectionNam,
          da_tiem: Nam.countInjectedNam,
          phan_ung: Nam.countSideEffectNam,
        });
        list.push({
          name: "Nữ",
          ty_le_da_tiem:
            Nu.num_user_injectionNu === 0
              ? 0
              : parseFloat(
                  (
                    (Nu.countInjectedNu / Nu.num_user_injectionNu) *
                    100
                  ).toFixed(2)
                ),
          ty_le_phan_ung:
            Nu.countInjectedNu === 0
              ? 0
              : parseFloat(
                  ((Nu.countSideEffectNu / Nu.countInjectedNu) * 100).toFixed(2)
                ),
          da_dang_ky: Nu.num_user_injectionNu,
          da_tiem: Nu.countInjectedNu,
          phan_ung: Nu.countSideEffectNu,
        });
        setDataForInjectionUnit(list);
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
          <h1 className=' mt-5 mb-5 text-center'>Báo cáo thống kê theo giới tính </h1>
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
        <TableDataForInjectionUnit data={data} />
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
      </div>
    </>
  );
}

export default ReportInjectionUnit;
