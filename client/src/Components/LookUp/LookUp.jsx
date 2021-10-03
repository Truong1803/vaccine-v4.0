import React from "react";
import ModalLookUp from "./ModalLookUp";

function LookUp() {
  return (
    <div className='row justify-content-center'>
      <div className='col-8'>
        <div className='row mt-4'>
          <div className='col-12 text-center'>
            <h3>Tra cứu kết quả đăng ký</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 table-responsive table-hover '>
            <table className='table'>
              <thead className='thead-dark'>
                <tr className='text-center'>
                  <th scope='col'>STT</th>
                  <th scope='col'>Họ và tên</th>
                  <th scope='col'>Ngày sinh</th>
                  <th scope='col'>Số điện thoại</th>
                  <th scope='col'>Giới tính</th>
                  <th scope='col'>Số điện thoại</th>
                  <th scope='col'>Số CMND/CCCD</th>
                  <th scope='col'>Trạng thái</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center '>
                  <td>1</td>
                  <td>Ngô Trung Sơn</td>
                  <td>28/05/2000</td>
                  <td>Giới tính</td>
                  <td>0344174212</td>
                  <td>001200008471</td>
                  <td className='text-danger'>chưa xét duyệt</td>
                  <td>
                    <div className='row justify-content-center'>
                      <button
                        type='button'
                        className='btn btn-success mr-3 '
                        data-toggle='modal'
                        data-target='#exampleModal'
                        // onClick={() => {
                        //   handleOnClick(item, "Xem", true);
                        // }}
                      >
                        <i className='far fa-eye'></i>
                      </button>

                      <button
                        type='button'
                        className='btn btn-danger  '
                        data-toggle='modal'
                        data-target='#exampleModal'
                        onClick={() => {
                          // handleOnClickDelete(item._id);
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <ModalLookUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookUp;
