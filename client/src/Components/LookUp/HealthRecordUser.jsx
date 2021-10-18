import React from "react";
import ModalDetail from "../ManageHealthRecord/ModalDetail";

function HealthRecordUser() {
  let dataLookup = [{ injectionDate: "19/10/2021" }];
  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <div className='row mt-4'>
          <div className='col-12 text-center'>
            <h3>Hồ sơ tiêm chủng</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-12 font-weight-bold mt-2 mb-3'>
                1.Thông tin cá nhân
              </div>
              <div className='col-12'>
                <div className='row'>
                  <div className='col-4'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Họ và tên:</label>
                      <p>Ngô Trung Sơn</p>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Ngày sinh: </label>
                      <p>28/05/2000</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Giới tính:</label>
                      <p>Nam</p>
                    </div>
                  </div>
                  <div className='col-4'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>
                        Số điện thoại:{" "}
                      </label>
                      <p> 0344174212</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>CMND/CCCD:</label>
                      <p>001200008471</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Số BHYT:</label>
                      <p>123456789456</p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Email: </label>
                      <p>ngoson285@gmail.com</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Nghề nghiệp:</label>
                      <p>Sinh viên</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>
                        Đơn vị công tác:
                      </label>
                      <p>Đại học thăng long</p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Địa chỉ:</label>
                      <p>
                        Thôn Xuân Thọ, Xã Minh Quang, Huyện Ba Vì, Thành phố Hà
                        Nội
                      </p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>
                        Tỉnh/Thành phố:
                      </label>
                      <p>Hà Nội</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Quận/Huyện:</label>
                      <p>Ba Vì</p>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='form-group d-flex'>
                      <label htmlFor='exampleInputEmail1'>Phường/Xã:</label>
                      <p>Minh Quang</p>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 font-weight-bold mt-2 mb-3'>
                    2.Thông tin tiêm chủng
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>Danh sách vaccine đã tiêm </div>
                </div>
                <div className='row'>
                  <div className='col-12 table-responsive table-hover '>
                    <table className='table'>
                      <thead className='thead-dark'>
                        <tr className='text-center'>
                          <th scope='col'>Số mũi</th>
                          <th scope='col'>Ngày tiêm</th>
                          <th scope='col'>Thời gian tiêm</th>
                          <th scope='col'>Tên vaccine</th>
                          <th scope='col'>Địa điểm tiêm</th>
                          <th scope='col'>Chi tiết</th>
                          <th scope='col'></th>
                          <th scope='col'></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='text-center '>
                          <td>1</td>
                          <td>10/10/2021</td>
                          <td>8h:45</td>
                          <td>Pfizer</td>
                          <td>Trạm y tế phường Mỗ Lao</td>
                          <td>
                            <div className='row justify-content-center'>
                              <button
                                type='button'
                                className='btn btn-success mr-3 '
                                data-toggle='modal'
                                data-target='#exampleModal2'
                                // onClick={handleOnchange}
                              >
                                <i className='far fa-eye'></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDetail />
    </div>
  );
}

export default HealthRecordUser;
