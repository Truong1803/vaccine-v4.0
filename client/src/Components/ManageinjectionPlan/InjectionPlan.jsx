import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setScheduleInjection } from '../../redux/actions/scheduleAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';

function InjectionPlan({
  setShowPlan,
  listUser,
  setCallback,
  callback,
  check,
  setCheckDissable,
}) {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("");
  const [injectionDate, setInjectionDate] = useState("");
  const [listUser1, setListUser1] = useState([]);
  const dispatch = useDispatch();
  const { vaccine, auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getDataVaccine());
  }, [dispatch]);

  useEffect(() => {
    if (check === "user" && listUser) {
      for (const item of listUser) {
        if (item.checked === true) {
          setListUser1((oldData) => [...oldData, item]);
        }
      }
    } else if (check === "xem") {
      setListUser1(listUser);
    } else {
      for (const item of listUser) {
        for (const u of item?.userPhone) {
          setListUser1((oldData) => [
            ...oldData,
            {
              checked: true,
              diseaseId: [],
              dose: u.dose,
              healthOrganizationId: auth.user._id,
              injectionDate: item.injectionDate,
              organization: item.healthOrganization,
              status: item.status,
              user: u.phonenumber,
              userId: u.phonenumber._id,
              vaccineId: item.vaccineId,
              organizationId: item.organizationId,
            },
          ]);
        }
      }
    }
  }, [check, auth.user._id]);

  const handleOnclickPlan = () => {
    setShowPlan(false);
    setCheckDissable(false);
  };

  const handleChangeDate = (e) => {
    setInjectionDate(e.target.value);
  };

  const handleSubmit = () => {
    if (check === "user") {
      listUser1.forEach((item) => {
        if (item.checked === true) {
          const { userId, healthOrganizationId, vaccineId, dose } = item;
          data.push({
            userId,
            healthOrganizationId,
            vaccineId,
            time,
            injectionDate,
            dose,
          });
        }
      });
    } else {
      listUser1.forEach((item) => {
        if (item.checked === true) {
          const {
            userId,
            healthOrganizationId,
            vaccineId,
            dose,
            organizationId,
          } = item;
          data.push({
            userId,
            healthOrganizationId,
            vaccineId,
            time,
            injectionDate,
            dose,
            organizationId: organizationId,
          });
        }
      });
    }
    setTime("");
    setInjectionDate("");
    dispatch(setScheduleInjection(data, auth.access_token));
    setCallback(!callback);
    setData([]);
    setShowPlan(false);
  };
  return (
    <div>
      <div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thi???t l???p k??? ho???ch ti??m ch???ng
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row justify-content-center">
                  <div className="col-6">
                    <p>
                      Danh s??ch ng?????i ????ng k?? theo ng??y:{" "}
                      {listUser1[0]?.status === "success"
                        ? listUser1[0]?.injectionDate
                        : injectionDate}
                    </p>
                  </div>
                  <div className="col-4 row">
                    <div className="form-group row align-items-center justify-content-center">
                      <label htmlFor="exampleInputEmail1" className="col-6">
                        Ch???n ng??y ti??m :
                      </label>
                      <input
                        type="date"
                        className="form-control col-6"
                        id="exampleInputEmail1"
                        value={
                          listUser1[0]?.status === "success"
                            ? listUser1[0]?.injectionDate
                            : injectionDate
                        }
                        disabled={listUser1[0]?.status === "success"}
                        onChange={handleChangeDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 table-responsive table-hover ">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr className="text-center">
                          <th scope="col">H??? v?? t??n</th>
                          <th scope="col">Gi???i t??nh</th>
                          <th scope="col">S??? ??i???n tho???i</th>
                          <th scope="col">CMT/CCCD</th>
                          <th scope="col">Ng??y ????ng k??</th>
                          <th scope="col">Th???i gian ti??m</th>
                          <th scope="col">Tr???ng th??i</th>
                          {/* <th scope="col">Chi ti???t</th> */}
                          {/* <th scope="col"></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {listUser1.map(
                          (item) =>
                            (item.checked === true ||
                              item.status === "success") && (
                              <tr className="text-center " key={item._id}>
                                <td>{item.user.name}</td>
                                <td>{item.user.gender}</td>
                                <td>{item.user.phonenumber}</td>
                                <td>{item.user.identification}</td>
                                <td>{item.injectionDate}</td>
                                <td>{item.time}</td>
                                <td
                                  className={
                                    item.status === "success"
                                      ? "text-success"
                                      : "text-danger"
                                  }
                                >
                                  {item.status === "success"
                                    ? "???? duy???t"
                                    : "ch??a duy???t"}
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-2 ">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Lo???i vaccine:
                          </label>
                          {vaccine.map(
                            (v) =>
                              v._id === listUser1[0]?.vaccineId && (
                                <input
                                  key={v._id}
                                  type="text"
                                  className="form-control"
                                  value={v.name_vaccine}
                                  disabled={true}
                                />
                              )
                          )}
                        </div>
                      </div>
                      {listUser1[0]?.status === "success" ? (
                        ""
                      ) : (
                        <div className="col-3">
                          <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">
                              Th???i gian ti??m:
                            </label>

                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            >
                              <option hidden={true}>Ch???n th???i gian</option>
                              <option value="S??ng">7:00-11:00</option>
                              <option value="Chi???u">13:00-18:00</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            ????n v??? ti??m:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={listUser1[0]?.organization.organization}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {listUser1[0]?.status === "success" ? (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={handleOnclickPlan}
                  >
                    Quay l???i
                  </button>
                </div>
              ) : (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleOnclickPlan}
                  >
                    Hu???
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    data-dismiss="modal"
                  >
                    Duy???t
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InjectionPlan;
