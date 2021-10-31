import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  getPostInjection,
  getPreInjection,
} from '../../redux/actions/injection_inforAction';
import ModalUpdate from './ModalUpdate';

function UpdateInjection({ status }) {
  const dispatch = useDispatch();
  const { auth, injectionInfor, alert } = useSelector((state) => state);

  // const [page, setPage] = useState("");
  // const [search, setSearch] = useState("");
  const [injectionDate, setInjectionDate] = useState("");

  const [dataUpdate, setDataUpdate] = useState("");

  const handleSetDataUpdate = (item) => {
    setDataUpdate(item);
  };

  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (auth.access_token && status === false) {
      dispatch(getPreInjection(auth.access_token, injectionDate));
    } else if (auth.access_token && status === true) {
      dispatch(getPostInjection(auth.access_token, injectionDate));
    }
  }, [auth.access_token, status, callback, injectionDate, alert, dispatch]);

  const [search1, handleOnChangeSearch] = useState("");

  return (
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row mt-4 justify-content-center align-items-center">
          <div className="col-3">
            <form className="form-inline my-2 my-lg-0 ">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search1}
                onChange={handleOnChangeSearch}
                //onKeyDown={handleSubmitSearch}
              />
            </form>
          </div>
          <div className="col-6 text-center">
            <h3>Danh sách hồ sơ tiêm chủng</h3>
          </div>
          <div className="col-3">
            <div className="row ">
              <div className="col-4 text-center">
                <p>Ngày tiêm:</p>
              </div>
              <div className="col-4">
                <form className="form-inline my-2 my-lg-0 ">
                  <input
                    className="form-control mr-sm-2"
                    type="date"
                    value={injectionDate}
                    onChange={(e) => setInjectionDate(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 table-responsive table-hover ">
            <table className="table">
              <thead className="thead-dark">
                <tr className="text-center">
                  <th scope="col">STT</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">CMND/CCCD</th>
                  <th scope="col">Loại vắc xin</th>
                  <th scope="col">Mũi tiêm thứ</th>
                  <th scope="col">Ngày tiêm</th>
                  <th scope="col">Giờ tiêm</th>
                  <th scope="col">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {injectionInfor.map((item, index) => (
                  <tr className="text-center " key={index}>
                    <td>{index + 1}</td>
                    <td>{item.user?.name}</td>
                    <td>{item.user?.gender}</td>
                    <td>{item.user?.identification}</td>

                    <td>{item.vaccine?.name_vaccine}</td>

                    <td>
                      {item.dose === 1
                        ? "Mũi tiêm thứ nhất"
                        : "Mũi tiêm thứ hai"}
                    </td>
                    <td>{item.injectionDate}</td>
                    <td>{item.time}</td>
                    {/* <td>
                          <div className="row justify-content-center">
                            <button
                              type="button"
                              className="btn btn-success"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => handleSetDataLookup(item)}
                            >
                              <i className="far fa-eye"></i>
                            </button>
                          </div>
                        </td> */}
                    <td>
                      <div className="row justify-content-center">
                        <button
                          type="button"
                          className="btn btn-warning mr-3 "
                          data-toggle="modal"
                          data-target="#exampleModal3"
                          onClick={() => handleSetDataUpdate(item)}
                        >
                          <i className="far fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <ModalHealthRecord dataLookup={dataLookup} /> */}
      <ModalUpdate
        dataUpdate={dataUpdate}
        setCallback={setCallback}
        callback={callback}
      />
    </div>
  );
}

export default UpdateInjection;
