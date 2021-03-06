import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  GetInjectionRegister,
} from '../../redux/actions/injectionRegisterAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';

function ModalLookUp({ auth, setShowModal }) {
  const { vaccine, injectionRegister } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.access_token) {
      dispatch(GetInjectionRegister(auth.access_token));
      dispatch(getDataVaccine());
    }
  }, [auth.access_token, dispatch]);
  const handleClick = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thông tin đăng ký
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
                  <div className="col">
                    <p className="font-weight-bold">
                      1. Thông tin người đăng ký tiêm:
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Họ và tên:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.name}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Ngày sinh:</label>
                          <input
                            type="date"
                            className="form-control"
                            value={auth.user?.dob}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Giới tính:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.gender}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Số điện thoại:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.phonenumber}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            value={auth.user?.email}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">CCCD/CMND:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.identification}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Số thẻ BHYT:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.bhyt}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Nghề nghiệp:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.job}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Đơn vị công tác:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.company}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Tỉnh/Thành phố:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.province?.name}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Quận/Huyện:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.district?.name}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Phường/Xã:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.ward?.name}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Địa chỉ:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={auth.user?.address}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col font-weight-bold">
                        2.Thông tin đăng ký tiêm chủng
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col">
                    <div className="row">
                      <div className="col-2 ">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Đăng ký mũi tiêm:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              injectionRegister.dose === 1
                                ? "Mũi tiêm thứ nhất"
                                : "Mũi tiêm thứ hai"
                            }
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-2 ">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Loại vaccine:
                          </label>
                          {vaccine.map(
                            (item) =>
                              item._id === injectionRegister.vaccineId && (
                                <input
                                  key={item._id}
                                  type="text"
                                  className="form-control"
                                  value={item.name_vaccine}
                                  disabled={true}
                                />
                              )
                          )}
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Ngày tiêm:</label>
                          <input
                            type="date"
                            className="form-control"
                            value={injectionRegister.injectionDate}
                            disabled={true}
                          />
                        </div>
                      </div>

                      {injectionRegister.status === "success" && (
                        <div className="col-2">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Thời gian:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={injectionRegister.time}
                              disabled={true}
                            />
                          </div>
                        </div>
                      )}

                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Đơn vị tiêm:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={injectionRegister.organization?.organization}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={handleClick}
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLookUp;
