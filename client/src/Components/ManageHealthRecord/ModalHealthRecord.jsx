import React, { useState } from "react";
import ModalDetail from "./ModalDetail";

function ModalHealthRecord() {
  const [record, setRecord] = useState();
  return (
    <div>
      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Hồ Sơ Tiêm Chủng
              </h5>
              <button
                type='button'
                class='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div class='modal-body'>
              <div className='row'>
                <div className='col-12'>1.Thông tin cá nhân</div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Họ và tên:</label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Ngày sinh:</label>
                        <input type='date' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Giới tính:</label>
                        <select id='inputState' className='form-control'>
                          <option>Nam</option>
                        </select>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>
                          Số điện thoại:
                        </label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>CMND/CCCD:</label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Số BHYT:</label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Email:</label>
                        <input type='email' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Nghề nghiệp:</label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>
                          Đơn vị công tác:
                        </label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Địa chỉ:</label>
                        <input type='text' className='form-control' />
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>
                          Tỉnh/Thành phố:
                        </label>
                        <select id='inputState' className='form-control'>
                          <option>Thành phố</option>
                        </select>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Quận/Huyện:</label>
                        <select id='inputState' className='form-control'>
                          <option>Quận/Huyện</option>
                        </select>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Phường/Xã:</label>
                        <select id='inputState' className='form-control'>
                          <option>Phường/Xã</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>2.Thông tin tiêm chủng</div>
                  </div>
                  <div className='row'>
                    <div className='col'>Danh sách vaccine đã tiêm </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 table-responsive table-hover '>
                      {record === "notFound" ? (
                        "Hiện tại bạn chưa đăng ký tiêm chủng"
                      ) : (
                        <>
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
                                <td>9h50</td>
                                <td>Astra</td>
                                <td>Bệnh viện đa khoa ba vì</td>

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
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-dismiss='modal'
              >
                Huỷ
              </button>
              <button type='button' class='btn btn-primary'>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalDetail />
    </div>
  );
}

export default ModalHealthRecord;
