import React, { useState } from "react";
import ModalHealthRecord from "./ModalHealthRecord";
import ModalUpdate from "./ModalUpdate";

function ListHealthRecord() {
  const [record, setRecord] = useState();
  const [search, handleOnChangeSearch] = useState("");
  return (
    <div className='row justify-content-center'>
      <div className='col-10'>
        <div className='row mt-4 justify-content-center align-items-center'>
          <div className='col-3'>
            <form className='form-inline my-2 my-lg-0 '>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
                value={search}
                onChange={handleOnChangeSearch}
                //onKeyDown={handleSubmitSearch}
              />
            </form>
          </div>
          <div className='col-6 text-center'>
            <h3>Danh sách hồ sơ tiêm chủng</h3>
          </div>
          <div className='col-3'>
            <div className='row '>
              <div className='col-4 text-center'>
                <p>Ngày tiêm:</p>
              </div>
              <div className='col-4'>
                <form className='form-inline my-2 my-lg-0 '>
                  <input
                    className='form-control mr-sm-2'
                    type='date'
                    
                  />
                </form>
              </div>
            </div>
          </div>
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
                      <th scope='col'>STT</th>
                      <th scope='col'>Họ và tên</th>
                      <th scope='col'>Giới tính</th>
                      <th scope='col'>Ngày sinh</th>
                      <th scope='col'>CMND/CCCD</th>
                      <th scope='col'>Số điện thoại</th>
                      <th scope='col'>Ngày tiêm</th>
                      <th scope='col'>Chi tiết</th>
                      <th scope='col'></th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='text-center '>
                      <td>1</td>
                      <td>Ngô Trung Sơn</td>
                      <td>Nam</td>
                      <td>0012328312737</td>
                      <td>28/05/2000</td>
                      <td>0344174212</td>
                      <td>20/10/2021</td>
                      <td>
                        <div className='row justify-content-center'>
                          <button
                            type='button'
                            className='btn btn-success mr-3 '
                            data-toggle='modal'
                            data-target='#exampleModal'
                            // onClick={handleOnchange}
                          >
                            <i className='far fa-eye'></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className='row justify-content-center'>
                          <button
                            type='button'
                            className='btn btn-warning btn-block '
                            data-toggle='modal'
                            data-target='#exampleModal3'
                            // onClick={handleOnchange}
                          >
                            <i className='far fa-edit'></i>
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
      <ModalHealthRecord />
      <ModalUpdate />
    </div>
  );
}

export default ListHealthRecord;
