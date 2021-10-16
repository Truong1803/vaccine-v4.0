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
                Thiết lập kế hoạch
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-12 table-responsive table-hover '>
        <table className='table'>
          <thead className='thead-dark'>
            <tr className='text-center'>
              <th scope='col'>Tổ chức đăng ký</th>
              <th scope='col'>Người đại diện</th>
              <th scope='col'>Số điện thoại</th>
              <th scope='col'>Ngày đăng ký</th>
              <th scope='col'>Trạng thái</th>
              <th scope='col'>Chi tiết</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center '>
              <td>DH Thang Long</td>
              <td>Ngô Trung Sơn</td>
              <td>0344174212</td>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListOrganizationInjection;
