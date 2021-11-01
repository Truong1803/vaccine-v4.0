import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteCompany,
  getDataCompany,
} from '../../redux/actions/companyAction';
import { getDataRole } from '../../redux/actions/roleAction';
import Modal from '../alert/Modal';
import Paginate from '../Paginate/Paginate';
import CompanyModal from './CompanyModal';

function ListOrganization() {
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const dispatch = useDispatch();

  const { company, auth, role, totalItem } = useSelector((state) => state);
  useEffect(() => {
    if (auth.access_token)
      dispatch(getDataRole(page, search, auth.access_token));
  }, [page, search, auth.access_token, dispatch]);
  useEffect(() => {
    if (auth.access_token)
      dispatch(getDataCompany(page, search, auth.access_token));
  }, [page, search, auth.access_token, dispatch]);

  const handleOpenModal = (companyId) => {
    setAction("");
    setCompanyId(companyId);
    setOpenModal(!openModal);
  };

  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSearch(e.target.value);
    // }, 5000);
    setSearch(e.target.value);
  };

  const handleOnClick = (item, text, status) => {
    setAction(text);
    setItem(item);
    setStatus(status);
  };
  return (
    <div className="row">
      <div className="col-12"></div>
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
            <h3>Quản lý thông tin tài khoản Doanh nghiệp</h3>
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
              <th scope="col">Tên tổ chức</th>
              <th scope="col">Người đại diện</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Nhóm Quyền</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {company.map((item, index) => (
              <tr className="text-center " key={index}>
                <td>{index + 1}</td>
                <td>{item.organization}</td>
                <td>{item.represent}</td>
                <td>{item.phonenumber}</td>

                <td>{role.filter((i) => i.id === item.role)[0]?.name}</td>
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
                        handleOpenModal(item._id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning ml-3"
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
        <CompanyModal action={action} item={item} status={status} />
      )}
      {openModal && (
        <Modal
          body="tổ chức"
          handleOpenModal={handleOpenModal}
          itemId={companyId}
          functDelete={deleteCompany}
          auth={auth}
        />
      )}
      {totalItem > 5 && <Paginate page={page} setPage={setPage} />}
    </div>
  );
}

export default ListOrganization;
