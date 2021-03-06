import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteUser,
  getDataUser,
} from '../../redux/actions/userAction';
import Modal from '../alert/Modal';
import Paginate from '../Paginate/Paginate';
import UserModal from './Usermodal';

function ListUser() {
  const [action, setAction] = useState("");
  const [item, setItem] = useState("");
  const [status, setStatus] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const { user, auth, totalItem } = useSelector((state) => state);
  useEffect(() => {
    if (auth.access_token)
      dispatch(getDataUser(page, search, auth.access_token));
  }, [page, search, auth.access_token, dispatch]);

  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSearch(e.target.value);
    // }, 5000);
    setSearch(e.target.value);
  };

  const handleOpenModal = (userId) => {
    setAction("");
    setUserId(userId);
    setOpenModal(!openModal);
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
                value={search}
                onChange={handleOnChangeSearch}
              />
            </form>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <h3>Qu???n l?? t??i kho???n ng?????i d??ng c?? nh??n</h3>
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
                  handleOnClick("", "Th??m", false);
                }}
              >
                Th??m
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
              <th scope="col">H??? v?? t??n</th>
              <th scope="col">S??? ??i???n tho???i</th>
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
                        handleOpenModal(item._id);
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
                        handleOnClick(item, "S???a", false);
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
      {openModal && (
        <Modal
          body="ng?????i d??n"
          handleOpenModal={handleOpenModal}
          itemId={userId}
          functDelete={deleteUser}
          auth={auth}
        />
      )}
      {totalItem > 10 && <Paginate page={page} setPage={setPage} />}
    </div>
  );
}

export default ListUser;
