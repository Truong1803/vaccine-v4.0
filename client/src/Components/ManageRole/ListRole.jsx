import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleModal from "./RoleModal";
import { getDataRole, deleteRole } from "../../redux/actions/roleAction";

function ListRole() {
  const { auth, role } = useSelector((state) => state);
  const [action, setAction] = useState("");

  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleOnClickUpdate = (item, text) => {
    setAction(text);
    setItem(item);
  };

  const handleOnClickDelete = (roleId) => {
    setAction("");
    dispatch(deleteRole(roleId, auth.access_token));
  };
  useEffect(() => {
    dispatch(getDataRole(page, search, auth.access_token));
  }, []);

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
            <h3>Quản lý các Nhóm Quyền</h3>
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
                onClick={() => handleOnClickUpdate("", "Thêm")}
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
              <th scope="col">ID</th>
              <th scope="col">Nhóm Quyền</th>
              <th scope="col">Mô tả</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {role.map((item, index) => (
              <tr className="text-center " key={item._id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <div className="row justify-content-center">
                    <button
                      type="button"
                      className="btn btn-danger col-5 mr-2 "
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
                      className="btn btn-warning col-5 mr-2"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => handleOnClickUpdate(item, "Sửa")}
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
      {action !== "" && <RoleModal action={action} item={item} />}
    </div>
  );
}

export default ListRole;
