import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getDataDisease } from '../../redux/actions/diseaseAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';

function ModalRegisterInjection({ setShowModal, user }) {
  const { vaccine, disease } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataVaccine());
    dispatch(getDataDisease());
  }, [dispatch]);

  const handleOnclickModal = () => {
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
                  Thông tin người tiêm
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
                            value={user.user.name}
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
                            value={user.user.dob}
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
                            value={user.user.gender}
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
                            value={user.user.phonenumber}
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
                            value={user.user.email}
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
                            value={user.user.identification}
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
                            value={user.user.bhyt}
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
                            value={user.user.job}
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
                            value={user.user.organization}
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
                            value={user.user.province.name}
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
                            value={user.user.district.name}
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
                            value={user.user.ward.name}
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
                            value={user.user.address}
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
                      <div className="col-3 ">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Đăng ký mũi tiêm:
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            name="dose"
                            value={user?.dose}
                            disabled={true}
                            defaultValue={user?.dose}
                          >
                            <option selected={true} value={user?.dose}>
                              Mũi tiêm thứ {user?.dose}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-3 ">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Loại vaccine:
                          </label>
                          {vaccine.map(
                            (item) =>
                              item._id === user.vaccineId && (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={item.name_vaccine}
                                  disabled={true}
                                />
                              )
                          )}
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="exampleFormControlSelect1">
                            Đơn vị tiêm:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={user.organization.organization}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Ngày muốn tiêm:
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={user.injectionDate}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col font-weight-bold">3.Tiền sử bệnh</div>
                </div>
                <div className="row justify-content-center align-items-center mt-4">
                  <div className="col-12 table-responsive table-hover align-items-center">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th>STT</th>
                          <th>Tiền sử</th>
                        </tr>
                      </thead>
                      <tbody>
                        {disease.map(
                          (item, index) =>
                            user.diseaseId.includes(item._id) && (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.diseaseName}</td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={handleOnclickModal}
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

export default ModalRegisterInjection;
