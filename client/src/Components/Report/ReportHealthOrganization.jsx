import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { getAPI } from '../../api/FetchData';
import { ALERT } from '../../redux/containt';
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

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.access_token) {
      const getData = async () => {
        dispatch({ type: ALERT, payload: { loading: true } });
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
      <div ref={tableRef}>
        <div className="">
          <div className="row  ml-1 mr-1 mt-3">
            <div className="col-12">
              <h1 className=" mb-5 text-center">
                B??o c??o th???ng k?? t??nh h??nh ti??m ch???ng
              </h1>
            </div>
            <div className="col-4 row justify-content-center">
              <div className="form-group row align-items-center justify-content-center">
                <label htmlFor="exampleInputEmail1" className="col-5">
                  T??? ng??y :
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
            <div className="col-4 row">
              <div className="form-group row align-items-center justify-content-center">
                <label htmlFor="exampleInputEmail1" className="col-5">
                  ?????n ng??y :
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
            <div className="col-1"></div>
            <div className="col-3 w-50 row">
              <div className="row">
                {/* <div className="col"></div> */}
                <div className="col">
                  <button className="btn btn-primary " onClick={handlePrint}>
                    Export to pdf
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <TableDataForHealthOrganization data={data} />
          <div className="row">
            <div className="col-6">
              <BarChartForInjectionUnit
                label="Bi???u ????? th???ng k?? ti??m ch???ng theo c?? s??? ti??m"
                data={dataForHealthOrganiZation}
                key_data={key_data}
              />
            </div>
            <div className="col-6">
              {/* <div className='row'>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label=' Bi???u ????? th???ng k?? t??? l??? ng?????i ???? ti??m / ng?????i ????ng k??'
                key_data='ty_le_da_tiem'
                data={dataForHealthOrganiZation}
              />
            </div>
            <div className='col-6'>
              <PieChartForInjectionUnit
                label='Bi???u ????? th???ng k?? t??? l??? ng?????i ph???n ???ng / ng?????i ???? ti??m'
                key_data='ty_le_phan_ung'
                data={dataForHealthOrganiZation}
              />
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportHealthOrganization;
