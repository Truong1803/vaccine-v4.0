import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { deleteOrgan, getDataQH } from "../../redux/actions/oganizationAction";
import Modal from "../alert/Modal";
import Paginate from "../Paginate/Paginate";
import DeptHealthModal from "./DeptHealthModal";

function ListDeptHealth() {
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [organId, setOrganId] = useState("");

  const dispatch = useDispatch();

  const { organization, auth, totalItem } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDataQH(page, search, auth.access_token));
  }, [page, search]);

  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSearch(e.target.value);
    // }, 5000);
    setSearch(e.target.value);
  };

  const handleOpenModal = (organId) => {
    setAction("");
    setOrganId(organId);
    setOpenModal(!openModal);
  };

  // const handleOnClickDelete = (organId) => {
  //   setAction("");
  //   dispatch(deleteOrgan(organId, auth.access_token));
  // };

  const handleOnClick = (item, text, status) => {
    setAction(text);
    setItem(item);
    setStatus(status);
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-8"></div>
        </div>
      </div>
      <div className="col-12">
        <div className="row mt-4 mb-2">
          <div className="col-3">
            <form className="form-inline my-2 my-lg-0 ">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleOnChangeSearch}
              />
            </form>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <h3>Quản lý cơ sở y tế quận huyện</h3>
          </div>
          <div className="col-3">
            <div className="action  ">
              <button type="button" className="btn btn-outline-primary">
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
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 table-responsive table-hover ">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">Tên cơ sở y tế</th>
              <th scope="col">Người đại diện</th>
              <th scope="col">Quận/Huyện</th>
              <th scope="col">Tỉnh/Thành Phố</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {organization.length === 0
              ? "Chưa có dữ liệu sở y tế quận/huyện "
              : organization.map((item) => (
                  <tr className="text-center ">
                    <td>{item.organization}</td>
                    <td>{item.represent}</td>
                    <td>{item.district.name}</td>
                    <td>{item.province.name}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.email}</td>
                    <td>
                      <div className="row justify-content-center">
                        <button
                          type="button"
                          className="btn btn-danger  mr-4"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            handleOpenModal(item._id);
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
                            handleOnClick(item, "Sửa", false);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {action !== "" && (
        <DeptHealthModal action={action} item={item} status={status} />
      )}
      {openModal && (
        <Modal
          body="sở y tế quận/huyện"
          handleOpenModal={handleOpenModal}
          itemId={organId}
          functDelete={deleteOrgan}
          auth={auth}
        />
      )}
      {totalItem > 5 && <Paginate page={page} setPage={setPage} />}
    </div>
  );
}

export default ListDeptHealth;
