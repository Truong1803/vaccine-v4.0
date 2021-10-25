import React, {
  useEffect,
  useState,
} from 'react';

import { getAPI } from '../../api/FetchData';

function TopData() {
  const [data, setData] = useState("");
  useEffect(async () => {
    const res = await getAPI("/report/report-top-data");
    setData(res.data.data);
  }, []);
  return (
    <div className="row mt-5 mb-4">
      <div className="col-lg-3 col-6">
        <div className="small-box bg-info">
          <div className="inner">
            <h3>{data.number_injection}</h3>
            <p>Số lượt đăng ký</p>
          </div>
          <div className="icon">
            <i className="ion ion-bag"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{data.number_injected}</h3>

            <p>Số mũi đã tiêm</p>
          </div>
          <div className="icon">
            <i className="icon ion-bag"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="small-box bg-danger">
          <div className="inner">
            <h3>{data.ratio_injection} %</h3>

            <p> Số mũi đã tiêm / Số lượng đăng ký</p>
          </div>
          <div className="icon">
            <i className="ion ion-bag"></i>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6">
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>{data.ratio_sideEffect} %</h3>

            <p>Tỷ lệ phản ứng sau tiêm</p>
          </div>
          <div className="icon">
            <i className="ion ion-bag"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopData;
