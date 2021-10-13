import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getDataDisease } from '../../redux/actions/diseaseAction';

function HistoryOfDisease({ data, setData, setStatus, status }) {
  const { disease } = useSelector((state) => state);
  let arrayData = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDisease());
  }, []);
  const handleNextPage = () => {
    setStatus(status + 1);
    setData({ ...data, diseaseId: arrayData });
  };

  const handlePrePage = () => {
    setStatus(status - 1);
  };

  const handleOnChange = (id, action) => {
    // e.preventDefault();

    const index = arrayData.indexOf(id);
    if (index > -1 && action === "delete") {
      arrayData.splice(index, 1);
    } else if (!arrayData.includes(id) && action === "add") {
      arrayData.push(id);
    }
  };
  return (
    <div className="row justify-content-center align-items-center mt-4">
      <div className="col-8 table-responsive table-hover align-items-center">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Tiền sử</th>
              <th className="text-center">Có</th>
              <th className="text-center">Không</th>
              <th className="text-center">Không rõ</th>
            </tr>
          </thead>
          <tbody>
            {disease.map((item) => (
              <tr key={item._id}>
                <td>{item.diseaseName}</td>
                <td className="text-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={item._id}
                      id="defaultCheck1"
                      name={item.diseaseName}
                      onChange={() => handleOnChange(item._id, "add")}
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      id="defaultCheck1"
                      name={item.diseaseName}
                      onChange={() => handleOnChange(item._id, "delete")}
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      id="defaultCheck1"
                      name={item.diseaseName}
                      onChange={() => handleOnChange(item._id, "delete")}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {/* <td>
                <div className="form-group ">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </td> */}
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <div className="row justify-content-between">
          <div className="col-8"></div>
          <div className="col-4">
            <div className="row ">
              <button
                type="button"
                className="btn btn-danger  mr-5 col-4"
                onClick={handlePrePage}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="btn btn-primary  col-4"
                onClick={handleNextPage}
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryOfDisease;
