import React from "react";
import { Table } from "react-bootstrap";
function ModalListUser() {
  return (
    <div
      className='modal fade'
      id='exampleModal'
      tabindex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Danh sách Người dân
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col'>
                <Table striped bordered hover>
                  <thead>
                    <tr className='text-center'>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>CMND/CCCD</th>
                      <th>Số điện thoại</th>
                      <th>Độ tuổi</th>
                      <th>Ngày tiêm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='text-center'>
                      <td>1</td>
                      <td>Ngô Trung Sơn</td>
                      <td>001200008471</td>
                      <td>0344174212</td>
                      <td> >=18</td>
                      <td>19/10/2021</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary '
              data-dismiss='modal'
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalListUser;