import React from "react";

function ItemCertificate() {
  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <div className='row mt-4'>
          <div className='col-12 text-center'>
            <h5>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</h5>
            <h6>Độc lập - Tự do - Hạnh phúc</h6>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12 text-center'>
            <h4>GIẤY CHỨNG NHẬN TIÊM CHỦNG COVID 19</h4>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12 font-weight-bold'>1.Thông tin cá nhân</div>
          <div className='col-12'>
            <div className='row mt-2'>
              <div className='col-3'>Họ và tên: Ngô Trung Sơn</div>
              <div className='col-3'>Giới tính: Nam</div>
              <div className='col-3'>Ngày sinh: 28/05/2000</div>
              <div className='col-3'>Số điện thoại: 0344174212 </div>
            </div>
            <div className='row mt-3'>
              <div className='col-3'>CMND/CCCD: 001200008471</div>
              <div className='col-3'>Số BHYT: 123456789456</div>
              <div className='col-6'>
                Địa chỉ: Xuân Thọ, Minh Quang, Ba Vì, Hà Nội
              </div>
            </div>
          </div>
          <div className='col-12 mt-2 font-weight-bold'>
            2.Thông tin tiêm chủng
          </div>
          <div className='col-12'>
            <div className='row '>
              <div className='col-12'>Danh sách vaccine đã tiêm</div>
            </div>
            <div className='col-12 table-responsive table-hover '>
              <table className='table'>
                <thead className='thead-light'>
                  <tr className='text-center'>
                    <th scope='col'>Mũi tiêm</th>
                    <th scope='col'>Ngày tiêm</th>
                    <th scope='col'>Thời gian tiêm</th>
                    <th scope='col'>Tên vaccine</th>
                    <th scope='col'>Địa điểm tiêm chủng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-center '>
                    <td>1</td>
                    <td>15/10/2021</td>
                    <td>8h:30</td>
                    <td>Astra</td>
                    <td>Trung tâm y tế xã minh quang</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='col-12 bg-warning border border-dark rounded'>
          <div className='row p-3'>
            <div className='col-2 text-center'>
              <p>Đã tiêm 1 mũi vaccine</p>
              <div className='border border-dark text-center'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
                  alt=''
                  style={{ width: 150 }}
                />
              </div>
            </div>
            <div className='col-10 bg-light border border-dark rounded'>
              <div className='row'>
                <div className='col-2 p-3'>
                  <span className='mr-2'>
                    <i class='fas fa-user'></i>
                  </span>
                  Họ và tên:
                </div>
                <div className='col-10 p-3'>Trịnh Văn Trường</div>
              </div>
              <div className='row'>
                <div className='col-2 p-3'>
                  <span className='mr-2'>
                    <i class='fas fa-birthday-cake'></i>
                  </span>
                  Ngày sinh:
                </div>
                <div className='col-10 p-3'>18/03/2000</div>
              </div>
              <div className='row'>
                <div className='col-2 p-3'>
                  <span className='mr-2'>
                    <i class='fas fa-id-card'></i>
                  </span>
                  CMND/CCCD:
                </div>
                <div className='col-10 p-3'>123456789456</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCertificate;
