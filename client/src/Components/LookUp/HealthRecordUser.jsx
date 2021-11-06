import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { refreshToken } from '../../redux/actions/authActions';
import { getDataQH } from '../../redux/actions/oganizationAction';
import { getDataVaccine } from '../../redux/actions/vaccineAction';
import ModalDetail from '../ManageHealthRecord/ModalDetail';

function HealthRecordUser() {
  const [dataLookupDetail, setDataLookupDetail] = useState("");

  const dispatch = useDispatch();
  const { auth, vaccine, organization } = useSelector((state) => state);
  const page = 1;
  const search = "";

  const [action, setAction] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      dispatch(refreshToken());
      dispatch(getDataQH(page, search, auth.access_token));
      dispatch(getDataVaccine(page, search));
    }
  }, [dispatch]);

  const handleSetDataLookupDetail = (item, action) => {
    setDataLookupDetail(item);
    setAction(action);
    setOpenModal(true);
  };
  return (
    <div className="row justify-content-center">
      <div className="col-8">
        <div className="row mt-4">
          <div className="col-12 text-center">
            <h3>Hồ sơ tiêm chủng</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 font-weight-bold mt-2 mb-3">
                1.Thông tin cá nhân
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-4">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Họ và tên:</label>
                      <strong>{auth.user?.name}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Ngày sinh: </label>
                      <strong>{auth.user?.dob}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Giới tính:</label>
                      <strong>{auth.user?.gender}</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Số điện thoại:</label>
                      <strong>{auth.user?.phonenumber}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">CMND/CCCD:</label>
                      <strong>{auth.user?.identification}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Số BHYT:</label>
                      <strong>{auth.user?.bhyt}</strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Email: </label>
                      <strong>{auth.user?.email}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Nghề nghiệp:</label>
                      <strong>{auth.user?.job}</strong>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">
                        Đơn vị công tác:
                      </label>
                      <strong>{auth.user?.company}</strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group d-flex">
                      <label htmlFor="exampleInputEmail1">Địa chỉ:</label>
                      <strong>
                        {`${auth.user?.address},
                          ${auth.user?.ward?.name},
                          ${auth.user?.district?.name},
                          ${auth.user?.province?.name}`}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 font-weight-bold mt-2 mb-3">
                    2.Thông tin tiêm chủng
                  </div>
                </div>
                <div className="row">
                  <div className="col">Danh sách vaccine đã tiêm </div>
                </div>
                <div className="row">
                  <div className="col-12 table-responsive table-hover ">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr className="text-center">
                          <th scope="col">Số mũi</th>
                          <th scope="col">Ngày tiêm</th>
                          <th scope="col">Thời gian tiêm</th>
                          <th scope="col">Tên vaccine</th>
                          <th scope="col">Địa điểm tiêm</th>
                          <th scope="col">Chi tiết</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auth.user?.doseInformation.map((item, index) => (
                          <tr className="text-center " key={index}>
                            <td>{item.dose}</td>
                            <td>{item.injectionDate}</td>
                            <td>{item.time}</td>
                            {vaccine.map(
                              (v) =>
                                v._id === item.vaccineId && (
                                  <td key={v._id}>{v.name_vaccine}</td>
                                )
                            )}
                            {organization.map(
                              (o) =>
                                o._id === item.healthOrganizationId && (
                                  <td key={o._id}>{o.organization}</td>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalDetail dataLookupDetail={dataLookupDetail} action={action} />
      )}
    </div>
  );
}

export default HealthRecordUser;
