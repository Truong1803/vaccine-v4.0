import React from 'react';

import { Table } from 'react-bootstrap';

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    return "< 18";
  } else if (age >= 18 && age < 60) {
    return ">= 18";
  } else {
    return ">= 60";
  }
}
function ModalListUser({ listUser }) {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Danh sách Người dân
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>CMND/CCCD</th>
                      <th>Số điện thoại</th>
                      <th>Độ tuổi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUser.map((item, index) => (
                      <tr className="text-center" key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.identification}</td>
                        <td>{item.phonenumber}</td>
                        <td>{getAge(item.dob)}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary "
              data-dismiss="modal"
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
