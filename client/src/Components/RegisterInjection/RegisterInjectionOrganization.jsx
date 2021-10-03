import React, { useState, useEffect } from "react";
import FormImport from "./FormImport";
import ModalRegisterInjection from "./ModalRegisterInjection";

import "./RegisterinjectionStyles.css";
function RegisterInjectionOrganization() {
  const data = [];
  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSearch(e.target.value);
    // }, 5000);
    // setSearch(e.target.value);
  };

  const handleOpenModal = (organId) => {
    // setAction("");
    // setOrganId(organId);
    // setOpenModal(!openModal);
  };

  // const handleOnClickDelete = (organId) => {
  //   setAction("");
  //   dispatch(deleteOrgan(organId, auth.access_token));
  // };

  const handleOnClick = (item, text, status) => {
    // setAction(text);
    // setItem(item);
    // setStatus(status);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row mt-4 mb-2">
          <div className="col-3">
            <form className="form-inline my-2 my-lg-0 ">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                // value={search}
                onChange={handleOnChangeSearch}
              />
            </form>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <h3>Đăng ký tiêm tổ chức</h3>
          </div>
          <div className="col-3">
            <div className="action  ">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                Import
              </button>
              <button
                type="button"
                className="btn btn-outline-primary ml-2 mr-2"
              >
                Export
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  handleOnClick("", "Thêm", false);
                }}
              >
                Thêm người đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-10  ">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">Họ và Tên</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Số CCCD/CMND</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Mũi thứ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center ">
              <td>1</td>
              <td>Ngô Trung Sơn</td>
              <td>28/05/2</td>
              <td>Nam</td>
              <td>0344174212</td>
              <td>001200008471</td>
              <td>Minh Quang,Ba Vì,Hà Nội</td>
              <td>2</td>
              <td>chưa duyệt</td>
              <td>
                <div className="row justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger  mr-4"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      // handleOpenModal(item._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning  mr-4"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => {
                      handleOnClick("Sửa", false);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ModalRegisterInjection />
      <FormImport />
    </div>
  );
}

export default RegisterInjectionOrganization;
