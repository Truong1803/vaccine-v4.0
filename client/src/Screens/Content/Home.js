import './home.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useReactToPrint } from 'react-to-print';

import {
  ChartForAge,
  ChartForVaccine,
} from '../../Components/Chart/Chart';
import {
  TableDataForAge,
  TableDataForVaccine,
} from '../../Components/Chart/TableData';
import TopData from '../../Components/Chart/TopData';
import { activeEmail } from '../../redux/actions/authActions';

function Home() {
  const dispatch = useDispatch();
  const [provinceId, setProvinceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [tinh, setTinh] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const getProvince = async () => {
      const res = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        { headers: { token: "66e22083-17df-11ec-b8c6-fade198b4859" } }
      );
      setTinh(res.data.data);
    };
    getProvince();
  }, []);

  useEffect(() => {
    if (slug) {
      dispatch(activeEmail({ active_token: slug }));
    }
  }, [slug, dispatch]);
  const tableRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  return (
    <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
      <TopData />
      <div className="col-12">
        <div className="row justify-content-between ml-1 mr-1">
          <div className="col row ">
            <div className="form-group row align-items-center justify-content-center">
              <label htmlFor="exampleInputEmail1" className="col-6">
                Tỉnh/thành phố :
              </label>
              <select
                id="inputState"
                className="form-control col-6"
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
              >
                <option hidden={true}>Tỉnh/Thành phố</option>
                <option value="">Tất cả</option>
                {tinh.map((option) => (
                  <option key={option.ProvinceID} value={option.ProvinceID}>
                    {option.ProvinceName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col row ml-1">
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
          <div className="col row">
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
          <div className="col w-50 row justify-content-center">
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
      <div ref={tableRef}>
        <TableDataForVaccine
          provinceId={provinceId}
          startDate={startDate}
          endDate={endDate}
        />
        <ChartForVaccine
          provinceId={provinceId}
          startDate={startDate}
          endDate={endDate}
        />
        <TableDataForAge
          provinceId={provinceId}
          startDate={startDate}
          endDate={endDate}
        />
        <ChartForAge
          provinceId={provinceId}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}

export default Home;
