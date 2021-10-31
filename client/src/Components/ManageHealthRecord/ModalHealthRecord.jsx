import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getDataQH } from '../../redux/actions/oganizationAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';
import ModalDetail from './ModalDetail';

function ModalHealthRecord({ dataLookup }) {
  const dispatch = useDispatch();
  const { auth, vaccine, organization } = useSelector((state) => state);
  const page = 1;
  const search = "";

  const [action, setAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [dataLookupDetail, setDataLookupDetail] = useState("");

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getDataQH(page, search, auth.access_token));
      dispatch(getDataVaccine(page, search));
    }
  }, [auth.access_token, dispatch]);

  const handleSetDataLookupDetail = (item, action) => {
    setDataLookupDetail(item);
    setAction(action);
    setOpenModal(true);
  };

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
                          value={dataLookup.name}
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
                          value={dataLookup.dob}
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
                          value={dataLookup.gender}
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
                          value={dataLookup.phonenumber}
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
                          value={dataLookup.identification}
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
                          value={dataLookup.bhyt}
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
                          value={dataLookup.email}
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
                          value={dataLookup.job}
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
                          value={dataLookup.company}
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
                          value={dataLookup.address}
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
                          value={dataLookup.province?.name}
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
                          value={dataLookup.district?.name}
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
                          value={dataLookup.ward?.name}
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
                      {dataLookup.doseInformation ? (
                        <table className="table">
                          <thead className="thead-dark">
                            <tr className="text-center">
                              <th scope="col">Số mũi</th>
                              <th scope="col">Ngày tiêm</th>
                              <th scope="col">Thời gian tiêm</th>
                              <th scope="col">Loại vắc xin</th>
                              <th scope="col">Đơn vị tiêm</th>
                              <th scope="col">Chi tiết</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataLookup.doseInformation.map((item, index) => (
                              <tr className="text-center " key={index}>
                                <td>{index + 1}</td>
                                <td>{item.injectionDate}</td>
                                <td>{item.time}</td>
                                {vaccine.map(
                                  (v) =>
                                    v._id === item.vaccineId && (
                                      <td>{v.name_vaccine}</td>
                                    )
                                )}
                                {organization.map(
                                  (o) =>
                                    o._id === item.healthOrganizationId && (
                                      <td>{o.organization}</td>
                                    )
                                )}

                                <td>
                                  <div className="row justify-content-center">
                                    <button
                                      type="button"
                                      className="btn btn-success mr-3 "
                                      data-toggle="modal"
                                      data-target="#exampleModal2"
                                      onClick={() =>
                                        handleSetDataLookupDetail(item, "look")
                                      }
                                    >
                                      <i className="far fa-eye"></i>
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  <div className="row justify-content-center">
                                    <button
                                      type="button"
                                      className="btn btn-warning mr-3 "
                                      data-toggle="modal"
                                      data-target="#exampleModal2"
                                      onClick={() =>
                                        handleSetDataLookupDetail(
                                          item,
                                          "update"
                                        )
                                      }
                                    >
                                      <i className="far fa-edit"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
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
      {openModal && (
        <ModalDetail
          dataLookupDetail={dataLookupDetail}
          action={action}
          userId={dataLookup._id}
        />
      )}
    </div>
  );
}

export default ModalHealthRecord;
