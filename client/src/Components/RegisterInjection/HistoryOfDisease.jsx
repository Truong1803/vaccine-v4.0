import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataDisease } from "../../redux/actions/diseaseAction";
function HistoryOfDisease({ data }) {
  const { disease } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDisease());
  }, []);
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
              <tr>
                <td>{item.diseaseName}</td>
                <td className="text-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                  </div>
                </td>
                <td className="text-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
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
    </div>
  );
}

export default HistoryOfDisease;
