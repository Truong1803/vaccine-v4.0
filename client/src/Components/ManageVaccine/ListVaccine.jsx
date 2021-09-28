import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVaccine,
  getDataVaccine,
} from "../../redux/actions/vaccineAction";
import VaccineModal from "./VaccineModal";

function ListVaccine() {
  const { auth } = useSelector((state) => state);

  const [action, setAction] = useState("");
  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { vaccine } = useSelector((state) => state);

  const handleOnClickUpdate = (item, text) => {
    setAction(text);
    setItem(item);
  };

  const handleOnClickDelete = (vaccineId) => {
    setAction("");
    dispatch(deleteVaccine(vaccineId, auth.access_token));
  };

  useEffect(() => {
    dispatch(getDataVaccine(page, search));
  }, []);
  return (
    <div className="row">
      <div className="col-12 justify-content-center align-items-center">
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
            <h3>Quản lý danh mục vắc xin</h3>
          </div>
          <div className="col-3">
            <div className="action ">
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
      <div className="col-12 table-responsive table-hover">
        <table className="table">
          <thead className="thead-dark">
            <tr className="text-center">
              <th scope="col">Mã vaccine</th>
              <th scope="col">Tên vaccine</th>
              <th scope="col">Tên hãng</th>
              <th scope="col">Tên nước</th>
              <th scope="col">Đối tượng</th>
              <th scope="col">Số mũi</th>
              <th scope="col">Thời gian tiêm giữa các mũi</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {vaccine.map((item) => (
              <tr className="text-center" key={item._id}>
                <td>{item._id}</td>
                <td>{item.name_vaccine}</td>
                <td>{item.production_unit}</td>
                <td>{item.country}</td>
                <td>{item.use_obj}</td>
                <td>{item.num_ijection}</td>
                <td>{item.time_step}</td>
                <td>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-danger  mr-2 "
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => handleOnClickDelete(item._id)}
                    >
                      <i className="fas fa-trash"></i> Xoá
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning  mr-2"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => handleOnClickUpdate(item, "Sửa")}
                    >
                      <i className="fas fa-edit"></i> Sửa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {action !== "" && <VaccineModal action={action} item={item} />}
    </div>
  );
}

export default ListVaccine;
