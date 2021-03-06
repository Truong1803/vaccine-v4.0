import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteOrgan,
  getDataQH,
} from '../../redux/actions/oganizationAction';
import Modal from '../alert/Modal';
import Paginate from '../Paginate/Paginate';
import DeptHealthModal from './DeptHealthModal';

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
    if (auth.access_token) dispatch(getDataQH(page, search, auth.access_token));
  }, [page, search, auth.access_token, dispatch]);

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
            <h3>Qu???n l?? c?? s??? y t??? qu???n huy???n</h3>
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
              <th scope="col">T??n c?? s??? y t???</th>
              <th scope="col">Ng?????i ?????i di???n</th>
              <th scope="col">Qu???n/Huy???n</th>
              <th scope="col">T???nh/Th??nh Ph???</th>
              <th scope="col">S??? ??i???n tho???i</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {organization.length === 0 ? (
              <tr>
                <td>Ch??a c?? d??? li???u s??? y t??? qu???n/huy???n</td>
              </tr>
            ) : (
              organization.map((item) => (
                <tr className="text-center " key={item._id}>
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
                          handleOnClick(item, "S???a", false);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {action !== "" && (
        <DeptHealthModal action={action} item={item} status={status} />
      )}
      {openModal && (
        <Modal
          body="s??? y t??? qu???n/huy???n"
          handleOpenModal={handleOpenModal}
          itemId={organId}
          functDelete={deleteOrgan}
          auth={auth}
        />
      )}
      {totalItem > 10 && <Paginate page={page} setPage={setPage} />}
    </div>
  );
}

export default ListDeptHealth;
