import React from "react";

function ListOrganizationInjection() {
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='row'>
          <div className='col-8'></div>
        </div>
      </div>
      <div className='col-12'>
        <div className='row mt-4 mb-2'>
          <div className='col-3'>
            <form className='form-inline my-2 my-lg-0 '>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
            </form>
          </div>
          <div className='col-6 d-flex justify-content-center'>
            <h3>Danh sách đơn đăng ký</h3>
          </div>
          <div className='col-3'>
            <div className='action '>
              <button
                type='button'
                className='btn btn-primary'
                data-toggle='modal'
                data-target='#exampleModal'
                //   onClick={() => {
                //     handleOnClick("", "Thêm", false);
                //   }}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12 table-responsive table-hover '>
        <table className='table'>
          <thead className='thead-dark'>
            <tr className='text-center'>
              <th scope='col'>Họ và tên</th>
              <th scope='col'>Giới tính</th>
              <th scope='col'>Số điện thoại</th>
              <th scope='col'>CMT/CCCD</th>
              <th scope='col'>Ngày đăng ký</th>
              <th scope='col'>Trạng thái</th>
              <th scope='col'>Chi tiết</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center '>
              <td>Ngô Trung Sơn</td>
              <td>Nam</td>
              <td>0344174212</td>
              <td>001200008471</td>
              <td>22/09/2021</td>
              <td className='text-danger'>chưa duyệt</td>

              <td>
                <div className='row justify-content-center'>
                  <button
                    type='button'
                    className='btn btn-info col-6'
                    data-toggle='modal'
                    data-target='#exampleModal'
                    //   onClick={() => {
                    //     handleOnClick(item, "Xem", true);
                    //   }}
                  >
                    <i className='far fa-eye'></i>
                  </button>
                </div>
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-success mr-3 col-5 '
                  //   data-toggle='modal'
                  //   data-target='#exampleModal'
                  //   onClick={() => {
                  //     handleOnClick(item, "Sửa", false);
                  //   }}
                >
                  <i className='fas fa-check'></i>
                </button>
                <button
                  type='button'
                  className='btn btn-danger col-5 '
                  //   data-toggle='modal'
                  //   data-target='#exampleModal'
                  //   onClick={() => {
                  //     handleOnClickDelete(item._id);
                  //   }}
                >
                  <i className='fas fa-ban'></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOrganizationInjection;
