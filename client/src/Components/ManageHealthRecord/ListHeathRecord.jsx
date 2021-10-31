import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getUserInjected } from '../../redux/actions/userAction';
import ModalHealthRecord from './ModalHealthRecord';

function ListHealthRecord() {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state) => state);

  const [dataLookup, setDataLookup] = useState("");
  const [injectionDate, setInjectionDate] = useState("");
  const handleSetDataLookup = (item) => {
    setDataLookup(item);
  };

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getUserInjected(auth.access_token, injectionDate));
    }
  }, [auth.access_token, injectionDate, dispatch]);

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
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => (
                  <tr className="text-center " key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.identification}</td>

                    <td>{item.phonenumber}</td>

                    <td>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalHealthRecord dataLookup={dataLookup} />
      {/* <ModalUpdate
        dataUpdate={dataUpdate}
        setCallback={setCallback}
        callback={callback}
      /> */}
    </div>
  );
}

export default ListHealthRecord;
