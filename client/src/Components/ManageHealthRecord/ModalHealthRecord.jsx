import React, { useState } from 'react';

import ModalDetail from './ModalDetail';

function ModalHealthRecord({ dataLookup }) {
  const [record, setRecord] = useState();
  return (
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
                Hồ Sơ Tiêm Chủng
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
              <div className="row">
                <div className="col-12">1.Thông tin cá nhân</div>
                <div className="col-12">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Họ và tên:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.name}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Ngày sinh:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={dataLookup.user?.dob}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Giới tính:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.gender}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Số điện thoại:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.phonenumber}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">CMND/CCCD:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.identification}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Số BHYT:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.bhyt}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          value={dataLookup.user?.email}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Nghề nghiệp:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.job}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Đơn vị công tác:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.company}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Địa chỉ:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.address}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Tỉnh/Thành phố:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.province.name}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Quận/Huyện:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.district.name}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Phường/Xã:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={dataLookup.user?.ward.name}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">2.Thông tin tiêm chủng</div>
                  </div>
                  <div className="row">
                    <div className="col">Danh sách vaccine đã tiêm </div>
                  </div>
                  <div className="row">
                    <div className="col-12 table-responsive table-hover ">
                      {dataLookup.user?.ModalDetail?.doseInformation ? (
                        <table className="table">
                          <thead className="thead-dark">
                            <tr className="text-center">
                              <th scope="col">Số mũi</th>
                              <th scope="col">Ngày tiêm</th>
                              <th scope="col">Thời gian tiêm</th>
                              <th scope="col">Tên vaccine</th>
                              <th scope="col">Địa điểm tiêm</th>
                              <th scope="col">Chi tiết</th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataLookup.user?.ModalDetail?.doseInformation.map(
                              (item, index) => (
                                <tr className="text-center " key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.injectionDate}</td>
                                  <td>{item.time}</td>
                                  <td>{item.vaccineId}</td>
                                  <td>{item.organizationId}</td>

                                  <td>
                                    <div className="row justify-content-center">
                                      <button
                                        type="button"
                                        className="btn btn-success mr-3 "
                                        data-toggle="modal"
                                        data-target="#exampleModal2"
                                        // onClick={handleOnchange}
                                      >
                                        <i className="far fa-eye"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      ) : (
                        "Chưa có dữ liệu tiêm chủng"
                      )}
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
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalDetail />
    </div>
  );
}

export default ModalHealthRecord;
