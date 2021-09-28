import React, { useState, useEffect } from "react";
import { getDataUser, deleteUser } from "../../redux/actions/userAction";
import UserModal from "./Usermodal";
import { useDispatch, useSelector } from "react-redux";

function ListUser() {
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { user, auth } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDataUser(page, search, auth.access_token));
  }, []);

  const handleOnClickDelete = (userId) => {
    setAction("");
    dispatch(deleteUser(userId, auth.access_token));
  };

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
              />
            </form>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <h3>Quản lý tài khoản người dùng cá nhân</h3>
          </div>
          <div className="col-3">
            <div className="action   ">
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
              <th scope="col">STT</th>
              <th scope="col">Họ và tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">CMT/CCCD</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr className="text-center " key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phonenumber}</td>
                <td>{item.identification}</td>
                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success mr-3 "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => {
                        handleOnClick(item, "Xem", true);
                      }}
                    >
                      <i className="far fa-eye"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger  "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => {
                        handleOnClickDelete(item._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning ml-3 "
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
        <UserModal action={action} item={item} status={status} />
      )}
    </div>
  );
}

export default ListUser;
