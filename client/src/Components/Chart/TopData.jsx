import React from "react";

function TopData() {
  return (
    <div className='row mt-5 mb-4'>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-info'>
          <div className='inner'>
            <h3>150</h3>
            <p>Số người đăng ký</p>
          </div>
          <div className='icon'>
            <i className='ion ion-bag'></i>
          </div>
          <a href='#' className='small-box-footer'>
            Xem thêm <i className='fas fa-arrow-circle-right'></i>
          </a>
        </div>
      </div>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-success'>
          <div className='inner'>
            <h3>150</h3>

            <p>Số người đăng ký</p>
          </div>
          <div className='icon'>
            <i className='icon ion-bag'></i>
          </div>
          <a href='#' className='small-box-footer'>
            Xem thêm <i className='fas fa-arrow-circle-right'></i>
          </a>
        </div>
      </div>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-danger'>
          <div className='inner'>
            <h3>100 %</h3>

            <p>Người đã tiêm / người đăng ký</p>
          </div>
          <div className='icon'>
            <i className='ion ion-bag'></i>
          </div>
          <a href='#' className='small-box-footer'>
            Xem thêm <i className='fas fa-arrow-circle-right'></i>
          </a>
        </div>
      </div>
      <div className='col-lg-3 col-6'>
        <div className='small-box bg-warning'>
          <div className='inner'>
            <h3>150%</h3>

            <p> số người phản ứng / người tiêm</p>
          </div>
          <div className='icon'>
            <i className='ion ion-bag'></i>
          </div>
          <a href='#' className='small-box-footer'>
            Xem thêm <i className='fas fa-arrow-circle-right'></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopData;
