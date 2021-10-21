import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteVaccine,
  getDataVaccine,
} from '../../redux/actions/vaccineAction';
import Modal from '../alert/Modal';
import Paginate from '../Paginate/Paginate';
import VaccineModal from './VaccineModal';

function ListVaccine() {
  const { auth, totalItem } = useSelector((state) => state);

  const [action, setAction] = useState("");
  const dispatch = useDispatch();

  const [item, setItem] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const searchItem = useRef();
  const { vaccine } = useSelector((state) => state);

  const [openModal, setOpenModal] = useState(false);
  const [vaccineId, setVacineId] = useState("");

  const handleOnClickUpdate = (item, text) => {
    setAction(text);
    setItem(item);
  };

  const handleOnChangeSearch = (e) => {
    e.preventDefault();
    // setTimeout(() => {
    //   setSearch(e.target.value);
    // }, 5000);
    setSearch(e.target.value);
  };

  // const handleSubmitSearch = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     setSearch(searchItem.current.value);
  //   }
  // };
  // const handleOnClickDelete = (vaccineId) => {
  //   setAction("");

  //   // dispatch(deleteVaccine(vaccineId, auth.access_token));
  //   // setOpenModal(!openModal);
  // };

  const handleOpenModal = (vaccineId) => {
    setAction("");
    setVacineId(vaccineId);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(getDataVaccine(page, search));
  }, [page, search]);
  return (
    <div className={auth.user?.role !== 1 ? "" : "container"}>
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
                  value={search}
                  onChange={handleOnChangeSearch}
                  //onKeyDown={handleSubmitSearch}
                />
              </form>
            </div>
            <div className="col-6 d-flex justify-content-center">
              {auth.user?.role !== 1 ? (
                <h3>Quản lý danh mục vắc xin</h3>
              ) : (
                <h3>Tra cứu thông tin vắc xin</h3>
              )}
            </div>
            {auth.user?.role !== 1 && (
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
            )}
          </div>
        </div>
        <div className="col-12 table-responsive table-hover ">
          <table className="table shadow-sm border rounded-lg table-striped">
            <thead className="thead-danger bg-transparent">
              <tr className="text-center table-info">
                <th scope="col">STT</th>
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
              {vaccine.length === 0 ? (
                <tr>
                  <td>Chưa có dữ liệu vắc xin</td>
                </tr>
              ) : (
                vaccine.map((item, index) => (
                  <tr className="text-center" key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name_vaccine}</td>
                    <td>{item.production_unit}</td>
                    <td>{item.country}</td>
                    <td>
                      {">"}= {item.use_obj}
                    </td>
                    <td>{item.num_ijection}</td>
                    <td>{item.time_step}</td>
                    <td>
                      {auth.user?.role !== 1 && (
                        <div className="row">
                          <button
                            type="button"
                            className="btn btn-danger  mr-2 "
                            data-toggle="modal"
                            data-target="#exampleModal"
                            // onClick={() => handleOnClickDelete(item._id)}
                            onClick={() => handleOpenModal(item._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-warning  mr-2"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => handleOnClickUpdate(item, "Sửa")}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {action !== "" && <VaccineModal action={action} item={item} />}
        {openModal && (
          <Modal
            body="vắc xin"
            handleOpenModal={handleOpenModal}
            itemId={vaccineId}
            functDelete={deleteVaccine}
            auth={auth}
          />
        )}
        {totalItem > 5 && <Paginate page={page} setPage={setPage} />}
      </div>
    </div>
  );
}

export default ListVaccine;
