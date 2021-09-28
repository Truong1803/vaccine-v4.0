import React, { useState, useEffect } from "react";
import InjectionModal from "./injectionModal";
import { useDispatch, useSelector } from "react-redux";
import { getDataQH, deleteOrgan } from "../../redux/actions/oganizationAction";
function ListInjection() {
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { organization, auth } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getDataQH(page, search, auth.access_token));
  }, []);

  const handleOnClickDelete = (organId) => {
    setAction("");
    dispatch(deleteOrgan(organId, auth.access_token));
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
            <h3>Quản lý đơn vị tiêm chủng</h3>
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
              <th scope="col">Tên đơn vị tiêm chủng</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Phường/Xã</th>
              {/* <th scope="col">Quận/Huyện</th>
              <th scope="col">Tỉnh/Thành phố</th> */}
              <th scope="col">Người đại diện</th>
              <th scope="col">Số điện thoại</th>
              {/* <th scope="col">Email</th>
              <th scope="col">Số bàn tiêm</th> */}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {organization.map((item) => (
              <tr className="text-center  ">
                <td>{item.organization}</td>
                <td>{item.address}</td>
                <td>{item.ward.name}</td>
                {/* <td>{item.district.name}</td>
                <td>{item.province.name}</td> */}
                <td>{item.represent}</td>
                <td>{item.phonenumber}</td>
                {/* <td>{item.email}</td>
                <td>{item.num_table}</td> */}
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success mr-2 d-flex justify-content-center align-items-center  "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => {
                        handleOnClick(item, "Xem", true);
                      }}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mr-2 d-flex justify-content-center align-items-center  "
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
                      className="btn btn-warning  d-flex justify-content-center align-items-center  "
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
        <InjectionModal action={action} item={item} status={status} />
      )}
    </div>
  );
}

export default ListInjection;
