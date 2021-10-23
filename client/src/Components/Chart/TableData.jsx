import React from "react";
import { Table } from "react-bootstrap";
import ModalListUser from "./ModalListUser";
export const TableDataForVaccine = () => {
  return (
    <div className='row mt-5 mb-4'>
      <div className='col-12'>
        <div className='row justify-content-between ml-1 mr-1'>
          <div className='col-5 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-7'>
                Thống kê theo tỉnh/thành phố :
              </label>
              <select id='inputState' className='form-control col-5'>
                <option>Tỉnh/Thành Phố</option>
              </select>
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Từ ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Đến ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <th>Đơn vị tiêm</th>
              <th colSpan='4'>Số lượng vaccine đã thực hiện tiêm</th>
              <th>Tổng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td></td>
              <td>Verol Cell</td>
              <td>Moderna</td>
              <td>Astra Zeneca</td>
              <td>Pfizer</td>
              <td></td>
            </tr>
            <tr className='text-center'>
              <td>Trạm y tế xã Minh Quang</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20</td>
              <td>220</td>
              <td>
                <div className='row justify-content-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <ModalListUser />
    </div>
  );
};
export const TableDataForAge = () => {
  return (
    <div className='row'>
      <div className='col'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center'>
              <th>Đơn vị tiêm</th>
              <th colSpan='3'>Số lượng vaccine đã tiêm theo độ tuổi</th>
              <th>Tổng</th>

              <th colSpan='3'>
                Tỷ lệ vaccine tiêm theo độ tuổi/số lượng mũi tiêm thực hiện
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td></td>
              <td> &lt; 18 tuổi</td>
              <td> &gt;= 18 tuổi</td>
              <td> &lt;= 60 tuổi</td>
              <td></td>

              <td> &lt; 18 tuổi</td>
              <td> &gt;= 18 tuổi</td>
              <td> &lt;= 60 tuổi</td>
              <td></td>
            </tr>
            <tr className='text-center'>
              <td>Trạm y tế xã Minh Quang</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>220</td>
              <td>28,5%</td>
              <td>28,5%</td>
              <td>43%</td>
              <td>
                <div className='row justify-content-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <ModalListUser />
      </div>
    </div>
  );
};
export const TableDataForInjectionUnit = () => {
  return (
    <div className='row mt-5 mb-4'>
      <div className='col-12'>
        <div className='row justify-content-between ml-1 mr-1'>
          <div className='col-5 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-7'>
                Thống kê theo tỉnh/thành phố :
              </label>
              <select id='inputState' className='form-control col-5'>
                <option>Tỉnh/Thành Phố</option>
              </select>
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Từ ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Đến ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center '>
              <th></th>
              <th>Số lượng người đăng ký</th>
              <th>Số lượng người đã tiêm</th>
              <th>Số lượng người phản ứng sau tiêm</th>
              <th>Tỷ lệ người đã tiêm / người đã đăng ký</th>
              <th>Tỷ lệ phản ứng sau tiêm / người đăng ký</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td>Nam</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Nữ</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Tổng</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <ModalListUser />
    </div>
  );
};

export const TableDataForHealthOrganization = () => {
  return (
    <div className='row mt-5 mb-4'>
      <div className='col-12'>
        <div className='row justify-content-between ml-1 mr-1'>
          <div className='col-5 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-7'>
                Thống kê theo tỉnh/thành phố :
              </label>
              <select id='inputState' className='form-control col-5'>
                <option>Tỉnh/Thành Phố</option>
              </select>
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Từ ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Đến ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center '>
              <th>Đơn vị tiêm chủng</th>
              <th>Số lượng người đăng ký</th>
              <th>Số lượng người đã tiêm</th>
              <th>Số lượng người phản ứng sau tiêm</th>
              <th>Tỷ lệ người đã tiêm / người đã đăng ký</th>
              <th>Tỷ lệ phản ứng sau tiêm / người đăng ký</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td>Trạm y tế Hải Hoà</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Trạm y tế Hải Yên</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Trạm y tế Ka Long</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Tổng</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <ModalListUser />
    </div>
  );
};

export const TableDataForDeptHealth = () => {
  return (
    <div className='row mt-5 mb-4'>
      <div className='col-12'>
        <div className='row justify-content-between ml-1 mr-1'>
          <div className='col-5 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-7'>
                Thống kê theo tỉnh/thành phố :
              </label>
              <select id='inputState' className='form-control col-5'>
                <option>Tỉnh/Thành Phố</option>
              </select>
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Từ ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
          <div className='col-3 row'>
            <div className='form-group row align-items-center justify-content-center'>
              <label htmlFor='exampleInputEmail1' className='col-5'>
                Đến ngày :
              </label>
              <input
                type='date'
                className='form-control col-7'
                id='exampleInputEmail1'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='col-12'>
        <Table striped bordered hover>
          <thead>
            <tr className='text-center '>
              <th>Quận/Huyện</th>
              <th>Số lượng người đăng ký</th>
              <th>Số lượng người đã tiêm</th>
              <th>Số lượng người phản ứng sau tiêm</th>
              <th>Tỷ lệ người đã tiêm / người đã đăng ký</th>
              <th>Tỷ lệ phản ứng sau tiêm / người đăng ký</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <td>Thanh Xuân </td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Hà Đông</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Hai Bà Trưng</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'>
                <div className='row justify-content-center align-items-center'>
                  <button
                    type='button'
                    className='btn btn-success mr-3 '
                    data-toggle='modal'
                    data-target='#exampleModal'
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr className='text-center'>
              <td>Tổng</td>
              <td>50</td>
              <td>50</td>
              <td>100</td>
              <td>20%</td>
              <td>30%</td>
              <td className='pl-4'></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <ModalListUser />
    </div>
  );
};
